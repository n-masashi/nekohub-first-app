const  express = require('express');
const mysql = require('mysql');
const knex = require('../db/knex');

const  router = express.Router();

function checkAuth(req, res, next) {
  if (req.session && req.session.userid) {
    next();
  } else {
    res.redirect('/signin');
  }
}

router.get('/', function(req, res, next) {
  const userId = req.session.userid;
  const isAuth = Boolean(userId);
  if (!isAuth) {
    return res.render('index', {
      title: 'NekoHub',
      isAuth: false,
      todos: [],
    });
  }  

  knex("tasks")
    .where({ user_id: userId })
    .select("*")
    .then(function (results) {
      console.log(results);
      res.render('todo-app', {
        title: 'ToDo App',
        todos: results,
        isAuth: isAuth,
      });
    })
    .catch(function (err) {
      console.error(err);
      res.render('todo-app', {
        title: 'ToDo App',
        isAuth: isAuth,
      });
    });
});

router.post('/', function(req, res, next) {
  const userId = req.session.userid;
  const isAuth = Boolean(userId);
  const todo = req.body.add;
  knex("tasks")
    .insert({user_id: userId, content: todo})
    .then(function() {
      res.redirect('/todo-app')
    })
    .catch(function (err) {
      console.error(err);
      res.render('todo-app', {
        title: 'ToDo App',
        isAuth: isAuth,
      });
    });
});

router.post('/toggle/:id', checkAuth, function(req, res, next) {
  const userId = req.session.userid;
  const taskId = req.params.id;

  knex("tasks")
    .where({ id: taskId, user_id: userId })
    .first()
    .then(task => {
      if (!task) {
        return res.redirect('/todo-app');
      }
      const newComplete = task.complete ? 0 : 1;
      return knex("tasks")
        .where({ id: taskId })
        .update({ complete: newComplete });
    })
    .then(() => {
      res.redirect('/todo-app');
    })
    .catch(err => {
      console.error(err);
      res.redirect('/todo-app');
    });
});

router.post('/delete/:id', checkAuth, function(req, res, next) {
  const userId = req.session.userid;
  const taskId = req.params.id;

  knex("tasks")
    .where({ id: taskId, user_id: userId })
    .del()
    .then(() => {
      res.redirect('/todo-app');
    })
    .catch(err => {
      console.error(err);
      res.redirect('/todo-app');
    });
});

module.exports = router;
