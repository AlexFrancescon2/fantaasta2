import { create } from "zustand";
import { players } from "../mocks/players";
import { mockUsers } from "../mocks/users";
import { settings } from "../mocks/settings";
import { toArray } from "../utils/objects";

export const useStore = create((set) => ({
  // USERS
  user: {},
  users: toArray(mockUsers),
  setUser: (newData) =>
    set((state) => ({ user: { ...state.user, ...newData } })),

  // SETTINGS
  settings: settings,
  setSettings: (newData) =>
    set((state) => ({
      settings: { ...state.settings, ...newData },
    })),

  // PLAYERS
  players: players,
  updatePlayer: (newData, playerId) =>
    set((state) => ({
      players: state.players.map((player) => {
        return player.id.toString() === playerId.toString()
          ? { ...newData }
          : { ...player };
      }),
    })),

  // MAGHEGGI
  magheggi: JSON.parse(localStorage.getItem("magheggi")),
  updateTag: (newData) =>
    set((state) => ({
      magheggi: { ...state.magheggi, tags: [ ...newData ] },
    })),
}));
