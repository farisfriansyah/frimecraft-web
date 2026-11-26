"use client";

import { useEffect, useRef, useState } from "react";

export function useInfiniteAutoLoad(totalPages: number, initialPage = 1, enabled = true) {
  const [page, setPage] = useState(initialPage);
  const [isLoading, setIsLoading] = useState(false);
  const triggerRef = useRef<HTMLDivElement | null>(null);

  const hasMore = page < totalPages;

  useEffect(() => {
    if (!enabled || !hasMore || isLoading) return;

    const node = triggerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsLoading(true);
        }
      },
      { rootMargin: "240px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [enabled, hasMore, isLoading]);

  return {
    page,
    setPage,
    isLoading,
    setIsLoading,
    hasMore,
    triggerRef,
  };
}
