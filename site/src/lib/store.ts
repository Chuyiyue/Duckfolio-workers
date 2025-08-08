import { ProfileConfig } from '@/types/platform-config';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { cachedConfig, initializeConfig } from '@/lib/config';

export const useProfileStore = create<
  ProfileConfig & { initialize: () => Promise<void> }
>()(
  persist(
    (set) => ({
      profile: cachedConfig.profile,
      socialLinks: cachedConfig.socialLinks,
      websiteLinks: cachedConfig.websiteLinks,

      initialize: async () => {
        const config = await initializeConfig();
        set({
          profile: config.profile,
          socialLinks: config.socialLinks,
          websiteLinks: config.websiteLinks,
        });
      },
    }),
    { name: 'duckfolio-storage' }
  )
);
