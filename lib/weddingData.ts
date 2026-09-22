export const WEDDING_DATE_ISO = "2026-11-01T09:00:00+07:00";

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
    shortName: "Amri",
    role: "putra",
    father: "Bapak Mahmuddin Tanjung",
    mother: "Ibu Rahimah Dalimunthe",
    instagram: "@amri_tanjung03",
  },
  bride: {
    name: "Nufus Nurcholisoh",
    shortName: "Nufus",
    role: "putri",
    father: "Bapak Dudin Sadudin",
    mother: "Ibu Resa Aryanti",
    instagram: "@nufus.nch",
  },
};

export const events = [
  {
    title: "Akad Nikah",
    time: "09.00 WIB — Selesai",
    date: "Minggu, 01 November 2026",
  },
  {
    title: "Resepsi",
    time: "11.00 WIB — Selesai",
    date: "Minggu, 01 November 2026",
  },
];

export const venue = {
  name: "Kediaman Mempelai Wanita",
  location: "Kp. Talaga, Kelurahan Karaton, Kabupaten Pandeglang, Banten, Indonesia",
  mapsUrl: "https://maps.app.goo.gl/bebzMQ4xbJHFx1DZ9",
};

export const bankAccounts = [
  { bank: "BSI", number: "7258667648", holder: "Saiful Amri Tanjung" },
  { bank: "BCA", number: "5421457299", holder: "Nufus Nurcholisoh" },
];

export const giftAddress = {
  recipient: "Nufus Nurcholisoh",
  address: "Kp. Talaga, Kelurahan Karaton, Kabupaten Pandeglang, Banten, Indonesia",
};
