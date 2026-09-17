# Tài nguyên giao diện SketchTale

Hai bảng nhận diện gốc tại `C:/Users/pc/Downloads/tải xuống.png` và `tải xuống (1).png` được giữ nguyên.

- `source/logo.png`: bản tách tham chiếu bằng ImageGen từ logo ngang; cần đối chiếu và thay bằng bản xuất thiết kế gốc trước phát hành để bảo đảm chính xác từng chi tiết nhận diện.
- `source/hero.png`: minh họa mới dựa trên mèo trắng–vàng, khăn coral, huy hiệu ngôi sao trong bảng nhận diện.
- `source/rabbit.png`, `seed.png`, `stars.png`: minh họa được tạo cho truyện demo, không phải nội dung xuất bản đã duyệt. Mỗi truyện hiện dùng một tranh minh họa chung cho ba trang chữ; có chú thích trong reader. Cần tranh riêng từng trang khi hoàn thiện nội dung chính thức.
- `public/images/*.webp`: bản chuyển định dạng để sử dụng trên web; `node scripts/optimize-assets.mjs` tạo lại từ ảnh nguồn.
- `public/favicon.png`: biểu tượng sách/bút tách theo bảng logo bằng ImageGen.
- `public/fonts`: Nunito variable gồm Latin và Vietnamese, có giấy phép OFL kèm theo.

Các asset ImageGen là bản dùng cho prototype, không thay thế file vector thương hiệu gốc. Chưa có OG image riêng 1200×630, domain production hoặc bộ audio được duyệt. Không bật giọng đọc giả trong reader.
