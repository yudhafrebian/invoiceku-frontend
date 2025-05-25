
# 💻 Frontend – Invoice Management App

Frontend dari aplikasi Invoice Management berbasis **Next.js**, **Tailwind CSS**, dan **React Hook Form**. Aplikasi ini mendukung pembuatan invoice, manajemen klien & produk, dan integrasi pembayaran melalui Midtrans.

---

## 📦 Tech Stack

- **Next.js** 14 (App Router)
- **Tailwind CSS** – Styling modern dan responsif
- **React Hook Form** – Form handling dan validasi
- **Redux** – Global state management ringan
- **Axios** – HTTP request
- **Headless UI + ShadCN** – Komponen UI yang elegan
- **Midtrans Snap.js** – Integrasi Payment Gateway
- **Toast / Alert Dialog** – Untuk notifikasi dan konfirmasi

---

## 🔧 Cara Menjalankan Frontend

### 1. Masuk ke folder `src/`:

```bash
cd client
```

### 2. Install dependencies:

```bash
npm install
```

### 3. Buat file `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_MIDTRANS_CLIENT_KEY=YOUR_CLIENT_KEY
```

> 💡 Gantilah `API_URL` dengan URL backend yang sebenarnya saat production.

### 4. Jalankan aplikasi:

```bash
npm run dev
```

---

## 🗂️ Struktur Folder Penting

```
client/
├── app/               # Routing (Next.js App Router)
│   ├── dashboard/
│   ├── clients/
│   ├── invoices/
│   └── login/
├── components/        # Komponen reusable (Navbar, Table, Form, dsb)
├── lib/               # Axios config, helper utils
├── hooks/             # Custom React hooks
├── store/             # Redux store (auth, invoice, dsb)
├── public/            # Gambar, ikon
├── styles/            # Tailwind config atau CSS tambahan
└── .env.local         # Environment variables
```

---

## 📋 Fitur Frontend

- 🔐 **Autentikasi pengguna**
- 👤 **Manajemen klien**
- 📦 **Manajemen produk/jasa**
- 🧾 **Pembuatan invoice dinamis**
- 📊 **Dashboard ringkasan tagihan**
- 💬 **Notifikasi / Toast**
- 💵 **Integrasi Midtrans Snap untuk pembayaran**
- ⚙️ **Filter & sort invoice**
- 🌙 **Dark mode (opsional)**

---

## 📸 Cuplikan Layar

Tambahkan beberapa screenshot UI di folder `public/` atau `assets/` dan tampilkan di sini.

---

## 📌 Catatan Tambahan

- Gunakan `localStorage` atau `cookies` untuk menyimpan token JWT
- Gunakan `useEffect` untuk validasi session saat navigasi antar halaman

---

## 🧪 Testing Manual

- Login sebagai user → cek redirect
- Buat klien baru → cek validasi
- Buat produk → isi semua input
- Buat invoice → pastikan data tersimpan dan status ter-update
- Klik tombol bayar → pastikan Midtrans muncul dan pembayaran sukses

---

## 🙋 Bantuan

Jika mengalami masalah saat menjalankan frontend:

1. Pastikan backend berjalan di port sesuai dengan `NEXT_PUBLIC_API_URL`
2. Periksa konsol browser untuk melihat error detail
3. Cek apakah kunci Midtrans client key valid
