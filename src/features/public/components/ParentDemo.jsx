import { useId, useRef, useState } from "react";
import {
  Check,
  Clock,
  CloudSun,
  Sun,
  SlidersHorizontal,
  UserCircle,
} from "@phosphor-icons/react";
import { categories } from "../data/sampleStories";
const tabs = ["Hồ sơ của bé", "Nội dung phù hợp", "Thời gian sử dụng"];
const icons = [UserCircle, SlidersHorizontal, Clock];
export default function ParentDemo() {
  const [tab, setTab] = useState(0);
  const [child, setChild] = useState("Mây");
  const [profiles, setProfiles] = useState({
    Mây: { minutes: 20, categories: [...categories] },
    Nắng: { minutes: 30, categories: ["Tình bạn", "Khám phá"] },
  });
  const refs = useRef([]);
  const id = useId();
  const profile = profiles[child];
  const update = (changes) =>
    setProfiles((previous) => ({
      ...previous,
      [child]: { ...previous[child], ...changes },
    }));
  function onTabKey(event, i) {
    const next =
      event.key === "ArrowRight"
        ? (i + 1) % tabs.length
        : event.key === "ArrowLeft"
          ? (i + tabs.length - 1) % tabs.length
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? tabs.length - 1
              : null;
    if (next !== null) {
      event.preventDefault();
      setTab(next);
      refs.current[next].focus();
    }
  }
  return (
    <div className="parent-demo">
      <div className="demo-top">
        <span className="demo-label">Góc của bố mẹ</span>
        <span className="muted">Hồ sơ hư cấu</span>
      </div>
      <div className="demo-tabs" role="tablist" aria-label="Cài đặt phụ huynh">
        {tabs.map((name, i) => {
          const Icon = icons[i];
          return (
            <button
              key={name}
              id={`${id}-tab-${i}`}
              ref={(el) => {
                refs.current[i] = el;
              }}
              role="tab"
              aria-selected={tab === i}
              tabIndex={tab === i ? 0 : -1}
              aria-controls={`${id}-panel`}
              onKeyDown={(e) => onTabKey(e, i)}
              onClick={() => setTab(i)}
            >
              <Icon size={20} aria-hidden="true" />
              {name}
            </button>
          );
        })}
      </div>
      <div className="demo-body">
        <div className="profile-picker" aria-label="Chọn hồ sơ minh họa">
          {["Mây", "Nắng"].map((name) => (
            <button
              key={name}
              className={child === name ? "selected" : ""}
              aria-pressed={child === name}
              onClick={() => setChild(name)}
            >
              {name === "Mây" ? (
                <CloudSun size={32} weight="duotone" aria-hidden="true" />
              ) : (
                <Sun size={32} weight="duotone" aria-hidden="true" />
              )}
              <span>
                {name}
                <small>Hồ sơ minh họa</small>
              </span>
              {child === name && <Check size={18} aria-hidden="true" />}
            </button>
          ))}
        </div>
        <div
          className="demo-panel"
          id={`${id}-panel`}
          role="tabpanel"
          aria-labelledby={`${id}-tab-${tab}`}
          tabIndex={0}
        >
          {tab === 0 && (
            <>
              <h3>Một không gian riêng cho {child}.</h3>
              <p>
                Cùng một tài khoản phụ huynh, mỗi bé có nội dung và nhịp sử dụng
                riêng.
              </p>
              <div className="profile-summary">
                <span>
                  <strong>{profile.categories.length}</strong> chủ đề được chọn
                </span>
                <span>
                  <strong>{profile.minutes} phút</strong> thời gian mẫu
                </span>
              </div>
            </>
          )}
          {tab === 1 && (
            <>
              <h3>Chủ đề dành cho {child}</h3>
              <p>Bố mẹ chọn những điều muốn cùng bé khám phá.</p>
              <div className="category-toggles">
                {categories.map((category) => (
                  <label key={category}>
                    <span>{category}</span>
                    <input
                      type="checkbox"
                      role="switch"
                      checked={profile.categories.includes(category)}
                      onChange={() =>
                        update({
                          categories: profile.categories.includes(category)
                            ? profile.categories.filter(
                                (item) => item !== category,
                              )
                            : [...profile.categories, category],
                        })
                      }
                    />
                    <span className="switch-track" aria-hidden="true" />
                  </label>
                ))}
              </div>
            </>
          )}
          {tab === 2 && (
            <>
              <h3>Nhịp đọc của {child}</h3>
              <label htmlFor={`${id}-time`}>
                Thời gian minh họa: <strong>{profile.minutes} phút</strong>
              </label>
              <input
                id={`${id}-time`}
                type="range"
                min="10"
                max="60"
                step="5"
                value={profile.minutes}
                onChange={(event) =>
                  update({ minutes: Number(event.target.value) })
                }
              />
              <p>
                Theo thiết kế, ứng dụng sẽ nhắc trước khi hết thời gian 5 phút.
                Giá trị này chỉ dùng thử, không phải hạn mức gói.
              </p>
            </>
          )}
        </div>
      </div>
      <p className="demo-note">
        Minh họa giao diện phụ huynh — thay đổi không được lưu.
      </p>
    </div>
  );
}
