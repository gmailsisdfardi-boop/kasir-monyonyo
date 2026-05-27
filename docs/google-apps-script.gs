// ============================================================
// GOOGLE APPS SCRIPT — Susu Monyonyo Kasir
// Cara pakai:
// 1. Buka Google Spreadsheet baru
// 2. Buka Extensions > Apps Script
// 3. Paste seluruh kode ini, ganti SPREADSHEET_ID dengan ID spreadsheet kamu
// 4. Klik Deploy > New deployment > Web App
//    - Execute as: Me
//    - Who has access: Anyone
// 5. Copy URL-nya dan paste ke halaman Dashboard aplikasi kasir
// ============================================================

const SPREADSHEET_ID = 'GANTI_DENGAN_ID_SPREADSHEET_KAMU';
// ID ada di URL spreadsheet: docs.google.com/spreadsheets/d/[ID_INI]/edit

const SHEET_TRANSAKSI = 'Transaksi';
const SHEET_MENU      = 'Menu';
const SHEET_RINGKASAN = 'Ringkasan';

// ---- Setup header otomatis ----
function setupSheets() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);

  let sheetTrx = ss.getSheetByName(SHEET_TRANSAKSI);
  if (!sheetTrx) {
    sheetTrx = ss.insertSheet(SHEET_TRANSAKSI);
    sheetTrx.appendRow(['Tanggal', 'Waktu', 'ID Transaksi', 'Produk', 'Qty', 'Harga Satuan', 'Total', 'Metode Pembayaran']);
    sheetTrx.getRange(1, 1, 1, 8).setFontWeight('bold').setBackground('#6B4226').setFontColor('white');
  }

  let sheetMenu = ss.getSheetByName(SHEET_MENU);
  if (!sheetMenu) {
    sheetMenu = ss.insertSheet(SHEET_MENU);
    sheetMenu.appendRow(['ID', 'Nama Produk', 'Harga', 'Stok', 'Emoji', 'Terakhir Diupdate']);
    sheetMenu.getRange(1, 1, 1, 6).setFontWeight('bold').setBackground('#6B4226').setFontColor('white');
  }
}

// ---- Handle POST (simpan transaksi) ----
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    if (data.type === 'transaksi') {
      simpanTransaksi(data.transaksi);
    } else if (data.type === 'menu') {
      updateMenu(data.menus);
    } else {
      // backward compat: langsung array transaksi
      if (data.transaksi) simpanTransaksi(data.transaksi);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok', message: 'Data berhasil disimpan' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ---- Handle GET (ambil data) ----
function doGet(e) {
  const action = e.parameter.action || 'ringkasan';
  let result = {};

  if (action === 'ringkasan') {
    result = getRingkasan();
  } else if (action === 'transaksi') {
    result = getTransaksi();
  }

  return ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

// ---- Simpan baris transaksi ----
function simpanTransaksi(rows) {
  setupSheets();
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(SHEET_TRANSAKSI);
  const now = new Date();

  rows.forEach(row => {
    const tgl = new Date(row.tanggal || now);
    sheet.appendRow([
      Utilities.formatDate(tgl, 'Asia/Jakarta', 'dd/MM/yyyy'),
      Utilities.formatDate(tgl, 'Asia/Jakarta', 'HH:mm:ss'),
      row.id_transaksi || now.getTime(),
      row.produk,
      row.qty,
      row.harga,
      row.total,
      row.pembayaran
    ]);
  });
}

// ---- Update data menu ----
function updateMenu(menus) {
  setupSheets();
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(SHEET_MENU);
  
  // Clear existing data (keep header)
  const lastRow = sheet.getLastRow();
  if (lastRow > 1) sheet.deleteRows(2, lastRow - 1);

  menus.forEach(m => {
    sheet.appendRow([m.id, m.nama, m.harga, m.stok, m.emoji || '🥛', new Date()]);
  });
}

// ---- Ambil ringkasan penjualan ----
function getRingkasan() {
  setupSheets();
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(SHEET_TRANSAKSI);
  const data = sheet.getDataRange().getValues();
  
  if (data.length <= 1) return { totalOmzet: 0, jumlahTransaksi: 0, produkLaris: [] };

  const rows = data.slice(1);
  const today = Utilities.formatDate(new Date(), 'Asia/Jakarta', 'dd/MM/yyyy');
  
  let totalOmzet = 0, jumlahHari = 0;
  const produkCount = {};

  rows.forEach(r => {
    totalOmzet += (r[6] || 0);
    if (r[0] === today) jumlahHari++;
    const produk = r[3];
    if (produk) {
      if (!produkCount[produk]) produkCount[produk] = { qty: 0, total: 0 };
      produkCount[produk].qty += (r[4] || 0);
      produkCount[produk].total += (r[6] || 0);
    }
  });

  const produkLaris = Object.entries(produkCount)
    .sort((a, b) => b[1].qty - a[1].qty)
    .slice(0, 5)
    .map(([nama, stats]) => ({ nama, ...stats }));

  return { totalOmzet, jumlahTransaksi: rows.length, jumlahHari, produkLaris };
}

function getTransaksi() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(SHEET_TRANSAKSI);
  if (!sheet) return { rows: [] };
  const data = sheet.getDataRange().getValues();
  return { rows: data };
}
