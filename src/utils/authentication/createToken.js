const createUserToken = (user) => {
  return { username: user.username, userId: user.id, role: user.role };
};

module.exports = createUserToken;
