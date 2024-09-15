import React, { useState } from 'react';
import PocketBase from 'pocketbase';
import { useStoreState } from 'easy-peasy';
import { ApplicationStore } from '@/state';
import { Input } from '@/components/catalyst/input';
import { Button } from '@/components/catalyst/button';
import { PageContentBlock } from '@/components/elements';
import { Field, Label } from '@/components/catalyst/fieldset';

const LoginSignup = () => {
	const [isLogin, setIsLogin] = useState(true);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [username, setUsername] = useState('');
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const pb = useStoreState((state: ApplicationStore) => state.app.client);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');
		setIsLoading(true);
		try {
			let authData;
			if (isLogin) {
				authData = await pb.collection('users').authWithPassword(email.toLowerCase(), password);
			} else {
				const data = {
					email: email.toLowerCase(),
					password,
					passwordConfirm: password,
					username
				};
				await pb.collection('users').create(data);
				authData = await pb.collection('users').authWithPassword(email, password);
			}
			localStorage.setItem('pocketbase_auth', JSON.stringify(authData));
			window.location.href = '/';
		} catch (error) {
			if (isLogin) {
				setError('Invalid username or password, please try again.');
			} else {
				setError('Unable to sign up, please try again.');
			}
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<PageContentBlock title={isLogin ? 'Login' : 'Sign Up'}>
			<div className="max-w-md mx-auto mt-32">
				{error && <p className="-mt-20 mb-11 text-red-500 mb-4 px-4 py-1.5 bg-red-100 rounded-lg border border-red-200 shadow">{error}</p>}
				<h2 className="text-2xl font-bold">{isLogin ? 'Welcome Back' : 'Sign Up'}</h2>
				<h3 className="text-xl text-zinc-500 font-medium mb-5">{isLogin ? 'Sign in to continue' : 'Create an account'}</h3>
				<form onSubmit={handleSubmit} className="space-y-3">
					{!isLogin && (
						<Field>
							<Label>Username</Label>
							<Input name="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
						</Field>
					)}
					<Field>
						<Label>Email Address</Label>
						<Input name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
					</Field>
					<Field>
						<Label>Password</Label>
						<Input name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
					</Field>
					<div className="py-1" />
					<Button type="submit" className="w-full cursor-pointer transition" disabled={isLoading}>
						{isLoading ? 'Loading...' : isLogin ? 'Login' : 'Sign Up'}
					</Button>
				</form>
				<p className="mt-4 text-center text-sm">
					{isLogin ? "Don't have an account? " : 'Already have an account? '}
					<button onClick={() => setIsLogin(!isLogin)} className="text-brand font-semibold">
						{isLogin ? 'Sign Up' : 'Login'}
					</button>
				</p>
			</div>
		</PageContentBlock>
	);
};

export default LoginSignup;
