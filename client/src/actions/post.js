import { GET_POSTS, POST_ERROR } from "./constants";
import axios from "axios";
import { setAlert } from "./alert";

//get posts
export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/posts");
    dispatch({ type: GET_POSTS, payload: res.data });
  } catch (error) {
    console.log("error :>> ", error);
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
