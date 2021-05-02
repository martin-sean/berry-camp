import { chain, NowFunction } from '@amaurym/now-middleware';
import { VercelRequest, VercelResponse } from "@vercel/node";
import Knex from 'knex';
import Account from "../../../src/api/data/models/Account";
import isAuth from '../../../src/api/middleware/isAuth';
import { createAccessToken } from '../../../src/api/utils/auth';
import { deleteClipById } from '../../../src/api/actions/clip';
import Clip from '../../../src/api/data/models/Clip';
import {connectToDatabase} from '../../../src/api/utils/database';
import { cors } from '../../../src/api/middleware/cors';

const usernamePattern = new RegExp('^\\w+$');

type RequestHandler = (req: VercelRequest, res: VercelResponse, knex: Knex) => Promise<void>;

const handler = async (req: VercelRequest, res: VercelResponse): Promise<void> => {
  const method: string = req.method ?? 'GET';
  const requestHandler: RequestHandler = handlers[method];
  if (requestHandler) {
    const knex = connectToDatabase();
    await requestHandler(req, res, knex);
    knex.destroy();
  }
}

const getRequest = async (req: VercelRequest, res: VercelResponse, knex: Knex): Promise<void> => {
  try {
    const account = Account.query(knex).findById((res as any).locals.userId);
    res.status(200).json(account);
  } catch (error) {
    res.status(404).send({});
  }
}

const patchRequest = async (req: VercelRequest, res: VercelResponse, knex: Knex): Promise<void> => {
  type PatchRequest = { username: string }
  const username = (req.body as PatchRequest).username;

  // Check if username is a word ([A-Za-z0-9_]*) and in range
  if (!usernamePattern.test(username) || username.length < 3 || username.length > 20) {
    res.status(400).send({});
  }
    
  try {
    const updatedAccount = await Account.query(knex)
      .findById((res as any).locals.userId)
      .patch({ username: username })
      .returning('*');
    // Small hack, typescript appears to be wrong, updatedAccount should not be an array
    res.status(200).send(createAccessToken(updatedAccount as any));
  } catch (error) {
    console.log(error.message);
    res.status(400).send({});
  }
}

const deleteRequest = async (req: VercelRequest, res: VercelResponse, knex: Knex): Promise<void> => {
  type DeleteRequest = { 'deleteAccount': boolean, 'deleteClips': boolean };
  const deleteRequest = req.body as DeleteRequest;
  const userId: number = (res as any).locals.userId;
  
  // Check if the user really wants to delete their account
  if (!deleteRequest.deleteAccount) {
    res.status(422).send({});
  }

  try {
    // Create a new transaction to delete account and update related clips
    await Account.transaction(knex, async trx => {
      // Check if clip deleting was requested
      if (deleteRequest.deleteClips) {
        // Get all clips
        const clips = await Account.relatedQuery('clipsCreated', trx).for(userId);
        // Delete all clips
        for (const clip of clips) {
          await deleteClipById((clip as Clip).id, userId, trx);
        }
      }
      // Delete account
      await Account.query(trx).deleteById(userId);
    });
    // Account successfully deleted
    console.info(`Deleted account #${ userId }`);
    res.status(204).send({});
  // Error occured during deletion, account doesn't exist or connection is broken
  } catch (error) {
    console.error(error.message);
    res.status(500).send({});
  }
}

const handlers: Record<string, RequestHandler> = {
  'GET': getRequest,
  'PATCH': patchRequest,
  'DELETE': deleteRequest,
}

export default chain(cors, isAuth)(handler);