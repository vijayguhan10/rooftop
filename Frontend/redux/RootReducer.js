import { combineReducers } from "redux";
import cartReducer from "./reducers";
import receivedItemsReducer from "./AdminReducer";
import footerReducer from "./footerReducer";



const rootReducer = combineReducers({
  cart: cartReducer,
  receivedItems: receivedItemsReducer,
  footer: footerReducer,
});

export default rootReducer;
