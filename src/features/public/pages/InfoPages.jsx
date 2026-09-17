import { Sparkle } from "@phosphor-icons/react";
import {
  ActionLink,
  DataState,
  FinalCta,
  PageIntro,
} from "../components/Common";
import FaqAccordion from "../components/FaqAccordion";
import ParentDemo from "../components/ParentDemo";
import { usePublicData } from "../components/usePublicData";
import PlanComparison from "../components/PlanComparison";

export function PricingPage() {
  const result = usePublicData("getPlanAvailability");
  return (
    <>
      <div className="container page-space">
        <PageIntro
          label="Hành trình của gia đình"
          title="Gói sử dụng SketchTale"
        >
          Từ câu chuyện đầu tiên đến những sáng tạo của cả gia đình.
        </PageIntro>
        {result.loading || result.error ? (
          <DataState {...result} />
        ) : (
          <>
            <p className="form-notice pricing-notice">{result.data.message}</p>
            <PlanComparison plans={result.data.plans} />
            <p className="small muted">
              Ba truyện công khai là nội dung demo, không phải danh sách 5
              truyện thuộc gói Free. Điều kiện gia hạn, hủy, hoàn tiền và cách
              tính lượt sẽ được bổ sung trước khi mở thanh toán.
            </p>
          </>
        )}
        <div className="section narrow">
          <h2>Về gói sử dụng</h2>
          <p>
            Free có 1 hồ sơ, Pro tối đa 3 và Family tối đa 5 hồ sơ. Mỗi bé có
            cài đặt riêng trong tài khoản phụ huynh.
          </p>
          <FaqAccordion />
        </div>
      </div>
    </>
  );
}
export function FaqPage() {
  return (
    <div className="container page-space narrow">
      <PageIntro
        label="Câu hỏi thường gặp"
        title="Những điều bố mẹ muốn biết."
      />
      <FaqAccordion grouped />
      <div className="contact-invite">
        <h2>Bạn còn câu hỏi khác?</h2>
        <ActionLink to="/contact" secondary>
          Liên hệ
        </ActionLink>
      </div>
    </div>
  );
}
export function ParentsPage() {
  return (
    <>
      <div className="container page-space">
        <PageIntro
          label="Dành cho phụ huynh"
          title="Cùng bé khám phá, theo cách của gia đình."
        >
          Một tài khoản phụ huynh, những không gian riêng cho từng bé. Bố mẹ
          luôn là người đồng hành trong hành trình đọc.
        </PageIntro>
        <ParentDemo />
        <div className="parent-explainer">
          <article>
            <span className="eyebrow">Hồ sơ riêng</span>
            <h2>Mỗi bé, một thế giới.</h2>
            <p>
              Một phụ huynh có thể quản lý nhiều hồ sơ trẻ. Mỗi hồ sơ thuộc một
              tài khoản phụ huynh, với lựa chọn nội dung và cài đặt riêng.
            </p>
          </article>
          <article>
            <span className="eyebrow">Cùng lựa chọn</span>
            <h2>Nội dung và nhịp sử dụng.</h2>
            <p>
              Theo thiết kế, bố mẹ chọn danh mục cho từng bé, thiết lập thời
              gian và ứng dụng nhắc trước khi hết giờ 5 phút.
            </p>
          </article>
          <article>
            <span className="eyebrow">Cùng nhìn lại</span>
            <h2>Theo dõi hành trình của bé.</h2>
            <p>
              Sản phẩm dự kiến hỗ trợ xem lịch sử đọc, nghe và trả lời. Bản trải
              nghiệm công khai không thu thập hay lưu tiến trình thật của trẻ.
            </p>
          </article>
        </div>
        <div className="narrow section">
          <h2>Những điều bố mẹ muốn biết</h2>
          <FaqAccordion />
        </div>
      </div>
      <FinalCta />
    </>
  );
}
export function AboutPage() {
  return (
    <>
      <div className="container page-space about-grid">
        <div>
          <PageIntro
            label="Về SketchTale"
            title="Một câu chuyện nhỏ về SketchTale."
          >
            Một không gian đọc truyện và khám phá, dành cho bé 3–6 tuổi cùng sự
            đồng hành của bố mẹ.
          </PageIntro>
          <p>
            Chúng mình bắt đầu từ một điều gần gũi: những phút ngồi bên nhau, mở
            một cuốn sách và lắng nghe điều bé nghĩ.
          </p>
          <p>
            SketchTale được thiết kế để kết nối những trang truyện, lời kể và
            câu hỏi nhỏ. Bé khám phá theo nhịp của mình, bố mẹ cùng chọn nội
            dung phù hợp.
          </p>
          <ActionLink />
        </div>
        <img
          src="/images/hero.webp"
          alt="Mèo linh vật chào bên cuốn sách mở."
          width="800"
          height="600"
        />
      </div>
      <FinalCta />
    </>
  );
}
const policyContent = {
  "/privacy": {
    title: "Quyền riêng tư",
    intro:
      "Chưa phải chính sách chính thức. Nội dung cần được hoàn thiện và phê duyệt trước khi thu thập dữ liệu thật.",
    sections: [
      [
        "Dữ liệu và mục đích sử dụng",
        "Cần công bố danh mục dữ liệu thu thập, mục đích xử lý và phạm vi dữ liệu của phụ huynh và trẻ.",
      ],
      [
        "Lưu trữ và chia sẻ",
        "Cần xác nhận thời hạn lưu trữ, bên tiếp nhận, biện pháp bảo vệ và quy trình xử lý dữ liệu.",
      ],
      [
        "Quyền quản lý dữ liệu",
        "Cần cung cấp quy trình xem, sửa, yêu cầu xóa dữ liệu và đầu mối tiếp nhận chính thức.",
      ],
    ],
  },
  "/terms": {
    title: "Điều khoản sử dụng",
    intro:
      "Chưa phải chính sách chính thức. Những mục dưới đây là danh mục cần nhóm sản phẩm xác nhận trước khi phát hành.",
    sections: [
      [
        "Tài khoản và quyền sử dụng",
        "Cần xác nhận trách nhiệm của tài khoản phụ huynh, điều kiện sử dụng và quản lý hồ sơ trẻ.",
      ],
      [
        "Nội dung và bản quyền",
        "Cần xác nhận quyền sử dụng truyện, hình ảnh và các nội dung do người dùng cung cấp.",
      ],
      [
        "Thanh toán và chấm dứt sử dụng",
        "Điều kiện thanh toán, gia hạn, hủy và hoàn tiền sẽ được bổ sung khi chính sách thương mại được duyệt.",
      ],
    ],
  },
  "/child-safety": {
    title: "Cùng xây dựng trải nghiệm phù hợp cho bé.",
    intro:
      "Phụ huynh đồng hành với bé trong việc chọn nội dung, đọc truyện và trò chuyện sau mỗi trang sách.",
    sections: [
      [
        "Chọn nội dung cùng bé",
        "Truyện mẫu trên website được chọn riêng cho trải nghiệm minh họa. Nội dung chính thức cần được duyệt trước khi xuất bản.",
      ],
      [
        "Giữ nhịp sử dụng phù hợp",
        "Demo phụ huynh cho phép thử lựa chọn danh mục và thời gian theo từng hồ sơ hư cấu. Các thay đổi chỉ tồn tại trong phiên xem.",
      ],
      [
        "Cùng quan sát và lắng nghe",
        "Bố mẹ có thể đọc cùng bé, hỏi về điều bé vừa gặp và dừng khi bé cần nghỉ. Công cụ cài đặt hỗ trợ sự đồng hành của người lớn.",
      ],
      [
        "Hỗ trợ và báo cáo nội dung",
        "Quy trình báo cáo và đầu mối hỗ trợ chính thức đang được hoàn thiện. Biểu mẫu liên hệ hiện là bản minh họa, chưa gửi thông tin.",
      ],
    ],
  },
};
export function PolicyPage({ path }) {
  const content = policyContent[path];
  return (
    <div className="container page-space narrow policy-page">
      <PageIntro label="Nội dung dự thảo" title={content.title}>
        {content.intro}
      </PageIntro>
      <nav className="policy-toc" aria-label="Mục lục">
        <h2>Trong trang này</h2>
        {content.sections.map(([title], i) => (
          <a key={title} href={`#policy-${i}`}>
            {title}
          </a>
        ))}
      </nav>
      {content.sections.map(([title, text], i) => (
        <section id={`policy-${i}`} key={title}>
          <h2>{title}</h2>
          <p>{text}</p>
        </section>
      ))}
      <p className="demo-note">
        Chưa có ngày hiệu lực. Bản nháp này không thay thế chính sách được phê
        duyệt.
      </p>
      <ActionLink to="/contact" secondary>
        Tìm hiểu liên hệ
      </ActionLink>
    </div>
  );
}
export function NotFoundPage() {
  return (
    <div className="container page-space not-found">
      <Sparkle size={56} weight="duotone" aria-hidden="true" />
      <span className="eyebrow">404</span>
      <h1>Trang này đi lạc rồi.</h1>
      <p>Cùng quay lại kệ sách và chọn một hành trình khác nhé.</p>
      <div className="hero-actions">
        <ActionLink to="/">Về trang chủ</ActionLink>
        <ActionLink secondary />
      </div>
    </div>
  );
}
