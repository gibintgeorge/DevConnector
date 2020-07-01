import { combineReducers } from "redux";
import alert from "./alert";
import profile from "./profile";
import auth from "./auth";

export default combineReducers({
  alert,
  auth,
  profile,
  //   auth,
  //   profile,
  //   post,
});
