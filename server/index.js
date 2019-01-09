const express = require('express');
const path = require('path');
const db = require('../database/config.js');
const Videos = require('../database/collections/videos.js');
const Video = require('../database/models/video.js');
const Users = require('../database/collections/users.js');
const User = require('../database/models/user.js');
const Games = require('../database/collections/games.js');
const Game = require('../database/models/game.js');
const cors = require('cors');
const app = express();
const port = 3049;
const server = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true, }));
app.use(express.static(path.join(__dirname, '../public')));


app.get('/api/videos', (req, res) => {
  Videos.reset()
    .fetch()
    .then((videos) => {
      res.status(200).send(videos.models);
    });
});

app.get('/api/users', (req, res) => {
  Users.reset()
    .fetch()
    .then((users) => {
      res.status(200).send(users.models);
    });
});

app.get('/api/games/', (req, res) => {
  Games.reset()
    .fetch()
    .then((games) => {
      res.status(200).send(games.models);
    });
});



app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});