import { sampleStories } from "../data/sampleStories";
import { faqs } from "../data/faqs";
import { planAvailability } from "../data/plans";

export const normalizeSearch = (text) =>
  text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/đ/g, "d")
    .trim();

// Development-only fault injection: ?mock=error | empty | slow. Never an API contract.
async function respond(value) {
  const mode = import.meta.env.DEV
    ? new URLSearchParams(window.location.search).get("mock")
    : null;
  await new Promise((resolve) =>
    setTimeout(resolve, mode === "slow" ? 1600 : 180),
  );
  if (mode === "error") throw new Error("Không thể tải dữ liệu minh họa.");
  return mode === "empty" && Array.isArray(value) ? [] : structuredClone(value);
}
export const mockPublicService = {
  getSampleStories: ({ search = "", category = "" } = {}) =>
    respond(
      sampleStories.filter(
        (story) =>
          (!category || story.category === category) &&
          normalizeSearch(story.title).includes(normalizeSearch(search)),
      ),
    ),
  getSampleStory: (slug) =>
    respond(sampleStories.find((story) => story.slug === slug) ?? null),
  getFaqs: () => respond(faqs),
  getPlanAvailability: () => respond(planAvailability),
};
