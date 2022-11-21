const { isEmail, isUUID } = require('validator');
const input = '';
const id = (input) => {
  if (!input || !isString(input)) {
    return false;
  } else {
    return isUUID(input, 4);
  }
};
const email = (input) => {
  if (!input || !isString(input)) {
    return false;
  } else {
    return isEmail(input);
  }
};
const username = (input) => {
  if (!input || !isString(input)) {
    return false;
  } else {
    const re = new RegExp('^(?!.*\\.\\.)(?!.*\\.$)[^\\W][\\w.]{0,20}$');
    return re.test(input);
  }
};
const password = (input) => {
  if (!input || !isString(input)) {
    return false;
  } else {
    const re = new RegExp(
      '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$'
    );
    return re.test(input);
  }
};
const user = (user) => {
  try {
    if (!username(user.username)) {
      return { valid: false, message: 'Username is not valid' };
    }
    if (!email(user.email)) {
      return { valid: false, message: 'Email is not valid' };
    }
    if (!password(user.password)) {
      return { valid: false, message: 'Password is not valid' };
    }
    return { valid: true };
  } catch (error) {
    console.log(error);
  }
};
const emailPassword = (user) => {
  try {
    if (!email(user.email)) {
      return { valid: false, message: 'Email is not valid' };
    }
    if (!password(user.password)) {
      return { valid: false, message: 'Password is not valid' };
    }
    return { valid: true };
  } catch (error) {
    console.log(error);
  }
};
function isString(input) {
  return (
    typeof input === 'string' &&
    Object.prototype.toString.call(input) === '[object String]'
  );
}
module.exports = { user, id, emailPassword };
