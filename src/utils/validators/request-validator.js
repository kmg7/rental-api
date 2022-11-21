const body = (req, containsData) => {
  if (Object.keys(req.body).length !== 0) {
    console.log(containsData);
    if (containsData) {
      if (!req.body.data) {
        return {
          valid: false,
          error: {
            message: 'Request body must contain data and provided as JSON',
          },
        };
      }
    }
    return {
      valid: true,
    };
  } else {
    return {
      valid: false,
      error: { message: 'Request body must be provided as JSON' },
    };
  }
};

module.exports = body;
