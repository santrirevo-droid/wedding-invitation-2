// TODO: ganti seluruh data di bawah ini sesuai pasangan & acara yang sebenarnya.
export const WEDDING_DATE_ISO = "2027-01-01T08:00:00+07:00";

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
    date: "Jumat, 1 Januari 2027",
  },
  {
    title: "Resepsi",
    time: "12.00 WIB — 17.00 WIB",
    date: "Jumat, 1 Januari 2027",
  },
];

export const venue = {
  name: "Nama Gedung / Venue",
  location: "Kota, Provinsi",
  mapsUrl: "https://maps.app.goo.gl/",
};

export const bankAccounts = [
  { bank: "Nama Bank", number: "0000000000", holder: "Nama Pemilik Rekening" },
];

export const giftAddress = {
  recipient: "Nama Penerima",
  address: "Alamat lengkap penerima hadiah",
};
