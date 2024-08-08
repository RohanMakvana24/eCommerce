const ValidateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(502).send({
        success: false,
        message: error.message,
      });
    }

    next();
  };
  return func;
};

export default ValidateBody;
