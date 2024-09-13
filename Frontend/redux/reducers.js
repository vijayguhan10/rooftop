import AsyncStorage from "@react-native-async-storage/async-storage";
import action from "./actions";

const initialState = {
  cart: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const newCart = [...state.cart, action.payload];
      AsyncStorage.setItem("cart", JSON.stringify(newCart));
      return {
        ...state,
        cart: newCart,
      };
    case "REMOVE_FROM_CART":
      const updatedCart = state.cart.filter(
        (_, index) => index !== action.payload
      );
      AsyncStorage.setItem("cart", JSON.stringify(updatedCart));
      return {
        ...state,
        cart: updatedCart,
      };
    case "CLEAR_CART":
      AsyncStorage.removeItem("cart");
      return {
        ...state,
        cart: [],
      };
    // case "RECEIVE_ITEM":
    //   const itemToReceive = action.payload;
    //   const newReceivedItems = [...state.receivedItems, itemToReceive];
    //   return {
    //     ...state,
    //     receivedItems: newReceivedItems,
    //   };
    default:
      return state;
  }
};

export default cartReducer;
