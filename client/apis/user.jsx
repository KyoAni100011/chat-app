import { instance } from "./config";
import { user } from "./routerAPI";
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase/config";

const loginHandle = async (data) => {
  try {
    const response = await instance.post(`${user}/login`, data);
    return response.data;
  } catch (err) {
    throw err.response.data.msg;
  }
};

const registerHandle = async (data) => {
  try {
    const response = await instance.post(`${user}/register`, data);
    return response.data;
  } catch (err) {
    throw err.response.data.msg;
  }
};

const setAvatar = async (image, id) => {
  try {
    let linkImage;
    const idImg = uuidv4();
    const storageRef = ref(storage, `avatar/${idImg}`);

    await uploadBytes(storageRef, image)
      .then(async () => {
        await getDownloadURL(storageRef)
          .then((url) => (linkImage = url))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
    const response = await instance.put(`${user}/set-avatar`, {
      linkImage,
      id,
    });
    return response.data;
  } catch (err) {
    console.log(err);
    throw err.response.data.msg;
  }
};

export { loginHandle, registerHandle, setAvatar };
