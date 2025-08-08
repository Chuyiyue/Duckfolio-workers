import { ProfileConfig, SocialLink } from '@/types/platform-config';

type UpstreamConfig = {
  site?: {
    name?: string;
    title?: string;
    avatar?: string;
  };
  links?: Record<string, string>;
};

function platformIconSvg(platform: string): string {
  const key = platform.toLowerCase();
  if (key === 'github') {
    return '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.51 2.87 8.33 6.84 9.68.5.1.68-.22.68-.48 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.1-1.5-1.1-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.73 0 0 .84-.28 2.75 1.05A9.3 9.3 0 0 1 12 7.5c.85 0 1.7.12 2.5.35 1.9-1.33 2.74-1.05 2.74-1.05.55 1.42.2 2.47.1 2.73.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.59.69.48A10 10 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z"/></svg>';
  }
  if (key === 'x' || key === 'twitter') {
    return '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M18.244 2H21l-6.5 7.43L22 22h-6.8l-4.76-6.2L4.9 22H2.14l7.06-8.07L2 2h6.9l4.32 5.7L18.24 2Zm-2.38 18h2.22L8.22 4H5.9l9.97 16Z"/></svg>';
  }
  if (key === 'email' || key === 'mail') {
    return '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5L4 8V6l8 5 8-5v2Z"/></svg>';
  }
  return '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M10.59 13.41 9.17 12l4.24-4.24 1.41 1.41L10.59 13.4Zm2.82-2.82L12 10.59 7.76 6.35l1.41-1.41L12 7.77l2.83-2.83 1.41 1.41L12 10.59ZM19 3H5c-1.1 0-2 .9-2 2v14l4-4h12c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2Z"/></svg>';
}

function transformUpstreamToProfileConfig(raw: UpstreamConfig): ProfileConfig {
  const name = raw.site?.title || raw.site?.name || 'Duckfolio';
  const bio = raw.site?.name || 'Welcome to my personal homepage';
  const avatar = raw.site?.avatar || '/avatar.png';

  const socialLinks: SocialLink[] = Object.entries(raw.links || {}).map(
    ([platform, url]) => ({
      id: platform,
      platform,
      url,
      icon: platformIconSvg(platform),
    })
  );

  return {
    profile: { name, bio, avatar },
    socialLinks,
    websiteLinks: [],
  };
}

export async function getConfig(): Promise<ProfileConfig> {
  const res = await fetch('/platform-config.json', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch platform-config.json');
  }

  const data = (await res.json()) as UpstreamConfig;
  return transformUpstreamToProfileConfig(data);
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
