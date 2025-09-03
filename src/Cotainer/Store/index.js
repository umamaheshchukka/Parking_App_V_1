import { configureStore } from "@reduxjs/toolkit";
import tokenMiddleware from "./ResponseHandler";

import reducers from "../reducers/index";

const Store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tokenMiddleware),
});

export default Store;
