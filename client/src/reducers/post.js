import { GET_POSTS, POST_ERROR, UPDATE_LIKES } from "../actions/constants";
const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

export default function post(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        post: null,
      };
    case UPDATE_LIKES:
      return {
        ...state,
        loading: false,
        posts: state.post.map((post) =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
      };

    default:
      return {
        ...state,
      };
      break;
  }
}
