import "./globals.css";

export const metadata = {
  title: "zsanz",
  description: "zsanz's bio link profile",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
