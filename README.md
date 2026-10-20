# Interactive Tulip Garden · 20/10

Thiệp chúc mừng Phụ nữ Việt Nam làm bằng Next.js App Router, Tailwind CSS, GSAP và Motion. Trang đầu có khu vườn tulip SVG vẽ riêng, hoạt ảnh nở hoa, thiệp cá nhân hóa, chia sẻ và âm thanh tùy chọn. Hiệu ứng chuyển động vẫn chạy khi thiết bị đặt chế độ giảm chuyển động.

## Chạy tại máy

```bash
npm install
npm run dev
```

## Đưa lên Vercel

Import repo `nethoang732/Thiep-hoa-20-10` trong Vercel. Vercel nhận diện Next.js và chạy `npm run build`.

Lời chúc tùy chỉnh dài hơn 220 ký tự được lưu tối đa 30 ngày bằng Upstash Redis REST để tránh đưa nội dung dài vào URL. Tạo database Upstash Redis, rồi đặt `UPSTASH_REDIS_REST_URL` và `UPSTASH_REDIS_REST_TOKEN` trong Vercel Project Settings → Environment Variables. Lời chúc mặc định không cần backend; lời chúc tùy chỉnh ngắn vẫn chia sẻ bình thường.

Tên người nhận và người gửi nằm trong URL chia sẻ để thiệp hiển thị đúng nội dung. Ứng dụng không tích hợp analytics.

