import { Check, Minus } from "@phosphor-icons/react";
import { ActionLink } from "./Common";
export default function PlanComparison({ plans }) {
  return (
    <div className="plans-grid">
      {plans.map((plan) => (
        <article key={plan.id} className={`plan-card plan-${plan.id}`}>
          <span className="eyebrow">
            {plan.id === "starter"
              ? "Bắt đầu khám phá"
              : plan.id === "explorer"
                ? "Sáng tạo mỗi ngày"
                : "Cùng cả gia đình"}
          </span>
          <h2>{plan.name}</h2>
          <p className="plan-audience">{plan.audience}</p>
          <div className="plan-price">
            <strong>
              {new Intl.NumberFormat("vi-VN").format(plan.price)}
              <span>đ</span>
            </strong>
            <span>{plan.price === 0 ? "Miễn phí" : "/ tháng"}</span>
          </div>
          <h3>Hạn mức sử dụng</h3>
          <ul className="plan-list">
            {plan.limits.map((item) => (
              <li key={item}>
                <Check size={18} aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <h3>Tính năng trong gói</h3>
          <ul className="plan-list">
            {plan.features.map((item) => (
              <li key={item}>
                <Check size={18} aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          {plan.exclusions.length > 0 && (
            <>
              <h3>Giới hạn cần biết</h3>
              <ul className="plan-list exclusions">
                {plan.exclusions.map((item) => (
                  <li key={item}>
                    <Minus size={18} aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
          {plan.note && <p className="plan-note">{plan.note}</p>}
          <div className="plan-action">
            <ActionLink secondary>Khám phá truyện mẫu</ActionLink>
          </div>
        </article>
      ))}
    </div>
  );
}
