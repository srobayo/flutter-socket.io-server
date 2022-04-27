const Message = require("../models/message");
const getChat = async (req, res) => {
  const myId = req.uid;
  const messageFrom = req.params.de;
  const last30 = await Message.find({
    $or: [
      { de: myId, para: messageFrom },
      { de: messageFrom, para: myId },
    ],
  })
    .sort({ createAt: "desc" })
    .limit(30);
  res.json({
    ok: true,
    messages: last30,
  });
};

module.exports = {
  getChat,
};
