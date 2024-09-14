// react
import type { ComponentType } from 'react';

// project
import { Home, NotFound } from '@/components/pages';

interface RouteDefinition {
  path: string;
  title: string | undefined;
  component: ComponentType<{ title: string }>;
}

const routes: RouteDefinition[] = [
  {
    path: '/',
    title: 'Home',
    component: Home,
  },
  {
    path: '*',
    title: 'Not Found',
    component: NotFound,
  },
];

export { routes };
