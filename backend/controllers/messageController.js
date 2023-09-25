import { Message } from "../models/messageModel.js";
import sha256 from "sha256";

const sendMessage = async (req, res) => {
  try {
    const message = req.body;

    message.chatId = sha256(
      (message.senderId + message.receiverId).split("").sort().join("")
    );
    const newMessage = new Message(message);
    await newMessage.save();
    res.status(200).json({ msg: "Send message successfully" });
  } catch (error) {
    res.status(404).json({ msg: "Error sending message" });
  }
};

const getMessageByUserId = async (req, res) => {
  try {
    const { senderId, receiverId } = req.query;
    let chatId = sha256((senderId + receiverId).split("").sort().join(""));
    const message = await Message.find({ chatId: chatId });
    const selectedFiledMessage = message.map((item) => ({
      senderId: item.senderId,
      receiverId: item.receiverId,
      message: item.message,
      image: item.image,
    }));

    res.status(200).json({ message: selectedFiledMessage });
  } catch (error) {
    res.status(404).json({ msg: "Error geting message" });
  }
};

const getLatestMessageOnlineUser = async (senderId, listOnlineUser) => {
  try {
    const newestMessages = await Promise.all(
      listOnlineUser.map(async (item) => {
        let chatId = sha256((senderId + item.id).split("").sort().join(""));
        const message = await Message.findOne({ chatId: chatId }).sort({
          createdAt: -1,
        });
        const selectedFiledMessage = {
          message: message?.message,
          image: message?.image,
        };
        const result = { ...item, ...selectedFiledMessage };
        return result;
      })
    );

    return newestMessages;
  } catch (error) {
    return error;
  }
};

export { sendMessage, getMessageByUserId, getLatestMessageOnlineUser };
