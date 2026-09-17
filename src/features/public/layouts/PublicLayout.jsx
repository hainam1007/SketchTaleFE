import { useEffect, useRef, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { ArrowUpRight, List, X } from "@phosphor-icons/react";

const navigation = [
  ["/#how-it-works", "Cách hoạt động"],
  ["/stories", "Truyện mẫu"],
  ["/for-parents", "Dành cho phụ huynh"],
  ["/pricing", "Gói sử dụng"],
];
export default function PublicLayout() {
  const [menuLocation, setMenuLocation] = useState(null);
  const menuButton = useRef(null);
  const menu = useRef(null);
  const location = useLocation();
  const open = menuLocation === location.key;
  const setOpen = (value) => setMenuLocation(value ? location.key : null);
  useEffect(() => {
    if (!open) return;
    menu.current?.querySelector("a")?.focus();
    function onKey(event) {
      if (event.key === "Escape") {
        setMenuLocation(null);
        menuButton.current?.focus();
      }
      if (event.key === "Tab") {
        const links = [...menu.current.querySelectorAll("a")];
        if (event.shiftKey && document.activeElement === links[0]) {
          event.preventDefault();
          menuButton.current.focus();
        } else if (!event.shiftKey && document.activeElement === links.at(-1)) {
          event.preventDefault();
          menuButton.current.focus();
        } else if (document.activeElement === menuButton.current) {
          event.preventDefault();
          (event.shiftKey ? links.at(-1) : links[0]).focus();
        }
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);
  return (
    <>
      <a className="skip-link" href="#main">
        Bỏ qua điều hướng
      </a>
      <header className="site-header">
        <div className="container header-inner">
          <Link to="/" className="brand" aria-label="SketchTale - Trang chủ">
            <img
              src="/images/logo.webp"
              alt="SketchTale"
              width="184"
              height="48"
            />
          </Link>
          <nav className="desktop-nav" aria-label="Điều hướng chính">
            {navigation.map(([to, label]) => (
              <NavLink key={to} to={to}>
                {label}
              </NavLink>
            ))}
          </nav>
          <Link className="login-link" to="/auth/login">
            Đăng nhập <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
          <button
            className="menu-button"
            ref={menuButton}
            aria-label={open ? "Đóng menu" : "Mở menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={26} /> : <List size={26} />}
          </button>
        </div>
        <nav
          id="mobile-menu"
          className="mobile-nav"
          ref={menu}
          aria-label="Điều hướng di động"
          hidden={!open}
        >
          {[...navigation, ["/auth/login", "Đăng nhập"]].map(([to, label]) => (
            <Link key={to} to={to} onClick={() => setOpen(false)}>
              {label}
            </Link>
          ))}
        </nav>
      </header>
      <div className="prototype-notice">
        Bản trải nghiệm giao diện — dữ liệu minh họa
      </div>
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <Link to="/" className="brand">
              <img
                src="/images/logo.webp"
                alt="SketchTale"
                width="184"
                height="48"
              />
            </Link>
            <p>
              Cùng bé mở trang sách,
              <br />
              nuôi dưỡng trí tưởng tượng.
            </p>
          </div>
          <div>
            <h2>Khám phá</h2>
            <Link to="/stories">Truyện mẫu</Link>
            <Link to="/for-parents">Dành cho phụ huynh</Link>
            <Link to="/pricing">Gói sử dụng</Link>
            <Link to="/about">Về SketchTale</Link>
          </div>
          <div>
            <h2>Hỗ trợ</h2>
            <Link to="/faq">Câu hỏi thường gặp</Link>
            <Link to="/contact">Liên hệ</Link>
            <Link to="/child-safety">Đồng hành cùng bé</Link>
          </div>
          <div>
            <h2>Chính sách</h2>
            <Link to="/privacy">Quyền riêng tư (bản nháp)</Link>
            <Link to="/terms">Điều khoản (bản nháp)</Link>
            <p className="small">Nội dung chính sách đang được hoàn thiện.</p>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>SketchTale</span>
          <span>Một câu chuyện nhỏ. Một khoảng thời gian bên nhau.</span>
        </div>
      </footer>
    </>
  );
}
