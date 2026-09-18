import { SpeakerHigh } from "@phosphor-icons/react";

/**
 * Render one page using every role/slot attached to that page.
 * Coordinates are percentages of the stage and layer is the z-order.
 * Missing assets stay visible as an error state; a fallback image would hide
 * a contract problem that must be fixed before publish.
 */
export default function StoryPageRenderer({ story, page, assets }) {
  if (!page) return null;

  const assetById = new Map((assets || []).map((asset) => [asset.id, asset]));
  const background = assetById.get(page.backgroundAssetId) || assetById.get(story.coverAssetId);
  const placements = (story.roles || [])
    .flatMap((role) => (role.slots || [])
      .filter((slot) => slot.pageId === page.id)
      .map((slot) => ({ role, slot })))
    .sort((left, right) => Number(left.slot.layer || 0) - Number(right.slot.layer || 0));

  const stageStyle = background?.url
    ? { backgroundImage: `linear-gradient(180deg, rgb(20 29 49 / 0.02), rgb(20 29 49 / 0.45)), url(${background.url})` }
    : undefined;

  return (
    <div className="story-preview-stage" style={stageStyle}>
      {!background && <div className="story-preview-missing-asset" role="alert">Missing background asset</div>}
      <div className="story-preview-stage-copy">
        <span>SKETCHTALE · {story.category || story.categoryId}</span>
        <h3>{page.title}</h3>
        <p>{page.text}</p>
        {page.narration && <small><SpeakerHigh size={14} aria-hidden="true" /> {page.narration}</small>}
      </div>
      {placements.map(({ role, slot }) => {
        const roleAsset = assetById.get(slot.assetId || role.defaultAssetId);
        const transform = `translate(-50%, -50%) scale(${slot.scale || 1}) ${slot.flip ? "scaleX(-1)" : ""}`;
        return (
          <div
            className={`story-preview-slot${roleAsset ? "" : " story-preview-slot-missing"}`}
            key={slot.id}
            style={{ left: `${slot.x}%`, top: `${slot.y}%`, transform, zIndex: Number(slot.layer || 0) + 1 }}
            aria-label={`${role.name} slot`}
            data-role-id={role.id}
          >
            {roleAsset ? <img src={roleAsset.url} alt={role.name} /> : <span>{role.name}<small>Missing asset</small></span>}
          </div>
        );
      })}
      {!placements.length && <div className="story-preview-no-slots">No role slots on this page</div>}
    </div>
  );
}

