const { Thought, User } = require("../models");

module.exports = {
  // Get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .select("-__v")
      .populate("reactions")
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  // Get single thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .populate("reactions")
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json(thoughts)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Create a new thought
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
          ? res.status(404).json({
              message: "Thought created, but found no user with that ID",
            })
          : res.json({
              message: "Created the thought 🎉",
            })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Update thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => res.status(500).json(err));
  },

  // Delete thoughts
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with this id!" })
          : User.findOneAndUpdate(
              // { thoughts: req.params.thoughtId },
              { username: thought.username },
              { $pull: { thoughts: req.params.thoughtId } },
              { new: true }
            )
      )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: "Thought deleted but no user with this id!" })
          : res.json({ message: "Thought successfully deleted!" })
      )
      .catch((err) => res.status(500).json(err));
  },

  // Add a reaction
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      {
        $push: {
          reactions: req.body,
        },
      },
      { runValidators: true, new: true }
    )
      .then((reaction) => res.json(reaction))
      .catch((err) => res.status(500).json(err));
  },

  // Remove a reaction
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      {
        $pull: {
          reactions: {
            reactionId: req.params.reactionId,
          },
        },
      },
      { runValidators: true, new: true }
    )
      .then((reaction) => {
        if (!reaction) {
          res.status(404).json({ message: 'No reaction found with this id' })
          return;
        }
      
      res.json({message: 'Successfully deleted the reaction'})
      })
      .catch((err) => res.status(500).json(err));
  },
};
