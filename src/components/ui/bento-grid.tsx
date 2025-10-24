"use client";

import { cn } from "@/lib/utils";
import { Spotlight } from "./spotlight";

type BentoGridProps = {
  className?: string;
  children: React.ReactNode;
};

type BentoGridItemProps = {
  className?: string;
  title: string;
  description: string;
  accent?: React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
};

export function BentoGrid({ className, children }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid auto-rows-[20rem] gap-6 md:grid-cols-3",
        "md:[&>*:nth-child(1)]:col-span-2 md:[&>*:nth-child(1)]:row-span-2",
        "md:[&>*:nth-child(3)]:col-span-2",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function BentoGridItem({
  className,
  title,
  description,
  accent,
  header,
  icon,
}: BentoGridItemProps) {
  return (
    <div
      className={cn(
        "group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-outline/40 bg-surface/90 p-6 shadow-[0_30px_90px_rgba(8,12,24,0.18)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-outline/70 hover:shadow-[0_40px_110px_rgba(8,12,24,0.2)]",
        className,
      )}
      data-cursor-target
      data-cursor-text={`${title} •`}
      data-cursor-padding="140"
    >
      <div className="relative z-20 flex flex-col gap-4">
        {accent ?? (
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-outline/40 bg-surface/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.32em] text-foreground/55 shadow-inner-strong">
            Featured
          </span>
        )}
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-foreground">{title}</h3>
          <p className="text-sm text-foreground/65">{description}</p>
        </div>
      </div>
      <div className="relative z-20 mt-4 flex items-end justify-between gap-4">
        <div className="flex-1">{header}</div>
        {icon && (
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-outline/40 bg-surface/70 text-accent shadow-inner-strong">
            {icon}
          </div>
        )}
      </div>
      <Spotlight className="rounded-3xl blur-3xl" fill="rgba(var(--glow-rgb),0.32)" />
    </div>
  );
}

