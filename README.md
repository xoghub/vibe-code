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

## Endpoints
- `GET /`: Hello World.
- `GET /users`: Mengambil daftar user dari database.
- `POST /users`: Menambah user baru (body: `{ "name": "John", "email": "john@example.com" }`).
