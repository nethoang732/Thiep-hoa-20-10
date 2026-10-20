import "./globals.css";

export const metadata = {
  title: "A Little Flower For You | 20/10",
  description: "Một khu vườn tulip nhỏ dành tặng những người phụ nữ mình yêu thương.",
  openGraph: {
    title: "A Little Flower For You",
    description: "Chạm để nhận một đóa hoa dịu dàng nhân ngày 20/10.",
    type: "website",
    locale: "vi_VN",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}

