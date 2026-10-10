# Novel App

Aplikasi katalog dan pembaca novel dengan React Native, Expo, Express, Prisma, dan MySQL Laragon.

## Teknologi

- Mobile: React Native, Expo Go, React Navigation
- Backend: Node.js, Express, Prisma
- Database: MySQL dari Laragon

## Prasyarat

- Node.js dan npm
- Laragon dengan MySQL
- Expo Go pada ponsel
- Ponsel dan laptop terhubung ke jaringan Wi-Fi yang sama

## 1. Siapkan database dan backend

1. Jalankan Laragon, lalu start MySQL. Apache/XAMPP tidak diperlukan.
2. Buat database bernama `moproject` di HeidiSQL atau phpMyAdmin Laragon. Gunakan collation `utf8mb4_unicode_ci` jika diminta.
3. Buka terminal pada root repository (folder yang berisi `App.js`), lalu masuk ke folder backend:

   ```powershell
   cd backend-express
   Copy-Item .env.example .env
   ```

4. Sesuaikan `.env` dengan pengaturan MySQL Laragon. Contoh pada `.env.example` menggunakan pengguna `root` tanpa kata sandi. Jangan unggah `.env` ke GitHub.
5. Pasang dependency, buat Prisma Client, terapkan migrasi, dan isi novel contoh:

   ```powershell
   npm install
   npm run db:generate
   npm run db:migrate
   npm run db:seed
   ```

   `db:seed` aman dijalankan lagi: novel contoh diperbarui, bukan digandakan.

6. Jalankan server:

   ```powershell
   npm start
   ```

   Backend berjalan pada port `3000`. Cek `http://localhost:3000/api/posts` di browser; respons seharusnya berisi novel contoh.

## 2. Hubungkan ponsel ke backend

Expo Go memuat JavaScript dari laptop, tetapi permintaan API dan sampul novel dikirim langsung dari ponsel ke backend.

1. Di laptop, jalankan `ipconfig` dan cari **IPv4 Address** pada adapter Wi-Fi yang aktif.
2. Buka `services/api.js` di folder project mobile, lalu ganti nilai `IP_ADDRESS` dengan IPv4 laptop tersebut. Contohnya:

   ```js
   const IP_ADDRESS = "192.168.1.25";
   ```

3. Izinkan Node.js menerima koneksi jaringan privat jika Windows Firewall bertanya. Ponsel dan laptop harus berada pada jaringan yang sama.

## 3. Jalankan aplikasi mobile di Expo Go

Buka terminal kedua di root repository (folder yang berisi `App.js` dan `package.json`), lalu jalankan:

```powershell
npm install
npx expo start
```

Scan QR code dengan Expo Go. Jika Metro sebelumnya menyimpan cache lama, jalankan `npx expo start -c`.

Jika backend tidak dapat diakses dari ponsel, periksa kembali IP pada `services/api.js`, pastikan Laragon MySQL dan `npm start` backend masih berjalan, dan izinkan koneksi masuk Node.js pada port `3000` di Windows Firewall. Tunnel Expo hanya menghubungkan Expo Go ke Metro; tunnel tidak otomatis membuka API backend.

## Struktur repository

```text
novel-app/
  backend-express/  # API, skema/migrasi database, seed, dan sampul demo
  components/       # Komponen antarmuka mobile
  navigation/       # Navigasi aplikasi
  screens/          # Layar aplikasi
  services/         # Konfigurasi koneksi API
```
