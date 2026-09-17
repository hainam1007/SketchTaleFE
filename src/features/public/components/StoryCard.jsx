import { ArrowUpRight } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
export default function StoryCard({ story, featured = false }) {
  return (
    <article className={`story-card ${featured ? "featured" : ""}`}>
      <Link
        className="cover-link"
        to={`/stories/${story.slug}`}
        tabIndex={-1}
        aria-hidden="true"
      >
        <img src={story.cover} alt="" width="800" height="600" loading="lazy" />
      </Link>
      <div className="story-info">
        <div className="story-meta">
          <span className={`badge category-${story.id}`}>{story.category}</span>
          <span>Truyện mẫu</span>
        </div>
        <h3>
          <Link to={`/stories/${story.slug}`}>
            {story.title}
            <ArrowUpRight size={23} aria-hidden="true" />
          </Link>
        </h3>
        <p>{story.summary}</p>
        <Link className="text-link" to={`/stories/${story.slug}`}>
          Đọc truyện mẫu <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
