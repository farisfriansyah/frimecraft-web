import Link from "next/link";
import type { ReactNode } from "react";

type CtaSize = "md" | "lg";

type BaseProps = {
  children: ReactNode;
  size?: CtaSize;
  className?: string;
};

type CtaLinkProps = BaseProps & {
  href: string;
};

type CtaExternalProps = BaseProps & {
  href: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
  rel?: string;
};

const baseClasses =
  "group relative inline-flex items-center justify-center overflow-hidden whitespace-nowrap rounded-[7px] border-0 bg-[#f1f1f1] px-5 py-3 text-center text-[12px] uppercase tracking-[0.8px] text-[#121212] transition-all duration-300 ease-in-out hover:bg-black hover:text-white";

const sizeClasses: Record<CtaSize, string> = {
  md: "px-5 py-3 text-[12px]",
  lg: "px-7 py-4 text-[14px]",
};

function joinClasses(...values: Array<string | undefined>): string {
  return values.filter(Boolean).join(" ");
}

function CtaButtonShell({ children, size = "md", className }: BaseProps) {
  return (
    <>
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 z-[1] block w-0 bg-black transition-[width] duration-[900ms] [transition-timing-function:cubic-bezier(0.19,1,0.22,1)] group-hover:w-full"
      />
      <span className={joinClasses("relative z-[2] inline-block", sizeClasses[size], className)}>{children}</span>
    </>
  );
}

export function CtaButtonLink({ href, children, size = "md", className }: CtaLinkProps) {
  return (
    <Link href={href} className={joinClasses(baseClasses, sizeClasses[size], className)}>
      <CtaButtonShell size={size}>{children}</CtaButtonShell>
    </Link>
  );
}

export function CtaButtonExternal({
  href,
  children,
  size = "md",
  className,
  target = "_blank",
  rel,
}: CtaExternalProps) {
  const safeRel = rel ?? (target === "_blank" ? "noreferrer" : undefined);

  return (
    <a href={href} target={target} rel={safeRel} className={joinClasses(baseClasses, sizeClasses[size], className)}>
      <CtaButtonShell size={size}>{children}</CtaButtonShell>
    </a>
  );
}
