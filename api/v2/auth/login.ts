import { chain } from '@amaurym/now-middleware';
import { VercelRequest, VercelResponse } from '@vercel/node';
import { OAuth2Client } from 'google-auth-library';
import { createAccessToken, setRefreshToken } from '../../../src/api/utils/auth';
import Account from '../../../src/api/data/models/Account';
import {initialiseKnex} from '../../../src/api/utils/database';
import { cors } from '../../../src/api/middleware/cors';
import Knex from 'knex';

export const CLIENT_ID = "426047810377-r5kkueiimbb0ntgflo1vr7rrv2bmi10a.apps.googleusercontent.com";

// Login or create an account when user clicks the google sign in button
const handler = async (req: VercelRequest, res: VercelResponse) => {
  type AuthRequest = { idToken: string }
  const authRequest: AuthRequest = req.body;

  try {
    const client = new OAuth2Client(CLIENT_ID);
    const ticket = await client.verifyIdToken({
      idToken: authRequest.idToken,
      audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const exteralId = payload && payload['sub'];
  
    // Confirm that exteral id was included in the request
    if (!exteralId) {
      throw new Error('External ID not provided');
    }

    const knex: Knex = initialiseKnex();

    // Search for an account with the external id
    let account = await Account.query(knex).findOne('external_id', exteralId);
    // Create a new account if one does not exist
    if (!account) {
      console.log(`Creating account`)
      account = await Account.query(knex).insert({ external_id: exteralId });
    }
    // Issue a new refresh token in a httponly cookie
    setRefreshToken(res, account);
    // Issue a new access token
    res.status(200).send(createAccessToken(account));
  } catch (error) {
    console.error(error.message);
    res.status(400).send(undefined);
  }
};

export default chain(cors)(handler);
