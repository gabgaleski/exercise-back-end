const express = require('express');

const app = express();

const teams = [
    {
      id: 1,
      name: 'São Paulo Futebol Clube',
      initials: 'SPF',
    },
    {
      id: 2,
      name: 'Clube Atlético Mineiro',
      initials: 'CAM',
    },
  ];

  app.use(express.json());

app.get('/teams', (_req, res) => res.status(200).json({ teams }));
app.post('/teams', (req, res) => {
    const newTeam = { ...req.body };
    teams.push(newTeam);
    res.status(201).json({ team: newTeam });
});
app.get('/', (req, res) => res.status(200).json({ message: 'Olá Mundo!' }));

app.put('/teams/:id', (req, res) => {
  const { id } = req.params;
  const { name, initials } = req.body;

  const updateTeam = teams.find((team) => team.id === Number(id));

  if (!updateTeam) return res.status(404).json({ message: 'Time não encontrado' });

  updateTeam.name = name;
  updateTeam.initials = initials;
  res.status(200).json({ updateTeam });
});

app.get('teams/:id', (req, res) => {
  const { id } = req.params;
  const selectTeam = teams.find((team) => team.id === Number(id));

  if (!selectTeam) return res.status(404).json({ message: 'Time não encontrado' });

  res.status(200).json(selectTeam);
});

app.delete('/teams/:id', (req, res) => {
  const { id } = req.params;
  const deleteTeam = teams.findIndex((team) => team.id === Number(id));
  teams.splice(deleteTeam, 1);

  res.status(200).end();
});

module.exports = app;