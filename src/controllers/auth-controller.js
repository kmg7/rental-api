const { PrismaClient } = require('@prisma/client');
const { StatusCodes } = require('http-status-codes');
const { createToken, createUserToken } = require('../utils/authentication');
const User = require('../models/user-model');
const { requestValidator: validator } = require('../utils/validators');

const prisma = new PrismaClient();

const register = async (req, res) => {
  const validation = validator(req, true);
  if (!validation.valid) {
    res.status(StatusCodes.BAD_REQUEST).json(validation.error);
  } else {
    const response = await User.createUser(prisma, req.body.data);
    if (response.success) {
      const token = createToken({ payload: createUserToken(response.data) });
      res.status(StatusCodes.CREATED).json({
        data: response.data,
        token: token,
      });
    } else {
      res.status(StatusCodes.BAD_REQUEST).json(response.error);
    }
  }
};
const login = async (req, res) => {
  const validation = validator(req, true);
  if (!validation.valid) {
    res.status(StatusCodes.BAD_REQUEST).json(validation.error);
  } else {
    const response = await User.verify(prisma, req.body.data);
    if (response.success) {
      const token = createToken({ payload: createUserToken(response.data) });
      res.status(StatusCodes.OK).json({
        token: token,
      });
    } else {
      res.status(StatusCodes.UNAUTHORIZED).json(response);
    }
  }
};
module.exports = {
  register,
  login,
};
