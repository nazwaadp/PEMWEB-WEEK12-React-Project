# Manajemen Produk — Tugas 4 Pemrograman Web

## Identitas Mahasiswa

- **Nama**: Nazwa Aulia Dwi Purnomo
- **NRP**: 5027251018
- **Kelas**: Pemrograman Web - A

## Fitur yang Dikembangkan

1. **CRUD Produk**:
   - **Create**: Menambahkan produk baru melalui pop-up `ProductFormModal` dengan validasi nama dan harga.
   - **Read**: Menampilkan daftar produk beserta format mata uang Rupiah dan informasi ID.
   - **Update**: Mengubah nama maupun harga produk langsung dari halaman daftar produk maupun halaman detail produk.
   - **Delete**: Menghapus produk dengan pop-up konfirmasi `ConfirmDeleteModal`.
2. **Pencarian Real-Time**:
   - Komponen `SearchBar` memfilter daftar produk berdasarkan kata kunci nama produk dan menampilkan jumlah produk yang cocok.
3. **Penyimpanan Persisten (`localStorage`) & Integrasi API**:
   - State produk dikelola secara terpusat menggunakan `ProductContext` dan disimpan otomatis ke `localStorage`.
   - Tersedia tombol **Reset Data Awal** dan tombol **Muat dari API** (opsional melalui konfigurasi `VITE_API_BASE_URL` di `.env.local`).
4. **Halaman Detail Produk (`/products/:id`)**:
   - Menampilkan rincian produk berdasarkan parameter URL `id`, lengkap dengan tombol Edit, Hapus, dan penanganan apabila ID tidak ditemukan.
5. **Halaman Tambahan (`/about`) & Navigasi**:
   - Navbar utama pada `PageLayout` untuk berpindah antara halaman **Produk** (`/products`) dan **Tentang** (`/about`).
6. **Halaman 404 Not Found (`*`)**:
   - Menangani URL yang tidak dikenali dengan tampilan khusus 404 dan tombol navigasi kembali ke daftar produk.

## Struktur Komponen (Atomic Design)

- **Atoms**: `Button`
- **Molecules**: `ProductCard`, `SearchBar`, `Modal`
- **Organisms**: `ProductGrid`, `ProductFormModal`, `ConfirmDeleteModal`
- **Templates**: `PageLayout`
- **Pages**: `ProductsPage`, `ProductDetailPage`, `AboutPage`, `NotFoundPage`

## Cara Menjalankan Aplikasi

1. Instal dependensi:
   ```bash
   npm ci
   ```

````

2. Jalankan server pengembangan:
```bash
npm run dev

````

3. Buka alamat lokal yang ditampilkan di terminal (umumnya `http://127.0.0.1:5173`).

## Perintah Pemeriksaan

- `npm run typecheck` — Memeriksa tipe TypeScript
- `npm run lint` — Memeriksa aturan ESLint
- `npm run build` — Membuat build produksi

## Dokumentasi

### 1. Pencarian Produk Real-Time <br>

![Pencarian Produk Real-Time ](<dokumentasi/Screenshot 2026-11-21 143946.png>)

### 2. Validasi Form Tambah Produk<br>

![Validasi Form Tambah Produk](<dokumentasi/Screenshot 2026-11-21 144150.png>)

### 3. Penambahan Produk Baru <br>

![Penambahan Produk Baru](<dokumentasi/Screenshot 2026-11-21 144221.png>)

### 4. Halaman Detail Produk (`/products/:id`) <br>

![Halaman Detail Produk](<dokumentasi/Screenshot 2026-11-21 144307.png>)

### 5. Penanganan ID Produk Tidak Ditemukan <br>

![Penanganan ID Produk Tidak Ditemukan](<dokumentasi/Screenshot 2026-11-21 144343.png>)

### 6. Pembaruan Data Produk (Edit) <br>

![Pembaruan Data Produk](<dokumentasi/Screenshot 2026-11-21 144438.png>)

### 7. Pop-up Konfirmasi Hapus Produk <br>

![Pop-up Konfirmasi Hapus Produk](<dokumentasi/Screenshot 2026-11-21 144456.png>)

### 8. Halaman Tambahan (`/about`) <br>

![Halaman Tambahan](<dokumentasi/Screenshot 2026-11-21 144528.png>)

### 9. Halaman 404 Not Found <br>

![Halaman 404](<dokumentasi/Screenshot 2026-11-21 144554.png>)
