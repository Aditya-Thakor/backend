const sendResponse = (response) => {
  const { res, valid = true, status = 200, data = null } = response;

  return res.json({ status, valid, data });
};

module.exports = { sendResponse };
