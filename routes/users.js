const express = require('express');
const router = express.Router();
const User = require('./../models/Users')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

process.env.SECRET_KEY = 'secret'

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

/* Register */
router.post('/register', (req, res) => {
  const today = Date()
  /* membuat data objek untuk disimpan */
  const userData = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    created_at: today
  }

  /* mencari user dengan email yang sama */
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) {
        /* membuat password hash */
        const hash = bcrypt.hashSync(userData.password, 10)
        userData.password = hash

        /* menyimpan data user ke database */
        User.create(userData)
          .then(user => {
            /* membuat token dengan jwt */
            let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, { expiresIn: 1440 })
            res.json({ token: token })
          })
          .catch(err => {
            res.send('error: ' + err)
          })
      } else {
        res.send({ message: 'User already exists' })
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

/* Login */
router.post('/login', (req, res) => {
  /* mencari user dengan email yang sama */
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      /* mencocokan password dengan passwordHash di database */
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          /* membuat token jwt */
          let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, { expiresIn: 60 })
          res.json({ token: token })
        } else {
          res.send('User does not exists 2')
        }
      } else {
        res.send('User does not exists')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

/* profile */
router.get('/profile', (req, res) => {
  try {
    let decode = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

    User.findOne({
      where: {
        id: decode.id
      }
    })
      .then(user => {
        if (user) {
          res.json(user)
        } else {
          res.send('User does not exists')
        }
      })
      .catch(err => {
        res.send('error: ' + err)
      })
  } catch(err) {
    res.send({
      status: false,
      data: err
    })
  }
  
})

module.exports = router;
