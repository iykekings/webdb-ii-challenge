const knex = require('knex');
const config = require('./knexfile.js');
const express = require('express');

const server = express();
server.use(express.json());
const db = knex(config.development);
const getCars = id =>
  id
    ? db('cars')
        .where({ id })
        .first()
    : db('cars');

server.get('/', async (req, res) => {
  const cars = await getCars();
  res.status(200).json(cars);
});

server.get('/:id', async (req, res) => {
  const cars = await getCars(req.params.id);
  res.status(200).json(cars);
});

server.listen(4000, () => {
  console.log('Server running on port 4000');
});
