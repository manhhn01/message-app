exports.createdResponse = (res, data) => {
  res.status(201).send(data);
};

exports.successResponse = (res, data) => {
  res.status(200).send(data);
};

exports.notFoundResponse = (res, err) => {
  res.status(404).send({ message: err?.message || 'Item not found.' });
};
exports.notCreatedResponse = (res, err) => {
  res.status(500).send({ message: err?.message || 'Unable to create.' });
};
exports.unauthorizedResponse = (res, err) => {
  res.status(401).send({ message: err?.message || 'Unauthorized.' });
};
exports.serverErrorResponse = (res, err) => {
  res.status(500).send({ message: err?.message || 'Server error.' });
};
