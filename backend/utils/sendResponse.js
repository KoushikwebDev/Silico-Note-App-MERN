const sendResponse = (res, value) => {
  res.status(200).json({
    success: true,
    value,
  });
};

export default sendResponse;
