import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ArrowCounterClockwise,
  CheckCircle,
} from "@phosphor-icons/react";
import { ActionLink, DataState } from "../components/Common";
import { usePublicData } from "../components/usePublicData";
export default function StoryPage() {
  const { slug } = useParams();
  const result = usePublicData("getSampleStory", slug);
  if (result.loading || result.error)
    return (
      <div className="container page-space">
        <DataState {...result} />
      </div>
    );
  if (!result.data)
    return (
      <div className="container page-space">
        <h1>Không tìm thấy truyện mẫu</h1>
        <p>Câu chuyện này chưa có trong kệ truyện mẫu.</p>
        <ActionLink to="/stories">Về thư viện truyện</ActionLink>
      </div>
    );
  return <Reader key={slug} story={result.data} />;
}
function Reader({ story }) {
  useEffect(() => {
    document.title = `${story.title} — SketchTale`;
  }, [story.title]);
  const [page, setPage] = useState(0);
  const [answer, setAnswer] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const reader = useRef(null);
  const current = story.pages[page];
  const last = page === story.pages.length - 1;
  function focusReader() {
    reader.current?.focus();
    reader.current?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
      block: "start",
    });
  }
  function restart() {
    setPage(0);
    setAnswer(null);
    setSubmitted(false);
    focusReader();
  }
  return (
    <div className="container page-space story-page">
      <nav className="breadcrumbs" aria-label="Đường dẫn">
        <Link to="/">Trang chủ</Link>
        <span>/</span>
        <Link to="/stories">Truyện mẫu</Link>
        <span>/</span>
        <span>{story.title}</span>
      </nav>
      <div className="story-intro">
        <div>
          <span className={`badge category-${story.id}`}>{story.category}</span>
          <span className="small muted">Truyện mẫu</span>
          <h1>{story.title}</h1>
          <p className="lead">{story.summary}</p>
          <button className="button" onClick={focusReader}>
            Đọc truyện mẫu <ArrowRight size={20} aria-hidden="true" />
          </button>
        </div>
        <img src={story.cover} alt={story.coverAlt} width="400" height="300" />
      </div>
      <section
        className="reader"
        ref={reader}
        tabIndex={-1}
        aria-label={`Đọc ${story.title}`}
      >
        <div className="reader-spread">
          <img src={current.image} alt={current.alt} width="800" height="600" />
          <div className="reader-text" aria-live="polite" aria-atomic="true">
            <span className="eyebrow">
              Trang {page + 1} / {story.pages.length}
            </span>
            <p>{current.text}</p>
            <span className="small muted">
              Tranh minh họa chung cho câu chuyện
            </span>
          </div>
        </div>
        <div className="reader-controls">
          <button
            className="button secondary"
            disabled={page === 0}
            onClick={() => setPage(page - 1)}
          >
            <ArrowLeft size={20} aria-hidden="true" />
            Trang trước
          </button>
          <span aria-hidden="true">
            {story.pages.map((item, i) => (
              <span
                key={item.id}
                className={`page-dot ${page === i ? "current" : ""}`}
              />
            ))}
          </span>
          <button
            className="button"
            disabled={last}
            onClick={() => setPage(page + 1)}
          >
            Trang sau
            <ArrowRight size={20} aria-hidden="true" />
          </button>
        </div>
      </section>
      {last && (
        <section className="quiz">
          <span className="eyebrow">Cùng bé nhớ lại</span>
          <h2>Một câu hỏi nhỏ cho bé.</h2>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (answer !== null) setSubmitted(true);
            }}
          >
            <fieldset>
              <legend>{story.quiz.question}</legend>
              {story.quiz.options.map((option, i) => (
                <label
                  className={`quiz-option ${answer === i ? "chosen" : ""}`}
                  key={option}
                >
                  <input
                    type="radio"
                    name="answer"
                    value={i}
                    checked={answer === i}
                    onChange={() => {
                      setAnswer(i);
                      setSubmitted(false);
                    }}
                    required
                  />
                  <span>{option}</span>
                </label>
              ))}
            </fieldset>
            <button className="button" type="submit" disabled={answer === null}>
              Cùng xem đáp án <CheckCircle size={20} aria-hidden="true" />
            </button>
          </form>
          {submitted && (
            <div
              role="status"
              className={`quiz-feedback ${answer === story.quiz.correct ? "correct" : ""}`}
            >
              <p>
                {answer === story.quiz.correct
                  ? story.quiz.success
                  : story.quiz.retry}
              </p>
              {answer !== story.quiz.correct && (
                <button
                  className="text-button"
                  onClick={() => {
                    setPage(story.quiz.reviewPage);
                    setSubmitted(false);
                    focusReader();
                  }}
                >
                  Xem lại trang {story.quiz.reviewPage + 1}
                </button>
              )}
            </div>
          )}
          <div className="reader-end">
            <button className="button secondary" onClick={restart}>
              <ArrowCounterClockwise size={20} aria-hidden="true" />
              Đọc lại
            </button>
            <Link className="text-link" to="/stories">
              Chọn câu chuyện khác →
            </Link>
          </div>
          <p className="small muted">
            Bạn đã đọc hết truyện mẫu. Trải nghiệm này không lưu tiến trình học
            tập.
          </p>
        </section>
      )}
    </div>
  );
}
