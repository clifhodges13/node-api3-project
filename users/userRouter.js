const express = require('express');
const db = require('./userDb');

const router = express.Router();

router.post('/', validateUser(), (req, res) => {
  db.insert(req.body)
    .then(newUser => res.status(201).json(newUser))
    .catch(err => res.status(500).json({ message: "An internal error occurred. Please try again later."}))
});

router.post('/:id/posts', validateUserId(), validatePost(), (req, res) => { // this one needs work
  db.getUserPosts(req.body)
    .then(post => res.status(201).json(post))
    .catch(err => res.status(500).json({ message: "An internal error occurred. Please try again later."}))
});

router.get('/', (req, res) => {
  db.get()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json({ message: "An internal error occurred. Please try again later."}))
});

router.get('/:id', validateUserId(), (req, res) => {
  res.status(200).json(req.user)
});

router.get('/:id/posts', validateUserId(), (req, res) => {
  db.getUserPosts(req.params.id)
    .then(posts => res.status(200).json(posts))
    .catch(err => res.status(500).json({ message: "An internal error occurred. Please try again later."}))
});

router.delete('/:id', validateUserId(), (req, res) => {
  db.remove(req.params.id)
    .then(deleted => res.status(200).json({ deletedItems: deleted }))
    .catch(err => res.status(500).json({ message: "An internal error occurred. Please try again later."}))
});

router.put('/:id', validateUserId(), validateUser(), (req, res) => {
  db.update(req.params.id, req.body)
    .then(updatedUser => res.status(200).json(updatedUser))
    .catch(err => res.status(500).json({ message: "An internal error occurred. Please try again later."}))
});

//custom middleware

function validateUserId() {
  return (req, res, next) => {
    db.getById(req.params.id)
      .then(user => {
        if (user) {
          req.user = user
          next()    
        } else {
          return res.status(400).json({ message: "Invalid id" })
        }
      })
      .catch(err => res.status(500).json({ message: "Error retrieving the user. Please try again later."}))
  }
}

function validateUser() {
  return (req, res, next) => {
    if(!req.body) {
      return res.status(400).json({ message: "Missing user data." })
    } else if(!req.body.name) {
      return res.status(400).json({ message: "Missing required name field." })
    }
    next()
  }
}

function validatePost() {
  return (req, res, next) => {
    if(!req.body) {
      return res.status(400).json({ message: "Missing post data." })
    } else if(!req.body.name) {
      return res.status(400).json({ message: "Missing required text field." })
    }
    next()
  }
}

module.exports = router;
