import { FloppyDisk, ShieldCheck, WarningCircle } from "@phosphor-icons/react";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../auth/AuthProvider";
import { adminService } from "../services/adminService";
import { queryKeys } from "../../../lib/api/queryKeys";
import { ErrorState, LoadingState } from "../../../components/feedback/States";
import StatusBadge from "../../../components/ui/StatusBadge";
import { roleLabels } from "../../../lib/permissions/roles";

export default function AdminPermissionsPage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const permissionsQuery = useQuery({ queryKey: queryKeys.adminPermissions(user.id), queryFn: ({ signal }) => adminService.getPermissions({ signal }) });
  const [drafts, setDrafts] = useState({});
  const mutation = useMutation({ mutationFn: ({ userId, role }) => adminService.updatePermission({ userId, role }), onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.adminPermissions(user.id) }) });
  if (permissionsQuery.isLoading) return <LoadingState label="Đang tải permission catalog" />;
  if (permissionsQuery.isError) return <ErrorState title="Không thể tải permissions" message={permissionsQuery.error.message} onRetry={() => permissionsQuery.refetch()} />;
  const items = permissionsQuery.data.users;
  return <div className="workspace-dashboard admin-permissions-page"><div className="workspace-page-heading"><div><p className="workspace-eyebrow">ADMIN / PERMISSIONS</p><h1>Quyền theo tài khoản</h1><p>Role chỉ là input được server cho phép; không thể tự nâng quyền, tự đổi role hoặc hạ admin cuối cùng.</p></div><ShieldCheck size={43} className="admin-heading-icon" aria-hidden="true" /></div><div className="admin-permission-table-wrap"><table className="admin-permission-table"><caption className="sr-only">Danh sách quyền tài khoản</caption><thead><tr><th>Tài khoản</th><th>Role hiện tại</th><th>Role mới</th><th>Trạng thái</th><th>Thao tác</th></tr></thead><tbody>{items.map((item) => { const nextRole = drafts[item.id] || item.role; const dirty = nextRole !== item.role; const isSelf = item.id === user.id; return <tr key={item.id}><td><strong>{item.name}</strong><small>{item.email}</small></td><td>{roleLabels[item.role] || item.role}</td><td><select aria-label={`Role mới của ${item.name}`} value={nextRole} onChange={(event) => setDrafts((current) => ({ ...current, [item.id]: event.target.value }))} disabled={isSelf || mutation.isPending}><option value="parent">Parent</option><option value="content_manager">Content Manager</option><option value="admin">Admin</option></select></td><td><StatusBadge value={item.status} tone={item.status === "locked" ? "danger" : "success"} /></td><td><button className="workspace-button workspace-button-quiet" type="button" disabled={!dirty || isSelf || mutation.isPending} onClick={() => mutation.mutate({ userId: item.id, role: nextRole })}><FloppyDisk size={15} aria-hidden="true" /> Lưu</button></td></tr>; })}</tbody></table></div>{mutation.isError && <p className="admin-mutation-error" role="alert"><WarningCircle size={16} aria-hidden="true" /> {mutation.error.message}</p>}{mutation.isSuccess && <p className="workspace-inline-success" role="status">Server đã cập nhật role và permission.</p>}</div>;
}
