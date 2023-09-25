import * as actionUserType from "./actionUserType";

const setUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));

  return {
    type: actionUserType.SET_USER,
    payload: user,
  };
};

const setCurrentContact = (contact) => {
  return {
    type: actionUserType.GET_CURRENT_CONTACT,
    payload: contact,
  };
};

const setMessageContact = (msg) => {
  return {
    type: actionUserType.SET_MESSAGE_CONTACT,
    payload: msg,
  };
};

const setOnlineUsers = (users) => {
  return {
    type: actionUserType.SET_ONLINE_USERS,
    payload: users,
  };
};

export { setUser, setCurrentContact, setMessageContact, setOnlineUsers };
