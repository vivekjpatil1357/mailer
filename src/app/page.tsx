
import { headers } from 'next/headers';
import HomeClient from './HomeClient';

export default async function Page() {
  const isAuthenticated = (await headers()).get('x-is-authenticated') === 'true';
  return <HomeClient isAuthenticated={isAuthenticated} />;
}
