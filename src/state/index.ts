import { createStore } from 'easy-peasy';
import app, { AppStore } from '@/state/app';
import user, { UserStore } from '@/state/user';

export interface ApplicationStore {
    app: AppStore;
    user: UserStore;
}

const state: ApplicationStore = {
    app,
    user,
};

export const store = createStore(state);