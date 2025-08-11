import { isRejectedWithValue } from "@reduxjs/toolkit";
// import { setError } from "../../actions/errorSlice/errorSlice";
const tokenMiddleware =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (isRejectedWithValue(action)) {
      console.log(action, "action");
      let errorMessage;
      const normalizedPayload = {};
      if (action.payload && typeof action.payload === "object") {
        for (const key in action.payload) {
          if (Object.hasOwnProperty.call(action.payload, key)) {
            normalizedPayload[key.toLowerCase()] = action.payload[key];
          }
        }
      }
      if (typeof normalizedPayload.errors === "string") {
        errorMessage = normalizedPayload.errors || action?.error?.message;
        //alert(1);
      } else if (
        typeof normalizedPayload.errors === "object" &&
        normalizedPayload.errors !== null
      ) {
        //alert(2);
        errorMessage = Object.values(normalizedPayload.errors)[0];
      } else {
        //alert(3);
        errorMessage = normalizedPayload.message || action?.error?.message;
      }

      console.log(action.payload, normalizedPayload, "errmiddle");
      console.log(errorMessage, "errorMessage");

      // errorMessage
      console.log(action.payload, "errmiddle");
      //   dispatch(setError({ msg: errorMessage, type: "error" }));
      if (
        errorMessage === "Token is blocked" ||
        errorMessage === "Expired token" ||
        errorMessage === "Signature verification failed"
      ) {
        localStorage.removeItem("token");
        window.location.href = "/";
        return;
      }
    }
    return next(action);
  };

export default tokenMiddleware;
