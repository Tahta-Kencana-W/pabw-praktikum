const profil = {
  nama: "Tahta Kencana Wijaya",
  peran: "Mahasiswa Informatika yang belajar front-end",
  keahlian: ["HTML", "CSS", "JavaScript"],
};

export const daftarProyek = [
  {
    judul: "Halaman Profil",
    tahun: 2026,
    selesai: true,
    kategori: "web"
  },
  {
    judul: "Katalog Produk",
    tahun: 2026,
    selesai: false,
    kategori: "web"
  },
  {
    judul: "Aplikasi Antrean Parkir",
    tahun: 2026,
    selesai: true,
    kategori: "aplikasi"
  }
];

console.table(profil.keahlian);
console.table(daftarProyek);

const selesai = daftarProyek.filter((proyek) => proyek.selesai);
console.table(selesai);

const katalog = daftarProyek.find((proyek) => proyek.judul === "Katalog Produk");
console.log(katalog);

const daftarJudul = daftarProyek.map((proyek) => proyek.judul);
console.log("Daftar Judul Proyek:", daftarJudul);

const salinanTerurut = [...daftarProyek].sort((a, b) => a.tahun - b.tahun);
console.log("Hasil Sort (Salinan):", salinanTerurut);
console.log("Data Asli Setelah Sort:", daftarProyek);


