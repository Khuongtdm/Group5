import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import PocketBase from 'pocketbase';
import { StoreProvider, useStoreState } from 'easy-peasy';
import { routes } from '@/routes';
import GlobalStyles from '@/assets/styles/GlobalStyles';
import { Header } from '@/components/elements';
import { store } from '@/state';

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
	const location = useLocation();
	const userData = useStoreState((state: any) => state.user.data);

	if (!userData && location.pathname !== '/sso') {
		return <Navigate to="/sso" state={{ from: location }} replace />;
	}

	if (userData && location.pathname == '/sso') {
		return <Navigate to="/" state={{ from: location }} replace />;
	}

	return <>{children}</>;
};

const App = () => {
	useEffect(() => {
		const url = 'https://blaze.pockethost.io/';
		const client = new PocketBase(url);
		store.getActions().app.setClient(client);

		const authData = localStorage.getItem('pocketbase_auth');

		if (authData) {
			const authDataObj = JSON.parse(authData);
			client.authStore.save(authDataObj.token, authDataObj.model);
			client
				.collection('users')
				.authRefresh()
				.then((res) => {
					store.getActions().user.setUserData({
						uuid: res.record.id,
						username: res.record.username,
						email: res.record.email
					});
				})
				.catch((error) => {
					localStorage.removeItem('pocketbase_auth');
					window.location.href = '/sso';
				});
		}
	}, []);

	return (
		<StoreProvider store={store}>
			<BrowserRouter>
				<GlobalStyles />
				<Header />
				<AuthWrapper>
					<Routes>
						{routes.map(({ path, title, component: Page }) => (
							<Route key={path} path={path.replace(/\/$/, '')} element={<Page title={title || ''} />} />
						))}
					</Routes>
				</AuthWrapper>
			</BrowserRouter>
		</StoreProvider>
	);
};

export default App;
