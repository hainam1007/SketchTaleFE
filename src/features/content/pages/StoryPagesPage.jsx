import { useState } from "react";
import { ArrowDown, ArrowUp, FloppyDisk, PencilSimple, Plus, Trash, X } from "@phosphor-icons/react";
import { EditorField, EditorMutationMessage, EditorPanel } from "../components/StoryEditorParts";
import { useContentAssets, useStoryEditorData, useStoryEditorMutation } from "../hooks/useStoryEditor";
import { useEditorSaveState } from "../hooks/useEditorSaveState";
import { contentService } from "../services/contentService";

const emptyPage = { title: "", text: "", backgroundAssetId: "", narration: "" };

function PageFields({ values, onChange, assets, prefix = "" }) {
  return (
    <div className="editor-form-grid">
      <EditorField label="Tiêu đề page" name={`${prefix}title`} value={values.title} onChange={(value) => onChange("title", value)} placeholder="Ví dụ: Một cánh cửa xanh" />
      <EditorField label="Background asset" name={`${prefix}background`} value={values.backgroundAssetId} onChange={(value) => onChange("backgroundAssetId", value)}>
        <select id={`story-editor-${prefix}background`} value={values.backgroundAssetId} onChange={(event) => onChange("backgroundAssetId", event.target.value)}>
          <option value="">Tự chọn nền mặc định</option>
          {assets.map((asset) => <option key={asset.id} value={asset.id}>{asset.name}</option>)}
        </select>
      </EditorField>
      <div className="editor-field editor-field-wide">
        <label htmlFor={`story-editor-${prefix}text`}>Nội dung page</label>
        <textarea id={`story-editor-${prefix}text`} rows="5" value={values.text} onChange={(event) => onChange("text", event.target.value)} placeholder="Nội dung hiển thị cho bé trong page này..." />
      </div>
      <div className="editor-field editor-field-wide">
        <label htmlFor={`story-editor-${prefix}narration`}>Narration / voice-over</label>
        <textarea id={`story-editor-${prefix}narration`} rows="3" value={values.narration} onChange={(event) => onChange("narration", event.target.value)} placeholder="Tuỳ chọn: lời đọc cho page." />
      </div>
    </div>
  );
}

function PageForm({ values, onChange, onSubmit, onCancel, isSaving, assets, submitLabel }) {
  return (
    <form className="editor-form" onSubmit={(event) => { event.preventDefault(); onSubmit(); }}>
      <PageFields values={values} onChange={onChange} assets={assets} prefix={submitLabel === "Thêm page" ? "new-" : "edit-"} />
      <div className="editor-form-actions">
        {onCancel && <button className="workspace-button workspace-button-quiet" type="button" onClick={onCancel}><X size={16} aria-hidden="true" /> Huỷ</button>}
        <button className="workspace-button" type="submit" disabled={isSaving}><FloppyDisk size={16} aria-hidden="true" /> {isSaving ? "Đang lưu..." : submitLabel}</button>
      </div>
    </form>
  );
}

