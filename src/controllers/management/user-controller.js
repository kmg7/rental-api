const { PrismaClient } = require('@prisma/client');
const { StatusCodes } = require('http-status-codes');
const { requestValidator: validator } = require('../../utils/validators');
const User = require('../../models/user-model');
const prisma = new PrismaClient();

const getAllUsers = async (req, res) => {
  const response = await User.getAllUsers(prisma);
  if (!response.success) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
  } else {
    res.status(StatusCodes.OK).json(response.data);
  }
};
const deleteAllUsers = async (req, res) => {
  const response = await User.deleteAllUsers(prisma);
  if (response.success) {
    res.status(StatusCodes.OK).json(response.data);
  } else {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response.error);
  }
};
const createUser = async (req, res) => {
  const validation = validator(req, true);
  if (!validation.valid) {
    res.status(StatusCodes.BAD_REQUEST).json(validation.error);
  } else {
    const response = await User.createUser(prisma, req.body.data);
    if (response.success) {
      res.status(StatusCodes.CREATED).json(response.data);
    } else {
      res.status(StatusCodes.BAD_REQUEST).json(response.error);
    }
  }
};
const getUser = async (req, res) => {
  const validation = validator(req, false);
  if (!validation.valid) {
    res.status(StatusCodes.BAD_REQUEST).json(validation.error);
  } else {
    const response = await User.getUser(prisma, req.body.id);
    if (response.success) {
      res.status(StatusCodes.OK).json(response.data);
    } else {
      res.status(StatusCodes.BAD_REQUEST).json(response.error);
    }
  }
};
const deleteUser = async (req, res) => {
  const validation = validator(req, false);
  if (!validation.valid) {
    res.status(StatusCodes.BAD_REQUEST).json(validation.error);
  } else {
    const response = await User.deleteUser(prisma, req.body.id);
    if (response.success) {
      res.status(StatusCodes.OK).json(response.data);
    } else {
      res.status(StatusCodes.BAD_REQUEST).json(response.error);
    }
  }
};
const updateUser = async (req, res) => {
  const validation = validator(req, true);
  if (!validation.valid) {
    res.status(StatusCodes.BAD_REQUEST).json(validation.error);
  } else {
    const response = await User.updateUser(prisma, req.body.id, req.body.data);
    if (response.success) {
      res.status(StatusCodes.OK).json(response.data);
    } else {
      res.status(StatusCodes.BAD_REQUEST).json(response.error);
    }
  }
};

module.exports = {
  getAllUsers,
  deleteAllUsers,
  createUser,
  getUser,
  deleteUser,
  updateUser,
};
