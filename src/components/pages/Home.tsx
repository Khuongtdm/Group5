// project
import { PageContentBlock, Logo } from '@/components/elements';

// library
import 'twin.macro';

import { Avatar } from '@/components/catalyst/avatar'
import { Link } from '@/components/catalyst/link'
import { Navbar, NavbarItem, NavbarSpacer, NavbarDivider, NavbarSection } from '@/components/catalyst/navbar'
import { Dropdown, DropdownWarning, DropdownButton, DropdownDivider, DropdownItem, DropdownLabel, DropdownMenu } from '@/components/catalyst/dropdown'
import { ArrowRightStartOnRectangleIcon, Cog8ToothIcon, LightBulbIcon, ShieldCheckIcon, UserIcon } from '@heroicons/react/16/solid'

const Home = (props: { title: string }) => (
  <PageContentBlock title={props.title}>
    <Navbar>
      <Link href="/" aria-label="Home">
        <Logo className="h-7 py-0.5 pl-6 pr-2" />
      </Link>
      <NavbarDivider className="max-lg:hidden" />
      <NavbarSection>
        <NavbarItem href="/" current>Summary</NavbarItem>
        <NavbarItem href="/events">Finances</NavbarItem>
      </NavbarSection>
      <NavbarSpacer />
      <NavbarSection className="pr-3">
        <Dropdown>
          <DropdownButton as={NavbarItem}>
            <Avatar initials="John Doe" variant="beam" />
          </DropdownButton>
          <DropdownMenu className="min-w-64" anchor="bottom end">
            <DropdownItem href="/my-profile">
              <UserIcon />
              <DropdownLabel>My profile</DropdownLabel>
            </DropdownItem>
            <DropdownItem href="/settings">
              <Cog8ToothIcon />
              <DropdownLabel>Settings</DropdownLabel>
            </DropdownItem>
            <DropdownDivider />
            <DropdownItem href="/privacy-policy">
              <ShieldCheckIcon />
              <DropdownLabel>Privacy policy</DropdownLabel>
            </DropdownItem>
            <DropdownItem href="/share-feedback">
              <LightBulbIcon />
              <DropdownLabel>Share feedback</DropdownLabel>
            </DropdownItem>
            <DropdownDivider />
            <DropdownWarning href="/logout">
              <ArrowRightStartOnRectangleIcon />
              <DropdownLabel>Sign out</DropdownLabel>
            </DropdownWarning>
          </DropdownMenu>
        </Dropdown>
      </NavbarSection>
    </Navbar>
  </PageContentBlock>
);

export default Home;
