const express = require('express');
const router = express.Router();

const query = require('../db/query');

//GET ALL
router.get('/', function(req, res, next) {
  query.snacks.getAll().then(snacks => {
    res.json(snacks);
  })
});

//GET ONE
router.get('/:id', function(req, res, next) {
  query.snacks.getOne(req.params.id).then(snack => {
    res.json(snack);
  })
});

//CREATE ONE
router.post('/', function(req, res, next) {
  query.snacks.create(req.body).then(snack => {
    res.json(snack);
  })
});

//UPDATE ONE
router.put('/:id', function(req, res, next) {
  query.snacks.update(req.params.id, req.body).then(snack => {
    res.json(snack);
  })
});

//DELETE
router.delete('/:id', function(req, res, next) {
  query.snacks.delete(req.params.id).then(() => {
    res.json({
      message: "Snack Deleted"
    });
  })
});


module.exports = router;
