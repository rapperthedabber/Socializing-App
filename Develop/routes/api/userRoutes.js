const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser,
  createFriend,
  deleteFriend
} = require('../../controllers/userController');

// /api/user
router.route('/').get(getUsers).post(createUser);

// /api/students/:studentId
router.route('/:userId').get(getSingleUser).delete(deleteUser).put(updateUser)

// /api/students/:studentId/assignments
router.route('/:userId/friends/:friendId').post(createFriend).delete(deleteFriend)

// /api/students/:studentId/assignments/:assignmentId

module.exports = router;
