const express = require('express');
const router = express.Router();
const {
  getAllAvailableRentals, //get
  getRental, //get
  rentRental, //post
  returnRental, //put
} = require('../controllers/rent-controller');

router.route('/rentals').get(getAllAvailableRentals);
router.route('/rental').get(getRental).post(rentRental).put(returnRental);
module.exports = router;
