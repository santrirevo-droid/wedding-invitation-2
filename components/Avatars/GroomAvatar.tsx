/**
 * A faceless illustrated bust — hair, skin tone, suit and tie, clipped to
 * an arch — the same "cartoon portrait standing in for a photo" device
 * used across Indonesian wedding-invitation templates (see the
 * by.memonika.com reference this was modelled on). Faceless is
 * deliberate, not a placeholder gap: no eyes/nose/mouth means it never
 * needs to resemble the actual groom, so it can ship correct on day one.
 * Pure inline SVG — no image asset, so it costs nothing to serve and
 * recolours instantly if the palette ever changes.
 */
export default function GroomAvatar({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 300 360"
      className={className}
      role="img"
      aria-label="Ilustrasi mempelai pria"
    >
      <defs>
        <clipPath id="groom-arch">
          <path d="M0,180 A150,150 0 0 1 300,180 L300,360 L0,360 Z" />
        </clipPath>
        <linearGradient id="groom-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fdfbf3" />
          <stop offset="100%" stopColor="#e1decb" />
        </linearGradient>
        <linearGradient id="groom-suit" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5c4a32" />
          <stop offset="100%" stopColor="#3a2e1e" />
        </linearGradient>
      </defs>

      <g clipPath="url(#groom-arch)">
        <rect x="0" y="0" width="300" height="360" fill="url(#groom-bg)" />

        {/* shoulders / suit body */}
        <path
          d="M35,360 C40,280 78,240 118,224 L182,224 C222,240 260,280 265,360 Z"
          fill="url(#groom-suit)"
        />
        {/* lapels */}
        <path d="M150,224 L118,224 L128,300 L150,270 Z" fill="#2e2416" />
        <path d="M150,224 L182,224 L172,300 L150,270 Z" fill="#2e2416" />
        {/* shirt collar */}
        <path d="M150,224 L134,236 L150,258 L166,236 Z" fill="#faf6ec" />
        {/* tie */}
        <path d="M143,236 L157,236 L152,300 L150,312 L148,300 Z" fill="#5c8a3f" />

        {/* neck */}
        <rect x="130" y="186" width="40" height="46" rx="14" fill="#e8bcae" />

        {/* face — no features, just the plane a real portrait would fill */}
        <ellipse cx="150" cy="146" rx="50" ry="60" fill="#f0d3c4" />
        <ellipse cx="150" cy="150" rx="50" ry="56" fill="#eeccb9" opacity="0.55" />

        {/* hair — one simple closed dome so it fills solid instead of
            leaving an unintended ring/hole where two sub-curves met */}
        <path
          d="M90,172 C84,100 110,54 150,54 C190,54 216,100 210,172 C203,128 182,104 150,104 C118,104 97,128 90,172 Z"
          fill="#2c2024"
        />
      </g>

      {/* arch outline, echoing the hairline frames the rest of the page uses */}
      <path
        d="M0,180 A150,150 0 0 1 300,180 L300,358 L0,358 Z"
        fill="none"
        stroke="#7c8a5c"
        strokeOpacity="0.4"
        strokeWidth="2"
      />
    </svg>
  );
}
