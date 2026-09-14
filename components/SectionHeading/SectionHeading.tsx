import Ornament from "@/components/Ornament";

type SectionHeadingProps = {
  eyebrow: string;
  title?: string;
  className?: string;
  /** force a small kicker treatment even without a title — for spots where
   * the real "title" of the moment is a different element below (Footer's
   * closing names) rather than this label itself */
  kickerOnly?: boolean;
  /** overrides the title's font family — for one-off headings that break
   * from the shared font-display treatment (e.g. RSVP's script) */
  titleClassName?: string;
};

/**
 * Every section opens the same way: a hairline-tracked kicker, an oversized
 * gilded serif title, then a drawn flourish. The repetition is the point —
 * it's the page's masthead, and a consistent one is most of what separates
 * an art-directed invitation from a template.
 */
export default function SectionHeading({
  eyebrow,
  title,
  className = "",
  kickerOnly = false,
  titleClassName = "font-display font-light",
}: SectionHeadingProps) {
  const headline = title ?? eyebrow;
  const showKicker = Boolean(title) || kickerOnly;

  return (
    <div
      data-reveal
      className={`flex flex-col items-center text-center ${className}`}
    >
      {showKicker && (
        <p className="font-accent text-[10px] font-light uppercase tracking-[0.45em] text-accent/75">
          {eyebrow}
        </p>
      )}

      {!kickerOnly && (
        <h2
          className={`${titleClassName} text-gilded mt-3 text-[clamp(2.4rem,9vw,3.4rem)] leading-[1.06]`}
        >
          {headline}
        </h2>
      )}

      <Ornament
        variant="flourish"
        className={`${kickerOnly ? "mt-4" : "mt-5"} w-40 text-accent/55 sm:w-48`}
      />
    </div>
  );
}
