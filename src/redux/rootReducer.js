// src/redux/rootReducer.js
import { combineReducers } from "redux";
import { characterReducer } from "./character/characterReducer";
import { eventReducer } from "./events/eventReducer";
import { listReducer } from "./midarea/list";

const rootReducer = combineReducers({
  character: characterReducer,
  list: listReducer,
  event: eventReducer,
});

export default rootReducer;
