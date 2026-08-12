/** Static content pages (about, feedback, contact, privacy, terms) share this frame. */
import type { ReactNode } from "react";

export function ContentPage({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-4xl px-5 pt-10">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">{eyebrow}</p>
      <h1 className="mt-3 text-3xl font-bold sm:text-4xl">{title}</h1>
      {intro ? <p className="mt-3 text-muted-foreground">{intro}</p> : null}
      <div className="glass mt-8 space-y-5 rounded-3xl p-6 text-sm leading-relaxed text-muted-foreground sm:p-8">
        {children}
      </div>
    </div>
  );
}
