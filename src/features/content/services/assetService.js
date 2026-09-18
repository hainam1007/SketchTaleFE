import { apiRequest } from "../../../lib/api/httpClient";

export const MAX_ASSET_SIZE = 5 * 1024 * 1024;
export const IMAGE_MIME_TYPES = Object.freeze(["image/png", "image/jpeg", "image/webp", "image/gif"]);

export function validateAssetFile(file) {
  const errors = {};
  if (!file) errors.file = "Chọn một file ảnh.";
  else {
    if (!IMAGE_MIME_TYPES.includes(file.type)) errors.mimeType = "Chỉ hỗ trợ PNG, JPG, WEBP hoặc GIF.";
    if (!Number.isFinite(file.size) || file.size <= 0) errors.size = "Kích thước asset chưa hợp lệ.";
    if (file.size > MAX_ASSET_SIZE) errors.size = "File ảnh tối đa 5MB.";
  }
  return errors;
}

/**
 * Upload the bytes as multipart. The server, not the browser mock, owns the
 * final URL and processing state. AbortController cancellation is supported.
 */
export function uploadAsset({ file, signal }) {
  const body = new FormData();
  body.append("file", file);
  body.append("name", file.name);
  body.append("kind", "image");
  body.append("mimeType", file.type);
  body.append("size", String(file.size));
  return apiRequest({ path: "/content/assets", method: "POST", body, signal });
}

