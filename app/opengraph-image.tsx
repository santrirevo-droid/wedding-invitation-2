import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { couple, venue } from "@/lib/weddingData";
import { weddingDay, weddingMonthName, weddingYear } from "@/lib/weddingDate";

export const alt = `The Wedding of ${couple.bride.shortName} & ${couple.groom.shortName}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Shown as the link-preview thumbnail when the invite link is shared in
// WhatsApp/Telegram/etc — mirrors the cover's ivory-and-gold look so the
// preview reads as the same invitation, not a generic site card.
export default async function Image() {
  const [medium, semibold, mediumItalic] = await Promise.all([
    readFile(join(process.cwd(), "assets/fonts/CormorantGaramond-Medium.ttf")),
    readFile(join(process.cwd(), "assets/fonts/CormorantGaramond-SemiBold.ttf")),
    readFile(join(process.cwd(), "assets/fonts/CormorantGaramond-MediumItalic.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #faf7ec 0%, #f1edd8 55%, #e1decb 100%)",
          position: "relative",
        }}
      >
        {/* atmosphere, echoing the cover's corner accents — soft gradient
            blobs rather than a floral photo, so this has no dependency on
            any particular image file */}
        <div
          style={{
            position: "absolute",
            top: -90,
            left: -90,
            width: 420,
            height: 420,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(124,138,92,0.35) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -120,
            right: -100,
            width: 460,
            height: 460,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(77,92,58,0.3) 0%, transparent 70%)",
          }}
        />

        {/* hairline frame */}
        <div
          style={{
            position: "absolute",
            inset: 28,
            border: "1.5px solid rgba(77,92,58,0.35)",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              fontFamily: "Cormorant Garamond",
              fontSize: 26,
              fontWeight: 500,
              letterSpacing: 10,
              textTransform: "uppercase",
              color: "#6b5637",
            }}
          >
            The Wedding Of
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 34,
              fontFamily: "Cormorant Garamond",
              fontSize: 168,
              fontWeight: 600,
              color: "#453824",
            }}
          >
            <span>{couple.bride.shortName}</span>
            <span
              style={{
                fontStyle: "italic",
                fontWeight: 500,
                fontSize: 92,
                color: "#6b5637",
              }}
            >
              &amp;
            </span>
            <span>{couple.groom.shortName}</span>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: 6,
            }}
          >
            <div
              style={{
                fontFamily: "Cormorant Garamond",
                fontSize: 50,
                fontWeight: 500,
                letterSpacing: 6,
                textTransform: "uppercase",
                color: "#6b5637",
              }}
            >
              Ahad
            </div>
            <div
              style={{
                fontFamily: "Cormorant Garamond",
                fontSize: 150,
                fontWeight: 600,
                color: "#453824",
                marginTop: -10,
              }}
            >
              {`${weddingDay} ${weddingMonthName} ${weddingYear}`}
            </div>
          </div>

          <div
            style={{
              fontFamily: "Cormorant Garamond",
              fontSize: 22,
              fontWeight: 500,
              color: "#7c6d54",
              marginTop: -6,
            }}
          >
            {venue.name}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Cormorant Garamond", data: medium, weight: 500, style: "normal" },
        { name: "Cormorant Garamond", data: semibold, weight: 600, style: "normal" },
        { name: "Cormorant Garamond", data: mediumItalic, weight: 500, style: "italic" },
      ],
    }
  );
}
