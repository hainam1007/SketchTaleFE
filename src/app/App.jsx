import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import PublicLayout from "../features/public/layouts/PublicLayout";
import HomePage from "../features/public/pages/HomePage";
import StoriesPage from "../features/public/pages/StoriesPage";
import StoryPage from "../features/public/pages/StoryPage";
import ContactPage from "../features/public/pages/ContactPage";
import {
  AboutPage,
  FaqPage,
  NotFoundPage,
  ParentsPage,
  PolicyPage,
  PricingPage,
} from "../features/public/pages/InfoPages";
import AuthPage from "../features/auth/pages/AuthPage";

const titles = {
  "/": "Cùng bé mở trang sách và trí tưởng tượng",
  "/stories": "Truyện mẫu",
  "/for-parents": "Dành cho phụ huynh",
  "/pricing": "Gói sử dụng",
  "/faq": "Những điều bố mẹ muốn biết",
  "/contact": "Liên hệ",
  "/about": "Về SketchTale",
  "/privacy": "Quyền riêng tư - Bản nháp",
  "/terms": "Điều khoản - Bản nháp",
  "/child-safety": "Đồng hành cùng bé",
  "/auth/login": "Đăng nhập minh họa",
  "/auth/register": "Đăng ký minh họa",
  "/auth/forgot-password": "Quên mật khẩu minh họa",
};
function RouteEffects() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    document.title = `SketchTale — ${titles[pathname] || (pathname.startsWith("/stories/") ? "Đọc truyện mẫu" : "Không tìm thấy trang")}`;
    const frame = requestAnimationFrame(() => {
      if (hash) document.getElementById(hash.slice(1))?.scrollIntoView();
      else {
        window.scrollTo(0, 0);
        document.getElementById("main")?.focus({ preventScroll: true });
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);
  return null;
}
export default function App() {
  return (
    <BrowserRouter>
      <RouteEffects />
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="stories" element={<StoriesPage />} />
          <Route path="stories/:slug" element={<StoryPage />} />
          <Route path="pricing" element={<PricingPage />} />
          <Route path="faq" element={<FaqPage />} />
          <Route path="for-parents" element={<ParentsPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          {["privacy", "terms", "child-safety"].map((path) => (
            <Route
              key={path}
              path={path}
              element={<PolicyPage path={`/${path}`} />}
            />
          ))}
          {["login", "register", "forgot-password"].map((mode) => (
            <Route
              key={mode}
              path={`auth/${mode}`}
              element={<AuthPage key={mode} mode={mode} />}
            />
          ))}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
