import express, { Router } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import Knex from 'knex';
import knexfile from './knexfile';

import { Model } from 'objection';
import Chapter from './data/models/Chapter';
import Side from './data/models/Side';
import Checkpoint from './data/models/Checkpoint';
import Room from './data/models/Room';


const app = express();
const router = express.Router();
dotenv.config();

// Connect to DB
const knex = Knex(knexfile);
Model.knex(knex);

// Pretty JSON
app.set('json spaces', 2)

// Serve react static files
app.use(express.static(path.join(__dirname, '/../client/build')));

// API endpoints

router.get('/chapters', async (req, res) => {
  res.json(await Chapter.query());
});

router.get('/chapters/:chapter_id', async (req, res) => {
  res.json(await Chapter.query().findById(req.params.chapter_id));
});

router.get('/chapter/:chapter_id/sides', async (req, res) => {
  res.json(await Chapter.relatedQuery('sides').for(req.params.chapter_id));
  // res.json(await Side.query().where('chapter_id', '=', req.params.chapter_id));
});

router.get('/sides/:side_id', async (req, res) => {
  res.json(await Side.query().findById(req.params.side_id));
});

router.get('/sides/:side_id/checkpoints', async (req, res) => {
  res.json(await Side.relatedQuery('checkpoints').for(req.params.side_id));
});

router.get('/checkpoints/:checkpoint_id', async (req, res) => {
  res.json(await Checkpoint.query().findById(req.params.checkpoint_id));
});

router.get('/checkpoints/:checkpoint_id/rooms', async (req, res) => {
  res.json(await Checkpoint.relatedQuery('rooms').for(req.params.checkpoint_id));
});

router.get('/rooms/:room_id', async (req, res) => {
  res.json(await Room.query().findById(req.params.room_id));
});

router.get('/chaptersidecheckpointrooms', async (req, res) => {
  res.json(await Chapter.query().withGraphFetched('sides.[checkpoints.[rooms]]'));
});

// Use router prefix
app.use('/api', router);

// Catch all other requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../client/build/index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port);