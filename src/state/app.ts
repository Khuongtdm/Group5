import PocketBase from 'pocketbase';
import { Action, action } from 'easy-peasy';

export interface AppStore {
	client?: PocketBase;
	setClient: Action<AppStore, PocketBase>;
}

const app: AppStore = {
	client: undefined,
	setClient: action((state, payload) => {
		state.client = payload;
	})
};

export default app;
