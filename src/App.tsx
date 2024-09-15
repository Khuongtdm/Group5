import React, { useState, useEffect } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import { platform } from '@tauri-apps/api/os';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { BiCreditCard } from 'react-icons/bi';
import { IoMdTrash } from 'react-icons/io';
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md';
import { RiNetflixFill } from 'react-icons/ri';

import {
	FaYoutube,
	FaTwitch,
	FaSpotify,
	FaGoogle,
	FaApple,
	FaMicrosoft,
	FaAmazon,
	FaTwitter,
	FaFacebook,
	FaInstagram,
	FaSlack,
	FaDropbox,
	FaGithub
} from 'react-icons/fa';

import BlazeLogoDark from './blaze-dark.png';
import BlazeLogoLight from './blaze-light.png';

interface Subscription {
	id?: number;
	name: string;
	amount: number;
	frequency: string;
}

const brandIcons: { [key: string]: React.ElementType } = {
	youtube: FaYoutube,
	twitch: FaTwitch,
	netflix: RiNetflixFill,
	spotify: FaSpotify,
	google: FaGoogle,
	apple: FaApple,
	microsoft: FaMicrosoft,
	amazon: FaAmazon,
	twitter: FaTwitter,
	facebook: FaFacebook,
	instagram: FaInstagram,
	slack: FaSlack,
	dropbox: FaDropbox,
	github: FaGithub
};

const getBrandIcon = (name: string): React.ElementType | null => {
	const lowerCaseName = name.toLowerCase();
	for (const [brand, Icon] of Object.entries(brandIcons)) {
		if (lowerCaseName.includes(brand)) {
			return Icon;
		}
	}
	return BiCreditCard;
};

