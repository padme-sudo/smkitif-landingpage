# Integrasi Landing Page React ke WordPress

Landing page ini adalah app **React + Vite** (`dist/`) yang bisa dipakai sebagai halaman depan WordPress sekolah.

> **Penting (memperbaiki “Broken theme: Stylesheet is missing”):**  
> Folder tema WordPress **wajib** memiliki `style.css` berisi header tema (Theme Name, dll).  
> Jangan menyalin folder project React mentah ke `wp-content/themes/` — itu penyebab error *“Stylesheet is missing”*.  
> Gunakan paket tema di folder `wordpress/` ini (sudah berisi `style.css`, `index.php`, `front-page.php`).

## Isi paket tema

```
wordpress/
  style.css        # WAJIB: header tema agar dikenali WordPress
  index.php        # Fallback template
  front-page.php   # Template front page: enqueue aset build + injeksi berita
  README.md
```

Saat dipasang, struktur di WordPress menjadi:

```
wp-content/themes/smkit-landing/
  style.css
  index.php
  front-page.php
  landing/              # isi folder dist/ hasil build
    .vite/manifest.json
    assets/...
    index.html
    favicon.svg (jika ada)
```

---

## Opsi A (disarankan): Install sebagai tema sendiri — cocok untuk Laragon

Mode ini paling mudah dan aman: landing jadi tema WordPress terpisah, berita diambil dari post WordPress lokal (disuntikkan PHP, **tanpa CORS**).

### 1. Build React
Di folder project:
```bash
npm install
npm run build
```
Hasilnya ada di `dist/` (termasuk `.vite/manifest.json`, `base: './'`).

### 2. Buat folder tema di WordPress lokal (Laragon)
Contoh WordPress lokal: `C:\laragon\www\smkit` → URL `http://smkit.test`.

1. Buat folder tema baru, misalnya:
   ```
   C:\laragon\www\smkit\wp-content\themes\smkit-landing\
   ```
2. Salin **3 file** ini dari folder `wordpress/` project ke dalam `smkit-landing\`:
   - `style.css`
   - `index.php`
   - `front-page.php`
3. Buat subfolder `landing\` di dalam `smkit-landing\`:
   ```
   ...\themes\smkit-landing\landing\
   ```
4. Salin **seluruh isi** folder `dist/` (hasil build) ke dalam `landing\` tersebut.  
   Pastikan `.vite\manifest.json` ikut tersalin.

### 3. Aktifkan tema & jadikan halaman depan
1. Buka `http://smkit.test/wp-admin`.
2. **Tampilan/Appearance → Tema/Themes** → aktifkan **“SMK IT Ihsanul Fikri Landing”**.  
   (Jika sebelumnya muncul “Broken Themes: react — Stylesheet is missing”, hapus folder tema yang rusak itu dari `wp-content/themes/` lalu refresh.)
3. **Pengaturan/Settings → Membaca/Reading** → pilih **Halaman statis / A static page** → set **Beranda/Homepage** ke halaman mana saja (buat Page “Beranda” jika belum ada) → Simpan.
4. Buka `http://smkit.test/` — landing page React tampil. Bagian **Berita** otomatis menampilkan 3 post terbaru (Publish) dari WordPress lokal; jika belum ada post, akan tampil data contoh.

### 4. Update setelah ubah kode React
Setiap kali kamu mengubah kode/tampilan:
```bash
npm run build
```
Lalu **ganti seluruh isi** folder `...\themes\smkit-landing\landing\` dengan isi `dist/` terbaru. (Berita tidak perlu build ulang — ia mengikuti post WordPress.)

---

## Opsi B: Pasang di tema aktif yang sudah ada (child/existing theme)

Gunakan ini jika kamu ingin tetap memakai tema yang sekarang.

1. Buka folder tema aktif: `wp-content\themes\<tema-aktif>\` (disarankan pakai child theme).
2. Salin `wordpress/front-page.php` ke root tema aktif sebagai `front-page.php`.
3. Salin **isi** `dist/` ke `...\themes\<tema-aktif>\landing\`.
4. Jika lokasi folder berbeda, sesuaikan di `front-page.php`:
   ```php
   $landing_dir = get_stylesheet_directory() . '/landing';
   $landing_uri = get_stylesheet_directory_uri() . '/landing';
   ```
5. Aktifkan sebagai front page lewat **Settings → Reading**.

---

## Opsi C: Headless (React dev/build terpisah, berita dari REST API WP lokal)

Cocok untuk iterasi UI cepat.

1. Pastikan WordPress lokal berjalan (mis. `http://smkit.test`).
2. Buat `.env` di root project:
   ```env
   VITE_WP_API_BASE=http://smkit.test
   ```
3. Jalankan:
   ```bash
   npm run dev
   ```
4. Buka URL Vite (mis. `http://localhost:5173`). Berita diambil dari REST API WordPress lokal.
   - Jika **kosong/tanpa** `VITE_WP_API_BASE` → tampil data berita contoh.
   - Jika beda origin dan kena **CORS**, gunakan Opsi A (same-origin) atau aktifkan CORS di WP lokal.

Preview hasil build statis: `npm run preview`.

---

## Cara kerja data Berita

Prioritas:
1. `window.__SMKIT__.berita` — disuntikkan PHP di `front-page.php` (paling andal, tanpa CORS).
2. REST API `${VITE_WP_API_BASE|window.__SMKIT__.wpApiBase}/wp-json/wp/v2/posts?_embed&per_page=3`.
3. `demoBerita` (fallback).

`front-page.php` mengambil 3 post *Publish* terbaru beserta featured image, kategori, tanggal, penulis, dan link.

---

## Troubleshooting

- **“Stylesheet is missing” / tema broken**: folder tema tidak punya `style.css` dengan header. Hapus folder tema rusak, lalu pakai paket `wordpress/` (Opsi A) yang sudah lengkap.
- **Layar putih / JS-CSS 404**: isi `landing/` tidak lengkap atau `manifest.json` hilang. Salin ulang **seluruh** isi `dist/` (termasuk folder `.vite/`).
- **Berita tidak muncul/masih contoh**: pastikan ada post berstatus *Publish* di WP lokal; cek featured image untuk thumbnail. Di Opsi A tidak perlu build ulang.
- **Tampilan bentrok CSS tema**: template memanggil `wp_head()`/`wp_footer()` (untuk plugin/admin bar). Tema minimal `smkit-landing` (Opsi A) tidak memuat stylesheet tema lain sehingga bentrokan minimal.
- **Port/URL Laragon berbeda**: tidak masalah untuk Opsi A (same-origin). Untuk Opsi C, sesuaikan `VITE_WP_API_BASE`.
- **Font tidak muncul offline**: font dimuat dari Fontshare (eksternal); perlu koneksi internet atau self-host font.

## Catatan
- Build memakai `base: './'` sehingga aman ditaruh di subfolder tema.
- Nama file aset di-hash; setelah build ulang selalu ganti isi `landing/` dengan `dist/` terbaru.
- `wp_head()`/`wp_footer()` tetap dipanggil agar plugin SEO/analytics/admin bar berfungsi.