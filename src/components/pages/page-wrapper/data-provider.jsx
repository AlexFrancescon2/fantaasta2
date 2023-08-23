import { useStore } from "../../../store/store";
import { shallow } from "zustand/shallow";
import "react-toastify/dist/ReactToastify.css";

import { useEffect, useRef } from "react";
import { fetchVitals } from "./fetches";

export const DataProvider = () => {
  const initialized = useRef(false);
  // Set store
  const store = useStore(
    (state) => ({
      isLoading: state.isLoading,
      setUser: state.setUser,
      setIsLoading: state.setIsLoading,
      setSettings: state.setSettings,
      setUsers: state.setUsers,
      setPlayers: state.setPlayers,
      setIsDataProviderLoaded: state.setIsDataProviderLoaded,
    }),
    shallow
  );

  const loggedUser = JSON.parse(localStorage.getItem("fantauser"));

  useEffect(() => {
    // Set logged user
    store.setUser(loggedUser);
    if (!initialized.current) {
      initialized.current = true;
      if (loggedUser) {
        const onFetchVitals = async () => {
          store.setIsLoading(true);
          await fetchVitals(store);
          store.setIsLoading(false);
        };

        onFetchVitals();
        store.setIsDataProviderLoaded(true);
      } else {
        // user is not logged we dont need to fetch
        store.setIsLoading(false);
        store.setIsDataProviderLoaded(true);
      }
    } else {
      if (!!loggedUser === false) {
        // user is not logged we dont need to fetch
        store.setIsLoading(false);
        store.setIsDataProviderLoaded(true);
      }
    }
  }, []);

  return <></>;
};
