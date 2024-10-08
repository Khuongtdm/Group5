import 'twin.macro';
import { classNames } from '@/helpers';
import { Fragment, useState } from 'react';
import { PageContentBlock } from '@/components/elements';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ArrowDownCircleIcon, ArrowPathIcon, ArrowUpCircleIcon, EllipsisHorizontalIcon } from '@heroicons/react/20/solid';

const stats = [
 	{ name: 'Subscriptions', value: '3' },
	{ name: 'Monthly Cost', value: '$29.34' },
	{ name: 'Yearly Cost', value: '$352.08' },
	{ name: 'Monthly Salary', value: '$2,513.00' },
  { name: 'Yearly Income', value: '$30,156.00' },
];

const days = [
	{
		date: 'Today',
		dateTime: '2023-03-22',
		transactions: [
			{
				id: 1,
				invoiceNumber: '00012',
				href: '#',
				amount: '$7,600.00 USD',
				tax: '$500.00',
				client: 'Reform',
				description: 'Website redesign',
				icon: ArrowUpCircleIcon
			},
			{
				id: 2,
				invoiceNumber: '00011',
				href: '#',
				amount: '$10,000.00 USD',
				client: 'Tom Cook',
				description: 'Salary',
				icon: ArrowDownCircleIcon
			},
			{
				id: 3,
				invoiceNumber: '00009',
				href: '#',
				amount: '$2,000.00 USD',
				tax: '$130.00',
				client: 'Tuple',
				description: 'Logo design',
				icon: ArrowPathIcon
			}
		]
	},
	{
		date: 'Yesterday',
		dateTime: '2023-03-21',
		transactions: [
			{
				id: 4,
				invoiceNumber: '00010',
				href: '#',
				amount: '$14,000.00 USD',
				tax: '$900.00',
				client: 'SavvyCal',
				description: 'Website redesign',
				icon: ArrowUpCircleIcon
			}
		]
	}
];

const subscriptions = [
	{
		id: 1,
		name: 'Netflix',
		imageUrl: 'https://tailwindui.com/img/logos/48x48/tuple.svg',
		lastInvoice: { date: 'December 13, 2022', dateTime: '2022-12-13', amount: '$14.99/m' }
	},
	{
		id: 2,
		name: 'Google One',
		imageUrl: 'https://tailwindui.com/img/logos/48x48/savvycal.svg',
		lastInvoice: { date: 'January 22, 2023', dateTime: '2023-01-22', amount: '$1.99/m' }
	},
	{
		id: 3,
		name: 'Twitch',
		imageUrl: 'https://tailwindui.com/img/logos/48x48/reform.svg',
		lastInvoice: { date: 'January 23, 2023', dateTime: '2023-01-23', amount: '$11.99/m' }
	}
];

