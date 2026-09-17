import { Plus, Minus } from "@phosphor-icons/react";
import { useId, useState } from "react";
import { usePublicData } from "./usePublicData";
import { DataState } from "./Common";
export default function FaqAccordion({ limit, grouped = false }) {
  const result = usePublicData("getFaqs");
  const [open, setOpen] = useState(null);
  const prefix = useId();
  if (result.loading || result.error) return <DataState {...result} />;
  const items = limit ? result.data.slice(0, limit) : result.data;
  return (
    <div className="faq-list">
      {items.map((faq, i) => (
        <div key={faq.id}>
          {grouped && (i === 0 || items[i - 1].group !== faq.group) && (
            <h2 className="faq-group">{faq.group}</h2>
          )}
          <div className="faq-item">
            <h3>
              <button
                aria-expanded={open === faq.id}
                aria-controls={`${prefix}-${faq.id}`}
                onClick={() => setOpen(open === faq.id ? null : faq.id)}
              >
                {faq.question}
                {open === faq.id ? (
                  <Minus size={22} aria-hidden="true" />
                ) : (
                  <Plus size={22} aria-hidden="true" />
                )}
              </button>
            </h3>
            <div id={`${prefix}-${faq.id}`} hidden={open !== faq.id}>
              <p>{faq.answer}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
