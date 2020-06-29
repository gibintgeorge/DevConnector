import { SET_ALERT, REMOVE_ALERT } from "./constants";
import { v4 as uuid } from "uuid";
export const setAlert = (msg, alertType, timeout = 3000) => (despatch) => {
  const id = uuid();
  despatch({
    type: SET_ALERT,
    payload: { msg, alertType, id },
  });
  setTimeout(() => despatch({ type: REMOVE_ALERT, payload: id }), timeout);
};
