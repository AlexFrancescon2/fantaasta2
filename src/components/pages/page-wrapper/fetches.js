import { getPlayers } from "../../../requests/players";
import { getSettings } from "../../../requests/settings";
import { getUsers } from "../../../requests/users";
import { toArray } from "../../../utils/objects";

export const fetchVitals = async (store) => {
  store.setIsLoading(true);

  // const useMockData = process?.env?.REACT_APP_MOCK_DATA === "true";

  // Fetch users
  const users =  await getUsers();

  // Fetch Settings
  const settings =  await getSettings();

  // Fetch Players
  const players =  await getPlayers();

  if (users.error || settings.error || players.errors) {
    store.setIsLoading(false);
    return { error: true };
  }

  store.setSettings(settings.data ? settings.data : settings);
  store.setUsers(users.data ? users.data : toArray(users));
  store.setPlayers(players.data ? players.data : players);

  store.setIsLoading(false);

  return { success: true };
};
