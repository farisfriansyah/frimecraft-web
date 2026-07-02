"use client";

import { useEffect, useMemo, useState } from "react";

type ProfileSectionItem = {
  id: string;
  label: string;
};

type ProfileScrollspyNavProps = {
  items: ProfileSectionItem[];
};

export function ProfileScrollspyNav({ items }: ProfileScrollspyNavProps) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id || "");

  const validItems = useMemo(() => items.filter((item) => item.id.length > 0), [items]);

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
    <nav className="space-y-1.5 text-sm">
      {validItems.map((item) => {
        const isActive = item.id === activeId;

        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={[
              "block rounded-xl px-3 py-2 transition",
              isActive
                ? "bg-[color:var(--accent)] text-white shadow-[0_8px_20px_rgba(0,110,168,0.28)]"
                : "hover:bg-black/5",
            ].join(" ")}
          >
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}
