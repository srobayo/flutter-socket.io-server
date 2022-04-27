const User = require("../models/user");
const Message = require("../models/message");

const userConnected = async (uid = "") => {
  const user = await User.findById(uid);
  user.online = true;
  await user.save();
  return user;
};

const userDesconnected = async (uid = "") => {
  const user = await User.findById(uid);
  user.online = false;
  await user.save();
  return user;
};

const saveMessage = async (paylod) => {
  /*
   * payload: {
   *    de: '',
   *    para: '',
   *    texto: ''
   *   }
   * */
  try {
    const message = new Message(paylod);
    await message.save();
    return true;
  } catch (error) {
    return false;
  }
};

module.exports = {
  userConnected,
  userDesconnected,
  saveMessage,
};
