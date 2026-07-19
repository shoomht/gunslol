# gunslol-profile

Bio-link profile ala guns.lol, dibuat pakai Next.js (App Router).

## Cara jalankan

```bash
npm install
npm run dev
```

Buka `http://localhost:3000` di browser.

## Struktur

```
gunslol-profile/
├── app/
│   ├── layout.jsx      # root layout
│   ├── page.jsx        # halaman utama, render ProfileCard
│   └── globals.css     # reset css dasar
├── components/
│   └── ProfileCard.jsx # semua logic & UI profil ada di sini
├── public/              # taruh file audio/gambar kamu di sini
├── package.json
└── next.config.js
```

## Cara custom

Semua bisa diubah dari objek `PROFILE` di paling atas `components/ProfileCard.jsx`:

- `username`, `displayName`, `bio`, `uid`
- `avatar` — URL gambar avatar kamu
- `verified`, `premium` — badge on/off
- `status` — `"online"` | `"idle"` | `"offline"`
- `audioSrc` — path ke file mp3. Taruh file-nya di folder `public/`, misal `public/song.mp3`, lalu isi `audioSrc: "/song.mp3"`. Audio akan autoplay begitu user klik layar "CLICK TO ENTER" (wajib begini karena browser blokir autoplay tanpa interaksi user).
- `socials` — array link sosial media, tinggal ganti `href` masing-masing

## Deploy

Paling gampang deploy ke [Vercel](https://vercel.com): push ke GitHub, import repo di Vercel, otomatis ke-build.
