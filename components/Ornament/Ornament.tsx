type OrnamentVariant = "flourish" | "corner" | "crest";

type OrnamentProps = {
  variant: OrnamentVariant;
  className?: string;
};

/**
 * The invitation's drawn ornaments — engraved hairlines rather than the
 * stock watercolour clipart the template shipped with. All strokes use
 * `currentColor`, so placement decides the colour (they're always gold in
 * practice) and a single `text-accent/50` controls weight.
 *
 * Deliberately few: one horizontal flourish (section headings, dividers),
 * one corner (the cover's frame, rotated for each corner), one vertical
 * crest (above the couple's name). Everything on the page is built from
 * these three, which is what keeps it feeling art-directed instead of
 * decorated.
 */
export default function Ornament({ variant, className = "" }: OrnamentProps) {
  if (variant === "flourish") {
    return (
      <svg
        viewBox="0 0 260 24"
        fill="none"
        stroke="currentColor"
        aria-hidden="true"
        className={className}
      >
        {/* tapered rules running in from both ends */}
        <path d="M2 12h84" strokeWidth="0.75" opacity="0.28" />
        <path d="M46 12h40" strokeWidth="0.75" opacity="0.7" />
        <path d="M174 12h84" strokeWidth="0.75" opacity="0.28" />
        <path d="M174 12h40" strokeWidth="0.75" opacity="0.7" />

        {/* paired leaves curling toward the centre */}
        <path
          d="M86 12c8-7 16-8 20-2-6 5-14 5-20 2Z"
          strokeWidth="0.75"
          opacity="0.85"
        />
        <path
          d="M174 12c-8-7-16-8-20-2 6 5 14 5 20 2Z"
          strokeWidth="0.75"
          opacity="0.85"
        />

        {/* centre lozenge */}
        <path d="M130 3.5 137 12l-7 8.5L123 12Z" strokeWidth="0.75" />
        <circle cx="130" cy="12" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (variant === "corner") {
    return (
      <svg
        viewBox="0 0 132 132"
        fill="none"
        stroke="currentColor"
        aria-hidden="true"
        className={className}
      >
        {/* double L-rule, the outer one heavier */}
        <path d="M1 76V1h75" strokeWidth="0.9" opacity="0.75" />
        <path d="M11 68V11h57" strokeWidth="0.6" opacity="0.4" />

        {/* botanical curl springing from the inner corner */}
        <path
          d="M11 11c26 3 41 17 45 42"
          strokeWidth="0.7"
          opacity="0.55"
        />
        <path
          d="M28 17c7 1 11 5 12 12-7 0-11-4-12-12Z"
          strokeWidth="0.65"
          opacity="0.8"
        />
        <path
          d="M17 28c1 7 5 11 12 12 0-7-4-11-12-12Z"
          strokeWidth="0.65"
          opacity="0.8"
        />
        <circle cx="56" cy="56" r="1.6" fill="currentColor" stroke="none" opacity="0.9" />
      </svg>
    );
  }

  // crest — a small upright sprig, used above the couple's name
  return (
    <svg
      viewBox="0 0 64 44"
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M32 42V14" strokeWidth="0.75" opacity="0.7" />
      <path
        d="M32 16c-9-1-14-6-15-14 9 1 14 6 15 14Z"
        strokeWidth="0.75"
        opacity="0.85"
      />
      <path
        d="M32 16c9-1 14-6 15-14-9 1-14 6-15 14Z"
        strokeWidth="0.75"
        opacity="0.85"
      />
      <path
        d="M32 28c-7-1-11-5-12-11 7 1 11 5 12 11Z"
        strokeWidth="0.7"
        opacity="0.55"
      />
      <path
        d="M32 28c7-1 11-5 12-11-7 1-11 5-12 11Z"
        strokeWidth="0.7"
        opacity="0.55"
      />
      <circle cx="32" cy="9" r="2" strokeWidth="0.75" />
    </svg>
  );
}
