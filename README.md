# untungplayer.id — Demo top up game

Prototype frontend HTML/CSS/JavaScript untuk dibuka di VS Code. Memiliki katalog game, login demo, pemilihan paket, keranjang multi-item/multi-game, metode pembayaran simulasi, loading, dan halaman status transaksi demo. Maskot Mochi Dansai berupa kotak mochi ungu dengan ekspresi wajah yang berubah.

## Cara menjalankan
1. Ekstrak ZIP ini.
2. Buka folder `untungplayer_id` di VS Code.
3. Buka `index.html` langsung di browser, atau gunakan ekstensi Live Server lalu klik **Go Live**.
4. Login demo dengan email apa saja yang valid formatnya dan password minimal 6 karakter. Jangan gunakan password asli.
5. Pilih game → pilih paket. Ulangi untuk menambah lebih dari satu paket atau game.
6. Klik keranjang → isi ID pemain untuk setiap item → pilih metode pembayaran simulasi → klik **Bayar & proses**.

## Penting tentang keamanan dan transaksi
Ini **hanya prototype frontend**. Login tidak memakai backend dan tidak membuktikan identitas; status "berhasil" adalah simulasi, tidak ada pembayaran atau item game yang dikirim. Jangan gunakan untuk menerima pembayaran atau menyimpan data pelanggan.

Untuk versi produksi:
- Buat backend (misalnya Flask/FastAPI/Node) dengan database.
- Password harus di-hash menggunakan Argon2id atau bcrypt; jangan simpan password di localStorage atau kode frontend.
- Gunakan HTTPS, session cookie `HttpOnly`, `Secure`, `SameSite`, CSRF protection, rate limiting, validasi server-side, dan log audit.
- Gunakan payment gateway resmi dan verifikasi webhook di backend; jangan percaya status pembayaran dari browser.
- Jangan pernah menyimpan PIN, OTP, password game, atau data kartu pembayaran.
- Simpan hanya data transaksi yang diperlukan, atur hak akses admin, dan lakukan backup serta pembaruan dependensi.
- Pastikan izin/ketentuan resmi distributor untuk produk top up dan merek game dipatuhi.

## Struktur
- `index.html` — struktur halaman dan modal
- `style.css` — tema, responsif, animasi
- `app.js` — katalog, keranjang, login demo, checkout simulasi
