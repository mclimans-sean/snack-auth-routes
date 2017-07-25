const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const query = require('../db/query')

function validUser(user) {
  const validEmail = typeof user.email == 'string' && user.email.trim != '';
  const validPassword = typeof user.password == 'string' && user.password.trim != '';

  return validEmail && validPassword;
}

router.post('/signup', (req, res, next) => {
  if (validUser(req.body)) {
    query
      .findUserByEmail(req.body.email)
      .then(user => {
        if (user) {
          next(new Error('Email address already on file'));
        } else {
          const user = {
            email: req.body.email
          }

          bcrypt
            .hash(req.body.password, 8)
            .then((hash) => {
              user.password = hash;
              query
                .createUser(user)
                .then(user => {
                  res.json(user);
                })
            })
        }
      })
  } else {
    next(new Error('Invalid user'));
  }
})

router.post('/signin', (req, res, next) => {
  if (validUser(req.body)) {
    query
      .findUserByEmail(req.body.email)
      .then(user => {
        if (user) {
          if (bcrypt.compareSync(req.body.password, user.password)) {
            res.redirect('/')
          } else {
            res.json({
              message: "You shouldn't be here"
            })
          }
        } else {
          res.json({
            message: "You shouldn't be here"
          })
        }
      })
  } else {
    res.json({
      message: "You shouldn't be here"
    })
  }
});

module.exports = router;
