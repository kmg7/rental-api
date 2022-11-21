const { PrismaClient } = require('@prisma/client');
const { StatusCodes } = require('http-status-codes');

const { requestValidator: validator } = require('../../utils/validators');
const Rental = require('../../models/rental-model');
const prisma = new PrismaClient();

const getAllRentals = async (req, res) => {
  const response = await Rental.getAllRentals(prisma);
  if (response.success) {
    res.status(StatusCodes.OK).json(response.data);
  } else {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response.error);
  }
};
const deleteAllRentals = async (req, res) => {
  const response = await Rental.deleteAllRentals(prisma);
  if (response.success) {
    res.status(StatusCodes.OK).json(response.data);
  } else {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response.error);
  }
};
const createRental = async (req, res) => {
  const validation = validator(req, true);
  if (!validation.valid) {
    res.status(StatusCodes.BAD_REQUEST).json(validation.error);
  } else {
    const response = await Rental.createRental(prisma, req.body.data);
    if (response.success) {
      res.status(StatusCodes.CREATED).json(response.data);
    } else {
      res.status(StatusCodes.BAD_REQUEST).json(response.error);
    }
  }
};
const getRental = async (req, res) => {
  const validation = validator(req, false);
  if (!validation.valid) {
    res.status(StatusCodes.BAD_REQUEST).json(validation.error);
  } else {
    const response = await Rental.getRental(prisma, req.body.id);
    if (response.success) {
      res.status(StatusCodes.OK).json(response.data);
    } else {
      res.status(StatusCodes.BAD_REQUEST).json(response.error);
    }
  }
};

const deleteRental = async (req, res) => {
  const validation = validator(req, false);
  if (!validation.valid) {
    res.status(StatusCodes.BAD_REQUEST).json(validation.error);
  } else {
    const response = await Rental.deleteRental(prisma, req.body.id);
    if (response.success) {
      res.status(StatusCodes.OK).json(response.data);
    } else {
      res.status(StatusCodes.BAD_REQUEST).json(response.error);
    }
  }
};

const updateRental = async (req, res) => {
  const validation = validator(req, true);
  if (!validation.valid) {
    res.status(StatusCodes.BAD_REQUEST).json(validation.error);
  } else {
    const response = await Rental.updateRental(
      prisma,
      req.body.id,
      req.body.data
    );
    if (response.success) {
      res.status(StatusCodes.OK).json(response.data);
    } else {
      res.status(StatusCodes.BAD_REQUEST).json(response.error);
    }
  }
};

module.exports = {
  getAllRentals,
  deleteAllRentals,
  createRental,
  getRental,
  updateRental,
  deleteRental,
};
