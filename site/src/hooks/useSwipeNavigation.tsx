import { useState, useEffect, useCallback, useMemo } from 'react';
import { PanInfo } from 'framer-motion';

type SectionType = 'profile' | 'links';

export function useSwipeNavigation(initialSection: SectionType = 'profile') {
  const [activeSection, setActiveSection] =
    useState<SectionType>(initialSection);
  const [isMobile, setIsMobile] = useState(false);

  // 检测是否为移动设备
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const handleDragEnd = useCallback(
    (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      if (!isMobile) return;

      const { offset, velocity } = info;

      const swipeThreshold = 100;
      const velocityThreshold = 0.5;

      const isLeftSwipe =
        offset.x < -swipeThreshold || velocity.x < -velocityThreshold;
      const isRightSwipe =
        offset.x > swipeThreshold || velocity.x > velocityThreshold;

      if (isLeftSwipe && activeSection === 'profile') {
        setActiveSection('links');
      } else if (isRightSwipe && activeSection === 'links') {
        setActiveSection('profile');
      }
    },
    [isMobile, activeSection]
  );

  const dragProps = useMemo(
    () => ({
      drag: isMobile ? ('x' as const) : false,
      dragConstraints: { left: 0, right: 0 },
      dragElastic: 0.2,
      onDragEnd: handleDragEnd,
    }),
    [isMobile, handleDragEnd]
  );

  return {
    activeSection,
    setActiveSection,
    isMobile,
    dragProps,
  };
}
