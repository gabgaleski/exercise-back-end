const express = require('express');
const { readFile, writeFile, getId } = require('../../utils/readAndWriteFiles');
const verifyTitle = require('../middlewares/ferifyTitle')

const route = express.Router();

route.get('/', async (_req, res) => {
    const data = await readFile();
    res.status(200).json(data);
});

route.get('/:id', async (req, res) => {
    const data = await readFile();
    const id = Number(req.params.id);
    const getData = data.filter((e) => e.id === id)
    res.status(200).json(getData);
});

route.post('/', verifyTitle, async (req, res) => {
    const { title } = req.body;
    const id = await getId() + 1;
    const newPost = await writeFile({id, title})

    res.status(201).json(newPost);
})

module.exports = route;