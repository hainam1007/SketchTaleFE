import { MagnifyingGlass, BookOpen } from "@phosphor-icons/react";
import { Link, useSearchParams } from "react-router-dom";
import { categories } from "../data/sampleStories";
import { DataState, PageIntro } from "../components/Common";
import StoryCard from "../components/StoryCard";
import { usePublicData } from "../components/usePublicData";
export default function StoriesPage() {
  const [params, setParams] = useSearchParams();
  const search = params.get("q") || "";
  const category = params.get("category") || "";
  const result = usePublicData("getSampleStories", { search, category });
  function change(key, value) {
    setParams(
      (previous) => {
        const next = new URLSearchParams(previous);
        if (value) next.set(key, value);
        else next.delete(key);
        return next;
      },
      { replace: true },
    );
  }
  function clear() {
    setParams((previous) => {
      const next = new URLSearchParams(previous);
      next.delete("q");
      next.delete("category");
      return next;
    });
  }
  return (
    <div className="container page-space">
      <PageIntro label="Nội dung minh họa" title="Cùng bé chọn một câu chuyện.">
        Khám phá các truyện mẫu theo chủ đề bé yêu thích.
      </PageIntro>
      <div className="story-filters">
        <div className="search-field">
          <label htmlFor="story-search">Tìm theo tên truyện</label>
          <div>
            <MagnifyingGlass size={22} aria-hidden="true" />
            <input
              id="story-search"
              type="search"
              placeholder="Bé muốn đọc gì hôm nay?"
              value={search}
              onChange={(e) => change("q", e.target.value)}
            />
          </div>
        </div>
        <fieldset className="filter-pills">
          <legend>Chủ đề</legend>
          {["", ...categories].map((item) => (
            <button
              key={item}
              aria-pressed={category === item}
              onClick={() => change("category", item)}
            >
              {item || "Tất cả"}
            </button>
          ))}
        </fieldset>
      </div>
      {result.loading || result.error ? (
        <DataState {...result} />
      ) : (
        <>
          <p className="result-count" role="status">
            {result.data.length} truyện mẫu{search && ` cho “${search}”`}
          </p>
          {result.data.length ? (
            <div className="story-grid">
              {result.data.map((story) => (
                <StoryCard key={story.id} story={story} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <BookOpen size={48} weight="duotone" aria-hidden="true" />
              <h2>Chưa tìm thấy câu chuyện phù hợp.</h2>
              <p>Thử một tên khác hoặc khám phá tất cả chủ đề.</p>
              <button className="button secondary" onClick={clear}>
                Xóa bộ lọc
              </button>
            </div>
          )}
        </>
      )}
      <aside className="library-note">
        <BookOpen size={26} aria-hidden="true" />
        <div>
          <h2>Một khoảng thời gian dành cho bố mẹ và bé.</h2>
          <p>
            Các truyện được sáng tác để minh họa giao diện, chưa phải nội dung
            xuất bản chính thức.{" "}
            <Link to="/for-parents">Tìm hiểu dành cho phụ huynh.</Link>
          </p>
        </div>
      </aside>
    </div>
  );
}
