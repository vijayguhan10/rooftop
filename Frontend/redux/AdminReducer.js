const receivedItems = [];

import action from "./actions";

const AdminReducer = (state = { receivedItems }, action) => {
  switch (action.type) {
    case "RECEIVE_ITEM":
      const newItem = action.payload;
      return {
        ...state,
        receivedItems: [...state.receivedItems, newItem],
      };
    default:
      return state;
  }
};

export default AdminReducer;
