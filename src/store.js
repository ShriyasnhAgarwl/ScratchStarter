import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./redux/rootReducer";
import { thunk } from "redux-thunk";
// Make sure this is correctly imported

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
