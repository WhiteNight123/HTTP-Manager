module.exports = (validator) => {
  return (req, res, next) => {
    const { error, value } = validator(req.body);
    if (error) {
      return res.status(400).json({
        code: 400,
        value: error._original,
        msg: error.details[0].message,
      });
    }
    req.validValue = value;
    next();
  };
};
