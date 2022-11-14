import { csrfFetch } from "./csrf";

const LOAD_USER = "/users/LOAD_USER";
const LOAD_CURRENT_USER = "/users/LOAD_CURRENT_USER";
const LOAD_USER_LIST = "/users/LOAD_USER_LIST";
const FOLLOW_USER = "/users/FOLLOW_USER";
const UNFOLLOW_USER = "/users/UNFOLLOW_USER";
const LOAD_USER_FOLLOWERS = "/users/LOAD_USER_FOLLOWERS";
const LOAD_USER_FOLLOWINGS = "/user/LOAD_USER_FOLLOWINGS";
const PAGINATE_FOLLOWERS = "/user/PAGINATE_FOLLOWERS";
const PAGINATE_FOLLOWING = "/users/PAGINATE_FOLLOWING";
//actions
const loadUser = (user) => {
  return {
    type: LOAD_USER,
    user,
  };
};

const loadCurrentUser = (user) => {
  return {
    type: LOAD_CURRENT_USER,
    user,
  };
};

const loadUserList = (users) => {
  return {
    type: LOAD_USER_LIST,
    users,
  };
};

const loadUserFollowers = (followers) => {
  return {
    type: LOAD_USER_FOLLOWERS,
    followers,
  };
};

const paginateFollowers = (newFollowers) => {
  return {
    type: PAGINATE_FOLLOWERS,
    newFollowers,
  };
};

const paginateFollowing = (newFollowing) => {
  return {
    type: PAGINATE_FOLLOWING,
    newFollowing,
  };
};
// const followUser = (userToFollow) => {
//   return {
//     type: FOLLOW_USER,
//     userToFollow,
//   };
// };

const loadUserFollowings = (followings) => {
  return {
    type: LOAD_USER_FOLLOWINGS,
    followings,
  };
};

export const getUser = (userId) => async (dispatch) => {
  const res = await csrfFetch(`/api/users/${userId}`);
  if (res.ok) {
    const user = await (await res).json();
    dispatch(loadUser(user));
    return user;
  }
};

export const getCurrentUser = () => async (dispatch) => {
  const res = await csrfFetch(`/api/users/profile`);
  if (res.ok) {
    const user = await res.json();
    dispatch(loadCurrentUser(user));
    return user;
  }
};

export const getUserList = () => async (dispatch) => {
  const res = await csrfFetch(`/api/users`);
  if (res.ok) {
    const users = await res.json();
    dispatch(loadUserList(users));
    return users;
  }
};

export const getUserfollowers =
  (userId, page = null, size = null) =>
  async (dispatch) => {
    let query = "";
    if (page) {
      query += `page=${page}`;
    }
    if (size) {
      query += `&size=${size}`;
    }
    const resp = await csrfFetch(`/api/users/${userId}/followers?${query}`);
    if (resp.ok) {
      const followers = await resp.json();
      if (page > 1) dispatch(paginateFollowers(followers));
      else dispatch(loadUserFollowers(followers));
      return followers;
    }
  };

export const followThunk = (userFollowedId) => async (dispatch) => {
  const resp = await csrfFetch(`/api/users/${userFollowedId}/followers`, {
    method: "POST",
  });
  if (resp.ok) {
    return;
  }
};

export const unfollowThunk = (userUnfollowedId) => async (dispatch) => {
  const resp = await csrfFetch(`/api/users/${userUnfollowedId}/followers`, {
    method: "DELETE",
  });
  if (resp.ok) {
    return;
  }
};

export const loadFollowings =
  (userId, page = null, size = null) =>
  async (dispatch) => {
    let query = "";
    if (page) {
      query += `page=${page}`;
    }
    if (size) {
      query += `&size=${size}`;
    }
    const resp = await csrfFetch(`/api/users/${userId}/following?${query}`);
    console.log("RESP ", resp);
    if (resp.ok) {
      const followings = await resp.json();
      if (page > 1) dispatch(paginateFollowing(followings));
      else dispatch(loadUserFollowings(followings));
      return followings;
    }
  };

let initialState = {
  singleUser: {},
  userList: {},
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USER:
      const userState = { ...state, singleUser: { ...action.user } };
      return userState;
    case LOAD_CURRENT_USER:
      const currentUserState = { ...state, singleUser: { ...action.user } };
      return currentUserState;
    case LOAD_USER_LIST:
      const userListState = { ...state, userList: { ...action.users } };
    case LOAD_USER_FOLLOWERS:
      const userFollowerState = {
        ...state,
        userList: { ...state.userList, ...action.followers },
      };

      return userFollowerState;
    case LOAD_USER_FOLLOWINGS:
      const serFollowingsState = {
        ...state,
        userList: { ...action.followings },
      };
      return serFollowingsState;
    case PAGINATE_FOLLOWERS:
      const paginateFollowersState = {
        ...state,
        userList: {
          ...state.userList,
          Followers: [
            ...state.userList.Followers,
            ...action.newFollowers.Followers,
          ],
        },
      };

      return paginateFollowersState;

    case PAGINATE_FOLLOWING:
      const paginateFollowings = {
        ...state,
        userList: {
          ...state.userList,
          Following: [
            ...state.userList.Followings,
            ...action.newFollowing.Followings,
          ],
        },
      };
      return paginateFollowings;
    default:
      return state;
  }
};