const Home = (props: { title: string }) => (
	<PageContentBlock title={props.title}>
		<div className="relative isolate overflow-hidden">
			<div className="border-b border-b-gray-900/10">
				<dl className="mx-auto grid max-w-7xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 lg:px-2 xl:px-0">
					{stats.map((stat, statIdx) => (
						<div
							key={stat.name}
							className={classNames(
								statIdx % 2 === 1 ? 'sm:border-l' : statIdx === 2 ? 'lg:border-l' : '',
								'flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 border-t border-gray-900/5 px-4 py-10 sm:px-6 lg:border-t-0 xl:px-8'
							)}>
							<dt className="text-sm font-medium leading-6 text-gray-500">{stat.name}</dt>
							<dd className="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">{stat.value}</dd>
						</div>
					))}
				</dl>
			</div>

			{/* <div
            aria-hidden="true"
            className="absolute left-0 top-full -z-10 mt-96 origin-top-left translate-y-40 -rotate-90 transform-gpu opacity-20 blur-3xl sm:left-1/2 sm:-ml-96 sm:-mt-10 sm:translate-y-0 sm:rotate-0 sm:transform-gpu sm:opacity-50"
          >
            <div
              style={{
                clipPath:
                  'polygon(100% 38.5%, 82.6% 100%, 60.2% 37.7%, 52.4% 32.1%, 47.5% 41.8%, 45.2% 65.6%, 27.5% 23.4%, 0.1% 35.3%, 17.9% 0%, 27.7% 23.4%, 76.2% 2.5%, 74.2% 56%, 100% 38.5%)',
              }}
              className="aspect-[1154/678] w-[72.125rem] bg-gradient-to-br from-[#FF5C26] to-[#FF5C26]"
            />
          </div> */}
		</div>

		<div className="space-y-16 py-16 xl:space-y-20">
			{/* Recent client list*/}
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
					<div className="flex items-center justify-between">
						<h2 className="text-base font-semibold leading-7 text-gray-900">Subscriptions</h2>
						<a href="#" className="text-sm font-semibold leading-6 text-brand hover:text-brand/60 transition">
							View all<span className="sr-only">, clients</span>
						</a>
					</div>
					<ul role="list" className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">
						{subscriptions.map((client) => (
							<li key={client.id} className="overflow-hidden rounded-xl border border-gray-200">
								<div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
									<img
										alt={client.name}
										src={client.imageUrl}
										className="h-12 w-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10"
									/>
									<div className="text-sm font-medium leading-6 text-gray-900">{client.name}</div>
									<Menu as="div" className="relative ml-auto">
										<MenuButton className="-m-2.5 block p-2.5 text-gray-400 hover:text-gray-500 transition">
											<span className="sr-only">Open options</span>
											<EllipsisHorizontalIcon aria-hidden="true" className="h-5 w-5" />
										</MenuButton>
										<MenuItems
											transition
											className="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">
											<MenuItem>
												<a href="#" className="block px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50">
													View<span className="sr-only">, {client.name}</span>
												</a>
											</MenuItem>
											<MenuItem>
												<a href="#" className="block px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50">
													Edit<span className="sr-only">, {client.name}</span>
												</a>
											</MenuItem>
										</MenuItems>
									</Menu>
								</div>
								<dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
									<div className="flex justify-between gap-x-4 py-3">
										<dt className="text-gray-500">Due</dt>
										<dd className="text-gray-700">
											<time dateTime={client.lastInvoice.dateTime}>{client.lastInvoice.date}</time>
										</dd>
									</div>
									<div className="flex justify-between gap-x-4 py-3">
										<dt className="text-gray-500">Amount</dt>
										<dd className="flex items-start gap-x-2">
											<div className="font-medium text-gray-900">{client.lastInvoice.amount}</div>
										</dd>
									</div>
								</dl>
							</li>
						))}
					</ul>
				</div>
			</div>

      		{/* Recent activity table */}
			<div>
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<h2 className="mx-auto max-w-2xl text-base font-semibold leading-6 text-gray-900 lg:mx-0 lg:max-w-none">Recent activity</h2>
				</div>
				<div className="mt-6 overflow-hidden border-t border-gray-100">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
							<table className="w-full text-left">
								<thead className="sr-only">
									<tr>
										<th>Amount</th>
										<th className="hidden sm:table-cell">Client</th>
										<th>More details</th>
									</tr>
								</thead>
								<tbody>
									{days.map((day) => (
										<Fragment key={day.dateTime}>
											<tr className="text-sm leading-6 text-gray-900">
												<th scope="colgroup" colSpan={3} className="relative isolate py-2 font-semibold">
													<time dateTime={day.dateTime}>{day.date}</time>
													<div className="absolute inset-y-0 right-full -z-10 w-screen border-b border-gray-200 bg-gray-50" />
													<div className="absolute inset-y-0 left-0 -z-10 w-screen border-b border-gray-200 bg-gray-50" />
												</th>
											</tr>
											{day.transactions.map((transaction) => (
												<tr key={transaction.id}>
													<td className="relative py-5 pr-6">
														<div className="flex gap-x-6">
															<transaction.icon aria-hidden="true" className="hidden h-6 w-5 flex-none text-gray-400 sm:block" />
															<div className="flex-auto">
																<div className="flex items-start gap-x-3">
																	<div className="text-sm font-medium leading-6 text-gray-900">{transaction.amount}</div>
																</div>
																{transaction.tax ? <div className="mt-1 text-xs leading-5 text-gray-500">{transaction.tax} tax</div> : null}
															</div>
														</div>
														<div className="absolute bottom-0 right-full h-px w-screen bg-gray-100" />
														<div className="absolute bottom-0 left-0 h-px w-screen bg-gray-100" />
													</td>
													<td className="hidden py-5 pr-6 sm:table-cell">
														<div className="text-sm leading-6 text-gray-900">{transaction.client}</div>
														<div className="mt-1 text-xs leading-5 text-gray-500">{transaction.description}</div>
													</td>
													<td className="py-5 text-right">
														<div className="flex justify-end">
															<a href={transaction.href} className="text-sm font-medium leading-6 text-brand hover:text-brand/60 transition">
																View<span className="hidden sm:inline"> transaction</span>
																<span className="sr-only">
																	, invoice #{transaction.invoiceNumber}, {transaction.client}
																</span>
															</a>
														</div>
														<div className="mt-1 text-xs leading-5 text-gray-500">
															Invoice <span className="text-gray-900">#{transaction.invoiceNumber}</span>
														</div>
													</td>
												</tr>
											))}
										</Fragment>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	</PageContentBlock>
);

export default Home;
