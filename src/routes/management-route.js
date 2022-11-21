const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  deleteAllUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
} = require('../controllers/management/user-controller');
const {
  getAllRentals,
  deleteAllRentals,
  createRental,
  getRental,
  updateRental,
  deleteRental,
} = require('../controllers/management/rental-controller');

//users
router.route('/users').get(getAllUsers).delete(deleteAllUsers);
router
  .route('/users/id')
  .get(getUser)
  .put(updateUser)
  .post(createUser)
  .delete(deleteUser);

//rentals
router.route('/rentals').get(getAllRentals).delete(deleteAllRentals);
router
  .route('/rentals/id')
  .get(getRental)
  .post(createRental)
  .delete(deleteRental)
  .put(updateRental);
module.exports = router;
