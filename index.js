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
const createCar = car =>
  db('cars')
    .insert(car)
    .then(([id]) => getCars(id));

server.get('/', async (req, res) => {
  const cars = await getCars();
  res.status(200).json(cars);
});

server.get('/:id', async (req, res) => {
  const cars = await getCars(req.params.id);
  res.status(200).json(cars);
});
server.post('/', async (req, res) => {
  const { VIN, model, make, mileage } = req.body;
  if ((VIN, model, make, mileage)) {
    const newCar = await createCar(req.body);
    res.status(201).json(newCar);
  }
  res
    .status(400)
    .json({ message: 'Please provide VIN, model, make, mileage for the car' });
});

server.listen(4000, () => {
  console.log('Server running on port 4000');
});
