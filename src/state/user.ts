import { Action, action } from "easy-peasy";

export interface UserData {
  uuid: string;
  username: string;
  email: string;
}

export interface UserStore {
  data?: UserData;
  setUserData: Action<UserStore, UserData>;
  updateUserData: Action<UserStore, Partial<UserData>>;
}

const user: UserStore = {
  data: undefined,
  setUserData: action((state, payload) => {
    state.data = payload;
  }),

  updateUserData: action((state, payload) => {
    // @ts-ignore
    state.data = { ...state.data, ...payload };
  }),
};

export default user;