'use client'

import { useRef, type ReactNode, type TouchEvent } from "react";
import { usePathname, useRouter } from "next/navigation";

interface SwipeNavigationProps {
  children: ReactNode;
  routes: string[];
}

export default function SwipeNavigation({
  children,
  routes,
}: SwipeNavigationProps) {
  const router = useRouter();
  const pathname = usePathname();

  const touchStart = useRef<{ x: number; y: number } | null>(null);

  // Початок свайпу
  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    const target = e.target;

    // Не запускаємо свайп на інтерактивних елементах
    if (
      target instanceof Element &&
      target.closest('input, textarea, select, button, a, [data-no-swipe]')
    ) {
      touchStart.current = null;
      return;
    }

    const touch = e.touches[0];

    if (!touch) return;

    touchStart.current = {
      x: touch.clientX,
      y: touch.clientY,
    };
  };

  // Завершення свайпу
  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    if (!touchStart.current) return;

    const startX = touchStart.current.x;
    const startY = touchStart.current.y;

    touchStart.current = null;

    const touch = e.changedTouches[0];

    if (!touch) return;

    const differenceX = touch.clientX - startX;
    const differenceY = touch.clientY - startY;

    // Мінімальна відстань свайпу
    const threshold = 70;

    // Ігноруємо вертикальне прокручування
    if (
      Math.abs(differenceX) < threshold ||
      Math.abs(differenceX) < Math.abs(differenceY) * 1.3
    ) {
      return;
    }

    const currentIndex = routes.indexOf(pathname);

    if (currentIndex === -1) return;

    // Справа наліво — наступна сторінка
    const nextIndex =
      differenceX < 0
        ? currentIndex + 1
        : currentIndex - 1;

    // Перевіряємо межі навігації
    if (nextIndex < 0 || nextIndex >= routes.length) return;

    router.push(routes[nextIndex]);
  };

  const handleTouchCancel = () => {
    touchStart.current = null;
  };

  return (
    <div
      className="touch-pan-y"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchCancel}
    >
      {children}
    </div>
  );
}