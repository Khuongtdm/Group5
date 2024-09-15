import type { ComponentType } from 'react';
import { Home, Auth, NotFound } from '@/components/pages';

interface RouteDefinition {
	path: string;
	title: string | undefined;
	component: ComponentType<{ title: string }>;
}

const Logout = () => {
	localStorage.removeItem('pocketbase_auth');
	window.location.href = '/sso';
};

const routes: RouteDefinition[] = [
	{
		path: '/',
		title: 'Home',
		component: Home
	},
	{
		path: '/sso',
		title: '',
		component: Auth
	},
	{
		path: '/auth/logout',
		title: '',
		component: Logout
	},
	{
		path: '*',
		title: 'Not Found',
		component: NotFound
	}
];

export { routes };
