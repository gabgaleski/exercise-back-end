const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();

app.use(express.json());

const moviePath = path.resolve(__dirname, './movies.json');

const readFile = async () => {
   try {
    const file = await fs.readFile(moviePath, 'utf-8');
    console.log(JSON.parse(file));
    return JSON.parse(file);
   } catch (error) {
    console.log(`Arquivo nao encontrado: ${error.path}`);
   }
};

app.get('/movies/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const movies = await readFile();
      const film = movies.find((movie) => movie.id === Number(id));
      res.status(200).json(film);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
});

app.get('/movies', async (_req, res) => {
    try {
      const movies = await readFile();
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

app.post('/movies', async (req, res) => {
    try {
        const movies = await readFile();
        const newMovie = { id: movies.length + 1, ...req.body };
        movies.push(newMovie);
        res.status(201).json(movies);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

app.put('/movies/:id', async (req, res) => {
    try {
        const movies = await readFile();
        const { id } = req.params;
        const { movie, price } = req.body;
        const newMovies = movies.map((film) => {
            if (film.id === Number(id)) {
                return { ...film, movie, price };
            }
            return film;
        });
        res.status(200).json(newMovies);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

app.delete('/movies/:id', async (req, res) => {
    try {
        const movies = await readFile();
        const { id } = req.params;
        const deletedMovie = movies.filter((film) => film.id !== Number(id));
        const updateMovies = JSON.stringify(deletedMovie, null, 2);
        await fs.writeFile(moviePath, updateMovies);
        res.status(204).end();
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

module.exports = app;