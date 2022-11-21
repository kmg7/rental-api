const { PrismaClient } = require('@prisma/client');
const { StatusCodes } = require('http-status-codes');

const { requestValidator: validator } = require('../utils/validators');
const Rental = require('../models/rental-model');
const prisma = new PrismaClient();

//bakın, kirala(fatura kesilir), geri teslim et
const getAllAvailableRentals = async (req, res) => {
  const response = await Rental.lookUpRentals(
    prisma,
    req.body.filter,
    req.body.sort
  );
  if (response.success) {
    res.status(StatusCodes.OK).json(response.data);
  } else {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response.error);
  }
};

const getRental = async (req, res) => {
  const validation = validator(req, false);
  if (!validation.valid) {
    res.status(StatusCodes.BAD_REQUEST).json(validation.error);
  } else {
    const response = await Rental.lookUpRental(prisma, req.body.id);
    if (response.success) {
      res.status(StatusCodes.OK).json(response.data);
    } else {
      res.status(StatusCodes.BAD_REQUEST).json(response.error);
    }
  }
};

const rentRental = async (req, res) => {
  const validation = validator(req, false);
  if (!validation.valid) {
    res.status(StatusCodes.BAD_REQUEST).json(validation.error);
  } else {
    const response = await Rental.rentRental(
      prisma,
      req.body.id,
      req.user.userId
    );
    if (response.success) {
      res.status(StatusCodes.OK).json(response.data);
    } else {
      res.status(StatusCodes.BAD_REQUEST).json(response.error);
    }
  }
};
const returnRental = async (req, res) => {
  const validation = validator(req, false);
  if (!validation.valid) {
    res.status(StatusCodes.BAD_REQUEST).json(validation.error);
  } else {
    const response = await Rental.returnRental(
      prisma,
      req.body.id,
      req.user.userId
    );
    if (response.success) {
      res.status(StatusCodes.OK).json(response.data);
    } else {
      res.status(StatusCodes.BAD_REQUEST).json(response.error);
    }
  }
};

module.exports = {
  getAllAvailableRentals, //get
  getRental, //get
  rentRental, //post
  returnRental, //put
};
