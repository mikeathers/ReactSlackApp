import * as actionTypes from "./types";

// User Actions
export const setUser = user => ({
  type: actionTypes.SET_USER,
  currentUser: user
});

export const clearUser = () => ({
  type: actionTypes.CLEAR_USER
});

// Channel Actions
export const setCurrentChannel = channel => ({
  type: actionTypes.SET_CURRENT_CHANNEL,
  channel
});

export const setPrivateChannel = isPrivateChannel => ({
  type: actionTypes.SET_PRIVATE_CHANNEL,
  isPrivateChannel
});

export const setUserPosts = userPosts => ({
  type: actionTypes.SET_USER_POSTS,
  userPosts
});

// Colour Actions

export const setColours = (primaryColour, secondaryColour) => ({
  type: actionTypes.SET_COLOURS,
  payload: {
    primaryColour,
    secondaryColour
  }
});
