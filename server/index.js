require('newrelic');
const express = require('express');
const path = require('path');
const cors = require('cors');

const db = require('../database/config.js');
const Videos = require('../database/collections/videos.js');
const Users = require('../database/collections/users.js');
const Games = require('../database/collections/games.js');

const User = require('../database/models/user.js')

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true, }));
app.use(express.static(path.join(__dirname, '../public')));

const port = 3049;

app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});


app.get('/', (req, res) => {
  res.status(200);
});

app.get('/api/videos', (req, res) => {
  Videos.reset()
    .fetch()
    .then((videos) => {
      res.status(200).send(videos.models);
    });
});

app.get('/api/users', (req, res) => {
  const id = req.body.id ? req.body.id : 1;
  Users.reset()
    .query('where', 'id','=', id)
    .fetch()
    .then((users) => {
      res.status(200).send(users.models);
    });
});

app.post('/api/users', (req, res) => {
  const username = req.body.username;
  new User({display_name: username})
    .save()
    .then(newUser => {
      res.status(200).send(newUser.attributes);
    })
    .catch(err => {
      console.error('something went wrong with creating a new user', err);
    })
});

app.put('/api/users', (req, res) => {
  const idToUpdate = req.body.id;
  const username = req.body.username;
  User.forge({id: idToUpdate, display_name: username})
    .save()
    .then(updatedUser => {
      res.status(200).send(updatedUser.attributes);
    })
    .catch(err => {
      console.error('something went wrong with updated a user', err);
    })
});

app.delete('/api/users', (req, res) => {
  const id = req.body.id;
  new User({ id })
   .destroy()
   .then(() => {
     res.status(200).send('user deleted');
   })
    .catch(err => {
      console.error('something went wrong with deleting a user', err);
    })
});

app.get('/api/games/', (req, res) => {
  Games.reset()
    .fetch()
    .then((games) => {
      res.status(200).send(games.models);
    });
});

module.exports = app;