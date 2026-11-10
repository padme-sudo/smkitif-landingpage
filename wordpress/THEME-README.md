# SMK IT Ihsanul Fikri Landing (WordPress Theme)

Tema WordPress minimal untuk menampilkan **landing page React (Vite)** SMK IT Ihsanul Fikri Mungkid sebagai halaman depan situs.

Tema ini membungkus hasil build React statis (`landing/`) dan menyuntikkan data berita terbaru dari WordPress ke landing page.

## Fitur

- Landing page React + Tailwind (hasil build Vite) sebagai front page.
- **Berita otomatis**: 3 post *Publish* terbaru diambil via `WP_Query` dan disuntikkan ke `window.__SMKIT__.berita` (tanpa REST fetch/CORS tambahan).
- Aset ber-hash dimuat berdasarkan `.vite/manifest.json` (`front-page.php`).
- Font: Satoshi & Dancing Script (Fontshare CDN).
- Tetap memanggil `wp_head()` / `wp_footer()` agar plugin SEO, analytics, dan admin bar dapat berjalan.

## Struktur tema

```text
smkit-landing/
├─ style.css            # Header tema (wajib WordPress)
├─ index.php            # Fallback template
├─ front-page.php       # Enqueue aset build + injeksi berita + mount React
├─ README.md
└─ landing/             # Isi folder dist/ hasil build Vite
   ├─ .vite/
   │  └─ manifest.json
   ├─ assets/
   ├─ index.html
   └─ favicon.svg (jika ada)
```

## Instalasi

### Upload ZIP (disarankan)
1. Buka **WP Admin → Tampilan/Appearance → Tema/Themes → Tambah Baru/Add New → Unggah Tema/Upload Theme**.
2. Unggah `smkit-landing-theme.zip` → **Instal** → **Aktifkan**.
3. Buka **Pengaturan/Settings → Membaca/Reading**:
   - **Tampilan beranda Anda** = *Halaman statis / A static page*
   - Pilih halaman apa saja sebagai **Beranda/Homepage** (buat Page “Beranda” jika belum ada).
4. Buka halaman depan situs.

### Instal manual
1. Salin folder `smkit-landing/` ke `wp-content/themes/`.
2. Aktifkan tema dan atur halaman depan statis seperti di atas.

## Berita

`front-page.php` mengambil 3 post terbaru dan mengirimnya sebagai:

```js
window.__SMKIT__ = {
  wpApiBase: "https://contoh.sch.id",
  berita: [
    { id, title, excerpt, category, date, author, image, href }
  ]
};
```

Landing akan memakai data ini secara langsung. Jika belum ada post *Publish*, komponen berita menampilkan data contoh bawaan.

## Pengembangan (update tampilan React)

Tema ini berisi **hasil build** React. Untuk mengubah desain/kode sumber:

1. Ubah kode di project sumber (React + Vite).
2. Jalankan `npm run build`.
3. Ganti **seluruh isi** folder `landing/` di tema ini dengan isi folder `dist/` terbaru (termasuk `.vite/manifest.json`).

> Mengubah/menerbitkan post di WordPress **tidak** memerlukan build ulang.

## Catatan

- Karena `wp_head()`/`wp_footer()` dipanggil, plugin dapat menambah CSS/JS; jika terjadi bentrok gaya, isolasi/nonaktifkan stylesheet tema lain pada template ini.
- Font dimuat dari Fontshare (eksternal) — memerlukan koneksi internet. Untuk penggunaan offline, self-host font dan sesuaikan.
- Butuh WordPress 6.0+ dan PHP 7.4+ (disarankan lebih baru).

## Lisensi

Sesuaikan lisensi sesuai kebutuhan repositori/sekolah Anda. Kode sumber React dan aset (logo, gambar, konten) mengikuti ketentuan pemilik masing-masing.