import ChatContainer from "./components/ChatContainer";
import SideBarContact from "./components/sideBarContact";
import SideBarOperation from "./components/sideBarOperation";
import { io } from "socket.io-client";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setOnlineUsers } from "../../actions/actionUser";

export default function Home() {
  const socketRef = useRef();
  const user = useSelector((state) => state.user.user);
  const contact = useSelector((state) => state.user.contact);
  const dispatch = useDispatch();
  const [id, setId] = useState("");
  const onlineUsers = useSelector((state) => state.user.onlineUsers);
  useEffect(() => {
    socketRef.current = io(import.meta.env.VITE_URL_SERVER);

    socketRef.current.on("getId", (data) => setId(data));

    socketRef.current.emit("add-user", user);

    socketRef.current.on("all-online-users", (data) => {
      dispatch(setOnlineUsers(data));
    });

    return () => socketRef.current.disconnect();
  }, [user]);
  return (
    <div className="flex bg-gray-100 text-gray-900 scroll-smooth">
      <SideBarOperation />
      <SideBarContact contact={onlineUsers} />
      <ChatContainer socket={socketRef.current} />
    </div>
  );
}