export default function StoryPagesPage() {
  const { story, storyId, setEditorDirty } = useStoryEditorData();
  const assetsQuery = useContentAssets();
  const [showAdd, setShowAdd] = useState(false);
  const [newPage, setNewPage] = useState(emptyPage);
  const [editingId, setEditingId] = useState(null);
  const [editingPage, setEditingPage] = useState(emptyPage);
  const [editingInitial, setEditingInitial] = useState(emptyPage);
  const mutation = useStoryEditorMutation(({ action, pageId, payload, revision }) => {
    if (action === "add") return contentService.addPage({ storyId, revision, ...payload });
    if (action === "update") return contentService.updatePage({ storyId, pageId, revision, ...payload });
    if (action === "delete") return contentService.deletePage({ storyId, pageId, revision });
    return contentService.reorderPages({ storyId, pageIds: payload, revision });
  });
  const assets = assetsQuery.data?.items || [];
  const dirty = (showAdd && JSON.stringify(newPage) !== JSON.stringify(emptyPage)) || (editingId !== null && JSON.stringify(editingPage) !== JSON.stringify(editingInitial));
  useEditorSaveState({ dirty, isSaving: mutation.isPending, error: mutation.error, onDirtyChange: setEditorDirty });

  function updatePage(setter, name, value) {
    setter((current) => ({ ...current, [name]: value }));
  }

  function addPage() {
    mutation.mutate({ action: "add", payload: newPage }, { onSuccess: () => { setNewPage(emptyPage); setShowAdd(false); } });
  }

  function updatePageItem() {
    mutation.mutate({ action: "update", pageId: editingId, payload: editingPage }, { onSuccess: () => { setEditingId(null); setEditingInitial(emptyPage); } });
  }

  function beginEdit(page) {
    const nextEditing = { title: page.title, text: page.text, backgroundAssetId: page.backgroundAssetId || "", narration: page.narration || "" };
    setEditingId(page.id);
    setEditingPage(nextEditing);
    setEditingInitial(nextEditing);
  }

  function removePage(page) {
    if (window.confirm(`Xoá page “${page.title}”? Các slot trỏ vào page này cũng sẽ được gỡ.`)) mutation.mutate({ action: "delete", pageId: page.id });
  }

  function movePage(index, direction) {
    const next = [...story.pages];
    const target = index + direction;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    mutation.mutate({ action: "reorder", payload: next.map((page) => page.id) });
  }

  return (
    <EditorPanel
      eyebrow="PAGES"
      title="Nhịp kể của story"
      description="Mỗi page có nội dung, nền và narration riêng. Thứ tự được lưu bằng page ID ổn định, không phụ thuộc array index."
      action={<button className="workspace-button" type="button" onClick={() => setShowAdd((current) => !current)}><Plus size={17} aria-hidden="true" /> {showAdd ? "Đóng form" : "Thêm page"}</button>}
    >
      {showAdd && <div className="editor-form-card"><h3>Page mới</h3><PageForm values={newPage} onChange={(name, value) => updatePage(setNewPage, name, value)} onSubmit={addPage} onCancel={() => setShowAdd(false)} isSaving={mutation.isPending} assets={assets} submitLabel="Thêm page" /></div>}
      <EditorMutationMessage mutation={mutation} />
      {assetsQuery.isLoading && <p className="editor-help">Đang tải danh sách asset...</p>}
      {story.pages.length ? <div className="editor-list" aria-label="Danh sách pages">{story.pages.map((page, index) => (
        <article className="editor-item" key={page.id}>
          <div className="editor-item-heading"><div><span className="editor-item-index">PAGE {String(index + 1).padStart(2, "0")}</span><h3>{page.title}</h3><p>{page.text}</p></div><div className="editor-item-actions"><button className="icon-button" type="button" aria-label={`Đưa ${page.title} lên`} disabled={index === 0 || mutation.isPending} onClick={() => movePage(index, -1)}><ArrowUp size={17} aria-hidden="true" /></button><button className="icon-button" type="button" aria-label={`Đưa ${page.title} xuống`} disabled={index === story.pages.length - 1 || mutation.isPending} onClick={() => movePage(index, 1)}><ArrowDown size={17} aria-hidden="true" /></button><button className="workspace-button workspace-button-quiet" type="button" onClick={() => beginEdit(page)}><PencilSimple size={15} aria-hidden="true" /> Sửa</button><button className="icon-button icon-button-danger" type="button" aria-label={`Xoá ${page.title}`} onClick={() => removePage(page)}><Trash size={17} aria-hidden="true" /></button></div></div>
          {editingId === page.id && <PageForm values={editingPage} onChange={(name, value) => updatePage(setEditingPage, name, value)} onSubmit={updatePageItem} onCancel={() => setEditingId(null)} isSaving={mutation.isPending} assets={assets} submitLabel="Lưu page" />}
        </article>
      ))}</div> : <div className="editor-empty"><p>Story chưa có page nào.</p><button className="workspace-button workspace-button-quiet" type="button" onClick={() => setShowAdd(true)}><Plus size={16} aria-hidden="true" /> Tạo page đầu tiên</button></div>}
    </EditorPanel>
  );
}
