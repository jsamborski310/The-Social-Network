const { Thought, User } = require("../models");

module.exports = {

  // Get all users
  getUsers(req, res) {
    User.find()
      .select('-__v')
      .populate('friends')
      .populate('thoughts')
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },

  // Get single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .populate('friends')
      .populate('thoughts')
      .then((User) =>
        !User
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(User)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },

  // Update user
  updateUser(req, res) {
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
    )
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },
  
  
  // Delete a user and associated thoughts
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((User) =>      
        !User        
          ? res.status(404).json({ message: 'No user with that ID' })
          : Thought.deleteMany({ _id: { $in: User.thoughts } })
      )
      .then(() => res.json({ message: 'User and associated thoughts deleted!' }))
      .catch((err) => res.status(500).json(err));
  },

  // Create a new friend 
  createFriend(req, res) {
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $push: {
            friends: req.params.friendId,
            }              
        },
        { runValidators: true, new: true }
    )
 
      .then((friends) => res.json(friends))
      .catch((err) => res.status(500).json(err));
  },

  // Remove a friend
  removeFriend(req, res) {
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: {
            friends: req.params.friendId,
            } 
        },
        { runValidators: true, new: true }
    )
      .then((friends) => {
        if (!friends) {
          res.status(404).json({message: 'No friend found with this id'})
          return;
        }
        res.json({message: 'Successfully removed this friend.'})
      })
      .catch((err) => res.status(500).json(err));
  },

};
