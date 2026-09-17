import {
  BookOpen,
  ChatCircleDots,
  Headphones,
  Sparkle,
} from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import {
  ActionLink,
  DataState,
  FinalCta,
  SectionHeading,
} from "../components/Common";
import FaqAccordion from "../components/FaqAccordion";
import ParentDemo from "../components/ParentDemo";
import StoryCard from "../components/StoryCard";
import { usePublicData } from "../components/usePublicData";
import { experiences, steps } from "../data/homeContent";

export default function HomePage() {
  const stories = usePublicData("getSampleStories");
  const stepIcons = [BookOpen, Headphones, ChatCircleDots];
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow hero-eyebrow">
              <Sparkle size={19} weight="fill" aria-hidden="true" />
              Cùng bé 3–6 tuổi khám phá
            </span>
            <h1>
              Mở trang sách.
              <br />
              <span>Mở trí tưởng tượng.</span>
            </h1>
            <p className="lead">
              Cùng bé đọc, nghe và khám phá những câu chuyện theo cách riêng.
            </p>
            <div className="hero-actions">
              <ActionLink />
              <Link className="quiet-link" to="/#how-it-works">
                Cách hoạt động <span aria-hidden="true">↗</span>
              </Link>
            </div>
            <p className="hero-note">
              <BookOpen size={18} aria-hidden="true" />
              Một câu chuyện nhỏ, một khoảnh khắc bên nhau.
            </p>
          </div>
          <div className="hero-art">
            <img
              src="/images/hero.webp"
              alt="Mèo linh vật SketchTale chào bé bên cuốn sách mở, bạn Thỏ và một mầm cây nhỏ."
              width="1448"
              height="1086"
              fetchPriority="high"
            />
          </div>
        </div>
      </section>
      <section id="how-it-works" className="section steps-section">
        <div className="container">
          <SectionHeading
            label="Cách hoạt động"
            title="Bắt đầu từ một câu chuyện."
          />
          <div className="steps">
            {steps.map((step, i) => {
              const Icon = stepIcons[i];
              return (
                <article key={step.title}>
                  <div className={`step-symbol step-${i}`}>
                    <Icon size={32} weight="duotone" aria-hidden="true" />
                    <span>0{i + 1}</span>
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </article>
              );
            })}
          </div>
          <p className="small muted">
            Bản mẫu hiện có trải nghiệm đọc và câu hỏi. Lời kể sẽ được bổ sung
            khi có âm thanh phù hợp.
          </p>
        </div>
      </section>
      <section className="section shelf-section">
        <div className="container">
          <div className="heading-with-link">
            <SectionHeading
              label="Kệ truyện của bé"
              title="Một thế giới nhỏ, nhiều điều để khám phá."
            >
              Xem thử những câu chuyện và tìm chủ đề bé yêu thích.
            </SectionHeading>
            <Link className="text-link" to="/stories">
              Xem tất cả truyện <span aria-hidden="true">↗</span>
            </Link>
          </div>
          {stories.loading || stories.error ? (
            <DataState {...stories} />
          ) : (
            <div className="home-shelf">
              {stories.data.map((story, i) => (
                <StoryCard story={story} featured={i === 0} key={story.id} />
              ))}
            </div>
          )}
        </div>
      </section>
      <section className="section experience-section">
        <div className="container experience-grid">
          <div className="experience-art">
            <img
              src="/images/rabbit.webp"
              alt="Thỏ và Sóc chia sẻ chiếc ô, một câu chuyện nhỏ về tình bạn."
              width="800"
              height="600"
              loading="lazy"
            />
            <span className="illustration-caption">
              Một chiếc ô. Hai người bạn.
            </span>
          </div>
          <div>
            <SectionHeading
              label="Không chỉ là một trang sách"
              title="Đọc một câu chuyện. Mở thêm một cuộc trò chuyện."
            />
            <div className="experience-list">
              {experiences.map((item, i) => {
                const Icon = stepIcons[i];
                return (
                  <div key={item.title}>
                    <Icon size={26} aria-hidden="true" />
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      <section className="section parents-section" id="for-parents">
        <div className="container">
          <div className="heading-with-link">
            <SectionHeading
              label="Góc của bố mẹ"
              title="Thế giới của bé, có bố mẹ đồng hành."
            >
              Mỗi bé có không gian riêng; bố mẹ cùng chọn nội dung và nhịp sử
              dụng phù hợp.
            </SectionHeading>
            <Link className="text-link" to="/for-parents">
              Tìm hiểu thêm <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <ParentDemo />
        </div>
      </section>
      <section className="section">
        <div className="container plan-teaser">
          <div>
            <span className="eyebrow">Gói sử dụng</span>
            <h2>Lựa chọn phù hợp cho hành trình của gia đình.</h2>
          </div>
          <div>
            <p>
              Bắt đầu với Free / Starter, sáng tạo mỗi ngày cùng Pro Creator /
              Explorer 35.000đ/tháng, hoặc khám phá cùng cả gia đình với Family
              / Unlimited 89.000đ/tháng. Từ 1 đến tối đa 5 hồ sơ, tùy gói bạn
              chọn.
            </p>
            <ActionLink to="/pricing" secondary>
              Xem gói sử dụng
            </ActionLink>
          </div>
        </div>
      </section>
      <section className="section faq-section">
        <div className="container faq-container">
          <SectionHeading
            label="Câu hỏi thường gặp"
            title="Bố mẹ đang thắc mắc điều gì?"
          />
          <FaqAccordion limit={5} />
          <Link className="text-link faq-more" to="/faq">
            Xem tất cả câu hỏi <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
