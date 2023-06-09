const sendResponse = (response) => {
  const { res, valid = true, status = 200, data = null } = response;
  console.log(data);
  return res.json({ status, valid, data });
};

module.exports = { sendResponse };
