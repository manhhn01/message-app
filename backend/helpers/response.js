exports.createdResponse = (res, data) => {
  res.status(201).json(data);
};

exports.successResponse = (res, data) => {
  res.status(200).json(data);
};

exports.notFoundResponse = (res, err) => {
  res.status(404).json({ message: err?.message || 'Item not found.' });
};
exports.notCreatedResponse = (res, err) => {
  res.status(500).json({ message: err?.message || 'Unable to create.' });
};
exports.unauthorizedResponse = (res, err) => {
  res.status(401).json({ message: err?.message || 'Unauthorized.' });
};
exports.serverErrorResponse = (res, err) => {
  res.status(500).json({ message: err?.message || 'Server error.' });
};
