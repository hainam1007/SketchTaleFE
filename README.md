# SketchTale public website

React 19 + Vite 8, JavaScript/JSX, React Router và CSS thuần. Giao diện tiếng Việt cho phụ huynh có trẻ 3–6 tuổi, theo [Public Website.md](docs/Public%20Website.md).

## Chạy dự án

```sh
npm install
npm run dev
```

```sh
npm run lint
npm run build
npm run preview
npm test
```

Playwright dùng Chrome đã cài trên máy (`channel: chrome`); máy CI cần cài Chrome hoặc đổi sang Chromium trong `playwright.config.js`. Bộ test tự khởi động Vite ở `127.0.0.1:5173`. Ảnh giao diện và báo cáo nằm trong `artifacts/`.

## Đã triển khai

- Trang chủ đủ tám phần, menu mobile/Escape/focus, anchor, footer và 404.
- Thư viện ba truyện mẫu, tìm kiếm có/không dấu kết hợp chủ đề và query string.
- Ba truyện có nội dung riêng, chuyển trang, quiz có xác nhận, phản hồi, xem lại và đọc lại.
- Demo phụ huynh với hồ sơ Mây/Nắng, chọn danh mục và thời gian riêng; tab dùng được bằng phím mũi tên, Home/End.
- Các trang phụ huynh, giới thiệu, FAQ, liên hệ, chính sách dự thảo và form đăng nhập/đăng ký/quên mật khẩu minh họa.
- So sánh Free / Starter, Pro Creator / Explorer **35.000đ/tháng**, Family / Unlimited **89.000đ/tháng**, cập nhật theo người dùng ngày 17/09/2026.
- Responsive, focus/skip link, giảm chuyển động, Nunito tự host, WebP và noindex cho prototype.

## Cấu trúc

`src/app/App.jsx` chứa routing; `src/styles` chứa tokens, font và CSS; `src/features/public` chứa layout, component, trang, fixture và service; `src/features/auth` chứa form auth minh họa.

`publicService` hiện trỏ tới `mockPublicService`. Khi có backend, thay adapter giữ nguyên shape frontend. Trong development có thể dùng `/stories?mock=slow`, `?mock=empty`, `?mock=error` để kiểm tra trạng thái. Để kiểm tra retry phục hồi, bỏ query lỗi bằng History API rồi nhấn “Thử lại”. Không có fault injection trên production build.

## Ranh giới prototype

Không có API, thanh toán, cấp quyền gói, tạo nhân vật AI, xuất video, audio, tài khoản thật hoặc gửi email/liên hệ. Form chỉ kiểm tra hợp lệ, không lưu dữ liệu vào localStorage hoặc gửi qua mạng. Demo phụ huynh dùng tên hư cấu và state trong bộ nhớ.

Family còn cần chốt **không giới hạn hoặc fair usage 100 lượt tạo nhân vật/tháng**. Danh sách 5 truyện Free, cơ chế chia sẻ/reset hạn mức, regenerate, nâng/hạ gói, gia hạn/hủy/hoàn tiền và khả năng HD/4K cần backend/nghiệp vụ xác nhận. Ba truyện công khai không đại diện danh sách năm truyện của gói Free.

Ảnh và logo hiện là bản prototype từ ImageGen dựa trên tham chiếu; cần asset thương hiệu xuất từ nguồn thiết kế và tranh riêng từng trang trước phát hành. Xem [design/ASSETS.md](design/ASSETS.md).

## Trước khi phát hành

Hosting cần rewrite mọi URL không phải asset về `/index.html` để refresh route trực tiếp. Chốt domain, prerender/metadata chia sẻ, OG image và chính sách chính thức; chỉ bỏ `noindex` cùng `robots.txt` chặn index khi bản phát hành được duyệt. Không dùng cờ frontend để quyết định quyền truy cập trả phí.

Đo Lighthouse trên production preview ở port 4173 bằng `node scripts/lighthouse.mjs` (đường dẫn Chrome trong script dành cho Windows). Kết quả chỉ phản ánh lần đo cục bộ, không thay thế đo trên môi trường triển khai thật.
