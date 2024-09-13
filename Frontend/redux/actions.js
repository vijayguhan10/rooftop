// actions.js
export const addToCart = (product) => ({
  type: "ADD_TO_CART",
  payload: product,
});

export const removeFromCart = (index) => ({
  type: "REMOVE_FROM_CART",
  payload: index,
});

export const clearCart = () => ({
  type: "CLEAR_CART",
});
export const receiveItem = (item) => ({
  type: "RECEIVE_ITEM",
  payload: item,
});
export const setSelectedIcon = (iconName) => ({
  type: "SET_SELECTED_ICON",
  payload: iconName,
});
