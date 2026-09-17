import { couple, events } from "@/lib/weddingData";

/** Matches the `?to=` format read by useGuestName on the invitation cover/RSVP. */
export function buildInviteLink(origin: string, guestName: string): string {
  return `${origin}/?to=${encodeURIComponent(guestName)}`;
}

/** The default WhatsApp invite text — editable by the sender before sending
 * (see ShareMessageDialog), so this is exported on its own rather than
 * baked directly into a URL. */
export function buildWhatsAppMessage(inviteLink: string, guestName: string): string {
  return (
    `Assalamu'alaikum warahmatullahi wabarakatuh.\n\n` +
    `Yth. Bapak/Ibu/Saudara/i\n${guestName}\n\n` +
    `Dengan penuh rasa syukur, kami mengundang Bapak/Ibu/Saudara/i untuk menjadi bagian dari momen bahagia pernikahan ` +
    `${couple.groom.name} & ${couple.bride.name} yang insyaAllah akan diselenggarakan pada ${events[0].date}.\n\n` +
    `Informasi lengkap mengenai acara, serta kolom doa dan ucapan, dapat diakses melalui tautan berikut:\n\n` +
    `🔗 ${inviteLink}\n\n` +
    `Terima kasih atas perhatian, doa, dan restunya.\n\n` +
    `Wassalamu'alaikum warahmatullahi wabarakatuh.`
  );
}

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}

export function buildWhatsAppShareUrl(inviteLink: string, guestName: string): string {
  return buildWhatsAppUrl(buildWhatsAppMessage(inviteLink, guestName));
}
