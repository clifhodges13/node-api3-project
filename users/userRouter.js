const express = require('express');
const db = require('./userDb');

const router = express.Router();

router.post('/', (req, res) => {
  db.insert(req.body)
    .then(newUser => res.status(201).json(newUser))
    .catch(err => res.status(500).json({ message: "An internal error occurred. Please try again later."}))
});

router.post('/:id/posts', (req, res) => { // this one needs work
  db.getUserPosts(req.body)
    .then(post => res.status(201).json(post))
    .catch(err => res.status(500).json({ message: "An internal error occurred. Please try again later."}))
});

router.get('/', (req, res) => {
  db.get()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json({ message: "An internal error occurred. Please try again later."}))
});

router.get('/:id', (req, res) => {
  db.getById(req.params.id)
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json({ message: "An internal error occurred. Please try again later."}))
});

router.get('/:id/posts', (req, res) => {
  db.getUserPosts(req.params.id)
    .then(posts => res.status(200).json(posts))
    .catch(err => res.status(500).json({ message: "An internal error occurred. Please try again later."}))
});

router.delete('/:id', (req, res) => {
  db.remove(req.params.id)
    .then(deleted => res.status(200).json({ deletedItems: deleted }))
    .catch(err => res.status(500).json({ message: "An internal error occurred. Please try again later."}))
});

router.put('/:id', (req, res) => {
  db.update(req.params.id, req.body)
    .then(updatedUser => res.status(200).json(updatedUser))
    .catch(err => res.status(500).json({ message: "An internal error occurred. Please try again later."}))
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
