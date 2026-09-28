## Pertemuan 4 — Design token halaman profil
 
- Berkas gaya yang akan dibuat: tokens.css, base.css,
  layout.css, komponen.css, tema.css
- Warna utama: #CCFF00 (Neon Lime), dipilih karena memberikan kesan energik
 
### Token yang saya tetapkan
 
-| Token | Nilai | Untuk apa |
-| --color-bg | #0B0F12 | latar halaman |
-| --color-fg | #F1F5F9 | warna teks utama |
-| --color-surface | #182026 | latar kartu dan panel |
-| --color-border | #2B3742 | garis pemisah dan tepi kotak |
-| --color-primary | #CCFF00 | tombol, tautan, penanda |
-| --color-danger | #FF3B30 | peringatan dan isian tidak sah |
-| --color-focus | #A3E635 | garis fokus papan ketik |
-| --space-1 | 0.25rem | jarak paling rapat di dalam komponen |
-| --space-2 | 0.5rem | jarak antar label dan isian |
-| --space-3 | 1rem | jarak di dalam kartu |
-| --space-4 | 1.5rem | jarak standar antar elemen |
-| --space-6 | 2.5rem | jarak antar bagian halaman |
-| --radius-md | 0.25rem | sudut tombol dan kartu |
-| --radius-full | 9999px | bentuk pil untuk lencana |
-| --shadow-1 | 0 4px 20px rgba(0,0,0,0.5) | bayangan kartu |
-| --text-sm | 0.875rem | keterangan dan teks bantu |
-| --text-md | 1rem | teks isi |
-| --text-xl | 1.5rem | judul bagian |
-| --text-3xl | 2.5rem | judul halaman |

Kriteria selesai saya: mengubah --color-primary di satu baris
harus mengubah warna tombol, tautan, judul, dan garis fokus.

Pengungkapan AI

Dalam pengerjaan tugas ini, saya banyak mengandalkan bantuan AI (Gemini) untuk menghasilkan kode, mengatasi error, dan mengisi lembar kerja praktikum:

HTML (profil.html & informasi.html):
Kerangka dasar HTML, struktur tabel pencatatan beban, form input, perapian semantik, serta seluruh teks konten informasi (panduan suplemen dan 4 mitos gym) dibuat/dituliskan langsung oleh AI berdasarkan permintaan saya. Peran saya adalah mengarahkan topik (gym/latihan beban).

CSS & Design Tokens (tokens.css, tema.css, base.css, layout.css, komponen.css):
Penentuan kode hex palet warna neon/dark gym (#CCFF00, #0B0F12, dll.), susunan nilai token spasi/font, pemisahan CSS ke lima berkas, hingga styling tata letak dan tombol sebagian besar di-generate oleh AI.
Logika pengalih tema tanpa JavaScript memakai :root:has(#tema:checked) dan @media (prefers-color-scheme: dark) diberikan solusinya oleh AI sesuai instruksi modul.

JavaScript DOM:
Fungsi penambahan baris data baru ke tabel saat form disubmit (addEventListener dan manipulasi elemen tabel) sepenuhnya ditulis oleh AI.