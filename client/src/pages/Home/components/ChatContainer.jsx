import { useSelector } from "react-redux";
import NoChat from "./NoChat";
import Chat from "./Chat";
import { useEffect } from "react";
import { setMessageContact } from "../../../actions/actionUser";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ChatContainer({ socket }) {
  const contact = useSelector((state) => state.user.contact);
  const dispatch = useDispatch();
  useEffect(() => {
    socket?.on("sendMessageServer", (message) => {
      toast.info(
        <div>
          <div className="wrapper flex py-4 px-3">
            <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-gray-500">
              <img src={message.senderAvatar} alt="avatar" />
            </div>
            <div className="ml-3 grow">
              <h1 className="font-bold">{message.senderName}</h1>
              <div className="text-sm text-gray-600">
                {message.message
                  ? message.message
                  : message.image?.length
                  ? `${message.senderName} sent ${message.image?.length} ${
                      message.image?.length > 1 ? "images" : "image"
                    }`
                  : "📭"}
              </div>
            </div>
          </div>
        </div>,
        {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
      dispatch(setMessageContact(message));
    });
  }, [socket]);
  return (
    <div className="grow">
      {contact.username ? (
        <Chat
          username={contact.username}
          avatar={contact.avatar}
          socket={socket}
          id={contact.id}
        />
      ) : (
        <NoChat />
      )}
      <ToastContainer />
    </div>
  );
}
