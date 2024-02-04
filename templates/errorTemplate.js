const errorTemplate = (res, err, msg) => {
  return res.status(500).json({
    message: msg ?? err.message ?? 'Generic API Error',
    error: err,
  });
};

module.exports = { errorTemplate };
