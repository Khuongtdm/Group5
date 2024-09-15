import React from 'react';
import { useLocation } from 'react-router-dom';
import { useStoreState } from 'easy-peasy';
import { Logo } from '@/components/elements';
import { Avatar } from '@/components/catalyst/avatar';
import { Link } from '@/components/catalyst/link';
import { Navbar, NavbarItem, NavbarSpacer, NavbarDivider, NavbarSection } from '@/components/catalyst/navbar';
import {
	Dropdown,
	DropdownWarning,
	DropdownButton,
	DropdownDivider,
	DropdownItem,
	DropdownLabel,
	DropdownMenu,
	DropdownHeader
} from '@/components/catalyst/dropdown';
import { ArrowRightStartOnRectangleIcon, Cog8ToothIcon, ShieldCheckIcon, UserIcon } from '@heroicons/react/16/solid';

const Header = () => {
	const location = useLocation();
	const userData = useStoreState((state: any) => state.user.data);

	const isCurrentPage = (path: string) => {
		return location.pathname === path;
	};

	return (
		<Navbar className="bg-brand/10 backdrop-blur-lg border-b border-brand/30">
			<Link href="/" aria-label="Home">
				<Logo className="h-7 py-0.5 pl-6 pr-2" />
			</Link>
			{userData && (
				<>
					<NavbarDivider className="max-lg:hidden" />
					<NavbarSection>
						<NavbarItem href="/" current={isCurrentPage('/')}>
							Summary
						</NavbarItem>
						<NavbarItem href="/finances" current={isCurrentPage('/finances')}>
							Finances
						</NavbarItem>
					</NavbarSection>
					<NavbarSpacer />
					<NavbarSection className="pr-3">
						<Dropdown>
							<DropdownButton as={NavbarItem}>
								<Avatar initials={userData.username} variant="beam" />
							</DropdownButton>
							<DropdownMenu className="min-w-64 -mt-1 z-50" anchor="bottom end">
								<DropdownHeader className="text-xs font-zinc-400">Signed in as {userData.email}</DropdownHeader>
								<DropdownItem href="/user/profile">
									<UserIcon />
									<DropdownLabel>My profile</DropdownLabel>
								</DropdownItem>
								<DropdownItem href="/user/settings">
									<Cog8ToothIcon />
									<DropdownLabel>Settings</DropdownLabel>
								</DropdownItem>
								<DropdownDivider />
								<DropdownItem href="/privacy">
									<ShieldCheckIcon />
									<DropdownLabel>Privacy policy</DropdownLabel>
								</DropdownItem>
								<DropdownDivider />
								<DropdownWarning href="/auth/logout">
									<ArrowRightStartOnRectangleIcon />
									<DropdownLabel>Sign out</DropdownLabel>
								</DropdownWarning>
							</DropdownMenu>
						</Dropdown>
					</NavbarSection>
				</>
			)}
			{!userData && (
				<NavbarSection className="ml-auto pr-3">
					<NavbarItem href="/sso">Sign In</NavbarItem>
				</NavbarSection>
			)}
		</Navbar>
	);
};

export default Header;
