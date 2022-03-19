const router = require('express').Router();

const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    // deleteUser,
    // createFriend,
    // removeFriend
  } = require('../../controllers/thoughtsController');
  
  // /api/thoughts
  router
      .route('/')
      .get(getThoughts)
      .post(createThought);
  
  // /api/thoughts/:thoughtId
  router
      .route('/:thoughtId')
      .get(getSingleThought)
      .put(updateThought)
    //   .delete(deleteThought);
  
//   router
//     .route('/:userId/thoughts/:thoughtId')
//     .post(createThought)
//     .delete(removeThought);
  
  module.exports = router;
  