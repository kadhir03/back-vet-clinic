// src/utils/errorHandler.js

const errorHandler = (error, res) => {

  console.error('Error:', error.message);
  res.status(error.status || 500).json({ message: error.message });
};

module.exports = { errorHandler };
