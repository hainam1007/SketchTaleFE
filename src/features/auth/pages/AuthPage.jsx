import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { PageIntro } from "../../public/components/Common";
const content = {
  login: {
    title: "Chào bố mẹ, mừng trở lại.",
    description:
      "Đăng nhập để tiếp tục hành trình cùng bé khi chức năng sẵn sàng.",
    button: "Kiểm tra đăng nhập",
  },
  register: {
    title: "Cùng mở một hành trình mới.",
    description: "Tài khoản dành cho phụ huynh đồng hành cùng bé.",
    button: "Kiểm tra đăng ký",
  },
  "forgot-password": {
    title: "Tìm lại đường về kệ sách.",
    description:
      "Nhập email tài khoản phụ huynh để kiểm tra biểu mẫu đặt lại mật khẩu.",
    button: "Kiểm tra email",
  },
};
export default function AuthPage({ mode }) {
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const form = useRef(null);
  const copy = content[mode];
  const forgot = mode === "forgot-password";
  function submit(event) {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(event.currentTarget));
    const next = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      next.email = "Vui lòng nhập email đúng định dạng.";
    if (!forgot && values.password.length < 8)
      next.password = "Nhập ít nhất 8 ký tự để thử biểu mẫu.";
    if (mode === "register" && values.confirm !== values.password)
      next.confirm = "Hai mật khẩu chưa trùng nhau.";
    setErrors(next);
    setMessage(
      Object.keys(next).length
        ? ""
        : forgot
          ? "Email hợp lệ. Bản demo chưa gửi email đặt lại mật khẩu."
          : "Thông tin hợp lệ. Bản demo chưa đăng nhập hoặc tạo tài khoản.",
    );
    if (Object.keys(next).length)
      form.current.elements[Object.keys(next)[0]].focus();
    else {
      form.current
        .querySelectorAll('input[type="password"]')
        .forEach((input) => {
          input.value = "";
        });
    }
  }
  return (
    <div className="container page-space auth-page">
      <div className="auth-art">
        <img src="/images/hero.webp" alt="" width="800" height="600" />
        <p>
          Một trang sách mới
          <br />
          đang chờ bố mẹ và bé.
        </p>
      </div>
      <div>
        <PageIntro label="Góc tài khoản phụ huynh" title={copy.title}>
          {copy.description}
        </PageIntro>
        <p className="form-notice">
          Giao diện minh họa, chưa kết nối tài khoản. Hãy dùng thông tin thử,
          không dùng mật khẩu thật.
        </p>
        <form
          ref={form}
          noValidate
          onSubmit={submit}
          onChange={() => setMessage("")}
        >
          {[
            ["email", "Email", "email"],
            ...(!forgot ? [["password", "Mật khẩu", "password"]] : []),
            ...(mode === "register"
              ? [["confirm", "Nhập lại mật khẩu", "password"]]
              : []),
          ].map(([name, label, type]) => (
            <div className="field" key={name}>
              <label htmlFor={`auth-${name}`}>{label}</label>
              <input
                id={`auth-${name}`}
                name={name}
                type={type}
                autoComplete={
                  name === "email"
                    ? "email"
                    : mode === "login"
                      ? "current-password"
                      : "new-password"
                }
                aria-invalid={!!errors[name]}
                aria-describedby={errors[name] ? `${name}-error` : undefined}
              />
              {errors[name] && (
                <p id={`${name}-error`} className="field-error">
                  {errors[name]}
                </p>
              )}
            </div>
          ))}
          {mode === "login" && (
            <Link className="text-link forgot-link" to="/auth/forgot-password">
              Quên mật khẩu?
            </Link>
          )}
          <button className="button auth-submit" type="submit">
            {copy.button}
          </button>
          <div role="status">
            {message && <p className="success-message">{message}</p>}
          </div>
        </form>
        <p className="auth-alternate">
          {mode === "login" ? (
            <>
              Chưa có tài khoản?{" "}
              <Link to="/auth/register">Xem mẫu đăng ký</Link>
            </>
          ) : (
            <Link to="/auth/login">Quay lại đăng nhập</Link>
          )}
        </p>
      </div>
    </div>
  );
}
