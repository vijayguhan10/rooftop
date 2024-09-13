const initialState = {
  selectedIcon: null,
};

const footerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SELECTED_ICON":
      return {
        selectedIcon: action.payload,
      };
    default:
      return state;
  }
};

export default footerReducer;
