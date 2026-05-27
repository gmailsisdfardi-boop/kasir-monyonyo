# 🥛 Susu Monyonyo — Sistem Kasir Digital HIMA

Aplikasi kasir sederhana, modern, dan gratis untuk berjualan susu HIMA.
Dibuat dengan HTML + CSS + JavaScript murni — **tanpa framework, tanpa server, tanpa biaya**.

---

## 📂 Struktur Folder

```
susu-monyonyo/
├── index.html              ← Aplikasi utama (semua fitur ada di sini)
├── docs/
│   └── google-apps-script.gs  ← Script untuk Google Sheets
└── README.md
```

---

## 🚀 Cara Deploy GRATIS (Pilih Salah Satu)

### Opsi A: GitHub Pages ⭐ (Paling Direkomendasikan)

1. Buat akun di [github.com](https://github.com) (gratis)
2. Buat repository baru: `susu-monyonyo-kasir`
3. Upload file `index.html` ke repository
4. Buka **Settings → Pages → Branch: main → Save**
5. Aplikasi langsung bisa diakses di:
   `https://[username-kamu].github.io/susu-monyonyo-kasir`

**✅ Gratis selamanya, bisa diakses dari HP maupun laptop**

---

### Opsi B: Netlify Drop

1. Buka [netlify.com/drop](https://app.netlify.com/drop)
2. Drag-and-drop folder `susu-monyonyo/` ke halaman tersebut
3. Selesai! Langsung dapat URL publik

---

### Opsi C: Vercel

```bash
npm install -g vercel
cd susu-monyonyo
vercel
```

---

### Opsi D: Pakai Langsung (Offline)

Buka `index.html` di browser — **tidak perlu internet**, tidak perlu server.
Data tersimpan di browser (localStorage) secara otomatis.

---

## 📊 Cara Menghubungkan ke Google Spreadsheet

### Langkah 1 — Buat Spreadsheet Baru

1. Buka [sheets.google.com](https://sheets.google.com)
2. Buat spreadsheet baru, beri nama: **"Kasir Susu Monyonyo"**
3. Salin **ID spreadsheet** dari URL:
   ```
   https://docs.google.com/spreadsheets/d/[INI-ID-NYA]/edit
   ```

---

### Langkah 2 — Pasang Google Apps Script

1. Di spreadsheet, buka: **Extensions → Apps Script**
2. Hapus kode yang ada, paste seluruh isi file `docs/google-apps-script.gs`
3. Ganti baris ini dengan ID spreadsheet kamu:
   ```javascript
   const SPREADSHEET_ID = 'GANTI_DENGAN_ID_SPREADSHEET_KAMU';
   ```
4. Klik **Save** (ikon disket)

---

### Langkah 3 — Deploy sebagai Web App

1. Klik **Deploy → New deployment**
2. Klik ikon ⚙️ di sebelah **"Select type"** → pilih **Web app**
3. Isi pengaturan:
   - **Description**: Kasir Susu Monyonyo
   - **Execute as**: Me (akun Google kamu)
   - **Who has access**: Anyone
4. Klik **Deploy**
5. **Izinkan akses** saat diminta (klik "Allow")
6. Salin **Web App URL** yang muncul

---

### Langkah 4 — Hubungkan ke Aplikasi

1. Buka aplikasi kasir → halaman **Dashboard**
2. Tempel URL tadi ke kolom "Integrasi Google Sheets"
3. Klik **💾 Simpan**

Sekarang setiap transaksi otomatis tercatat di spreadsheet!

---

## 📋 Format Data di Spreadsheet

Sheet `Transaksi` akan terisi otomatis:

| Tanggal    | Waktu    | ID Transaksi | Produk              | Qty | Harga Satuan | Total  | Metode Pembayaran |
|------------|----------|--------------|---------------------|-----|--------------|--------|-------------------|
| 15/07/2025 | 10:32:00 | 1720234512   | Susu Monyonyo Coklat | 2  | 10000        | 20000  | Tunai             |
| 15/07/2025 | 10:45:22 | 1720234890   | Susu Monyonyo Plain  | 1  | 8000         | 8000   | QRIS              |

---

## 💡 Fitur Lengkap

| Fitur | Keterangan |
|-------|------------|
| 🛒 Kasir | Pilih produk, hitung otomatis, simpan transaksi |
| 📱 QRIS & Tunai | Pilih metode pembayaran per transaksi |
| ⚠️ Validasi Stok | Tidak bisa jual lebih dari stok tersedia |
| ✅ Notifikasi | Konfirmasi tiap transaksi berhasil |
| 📊 Dashboard | Total penjualan, omzet, produk laris, stok |
| 🧾 Histori | 10 transaksi terbaru ditampilkan |
| ⚙️ Manajemen Menu | Tambah, edit, hapus produk dan stok |
| 📡 Google Sheets | Sinkronisasi otomatis setiap transaksi |
| 💾 Offline Mode | Data tersimpan lokal, tetap bisa dipakai tanpa internet |
| 📱 Responsive | Nyaman di HP maupun laptop |

---

## 🎨 Cara Kustomisasi

### Ganti Nama Toko
Di `index.html`, cari dan ganti:
```html
<div class="logo-text">Susu Monyonyo</div>
<div class="logo-sub">Sistem Kasir HIMA</div>
```

### Ganti Warna Utama
Di bagian `:root` pada CSS, ubah nilai variabel warna:
```css
:root {
  --brown-600: #6B4226;  /* ← warna utama header & tombol */
  --brown-500: #8B5E3C;  /* ← warna harga & aksen */
}
```

### Tambah Metode Pembayaran
Di fungsi `renderKasir()`, tambahkan tombol baru:
```html
<button class="pay-btn" onclick="selectPay('Transfer')">🏦 Transfer</button>
```

### Reset Data (Ganti Periode HIMA)
Buka browser console (F12) dan jalankan:
```javascript
// HATI-HATI: Ini menghapus semua data transaksi!
localStorage.removeItem('susu_transaksi');
localStorage.removeItem('susu_menus');
location.reload();
```

---

## 🔧 Tips Penggunaan Saat Berjualan

1. **Buka di HP** — akses URL aplikasi, lalu "Add to Home Screen" untuk akses cepat
2. **Mode offline** — data tetap tersimpan walau internet mati
3. **Backup data** — cek Google Sheets secara berkala untuk backup transaksi
4. **Restock** — buka halaman **Menu** untuk update stok sebelum mulai berjualan
5. **Laporan** — buka Dashboard setelah selesai berjualan untuk rekap

---

## ❓ Troubleshooting

**Q: Data hilang setelah ganti browser/HP?**
A: Data tersimpan di localStorage browser masing-masing. Gunakan Google Sheets sebagai backup utama.

**Q: Transaksi tidak masuk ke Sheets?**
A: Pastikan:
- URL Web App sudah disimpan di Dashboard
- Apps Script sudah di-deploy dengan akses "Anyone"
- Tidak ada kesalahan di SPREADSHEET_ID

**Q: Aplikasi lambat?**
A: Coba bersihkan histori transaksi lama via console: `localStorage.setItem('susu_transaksi', '[]')`

---

## 👥 Pengembangan Lebih Lanjut

Ide fitur untuk periode HIMA berikutnya:
- [ ] Export laporan PDF otomatis
- [ ] Multi-user (kasir berbeda per shift)
- [ ] Fitur diskon / promo
- [ ] Cetak struk via Bluetooth printer
- [ ] Laporan mingguan/bulanan otomatis via email

---

**Dibuat untuk HIMA 💛 — Semoga berjualan lancar!**
