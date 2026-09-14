/**
 * The page's material: four fixed layers stacked behind all content —
 * base gradient, two soft gold washes for depth, film grain, then a
 * vignette. Rendered once in the root layout.
 *
 * The grain and vignette are what stop the dark ground reading as a flat
 * fill; without them the same colors look like a cheap CSS background.
 *
 * Needs an explicit negative z-index: a `position: fixed` element with
 * z-index:auto paints *after* normal-flow siblings regardless of DOM order
 * (CSS2.1 stacking order, step 6 vs step 3) — it only stayed behind content
 * on pages where something else (e.g. Lenis's transformed scroll wrapper)
 * happened to give that content its own stacking context. Explicit -z-10
 * makes it correct everywhere.
 */
export default function BackgroundPattern() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
      {/* base — warmer at the top, deepest at the foot of the page */}
      <div className="absolute inset-0 bg-gradient-to-b from-maroon-light via-maroon to-maroon-deep" />

      {/* two off-centre gold washes: the page never looks evenly lit */}
      <div
        className="absolute inset-0 opacity-[0.55]"
        style={{
          background:
            "radial-gradient(60% 40% at 78% 8%, rgba(217,188,130,0.13), transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          background:
            "radial-gradient(52% 38% at 12% 62%, rgba(168,135,63,0.11), transparent 72%)",
        }}
      />

      {/* film grain */}
      <div
        className="absolute inset-0 opacity-[0.16] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* vignette — pulls the eye to the centre column */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 75% at 50% 45%, transparent 42%, rgba(0,0,0,0.42) 100%)",
        }}
      />
    </div>
  );
}
