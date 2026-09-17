export const categories = ["Tình bạn", "Thiên nhiên", "Khám phá"];
const makePages = (id, image, alt, texts) =>
  texts.map((text, i) => ({
    id: `${id}-${i + 1}`,
    order: i + 1,
    text,
    image,
    alt,
  }));
export const sampleStories = [
  {
    id: "umbrella",
    slug: "chiec-o-cua-ban-tho",
    title: "Chiếc ô của bạn Thỏ",
    category: "Tình bạn",
    summary: "Một cơn mưa nhỏ mang đến cơ hội để Thỏ chia sẻ chiếc ô của mình.",
    cover: "/images/rabbit.webp",
    coverAlt: "Thỏ chia sẻ chiếc ô vàng với Sóc trên con đường trong vườn.",
    isDemo: true,
    pages: makePages(
      "umbrella",
      "/images/rabbit.webp",
      "Thỏ và Sóc cùng đứng dưới chiếc ô vàng trong khu vườn.",
      [
        "Sáng nay, Thỏ mang chiếc ô vàng ra vườn. Bỗng những hạt mưa tí tách rơi xuống.",
        "Dưới gốc cây, Sóc đang nép mình tránh mưa. “Bạn đi cùng mình nhé!” Thỏ gọi.",
        "Thỏ và Sóc cùng bước dưới chiếc ô. Con đường về nhà bỗng vui hơn nhiều.",
      ],
    ),
    quiz: {
      question: "Thỏ đã làm gì khi thấy Sóc tránh mưa?",
      options: [
        "Rủ Sóc đi chung ô.",
        "Chạy về nhà một mình.",
        "Cất chiếc ô vào túi.",
      ],
      correct: 0,
      success: "Đúng rồi! Thỏ đã chia sẻ chiếc ô với Sóc.",
      retry: "Mình cùng xem lại trang Thỏ gặp Sóc nhé.",
      reviewPage: 1,
    },
  },
  {
    id: "seed",
    slug: "hat-mam-nho",
    title: "Hạt mầm nhỏ",
    category: "Thiên nhiên",
    summary:
      "Cùng một hạt mầm khám phá nắng, nước và niềm vui lớn lên từng ngày.",
    cover: "/images/seed.webp",
    coverAlt: "Mầm cây nhỏ đón ánh nắng và nước trong khu vườn.",
    isDemo: true,
    pages: makePages(
      "seed",
      "/images/seed.webp",
      "Mầm cây hai chiếc lá bên bình tưới nước, bướm và mặt trời.",
      [
        "Trong lớp đất mềm, một hạt mầm nhỏ đang ngủ. Giọt nước mát khẽ chạm vào hạt mầm.",
        "Nắng ấm ghé thăm khu vườn. Hạt mầm vươn mình, nhú lên hai chiếc lá xanh bé xíu.",
        "Mỗi ngày, bạn nhỏ tưới một chút nước. Mầm cây lớn dần, vui vẻ đón bướm tới chơi.",
      ],
    ),
    quiz: {
      question: "Điều gì giúp hạt mầm lớn lên?",
      options: ["Một chiếc ô.", "Nắng ấm và nước.", "Một chiếc hộp kín."],
      correct: 1,
      success: "Đúng rồi! Nắng ấm và nước giúp hạt mầm lớn lên.",
      retry: "Mình cùng đọc lại lúc nắng ghé thăm khu vườn nhé.",
      reviewPage: 1,
    },
  },
  {
    id: "star",
    slug: "meo-tim-ngoi-sao",
    title: "Mèo tìm ngôi sao",
    category: "Khám phá",
    summary:
      "Một chuyến đi nhỏ để Mèo tìm hiểu ánh sáng lấp lánh trên bầu trời.",
    cover: "/images/stars.webp",
    coverAlt: "Mèo nhìn ngôi sao vàng qua kính thiên văn trên ngọn đồi.",
    isDemo: true,
    pages: makePages(
      "star",
      "/images/stars.webp",
      "Mèo khăn coral ngắm trăng sao qua kính thiên văn.",
      [
        "Chiều xuống, Mèo nhìn thấy một đốm sáng trên cao. “Đó là gì nhỉ?” Mèo tò mò hỏi.",
        "Cùng mẹ, Mèo mang kính thiên văn lên ngọn đồi. Qua ống kính, bầu trời đầy những ngôi sao lấp lánh.",
        "Mèo hiểu rằng ngôi sao ở rất xa. Hai mẹ con ngồi cạnh nhau, ngắm trời và kể chuyện trước khi về nhà.",
      ],
    ),
    quiz: {
      question: "Mèo đã dùng gì để ngắm bầu trời?",
      options: ["Chiếc ô vàng.", "Bình tưới cây.", "Kính thiên văn."],
      correct: 2,
      success: "Đúng rồi! Mèo cùng mẹ dùng kính thiên văn để ngắm bầu trời.",
      retry: "Mình cùng xem lại chuyến đi lên ngọn đồi nhé.",
      reviewPage: 1,
    },
  },
];
