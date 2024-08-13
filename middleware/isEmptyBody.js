const isEmptyBody = (req, res, next) => {
  const { length } = Object.keys(req.body);
  if (!length) {
    return res.status(502).send({
      success: false,
      message: "Body must be fields",
    });
  }
  next();
};

export default isEmptyBody;
