import { instance } from "./config";
import { message } from "./routerAPI";

const sendMessage = (msg) => {
  try {
    const response = instance.post(`${message}/send-message`, msg);
    return response.msg;
  } catch (error) {
    throw err.response.data.msg;
  }
};

const getMessage = async (msg) => {
  try {
    const response = await instance.get(`${message}/get-message`, {
      params: msg,
    });
    return response.data;
  } catch (error) {
    throw err.response.data.msg;
  }
};

export { sendMessage, getMessage };
