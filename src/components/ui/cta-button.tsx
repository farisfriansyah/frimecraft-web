import Link from "next/link";
import type { ReactNode } from "react";

type CtaSize = "md" | "lg";
type CtaVariant = "primary" | "secondary";

type BaseProps = {
  children: ReactNode;
  size?: CtaSize;
  variant?: CtaVariant;
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
  "group relative inline-flex items-center justify-center overflow-hidden whitespace-nowrap rounded-xl border text-center text-sm font-semibold transition-all duration-300 ease-in-out";

const variantClasses: Record<CtaVariant, string> = {
  primary:
    "border-[color:var(--accent)] bg-[color:var(--accent)] text-white hover:border-[color:var(--accent-strong)] hover:bg-[color:var(--accent-strong)]",
  secondary:
    "border-[color:var(--line)] bg-transparent text-[color:var(--ink)] hover:border-[color:var(--accent)] hover:text-[color:var(--accent-strong)]",
};

const sizeClasses: Record<CtaSize, string> = {
  md: "px-5 py-3 text-[12px]",
  lg: "px-7 py-4 text-[15px]",
};

function joinClasses(...values: Array<string | undefined>): string {
  return values.filter(Boolean).join(" ");
}

function CtaButtonShell({ children, variant = "primary", className }: BaseProps) {
  return (
    <>
      <span
        aria-hidden="true"
        className={`absolute inset-y-0 left-0 z-[1] block w-0 transition-[width] duration-[500ms] [transition-timing-function:cubic-bezier(0.19,1,0.22,1)] group-hover:w-full ${variant === "primary" ? "bg-[color:var(--accent-strong)]" : "bg-[color:var(--accent-soft)]"}`}
      />
      <span className={joinClasses("relative z-[2] inline-block", variant === "primary" ? "text-white" : "text-[color:var(--ink)]", className)}>{children}</span>
    </>
  );
}

export function CtaButtonLink({ href, children, size = "md", variant = "primary", className }: CtaLinkProps) {
  return (
    <Link href={href} className={joinClasses(baseClasses, variantClasses[variant], sizeClasses[size], className)}>
      <CtaButtonShell size={size} variant={variant}>{children}</CtaButtonShell>
    </Link>
  );
}

export function CtaButtonExternal({
  href,
  children,
  size = "md",
  variant = "primary",
  className,
  target = "_blank",
  rel,
}: CtaExternalProps) {
  const safeRel = rel ?? (target === "_blank" ? "noreferrer" : undefined);

  return (
    <a href={href} target={target} rel={safeRel} className={joinClasses(baseClasses, variantClasses[variant], sizeClasses[size], className)}>
      <CtaButtonShell size={size} variant={variant}>{children}</CtaButtonShell>
    </a>
  );
}
