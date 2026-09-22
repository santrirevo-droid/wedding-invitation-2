/**
 * The bride's half of the pair — see GroomAvatar's note on why faceless.
 * Hijab instead of hair, a small floral cluster at the collar instead of
 * a tie, otherwise the same construction (arch clip, skin-tone plane,
 * layered shapes) so the two read as a matched set.
 */
export default function BrideAvatar({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 300 360"
      className={className}
      role="img"
      aria-label="Ilustrasi mempelai wanita"
    >
      <defs>
        <clipPath id="bride-arch">
          <path d="M0,180 A150,150 0 0 1 300,180 L300,360 L0,360 Z" />
        </clipPath>
        <linearGradient id="bride-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fdfbf3" />
          <stop offset="100%" stopColor="#e1decb" />
        </linearGradient>
        <linearGradient id="bride-hijab" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8a9968" />
          <stop offset="100%" stopColor="#5c6f42" />
        </linearGradient>
        <linearGradient id="bride-hijab-inner" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c5cfa8" />
          <stop offset="100%" stopColor="#9fae7a" />
        </linearGradient>
      </defs>

      <g clipPath="url(#bride-arch)">
        <rect x="0" y="0" width="300" height="360" fill="url(#bride-bg)" />

        {/* shoulders / dress body, softer taper than the groom's */}
        <path
          d="M40,360 C46,286 82,246 122,232 L178,232 C218,246 254,286 260,360 Z"
          fill="#f0ecd8"
        />
        <path
          d="M40,360 C46,286 82,246 122,232 L150,232 L150,360 Z"
          fill="#e8e2c8"
        />

        {/* draped hijab — outer veil falling past the shoulders */}
        <path
          d="M150,50 C104,50 70,84 66,128 C60,180 62,240 78,300 C90,340 118,360 150,360 C182,360 210,340 222,300 C238,240 240,180 234,128 C230,84 196,50 150,50 Z"
          fill="url(#bride-hijab)"
        />

        {/* neck */}
        <rect x="130" y="186" width="40" height="46" rx="14" fill="#e8bcae" />

        {/* face — no features */}
        <ellipse cx="150" cy="150" rx="46" ry="56" fill="#f0d3c4" />
        <ellipse cx="150" cy="154" rx="46" ry="52" fill="#eeccb9" opacity="0.5" />

        {/* inner hijab layer framing the face */}
        <path
          d="M150,68 C118,68 96,92 92,124 C88,150 92,176 104,196 C98,168 100,138 112,116 C122,98 134,88 150,86 C166,88 178,98 188,116 C200,138 202,168 196,196 C208,176 212,150 208,124 C204,92 182,68 150,68 Z"
          fill="url(#bride-hijab-inner)"
        />

        {/* small floral cluster at the collar */}
        <g>
          <circle cx="136" cy="264" r="8" fill="#e8dcc0" />
          <circle cx="150" cy="256" r="9" fill="#d4c49a" />
          <circle cx="164" cy="264" r="8" fill="#e8dcc0" />
          <circle cx="150" cy="272" r="7" fill="#c2a267" />
          <circle cx="150" cy="264" r="4" fill="#5c4726" />
        </g>
      </g>

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
