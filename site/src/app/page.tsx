'use client';

import { useRef, useEffect } from 'react';
import { useProfileStore } from '@/lib/store';
import { AnimatePresence, motion } from 'framer-motion';
import { Navigation } from '@/components/layout/Navigation';
import { Profile } from '@/components/layout/Profile';
import { Links } from '@/components/links/Links';
import { Footer } from '@/components/layout/Footer';
import { useSwipeNavigation } from '@/hooks/useSwipeNavigation';

export default function Home() {
  const { profile, socialLinks, websiteLinks } = useProfileStore();
  const containerRef = useRef<HTMLDivElement>(null);

  const { activeSection, setActiveSection, dragProps } =
    useSwipeNavigation('profile');

  const initialize = useProfileStore((state) => state.initialize);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full text-[#121212] dark:text-[#f0f0f0] overflow-hidden flex flex-col"
    >
      <Navigation
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <motion.main
        className="relative z-10 flex-1 px-4 sm:px-6 md:px-8 w-full md:w-4/5 lg:w-3/4 xl:w-2/3 mx-auto flex flex-col"
        {...dragProps}
      >
        <AnimatePresence mode="wait">
          {activeSection === 'profile' ? (
            <Profile
              profile={profile}
              socialLinks={socialLinks}
              key="profile"
            />
          ) : (
            <Links websiteLinks={websiteLinks} key="links" />
          )}
        </AnimatePresence>
      </motion.main>

      <Footer name={profile.name} />
    </div>
  );
}
