import { useEffect } from "react";

/** Shared dirty/save state for authoring forms. */
export function useEditorSaveState({ dirty = false, isSaving = false, error = null, onDirtyChange } = {}) {
  useEffect(() => {
    onDirtyChange?.(dirty);
    return () => onDirtyChange?.(false);
  }, [dirty, onDirtyChange]);

  useEffect(() => {
    function warnBeforeUnload(event) {
      if (!dirty) return;
      event.preventDefault();
      event.returnValue = "";
    }
    window.addEventListener("beforeunload", warnBeforeUnload);
    return () => window.removeEventListener("beforeunload", warnBeforeUnload);
  }, [dirty]);

  return { dirty, isSaving, error, status: isSaving ? "saving" : error ? "error" : dirty ? "dirty" : "saved" };
}

