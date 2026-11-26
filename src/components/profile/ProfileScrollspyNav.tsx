"use client";

import { useEffect, useMemo, useRef, useState, type MouseEvent } from "react";

type ProfileSectionItem = {
  id: string;
  label: string;
};

type ProfileScrollspyNavProps = {
  items: ProfileSectionItem[];
};

export function ProfileScrollspyNav({ items }: ProfileScrollspyNavProps) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id || "");
  const animationRef = useRef<number | null>(null);

  const validItems = useMemo(() => items.filter((item) => item.id.length > 0), [items]);

  useEffect(() => {
    const cancelScroll = () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
    const cancelOnKey = (event: KeyboardEvent) => {
      if (["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "].includes(event.key)) {
        cancelScroll();
      }
    };

    window.addEventListener("wheel", cancelScroll, { passive: true });
    window.addEventListener("touchstart", cancelScroll, { passive: true });
    window.addEventListener("pointerdown", cancelScroll, { passive: true });
    window.addEventListener("keydown", cancelOnKey);
    window.addEventListener("popstate", cancelScroll);

    return () => {
      cancelScroll();
      window.removeEventListener("wheel", cancelScroll);
      window.removeEventListener("touchstart", cancelScroll);
      window.removeEventListener("pointerdown", cancelScroll);
      window.removeEventListener("keydown", cancelOnKey);
      window.removeEventListener("popstate", cancelScroll);
    };
  }, []);

  function scrollToSection(event: MouseEvent<HTMLAnchorElement>, id: string) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const target = document.getElementById(id);
    if (!target) return;

    event.preventDefault();
    if (animationRef.current !== null) cancelAnimationFrame(animationRef.current);

    const hash = `#${id}`;
    if (window.location.hash !== hash) window.history.pushState(null, "", hash);
    if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });

    const startY = window.scrollY;
    let startTime: number | null = null;
    const scrollMargin = parseFloat(getComputedStyle(target).scrollMarginTop) || 0;

    const animateScroll = (time: number) => {
      if (startTime === null) startTime = time;
      const progress = Math.min((time - startTime) / 600, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const targetY = target.getBoundingClientRect().top + window.scrollY - scrollMargin;
      window.scrollTo({ top: startY + (targetY - startY) * eased, behavior: "instant" });

      animationRef.current = progress < 1 ? requestAnimationFrame(animateScroll) : null;
    };

    animationRef.current = requestAnimationFrame(animateScroll);
  }

  useEffect(() => {
    if (!validItems.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: [0.1, 0.25, 0.5, 0.75],
      },
    );

    validItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [validItems]);

  return (
    <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm lg:flex-col lg:gap-1">
      {validItems.map((item) => {
        const isActive = item.id === activeId;

        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(event) => scrollToSection(event, item.id)}
            className={[
              "block border-b-2 border-transparent py-2 transition lg:border-b-0 lg:border-l-2 lg:py-1.5 lg:pl-3",
              isActive
                ? "border-[color:var(--accent)] font-semibold text-[color:var(--accent-strong)]"
                : "text-[color:var(--muted)] hover:text-[color:var(--accent-strong)]",
            ].join(" ")}
          >
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}
