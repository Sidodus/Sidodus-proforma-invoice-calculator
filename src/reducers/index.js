import { combineReducers } from "redux";
import quotationReducer from "./quotationReducer";

export default combineReducers({
  quotation: quotationReducer
});
