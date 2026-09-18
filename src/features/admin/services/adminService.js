import { apiRequest } from "../../../lib/api/httpClient";

export const adminService = {
  listUsers: ({ search = "", role = "all", status = "all", signal } = {}) => {
    const params = new URLSearchParams({ search, role, status });
    return apiRequest({ path: `/admin/users?${params}`, signal });
  },
  getUser: ({ userId, signal }) => apiRequest({ path: `/admin/users/${userId}`, signal }),
  updateUserStatus: ({ userId, status }) => apiRequest({ path: `/admin/users/${userId}`, method: "PATCH", body: { status } }),
  listReports: ({ status = "all", search = "", signal } = {}) => apiRequest({ path: `/admin/reports?status=${status}&search=${encodeURIComponent(search)}`, signal }),
  getReport: ({ reportId, signal }) => apiRequest({ path: `/admin/reports/${reportId}`, signal }),
  updateReport: ({ reportId, ...payload }) => apiRequest({ path: `/admin/reports/${reportId}`, method: "PATCH", body: payload }),
  getPermissions: ({ signal } = {}) => apiRequest({ path: "/admin/permissions", signal }),
  updatePermission: ({ userId, ...payload }) => apiRequest({ path: `/admin/permissions/${userId}`, method: "PATCH", body: payload }),
  getSystemLimits: ({ signal } = {}) => apiRequest({ path: "/admin/system-limits", signal }),
  updateSystemLimits: (payload) => apiRequest({ path: "/admin/system-limits", method: "PATCH", body: payload }),
  listRestrictions: ({ signal } = {}) => apiRequest({ path: "/admin/restrictions", signal }),
  updateRestriction: ({ restrictionId, ...payload }) => apiRequest({ path: `/admin/restrictions/${restrictionId}`, method: "PATCH", body: payload }),
  getMonitoring: ({ signal } = {}) => apiRequest({ path: "/admin/monitoring", signal }),
  monitorAction: ({ jobId, ...payload }) => apiRequest({ path: `/admin/monitoring/${jobId}`, method: "PATCH", body: payload }),
  getStatistics: ({ range = "7d", signal } = {}) => apiRequest({ path: `/admin/statistics?range=${range}`, signal }),
  listAudit: ({ actor = "all", action = "all", range = "30d", search = "", signal } = {}) => apiRequest({ path: `/admin/audit?actor=${encodeURIComponent(actor)}&action=${encodeURIComponent(action)}&range=${range}&search=${encodeURIComponent(search)}`, signal }),
};
