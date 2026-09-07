import { WhatsAppLink } from "@/components/WhatsAppLink";

interface CTABandProps {
  title: string;
  description: string;
  ctaLabel: string;
  prefill: string;
  source: string;
}

/** Closing maroon CTA band (PRD §5.1, §8 CTASection). */
export function CTABand({ title, description, ctaLabel, prefill, source }: CTABandProps) {
  return (
    <section className="bg-brand-maroon">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-16 text-center lg:py-20">
        <h2 className="max-w-2xl font-display text-3xl font-extrabold text-white lg:text-4xl">
          {title}
        </h2>
        <p className="max-w-xl text-brand-cream/90">{description}</p>
        <WhatsAppLink
          prefill={prefill}
          source={source}
          context="cta-band"
          className="rounded-full bg-brand-yellow px-8 py-4 text-base font-bold text-brand-maroon shadow-md transition-transform hover:scale-[1.03] motion-reduce:transition-none"
        >
          {ctaLabel}
        </WhatsAppLink>
      </div>
    </section>
  );
}
