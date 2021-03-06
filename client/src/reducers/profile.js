import {
  PROFILE_ERROR,
  CLEAR_PROFILE,
  GET_PROFILE,
  UPDATE_PROFILE,
  GET_REPOS,
  GET_PROFILES,
} from "../actions/constants";

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        loading: false,
        profile: payload,
      };
    case GET_PROFILES:
      return {
        ...state,
        loading: false,
        profiles: payload,
      };
    case UPDATE_PROFILE:
      return {
        ...state,
        loading: false,
        profile: payload,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        profile: null,
      };

    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        loading: false,
      };
    case GET_REPOS:
      return {
        ...state,
        loading: false,
        repos: payload,
      };

    default:
      return {
        ...state,
      };
  }
}
