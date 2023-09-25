import { useDispatch } from "react-redux";
import { setCurrentContact } from "../../../actions/actionUser";

export default function CardContact({ avatar, username, id, message, image }) {
  const dispatch = useDispatch();

  const addContact = () => {
    dispatch(
      setCurrentContact({
        username: username,
        avatar: avatar,
        id: id,
      })
    );
  };
  return (
    <div className="hover:bg-gray-200" onClick={addContact}>
      <div className="wrapper flex py-4 px-3">
        <div className="h-10 w-10 overflow-hidden rounded-full">
          <img src={avatar} alt="avatar" />
        </div>
        <div className="ml-3 grow">
          <div className="flex justify-between">
            <h1 className="font-bold">{username}</h1>
            <p className="text-sm text-gray-600">2:32 AM</p>
          </div>
          <div className="text-sm text-gray-600 truncate w-56">
            {message
              ? message
              : image?.length
              ? `${username} sent ${image?.length} ${
                  image?.length > 1 ? "images" : "image"
                }`
              : "📭"}
          </div>
        </div>
      </div>
    </div>
  );
}
