import { useSelector } from "react-redux";
import { BsCardImage } from "react-icons/bs";
import { AiOutlineSend } from "react-icons/ai";
import { getMessage, sendMessage } from "../../../../apis/message";
import { useEffect, useState, useRef } from "react";
import { uploadImage } from "../../../../utils/ImageHandle";

export default function Chat({ username, avatar, socket, id }) {
  const [message, setMessage] = useState("");
  const [msg, setMsg] = useState([]);
  const user = useSelector((state) => state.user.user);
  const [msgLink, setMsgLink] = useState([]);
  const [image, setImage] = useState([]);
  let isSend = false;
  const chatRef = useRef(null);
  const contact = useSelector((state) => state.user.contact);
  useEffect(() => {
    socket.on("sendMessageServer", (message) => {
      setMsg((oldMessageResponse) => [...oldMessageResponse, message]);
      setTimeout(
        () => (chatRef.current.scrollTop = chatRef.current.scrollHeight),
        100
      );
    });
  }, []);

  useEffect(() => {
    let tempMsg = [];
    const fetchData = async () => {
      try {
        const res = await getMessage({ senderId: user.id, receiverId: id });
        if (res.message.length) {
          tempMsg = [...tempMsg, ...res.message];
          setMsg(tempMsg);
          setTimeout(
            () => (chatRef.current.scrollTop = chatRef.current.scrollHeight),
            800
          );
        }
      } catch (err) {
        console.log(err);
      }
    };

    setMsg([]);
    fetchData();
  }, [contact]);

  const handleChange = (e) => {
    const src = e.target.files[0];
    setImage((prevImage) => [...prevImage, src]);
    setMsgLink((prevMsgLink) => [
      ...prevMsgLink,
      { link: URL.createObjectURL(src), name: src.name },
    ]);
  };

  const removeImageLink = (e) => {
    const nameImage = e.currentTarget.getAttribute("data-image");
    setImage((prevImage) =>
      prevImage.filter((image) => image.name !== nameImage)
    );
    setMsgLink((prevMsgLink) =>
      prevMsgLink.filter((item) => item.name !== nameImage)
    );
  };

  const sendMessageHandle = async () => {
    isSend = true;
    let imageList = [];
    let msgL = {};
    let msgW = {};
    const uploadPromises = image.map((image) => uploadImage(image));

    Promise.all(uploadPromises)
      .then(async (responses) => {
        imageList = responses;
        console.log("jdfhdf", responses);
        setMsgLink([]);
        setImage([]);
      })
      .then(async () => {
        msgL = {
          receiverId: id,
          senderId: user.id,
          message: message ? message : "",
          image: imageList,
        };

        msgW = {
          receiverId: id,
          senderId: user.id,
          senderName: user.username,
          senderAvatar: user.avatar,
          message: message ? message : "",
          image: imageList,
        };

        await sendMessage(msgL);
        socket.emit("message", msgW);
        setMsg((oldMessageResponse) => [...oldMessageResponse, msgL]);
        setMessage("");
        setTimeout(
          () => (chatRef.current.scrollTop = chatRef.current.scrollHeight),
          100
        );

        isSend = false;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="bg-white h-full flex flex-col">
      <header className="h-16 border-b border-gray-200">
        <div className="wrapper flex pt-4 pl-3">
          <div className="h-10 w-10 overflow-hidden rounded-full">
            <img src={avatar} alt="avatar" />
          </div>
          <div className="ml-3 grow">
            <div className="flex justify-between">
              <h1 className="font-bold">{username}</h1>
            </div>
            <div className="text-sm text-gray-600">Active</div>
          </div>
        </div>
      </header>
      <div
        className="grow body-chat overflow-y-scroll scroll-smooth"
        id="chat"
        ref={chatRef}
      >
        <div className="p-2">
          {msg?.map((item, key) =>
            item.senderId == user.id ? (
              <div className="text-right my-1" key={key}>
                {item.message && (
                  <p
                    className={`bg-blue-500 inline-block rounded-md max-w-xs break-words py-1 px-3 text-white text-sm ${
                      item.image.length ? "mb-3" : ""
                    }`}
                  >
                    {item.message}
                  </p>
                )}
                <div className="flex rounded-md overflow-hidden justify-end flex-wrap">
                  {item.image?.map((item, key) => (
                    <img
                      src={item}
                      alt="image"
                      key={key}
                      className="w-32 mx-[1px] object-contain"
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-left my-1 flex items-start" key={key}>
                <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-100 mr-2">
                  <img src={avatar} alt="avatar" />
                </div>
                <div>
                  {item.message && (
                    <p
                      className={`bg-slate-200 inline-block rounded-md max-w-xs break-words py-1 px-3 text-sm mt-1 ${
                        item.image.length ? "mb-3" : ""
                      }`}
                    >
                      {console.log(item.image.length)}
                      {item.message}
                    </p>
                  )}
                  <div className="flex rounded-md overflow-hidden flex-wrap">
                    {item.image?.map((item, key) => (
                      <img
                        src={item}
                        alt="image"
                        key={key}
                        className="w-32 mx-[1px] object-contain"
                      />
                    ))}
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
      <div className="border-t border-gray-200">
        <div className="flex p-3">
          <div className="flex items-center">
            <div className="text-center">
              <label
                htmlFor="file"
                className="flex items-center text-xl text-blue-600 mr-3"
              >
                <BsCardImage />
              </label>
              <input
                type="file"
                id="file"
                className="hidden"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="grow relative">
            {msgLink.length ? (
              <div className="image-container absolute bottom-9 bg-gray-200 w-full overflow-x-scroll h-20">
                <div className="p-1 flex h-full items-center">
                  {msgLink?.map((item, key) => (
                    <div className="mx-2 relative">
                      <div
                        className="absolute bg-white border-2 border-black rounded-full -top-3 -right-3"
                        onClick={removeImageLink}
                        data-image={item.name}
                      >
                        <div className="px-[6px]">
                          <i
                            data-visualcompletion="css-img"
                            style={{
                              backgroundImage:
                                'url("https://static.xx.fbcdn.net/rsrc.php/v3/yH/r/MEfKwVlpRiL.png")',
                              backgroundPosition: "-108px -172px",
                              backgroundSize: "190px 204px",
                              width: "12px",
                              height: "12px",
                              backgroundRepeat: "no-repeat",
                              display: "inline-block",
                            }}
                          />
                        </div>
                      </div>
                      <div className="h-10 w-10 overflow-hidden">
                        <img src={item.link} alt={item.name} key={key} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              ""
            )}
            <input
              type="text"
              className="w-full py-1 px-4 border-none bg-slate-200 rounded-full"
              placeholder="Aa"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <div className="flex items-center">
            <button
              onClick={sendMessageHandle}
              disabled={isSend}
              className="ml-3 bg-blue-500 hover:bg-blue-600 rounded-full text-lg p-1"
            >
              <AiOutlineSend className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
