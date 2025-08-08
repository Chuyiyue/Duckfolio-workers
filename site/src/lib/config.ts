import { ProfileConfig } from '@/types/platform-config';

export async function getConfig(): Promise<ProfileConfig> {
  const isServer = typeof window === 'undefined';
  const baseUrl = isServer
    ? process.env.DUCKFOLIO_API_URL || 'http://localhost:3000'
    : '';

  const res = await fetch(`${baseUrl}/api/config`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch config');
  }

  const data = await res.json();

  return data;
}

export let cachedConfig: ProfileConfig = {
  profile: {
    avatar: '/avatar.png',
    name: 'Duckfolio',
    bio: 'Welcome to my personal homepage',
  },
  socialLinks: [],
  websiteLinks: [],
};

export async function initializeConfig(): Promise<ProfileConfig> {
  try {
    cachedConfig = await getConfig();
    return cachedConfig;
  } catch (error) {
    console.error('Failed to initialize config:', error);
    return cachedConfig;
  }
}
