import { combineReducers } from "redux";
import * as actionTypes from "../actions/types";

const defaultUserState = {
  currentUser: null,
  isLoading: true
};

const userReducer = (state = defaultUserState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        currentUser: action.currentUser,
        isLoading: false
      };
    case actionTypes.CLEAR_USER:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};

const defaultChannelState = {
  currentChannel: null,
  isPrivateChannel: false,
  userPosts: null
};

const channelReducer = (state = defaultChannelState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_CHANNEL:
      return {
        ...state,
        currentChannel: action.channel
      };
    case actionTypes.SET_PRIVATE_CHANNEL:
      return {
        ...state,
        isPrivateChannel: action.isPrivateChannel
      };
    case actionTypes.SET_USER_POSTS:
      return {
        ...state,
        userPosts: action.userPosts
      };
    default:
      return state;
  }
};
const defaultColourState = {
  primaryColour: "#4c3c4c",
  secondaryColour: "#eee"
};
const colourReducer = (state = defaultColourState, action) => {
  switch (action.type) {
    case actionTypes.SET_COLOURS:
      return {
        primaryColour: action.payload.primaryColour,
        secondaryColour: action.payload.secondaryColour
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  user: userReducer,
  channel: channelReducer,
  colours: colourReducer
});

export default rootReducer;
