import { useRef, useState } from "react";
import { PageIntro } from "../components/Common";
export default function ContactPage() {
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const form = useRef(null);
  function submit(event) {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(event.currentTarget));
    const next = {};
    if (!values.name.trim()) next.name = "Vui lòng nhập tên người liên hệ.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      next.email = "Vui lòng nhập email đúng định dạng, ví dụ ten@example.com.";
    if (!values.content.trim())
      next.content = "Vui lòng nhập câu hỏi hoặc góp ý.";
    setErrors(next);
    setMessage(
      Object.keys(next).length
        ? ""
        : "Thông tin hợp lệ. Bản demo chưa gửi liên hệ.",
    );
    if (Object.keys(next).length)
      form.current.elements[Object.keys(next)[0]].focus();
  }
  return (
    <div className="container page-space form-page">
      <PageIntro
        label="Chúng mình lắng nghe"
        title="Bố mẹ muốn trao đổi điều gì?"
      >
        Chia sẻ câu hỏi hoặc góp ý để SketchTale hiểu điều gia đình cần.
      </PageIntro>
      <p className="form-notice">Biểu mẫu minh họa, chưa gửi thông tin.</p>
      <form
        ref={form}
        noValidate
        onSubmit={submit}
        onChange={() => setMessage("")}
      >
        <div className="field">
          <label htmlFor="contact-name">
            Tên người liên hệ <span>(bắt buộc)</span>
          </label>
          <input
            id="contact-name"
            name="name"
            autoComplete="name"
            maxLength={100}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <p className="field-error" id="name-error">
              {errors.name}
            </p>
          )}
        </div>
        <div className="field">
          <label htmlFor="contact-email">
            Email <span>(bắt buộc)</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            maxLength={254}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <p className="field-error" id="email-error">
              {errors.email}
            </p>
          )}
        </div>
        <div className="field">
          <label htmlFor="contact-topic">
            Chủ đề <span>(tùy chọn)</span>
          </label>
          <select id="contact-topic" name="topic">
            <option value="">Chọn chủ đề</option>
            <option>Sản phẩm</option>
            <option>Tài khoản</option>
            <option>Góp ý</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="contact-content">
            Nội dung <span>(bắt buộc)</span>
          </label>
          <textarea
            id="contact-content"
            name="content"
            rows={6}
            maxLength={2000}
            aria-invalid={!!errors.content}
            aria-describedby={`content-help${errors.content ? " content-error" : ""}`}
          />
          <p id="content-help" className="small muted">
            Tối đa 2.000 ký tự. Vui lòng không gửi thông tin riêng tư hoặc hình
            ảnh của trẻ trong biểu mẫu này.
          </p>
          {errors.content && (
            <p className="field-error" id="content-error">
              {errors.content}
            </p>
          )}
        </div>
        <button className="button" type="submit">
          Kiểm tra biểu mẫu
        </button>
        <div role="status">
          {message && <p className="success-message">{message}</p>}
        </div>
      </form>
    </div>
  );
}
