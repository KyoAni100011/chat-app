import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAvatar } from "../../apis/user";
import { setUser } from "../actions/actionUser";
import { useNavigate } from "react-router-dom";
import LoadingIcon from "../assets/LoadingIcon";

export default function setAvatarComponent() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const src = e.target.files[0];
    const img = document.querySelector("#avatar");
    setImage(src);
    img.src = URL.createObjectURL(src);
  };

  const uploadImage = async () => {
    setLoading(true);
    await setAvatar(image, user.id)
      .then((res) => {
        dispatch(setUser(res.user));
        setLoading(false);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="mt-20">
        <div>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/chat-app-9da91.appspot.com/o/avatar%2Fe00d331f-4557-46e0-81be-7f7b242dd447?alt=media&token=ac90b734-a176-4f2f-9c11-66f3b8d79887"
            alt="avatar"
            id="avatar"
            className="h-80 w-80 mx-auto rounded-full"
          />
        </div>
        <div className="text-center mt-10">
          <label htmlFor="file" className="custom-input">
            Upload image
          </label>
          <input
            type="file"
            id="file"
            className="hidden"
            onChange={handleChange}
          />
          <button onClick={uploadImage} className="custom-input ml-3">
            {isLoading ? <LoadingIcon /> : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
