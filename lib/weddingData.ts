export const WEDDING_DATE_ISO = "2026-11-01T08:00:00+07:00";

export type CoupleRole = "putra" | "putri";

export const couple: Record<
  "groom" | "bride",
  {
    name: string;
    shortName: string;
    role: CoupleRole;
    father: string;
    mother: string;
    instagram: string;
  }
> = {
  groom: {
    name: "Saiful Amri Tanjung",
    shortName: "Saiful",
    role: "putra",
    father: "Bapak Mahmuddin Tanjung",
    mother: "Ibu Rahimah Dalimunthe",
    instagram: "@amri_tanjung03",
  },
  bride: {
    name: "Nufus Nurcholisoh",
    shortName: "Nufus",
    role: "putri",
    father: "Bapak Dudin S",
    mother: "Ibu Resa Aryanti",
    instagram: "@nufus.nch",
  },
};

export const events = [
  {
    title: "Akad Nikah",
    time: "08.00 WIB — Selesai",
    date: "Minggu, 01 November 2026",
  },
  {
    title: "Resepsi",
    time: "10.00 WIB — Selesai",
    date: "Minggu, 01 November 2026",
  },
];

export const venue = {
  name: "Kediaman Mempelai Wanita",
  location:
    "Rumah samping Masjid Kp. Talaga, Jl. Talaga, Karaton, Kabupaten Pandeglang, Banten, Indonesia",
  mapsUrl: "https://maps.app.goo.gl/bebzMQ4xbJHFx1DZ9",
};

export const bankAccounts = [
  { bank: "BCA", number: "0891378342", holder: "Saiful Amri Tanjung" },
];

export const giftAddress = {
  recipient: "Saiful Amri Tanjung",
  address:
    "Rumah samping Masjid Kp. Talaga, Jl. Talaga, Karaton, Kabupaten Pandeglang, Banten, Indonesia",
};
