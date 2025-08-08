import { motion } from 'framer-motion';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';

type SectionType = 'profile' | 'links';
interface NavigationProps {
  activeSection: SectionType;
  setActiveSection: Dispatch<SetStateAction<SectionType>>;
}

export function Navigation({
  activeSection,
  setActiveSection,
}: NavigationProps) {
  return (
    <nav className="fixed top-0 left-0 w-full z-40 px-4 sm:px-8 py-4 sm:py-6 flex justify-between items-center">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{
          opacity: 1,
          x: 0,
          rotate: [0, -10, 0],
        }}
        transition={{
          duration: 0.6,
          ease: 'easeOut',
          rotate: {
            duration: 2,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'loop',
          },
        }}
        className="text-xl font-medium"
      >
        <Image src="/logo.png" alt="Logo" width={40} height={40} priority />
      </motion.div>

      <motion.div
        className="flex space-x-4 sm:space-x-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
      >
        {['profile', 'links'].map((section) => (
          <button
            key={section}
            className={`text-sm uppercase tracking-wider transition-colors ${
              activeSection === section
                ? 'text-[#121212] dark:text-white'
                : 'text-[#121212]/60 dark:text-white/60 hover:text-[#121212] dark:hover:text-white'
            }`}
            onClick={() => setActiveSection(section as SectionType)}
          >
            {section}
            {activeSection === section && (
              <motion.div
                className="h-0.5 bg-[#121212] dark:bg-white mt-1"
                layoutId="activeSection"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        ))}
      </motion.div>
    </nav>
  );
}
