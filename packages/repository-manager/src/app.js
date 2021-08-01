const cors = require('cors');
const express = require('express');
const { v4: uuid } = require('uuid');

const validateUuid = require('./middleware/validateUuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

function getRepositoryIndex(request, response, next) {
  const { id } = request.params;
  const repositoryIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: 'Repository not found' });
  }

  request.repositoryIndex = repositoryIndex;

  return next();
}

app.get('/repositories', (request, response) => {
  return response.json(repositories);
});

app.post('/repositories', (request, response) => {
  const { title, url, techs } = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };

  repositories.push(repository);

  return response.json(repository);
});

app.put(
  '/repositories/:id',
  validateUuid,
  getRepositoryIndex,
  (request, response) => {
    const { title, url, techs } = request.body;
    const repositoryIndex = request.repositoryIndex;

    const repository = { ...repositories[repositoryIndex], title, url, techs };

    repositories[repositoryIndex] = repository;

    return response.json(repository);
  }
);

app.delete(
  '/repositories/:id',
  validateUuid,
  getRepositoryIndex,
  (request, response) => {
    const repositoryIndex = request.repositoryIndex;

    repositories.splice(repositoryIndex, 1);

    return response.status(204).send();
  }
);

app.post(
  '/repositories/:id/like',
  validateUuid,
  getRepositoryIndex,
  (request, response) => {
    const repositoryIndex = request.repositoryIndex;
    const repository = repositories[repositoryIndex];

    repository.likes++;

    return response.json(repository);
  }
);

module.exports = app;
