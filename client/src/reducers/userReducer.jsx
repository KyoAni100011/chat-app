import * as actionUserType from "../actions/actionUserType";

const initialState = {
  contact: {},
  user: {},
  onlineUsers: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionUserType.SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case actionUserType.GET_CURRENT_CONTACT:
      console.log(action.payload);
      return {
        ...state,
        contact: action.payload,
      };
    case actionUserType.SET_ONLINE_USERS:
      return {
        ...state,
        onlineUsers: action.payload,
      };
    case actionUserType.SET_MESSAGE_CONTACT:
      return {
        ...state,
        onlineUsers: state.onlineUsers.map((contact) => {
          if (contact.id === action.payload.senderId) {
            return {
              ...contact,
              message: action.payload.message,
            };
          } else {
            return contact;
          }
        }),
      };
    default:
      return state;
  }
};

export { userReducer };
