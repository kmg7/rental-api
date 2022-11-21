const { validateToken } = require('../utils/authentication/jwt');
const { StatusCodes } = require('http-status-codes');
const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      error: {
        message: 'Request not permitted',
      },
    });
  } else {
    const token = authHeader.split(' ')[1];
    try {
      const { username, role, exp, userId } = validateToken({ token: token });
      req.user = { username, role, exp, userId };
      next();
    } catch (error) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        tokenError: {
          message: 'Warning! Unauthorized to access this route',
        },
      });
    }
  }
};
const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        tokenError: {
          message: 'Warning! Unauthorized to access this route',
        },
      });
    } else {
      next();
    }
  };
};

module.exports = {
  authenticateUser,
  authorizePermissions,
};
