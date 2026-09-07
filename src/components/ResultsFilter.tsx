import { TestimonialCard } from "@/components/TestimonialCard";

export type TestimonialSegment = "kids" | "exam" | "adults" | "abroad";
export type FilterKey = "all" | TestimonialSegment;

export interface ResultsTestimonial {
  name: string;
  role: string;
  quote: string;
  segment: TestimonialSegment;
  highlight?: string;
}

interface ResultsFilterProps {
  items: ResultsTestimonial[];
  /** Localized pill labels, keyed by segment (plus "all"). */
  labels: Record<FilterKey, string>;
}

/** Client-side segment filter for /results testimonials (PRD §5.5:
 *  "filterable by segment if easy to build"). */
export function ResultsFilter({ items, labels }: ResultsFilterProps) {
  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <TestimonialCard
            key={item.name}
            quote={item.quote}
            name={item.name}
            role={item.role}
            segment={labels[item.segment]}
            highlight={item.highlight}
          />
        ))}
      </div>
    </div>
  );
}
