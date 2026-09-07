import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
}

export function SectionHeading({
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-10 flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <h2 className="font-display text-3xl font-extrabold text-brand-maroon lg:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-brand-ink/70">{description}</p>
      ) : null}
    </div>
  );
}
