const express = require('express');
const { createTask, getTask, getTaskById, updateTask, deleteTask } = require('../service/service');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    res.status(200).send(await createTask(req.body));
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.get('/', async (req, res) => {
  try {
    res.status(200).send(await getTask());
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.get('/:_id', async (req, res) => {
  try {
    res.status(200).send(await getTaskById(req.params._id));
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.put('/:_id', async (req, res) => {
  try {
    res.status(200).send(await updateTask(req.params._id, req.body));
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.delete('/:_id', async (req, res) => {
  try {
    res.status(200).send(await deleteTask(req.params._id));
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = router;
