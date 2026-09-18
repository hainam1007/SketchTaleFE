import { useMemo, useState } from "react";
import { useContentAssets } from "../hooks/useStoryEditor";

/** Shared asset selector with a local search over the cached asset query. */
export default function AssetPicker({ assets: providedAssets, value = "", onChange, label = "Asset", id = "asset-picker", kind = "image", allowEmpty = true, disabled = false }) {
  const assetsQuery = useContentAssets();
  const [search, setSearch] = useState("");
  const assets = useMemo(() => providedAssets || assetsQuery.data?.items || [], [providedAssets, assetsQuery.data?.items]);
  const visibleAssets = useMemo(() => assets.filter((asset) => (kind === "all" || asset.kind === kind) && (!search || asset.name.toLowerCase().includes(search.toLowerCase()))), [assets, kind, search]);

  return <div className="asset-picker"><label htmlFor={id}>{label}</label><div className="asset-picker-controls"><select id={id} value={value} onChange={(event) => onChange(event.target.value)} disabled={disabled || assetsQuery.isLoading}><option value="" disabled={!allowEmpty}>{allowEmpty ? "Tự chọn asset đầu tiên" : "Chọn asset"}</option>{visibleAssets.map((asset) => <option key={asset.id} value={asset.id}>{asset.name}</option>)}</select>{assets.length > 6 && <input aria-label={`Tìm ${label.toLowerCase()}`} value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Tìm asset" disabled={disabled} />}</div>{assetsQuery.isError && !providedAssets && <small className="editor-field-error">Không thể tải asset: {assetsQuery.error.message}</small>}{value && <img className="asset-picker-preview" src={assets.find((asset) => asset.id === value)?.url || "/images/hero.webp"} alt="Preview asset đã chọn" />}</div>;
}
