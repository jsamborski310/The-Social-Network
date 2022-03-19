// const { Thought, User } = require('../models');
const { Thought, User } = require('../models');
// const User = require('../models/User');


module.exports = {

  // get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  // get single thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thoughts)
      )
      .catch((err) => res.status(500).json(err));
  },

  // create a new thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: thought._id } },
          { runValidators: true, new: true }
        );
      })
      .then((User) =>
        !User
          ? res.status(404)
          .json({
              message: 'Thought created, but found no user with that ID',
            })
          : res.json({
            message: 'Created the thought 🎉'
          })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // update thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
    )
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => res.status(500).json(err));
  },
  

  // Delete a user and associated thoughts
  // deleteThought(req, res) {
  //   Thought.findOneAndDelete({ _id: req.params.thoughtId })
  //     .then((thought) =>
  //       !thought
  //         ? res.status(404).json({ message: 'No thought with that ID' })
  //         : Thought.deleteMany({ _id: { $in: user.thoughts } })
  //     )
  //     .then(() => res.json({ message: 'Thought deleted!' }))
  //     .catch((err) => res.status(500).json(err));
  // },

  ///////////////////////////////////

  // create a new friend
//   Add validation 'user not found', add friend username and email. 
  // createFriend(req, res) {
  //   User.findOneAndUpdate(
  //       { _id: req.params.userId },
  //       { $push: {
  //           friends: req.params.friendId,
  //           } 
  //       },
  //       { runValidators: true, new: true }
  //   )
  //     .then((friends) => res.json(friends))
  //     .catch((err) => res.status(500).json(err));
  // },

  // Remove a friend
  // removeFriend(req, res) {
  //   User.findOneAndUpdate(
  //       { _id: req.params.userId },
  //       { $pull: {
  //           friends: req.params.friendId,
  //           } 
  //       },
  //       { runValidators: true, new: true }
  //   )
  //     .then((friends) => res.json(friends))
  //     .catch((err) => res.status(500).json(err));
  // },






};
