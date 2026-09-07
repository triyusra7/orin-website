interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  /** Optional localized segment tag shown above the quote (e.g. "Kids & Parents"). */
  segment?: string;
  /** Optional achievement shown as a yellow pill (e.g. "HSK 5 · 289/300"). */
  highlight?: string;
}

/** Shared testimonial card (PRD §8 TestimonialCard): white rounded card,
 *  maroon quote mark, bold name, muted role, optional highlight pill. */
export function TestimonialCard({
  quote,
  name,
  role,
  segment,
  highlight,
}: TestimonialCardProps) {
  return (
    <figure className="card-hover-lift flex h-full flex-col gap-3 rounded-2xl bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <span
          aria-hidden
          className="font-display text-5xl font-extrabold leading-none text-brand-maroon"
        >
          &ldquo;
        </span>
      </div>
      <blockquote className="text-sm leading-relaxed text-brand-ink/85">
        {quote}
      </blockquote>
      <figcaption className="mt-auto pt-2">
        <p className="font-display font-bold text-brand-ink">{name}</p>
        <p className="text-xs font-semibold text-brand-ink/60">{role}</p>
      </figcaption>
    </figure>
  );
}
