const reducer = (state, action) => {
  if (action.type === "FETCH_LOCATION") {
    return { ...state, latLong: action.payload };
  }
  if (action.type === "NEAR_BY_COFFEE_STORES") {
    return { ...state, nearByCoffeeStore: action.payload };
  }
};

export default reducer;
