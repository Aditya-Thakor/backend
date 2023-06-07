const sendResponse = (res, valid, status, data) => {
  res.json({ valid, status, data });
};

module.exports = { sendResponse };
