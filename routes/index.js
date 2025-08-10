const  express = require('express');
const mysql = require('mysql');
const knex = require('../db/knex');

//const connection = mysql.createConnection({
//  host: 'localhost',
//  user: '',
//  password: '',
//  database: 'nekohub'
//});

//connection.connect((err) => {
//    if (err) {
//      console.log('error connecting: ' + err.stack);
//      return
//    }
//    console.log('success');
//  });  

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
    });
  }
  res.render('index', {
    title: 'NekoHub',
    isAuth: true,
  });
});


router.post('/', function(req, res, next) {
  res.redirect('/');
});

router.use('/signup', require('./signup'));
router.use('/signin', require('./signin'));
router.use('/logout', require('./logout'));
router.use('/todo-app', checkAuth, require('./todo-app'));
router.use('/qrgenerator', checkAuth, require('./qrgenerator'));

module.exports = router;
