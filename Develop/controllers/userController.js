const { user, thought } = require('../models');

module.exports = {
  // Get all courses
  getUsers(req, res) {
    user.find()
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // Get a course
  getSingleUser(req, res) {
    user.findOne({ _id: req.params.userId })
    .
    populate('friends')
    .populate('thoughts')
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a course
  createUser(req, res) {
    user.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Delete a course
  deleteUser(req, res) {
    user.findOneAndRemove({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : thought.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() => res.json({ message: 'user and thoughts deleted!' }))
      .catch((err) => res.status(500).json(err.message));
  },
  // Update a course
  updateUser(req, res) {
    user.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
createFriend(req, res) {{
  user.findOneAndUpdate(  
    { _id: req.params.userId },
    { $push: {friends: req.params.friendId} },
    { runValidators: true, new: true })
    .then((user) => res.json(user))
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
}},
deleteFriend(req, res) {
  user.findOneAndUpdate( 
    { _id: req.params.userId },
    { $pull: {friends: req.params.friendId} },
    { runValidators: true, new: true })
    .then((user) =>
      !user
        ? res.status(404).json({ message: 'No user with that ID' })
        : res.json(user)
    )
    .then(() => res.json({ message: 'friend deleted!' }))
    .catch((err) => res.status(500).json(err));
},
}