const App: React.FC = () => {
	const [subscription, setSubscription] = useState<Subscription>({ name: '', amount: 0, frequency: 'monthly' });
	const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
	const [averageCost, setAverageCost] = useState<number>(0);
	const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
	const [isMacOS, setIsMacOS] = useState<boolean>(false);

	useEffect(() => {
		fetchSubscriptions();
		calculateAverageCost();
		checkTheme();
		checkPlatform();

		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
		mediaQuery.addEventListener('change', handleChange);

		return () => mediaQuery.removeEventListener('change', handleChange);
	}, []);

	const checkTheme = () => {
		const darkModeOn = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
		setIsDarkMode(darkModeOn);
	};

	const checkPlatform = async () => {
		const platformName = await platform();
		setIsMacOS(platformName === 'darwin');
	};

	const fetchSubscriptions = async () => {
		try {
			const subs: Subscription[] = await invoke('get_subscriptions');
			setSubscriptions(subs);
		} catch (error) {
			console.error('Error fetching subscriptions:', error);
		}
	};

	const calculateAverageCost = async () => {
		try {
			const average: number = await invoke('calculate_average_cost');
			setAverageCost(average);
		} catch (error) {
			console.error('Error calculating average cost:', error);
		}
	};

	const handleAddSubscription = async () => {
		try {
			await invoke('add_subscription', { subscription });
			console.log('Subscription added successfully');
			setSubscription({ name: '', amount: 0, frequency: 'monthly' });
			fetchSubscriptions();
			calculateAverageCost();
		} catch (error) {
			console.error('Error adding subscription:', error);
		}
	};

	const handleDeleteSubscription = async (id: number) => {
		try {
			await invoke('delete_subscription', { id });
			await fetchSubscriptions();
			await calculateAverageCost();
		} catch (error) {
			console.error('Error deleting subscription:', error);
		}
	};

	const handleMoveSubscription = async (id: number, direction: 'up' | 'down') => {
		const currentIndex = subscriptions.findIndex((sub) => sub.id === id);
		if ((direction === 'up' && currentIndex > 0) || (direction === 'down' && currentIndex < subscriptions.length - 1)) {
			const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
			const newSubscriptions = [...subscriptions];
			[newSubscriptions[currentIndex], newSubscriptions[newIndex]] = [newSubscriptions[newIndex], newSubscriptions[currentIndex]];

			try {
				await invoke('update_subscription_order', { id, newOrder: newIndex });
				setSubscriptions(newSubscriptions);
			} catch (error) {
				console.error('Error moving subscription:', error);
			}
		}
	};

	const getMonthlyAmount = (sub: Subscription) => {
		switch (sub.frequency) {
			case 'yearly':
				return sub.amount / 12;
			case 'weekly':
				return sub.amount * 4;
			default:
				return sub.amount;
		}
	};

	const removeLy = (str: string): string => {
		return str.endsWith('ly') ? str.slice(0, -2) : str;
	};

	const chartData = subscriptions.map((sub) => ({
		Name: sub.name,
		Amount: getMonthlyAmount(sub).toFixed(2)
	}));

	return (
		<div data-tauri-drag-region className={`${isDarkMode ? 'dark' : ''}`}>
			<div data-tauri-drag-region className="bg-white dark:bg-zinc-900/50 text-black dark:text-white min-h-screen">
				{isMacOS && (
					<div
						data-tauri-drag-region
						className="fixed w-full z-50 bg-zinc-100 dark:bg-zinc-900/90 h-7 flex items-center justify-center border-b border-zinc-200 dark:border-zinc-800 backdrop-blur-lg"></div>
				)}

				<div className="p-4 pt-10 hide-scrollbar">
					<div className="flex items-center space-x-2 mb-4">
						{isDarkMode ? (
							<img src={BlazeLogoDark} alt="Blaze Logo Dark" className="h-8" />
						) : (
							<img src={BlazeLogoLight} alt="Blaze Logo Light" className="h-8" />
						)}
						<span className="text-2xl font-light mt-2"> - Subscription Tracker</span>
					</div>
					<div className="mb-8">
						<h2 className="text-xl font-semibold mb-2">Add Subscription</h2>
						<div className="flex flex-row w-full gap-2 mb-2">
							<input
								type="text"
								placeholder="Name of subscription"
								className="w-full sm:w-1/2 border dark:border-zinc-700/50 p-2 rounded-lg bg-white dark:bg-zinc-800/50 text-black dark:text-white focus:ring-1 focus:ring-orange-500 focus:outline-none placeholder-zinc-600"
								value={subscription.name}
								onChange={(e) => setSubscription({ ...subscription, name: e.target.value })}
							/>
							<input
								type="number"
								placeholder={`Amount per ${removeLy(subscription.frequency)}`}
								className="w-full sm:w-1/2 border dark:border-zinc-700/50 p-2 rounded-lg bg-white dark:bg-zinc-800/50 text-black dark:text-white focus:ring-1 focus:ring-orange-500 focus:outline-none placeholder-zinc-600"
								value={subscription.amount || ''}
								onChange={(e) => setSubscription({ ...subscription, amount: parseFloat(e.target.value) || 0 })}
							/>
						</div>
						<div className="pt-2">
							<select
								className="block w-full bg-white dark:bg-zinc-800/50 rounded-lg border-0 py-1.5 pl-3 pr-10 text-zinc-900 ring-1 ring-inset ring-zinc-200 dark:ring-zinc-700/50 dark:text-white focus:ring-2 focus:ring-orange-500 sm:text-sm sm:leading-6 mb-2"
								value={subscription.frequency}
								onChange={(e) => setSubscription({ ...subscription, frequency: e.target.value })}>
								<option value="monthly">Monthly</option>
								<option value="yearly">Yearly</option>
								<option value="weekly">Weekly</option>
							</select>
							<button
								type="button"
								className="rounded-lg bg-white px-2.5 py-2 text-sm font-semibold text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 hover:bg-zinc-50 dark:ring-zinc-700/50 dark:bg-zinc-800/50 dark:text-white w-full dark:hover:bg-zinc-700/50 transition"
								onClick={handleAddSubscription}>
								Add Subscription
							</button>
						</div>
					</div>

					<div className="mb-8">
						<h2 className="text-xl font-semibold mb-2">Subscriptions</h2>
						<ul>
							{subscriptions.map((sub, index) => {
								const BrandIcon = getBrandIcon(sub.name);
								return (
									<li
										key={sub.id}
										className="mb-2 p-2 bg-white dark:bg-zinc-700/50 rounded-lg shadow flex justify-between items-center border border-zinc-200 dark:border-zinc-600/50">
										<div className="flex items-center">
											<div className="border-r border-zinc-200 dark:border-zinc-800">{BrandIcon && <BrandIcon size={20} className="mr-2" />}</div>
											<span className="capitalize font-bold mr-2">{sub.name}</span>
											<span>
												${sub.amount.toFixed(2)}/{sub.frequency == 'monthly' ? 'm' : sub.frequency == 'yearly' ? 'y' : 'w'}
											</span>
										</div>
										<div className="flex items-center">
											<button
												onClick={() => handleMoveSubscription(sub.id!, 'up')}
												disabled={index === 0}
												className="p-1 mr-1 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 disabled:opacity-50">
												<MdKeyboardArrowUp size={16} />
											</button>
											<button
												onClick={() => handleMoveSubscription(sub.id!, 'down')}
												disabled={index === subscriptions.length - 1}
												className="p-1 mr-1 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 disabled:opacity-50">
												<MdKeyboardArrowDown size={16} />
											</button>
											<button
												onClick={() => handleDeleteSubscription(sub.id!)}
												className="p-1 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-200">
												<IoMdTrash size={16} />
											</button>
										</div>
									</li>
								);
							})}
						</ul>
					</div>

					<div className="mb-8">
						<h2 className="text-xl font-semibold mb-2">Average Monthly Cost</h2>
						<p className="text-2xl font-bold text-green-500">${averageCost.toFixed(2)}</p>
					</div>

					<div>
						<h2 className="text-xl font-semibold mb-2">Monthly Subscription Costs</h2>
						<div className="h-64 w-full">
							<ResponsiveContainer width="100%" height="100%">
								<BarChart data={chartData}>
									<XAxis dataKey="Name" />
									<YAxis />
									<Tooltip />
									<Bar dataKey="Amount" fill="#FF5C26" />
								</BarChart>
							</ResponsiveContainer>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default App;
