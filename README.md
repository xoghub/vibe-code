# Vibe Code - Elysia + Bun + Drizzle + MySQL

Proyek ini adalah hasil inisialisasi awal backend menggunakan stack modern.

## Persyaratan
- [Bun](https://bun.sh/) terinstal di sistem Anda.
- Database MySQL yang sedang berjalan.

## Cara Menjalankan

1. **Instal Dependensi**
   ```bash
   bun install
   ```

2. **Konfigurasi Environment**
   Buka file `.env` dan sesuaikan `DATABASE_URL` dengan kredensial MySQL Anda.

3. **Migrasi Database**
   Jalankan perintah berikut untuk menyinkronkan skema Drizzle dengan database Anda:
   ```bash
   bun run db:push
   ```

4. **Jalankan Server**
   ```bash
   bun run dev
   ```
   Server akan berjalan di `http://localhost:3000`.

## Arsitektur Proyek
Proyek ini kini menggunakan *Layered Architecture* untuk memisahkan tanggung jawab kode:
- `src/controllers`: Menangani logika request dan response HTTP.
- `src/services`: Menangani logika bisnis utama dan interaksi dengan database.
- `src/models`: Definisi skema database menggunakan Drizzle ORM.
- `src/routes`: Mendefinisikan endpoint aplikasi.
- `src/middleware`: Menangani interceptor seperti Autentikasi berbasis Token.

## Endpoints

### 1. Autentikasi & Sesi (`/`)
- `POST /login`
  - **Fungsi**: Masuk ke aplikasi dan mendapatkan token sesi.
  - **Body**: `{ "email": "user@example.com", "password": "password123" }`
  - **Response**: `accessToken` & `refreshToken`

- `POST /logout`
  - **Fungsi**: Keluar dari aplikasi dan menghapus sesi saat ini.
  - **Headers**: `Authorization: Bearer <access-token>`
  - **Response**: Pesan sukses atau error Unauthorized.

### 2. Pengguna (`/`)
- `POST /register`
  - **Fungsi**: Mendaftarkan pengguna baru dengan password yang di-*hash*.
  - **Body**: `{ "name": "John Doe", "email": "john@example.com", "password": "password123" }`
  - **Response**: Pesan registrasi berhasil.

- `GET /getProfile`
  - **Fungsi**: Mengambil data profil pengguna yang sedang *login*.
  - **Headers**: `Authorization: Bearer <access-token>`
  - **Response**: Objek data pengguna (id, name, email).
