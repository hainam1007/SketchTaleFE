export const plans = [
  {
    id: "starter",
    name: "Free / Starter",
    price: 0,
    currency: "VND",
    cycle: "month",
    audience:
      "Bố mẹ mới bắt đầu, cùng bé thử biến hình vẽ thành nhân vật hoạt hình.",
    profileLimit: 1,
    generationLimit: 5,
    videoLimit: 0,
    limits: [
      "1 hồ sơ trẻ em",
      "5 lượt tạo nhân vật AI/tháng",
      "Tạo lại tối đa 1 lần mỗi hình",
      "Truy cập 5 truyện miễn phí cơ bản",
    ],
    features: [
      "Vẽ trực tiếp hoặc chụp, tải ảnh vẽ tay",
      "Tạo nhân vật hoạt hình từ tranh vẽ bằng AI",
      "Đặt tên và chỉnh sửa màu sắc cơ bản",
      "Đọc tương tác: giọng đọc, tô sáng chữ và câu hỏi sau truyện",
      "Parent Portal cơ bản: quản lý thời gian, duyệt nhân vật",
    ],
    exclusions: [
      "Không xuất truyện thành video",
      "Không có báo cáo từ vựng chuyên sâu",
      "Thư viện truyện giới hạn",
    ],
  },
  {
    id: "explorer",
    name: "Pro Creator / Explorer",
    price: 35000,
    currency: "VND",
    cycle: "month",
    audience:
      "Gia đình có 1–2 bé, muốn cùng con sáng tạo và khám phá truyện mỗi ngày.",
    profileLimit: 3,
    generationLimit: 30,
    videoLimit: 5,
    limits: [
      "Tối đa 3 hồ sơ trẻ em",
      "30 lượt tạo nhân vật AI/tháng",
      "Tạo lại không giới hạn cho mỗi tranh",
      "Mở toàn bộ thư viện truyện, mẫu truyện và chủ đề",
      "5 lượt xuất truyện thành video/tháng",
    ],
    features: [
      "Toàn bộ tính năng của Free / Starter",
      "Kho nhân vật và truyện yêu thích không giới hạn",
      "Báo cáo chi tiết: truyện đã đọc, từ vựng học được, kết quả câu hỏi",
      "Phân vai nâng cao: nhân vật chính, bạn đồng hành, vai phụ",
      "Phụ huynh phê duyệt vai nhạy cảm trên Parent Portal",
    ],
    exclusions: [
      "Giới hạn 5 lượt xuất video/tháng",
      "Không tạo truyện tùy chỉnh riêng theo yêu cầu",
    ],
  },
  {
    id: "family",
    name: "Family / Unlimited",
    price: 89000,
    currency: "VND",
    cycle: "month",
    audience:
      "Gia đình đông con hoặc muốn nhiều không gian sáng tạo và lưu giữ kỷ niệm.",
    profileLimit: 5,
    generationLimit: null,
    generationLimitPending: true,
    videoLimit: null,
    limits: [
      "Tối đa 5 hồ sơ trẻ em",
      "Tạo nhân vật AI: không giới hạn hoặc 100 lượt/tháng theo sử dụng hợp lý (đang chốt)",
      "Không giới hạn lượt xuất video",
      "Trọn bộ thư viện cao cấp và cập nhật mới hàng tuần",
    ],
    features: [
      "Toàn bộ tính năng của Pro Creator / Explorer",
      "Ưu tiên hàng đợi xử lý tạo nhân vật AI",
      "Đánh dấu, xuất báo cáo học tập định kỳ hàng tháng và gửi email phụ huynh",
      "Tải video chất lượng cao HD/4K để chia sẻ hoặc lưu giữ kỷ niệm",
    ],
    exclusions: [],
    note: "Hạn mức tạo nhân vật cuối cùng đang được xác nhận: không giới hạn hoặc 100 lượt/tháng. Khả năng xuất HD/4K cần được xác nhận khi tích hợp.",
  },
];
export const planAvailability = {
  published: true,
  checkoutEnabled: false,
  plans,
  message:
    "Thông tin gói theo cấu hình sản phẩm được cung cấp ngày 17/09/2026. Bản trải nghiệm chưa hỗ trợ đăng ký gói, thanh toán hay cấp quyền sử dụng.",
};
