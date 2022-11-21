const { userValidator: validator } = require('../utils/validators');
class Model {
  constructor(params) {
    this.id = params.id;
    this.username = params.username;
    this.password = params.password;
    this.email = params.email;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
    this.rentals = params.rentals;
  }
}

const getAllUsers = async (prismaClient) => {
  try {
    const users = await prismaClient.user.findMany();
    return {
      success: true,
      data: users,
    };
  } catch (error) {
    return {
      success: false,
      error: { message: error.message },
    };
  }
};
const deleteAllUsers = async (prismaClient) => {
  try {
    const users = await prismaClient.user.deleteMany();
    return {
      success: true,
      data: users,
    };
  } catch (error) {
    return {
      success: false,
      error: { message: error.message },
    };
  }
};
const createUser = async (prismaClient, data) => {
  const validation = validator.user(data);
  if (!validation.valid) {
    return {
      success: false,
      error: { message: validation.message },
    };
  }
  const regControl = await registerControl(
    prismaClient,
    data.username,
    data.email
  );
  if (regControl.isRegistered) {
    return {
      success: false,
      error: { message: regControl.message },
    };
  }
  try {
    const response = await prismaClient.user.create({
      data: data,
    });
    return {
      success: true,
      data: response,
    };
  } catch (error) {
    return {
      success: false,
      error: { message: error.message },
    };
  }
};
const getUser = async (prismaClient, id) => {
  if (!validator.id(id)) {
    return {
      success: false,
      error: { message: 'Id must be valid' },
    };
  }
  try {
    const response = await prismaClient.user.findUniqueOrThrow({
      where: { id: id },
    });
    return {
      success: true,
      data: response,
    };
  } catch (error) {
    return {
      success: false,
      error: { message: error.message },
    };
  }
};
const updateUser = async (prismaClient, id, data) => {
  const control = await updateControl(prismaClient, id, data);
  if (control.inconvience) {
    return {
      success: false,
      error: { message: control.message },
    };
  }
  try {
    const response = await prismaClient.user.update({
      where: { id: id },
      data: data,
    });
    return {
      success: true,
      data: response,
    };
  } catch (error) {
    return {
      success: false,
      error: { message: error.message },
    };
  }
};
const deleteUser = async (prismaClient, id) => {
  if (!validator.id(id)) {
    return {
      success: false,
      error: { message: 'Id must be valid' },
    };
  }
  try {
    const user = await prismaClient.user.findUnique({
      where: { id: id },
    });
    if (!user) {
      return {
        success: true,
        error: { message: 'No User with given id' },
      };
    }
    const response = await prismaClient.user.delete({
      where: { id: id },
    });
    return {
      success: true,
      data: response,
    };
  } catch (error) {
    return {
      success: false,
      error: { message: error.message },
    };
  }
};
const registerControl = async (prismaClient, username, email) => {
  const userwUsername = await prismaClient.user.findUnique({
    where: { username: username },
  });
  if (userwUsername) {
    return { isRegistered: true, message: 'Username has been taken' };
  }
  const userwEmail = await prismaClient.user.findUnique({
    where: { email: email },
  });
  if (userwEmail) {
    return { isRegistered: true, message: 'Email has been taken' };
  }
  return { isRegistered: false };
};
const updateControl = async (prismaClient, id, data) => {
  if (!validator.id(id)) {
    return {
      inconvience: true,
      message: 'Id must be valid',
    };
  }
  const validation = validator.user(data);
  if (!validation.valid) {
    return {
      inconvience: true,
      message: validation.message,
    };
  }
  const user = await prismaClient.user.findUnique({ where: { id: id } });
  if (!user) {
    return {
      inconvience: true,
      message: 'No User with given id',
    };
  }

  if (!(user.password === data.password)) {
    return {
      inconvience: true,
      message: `Passwords mismatch.`,
    };
  }
  const userwUsername = await prismaClient.user.findUnique({
    where: { username: data.username },
  });
  if (userwUsername) {
    if (!(userwUsername.id === user.id)) {
      return { inconvience: true, message: 'Username has been taken' };
    }
  }
  const userwEmail = await prismaClient.user.findUnique({
    where: { email: data.email },
  });
  if (userwEmail) {
    if (!(userwEmail.id === user.id)) {
      return { inconvience: true, message: 'Email has been taken' };
    }
  }
  return { inconvience: false };
};
const verify = async (prismaClient, data) => {
  const validation = validator.emailPassword(data);
  if (!validation.valid) {
    return {
      success: false,
      error: { message: validation.message },
    };
  }
  const user = await prismaClient.user.findUnique({
    where: { email: data.email },
  });
  if (!user) {
    return {
      success: false,
      error: { message: 'There is no user with given credentinals' },
    };
  }
  if (user.password == data.password) {
    return {
      success: true,
      data: user,
    };
  } else {
    return {
      success: false,
      error: { message: `Password or email wrong` },
    };
  }
};

module.exports = {
  Model,
  verify,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  getAllUsers,
  deleteAllUsers,
};
