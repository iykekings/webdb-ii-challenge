const knex = require('knex');
const config = require('./knexfile.js');
const express = require('express');

const server = express();
server.use(express.json());
const db = knex(config.development);

// db helpers
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

const updateCar = (id, payload) =>
  db('cars')
    .where({ id })
    .update(payload)
    .then(res => (res > 0 ? getCars(id) : null));

const deleteCar = id =>
  db('cars')
    .where({ id })
    .del();

// db helpers end

server.get('/', async (req, res) => {
  const cars = await getCars();
  res.status(200).json(cars);
});

server.get('/:id', async (req, res) => {
  try {
    const car = await getCars(req.params.id);
    if (car) {
      res.status(200).json(car);
    } else {
      res.status(400).json({ message: 'No car with that id' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Cannot retrieve the car details' });
  }
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

server.put('/:id', async (req, res) => {
  const payload = req.body;
  if (Object.keys(payload).length) {
    const updatedCar = await updateCar(req.params.id, payload);
    res.status(200).json(updatedCar);
  }
  res.status(400).json({ message: 'The update payload must not be empty' });
});

server.delete('/:id', async (req, res) => {
  const deleted = await deleteCar(req.params.id);
  if (deleted) {
    res.status(200).json({ message: 'Car deleted successfully' });
  } else {
    res.status(400).json({ message: 'No car with that id' });
  }
});

server.listen(4000, () => {
  console.log('Server running on port 4000');
});
