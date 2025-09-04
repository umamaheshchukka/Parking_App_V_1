import { isRejectedWithValue } from "@reduxjs/toolkit";
import { setError } from "../../Actions/errorSlice/errorSlice";

const tokenMiddleware =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (isRejectedWithValue(action)) {
      let errorMessage;
      console.log(action, "action from response handler");

      // Check for both errors and error
      const errors = action.payload?.errors || action.payload?.error;

      if (typeof errors === "string") {
        errorMessage = errors;
      } else if (Array.isArray(errors)) {
        // case: errors = [{ path: "email", msg: "already exist" }, "Some error"]
        errorMessage = errors
          .map((err) => {
            if (typeof err === "object" && err !== null) {
              if (err.path && err.msg) {
                return `${err.path}: ${err.msg}`;
              }
              return err.msg || JSON.stringify(err);
            }
            return err;
          })
          .join(", ");
      } else if (typeof errors === "object" && errors !== null) {
        // case: errors: { email: "already exist", phone: "already exist" }
        errorMessage = Object.entries(errors)
          .map(([field, msg]) => `${field}: ${msg}`)
          .join(", ");
      } else {
        // fallback
        errorMessage =
          action.payload?.message || action?.error?.message || "Unknown error";
      }

      // Token specific handling
      if (
        errorMessage === "Token is blocked" ||
        errorMessage === "Expired token" ||
        errorMessage === "Signature verification failed"
      ) {
        localStorage.removeItem("token");
        window.location.href = "/";
        return;
      }

      // Dispatch error to global store
      dispatch(setError({ msg: errorMessage, type: "error" }));
    }

    return next(action);
  };

export default tokenMiddleware;
