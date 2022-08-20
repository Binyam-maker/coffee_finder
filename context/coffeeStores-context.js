import { createContext, useContext, useReducer } from "react";

import reducer from "../reducer/reducer";

const CoffeeStoreContext = createContext();

const initialState = {
  latLong: "",
  nearByCoffeeStore: [],
  error: "",
  loading: false,
};
const CoffeeStoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getCurrentPosition = async () => {
    dispatch({ type: "LOADING" });
    // Check if device has geolocation capabilities and act accordingly
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const currentPosition = `${position.coords.latitude},${position.coords.longitude}`;
        dispatch({ type: "FETCH_LOCATION", payload: currentPosition });
      });
    } else {
    }
  };
  const getNearbyStoresData = async (latLong) => {
    const fetchedCoffeeStoreData = await fetch(
      `/api/getCoffeeStoresByLocation?latLong=${latLong}`
    );
    const nearbyCoffeeStoreData = await fetchedCoffeeStoreData.json();

    dispatch({
      type: "NEAR_BY_COFFEE_STORES",
      payload: nearbyCoffeeStoreData.coffeeStores,
    });
  };

  const getError = (error) => {
    dispatch({ type: "ERROR", payload: error });
  };

  return (
    <CoffeeStoreContext.Provider
      value={{ ...state, getError, getCurrentPosition, getNearbyStoresData }}
    >
      {children}
    </CoffeeStoreContext.Provider>
  );
};

// custom hook
export const useGlobalContext = () => {
  return useContext(CoffeeStoreContext);
};

export { CoffeeStoreContext, CoffeeStoreProvider };
