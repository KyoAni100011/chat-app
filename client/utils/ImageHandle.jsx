import { storage } from "../firebase/config";
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const uploadImage = async (image) => {
  try {
    let linkImage;
    const idImg = uuidv4();
    const storageRef = ref(storage, `message-image/${idImg}`);

    await uploadBytes(storageRef, image)
      .then(async () => {
        await getDownloadURL(storageRef)
          .then((url) => (linkImage = url))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));

    return linkImage;
  } catch (err) {
    console.log(err);
    throw err.response.data.msg;
  }
};

export { uploadImage };
