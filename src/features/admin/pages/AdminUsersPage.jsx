import { Funnel, MagnifyingGlass, UserCircle, X } from "@phosphor-icons/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../auth/AuthProvider";
import { adminService } from "../services/adminService";
import { queryKeys } from "../../../lib/api/queryKeys";
import { ErrorState, LoadingState } from "../../../components/feedback/States";
import StatusBadge from "../../../components/ui/StatusBadge";
import { roleLabels } from "../../../lib/permissions/roles";

export default function AdminUsersPage() {
  const { user } = useAuth();
  const [filters, setFilters] = useState({ search: "", role: "all", status: "all" });
  const usersQuery = useQuery({
    queryKey: queryKeys.adminUsers(user.id, filters),
    queryFn: ({ signal }) => adminService.listUsers({ ...filters, signal }),
  });

  function updateFilter(name, value) {
    setFilters((current) => ({ ...current, [name]: value }));
  }

  return (
    <div className="workspace-dashboard admin-users-page">
      <div className="workspace-page-heading"><div><p className="workspace-eyebrow">ADMIN / TÀI KHOẢN</p><h1>Quản lý tài khoản</h1><p>Tra cứu Parent và Content Manager, kiểm tra trạng thái trước khi xử lý quyền truy cập.</p></div></div>
      <section className="admin-filter-panel"><div className="admin-filter-title"><Funnel size={18} aria-hidden="true" /><strong>Bộ lọc tài khoản</strong></div><div className="admin-filter-fields"><label className="admin-search"><span className="sr-only">Tìm theo tên hoặc email</span><MagnifyingGlass size={18} aria-hidden="true" /><input value={filters.search} onChange={(event) => updateFilter("search", event.target.value)} placeholder="Tìm tên hoặc email" /></label><label><span className="sr-only">Lọc theo vai trò</span><select value={filters.role} onChange={(event) => updateFilter("role", event.target.value)}><option value="all">Tất cả vai trò</option><option value="parent">Phụ huynh</option><option value="content_manager">Content Manager</option><option value="admin">Quản trị viên</option></select></label><label><span className="sr-only">Lọc theo trạng thái</span><select value={filters.status} onChange={(event) => updateFilter("status", event.target.value)}><option value="all">Tất cả trạng thái</option><option value="active">Đang hoạt động</option><option value="locked">Đang khóa</option></select></label>{(filters.search || filters.role !== "all" || filters.status !== "all") && <button className="workspace-button workspace-button-quiet admin-clear-filter" type="button" onClick={() => setFilters({ search: "", role: "all", status: "all" })}><X size={16} aria-hidden="true" /> Xóa lọc</button>}</div></section>
      {usersQuery.isLoading ? <LoadingState label="Đang tải danh sách tài khoản" /> : usersQuery.isError ? <ErrorState message={usersQuery.error.message} onRetry={() => usersQuery.refetch()} /> : <UserTable users={usersQuery.data.items} />}
    </div>
  );
}

function UserTable({ users }) {
  if (!users.length) return <div className="workspace-state workspace-state-empty"><UserCircle size={29} aria-hidden="true" /><strong>Không có tài khoản phù hợp</strong><p>Thử đổi từ khóa hoặc bộ lọc trạng thái.</p></div>;
  return <div className="admin-users-table-wrap"><table className="admin-users-table"><caption className="sr-only">Danh sách tài khoản</caption><thead><tr><th>Tài khoản</th><th>Vai trò</th><th>Trạng thái</th><th><span className="sr-only">Thao tác</span></th></tr></thead><tbody>{users.map((item) => <tr key={item.id}><td><div className="admin-user-cell"><span className="admin-user-initial">{item.name.slice(0, 1)}</span><span><strong>{item.name}</strong><small>{item.email}</small></span></div></td><td>{roleLabels[item.role] || item.role}</td><td><StatusBadge value={item.status} tone={item.status === "locked" ? "danger" : "success"} /></td><td><Link className="admin-view-link" to={`/admin/users/${item.id}`}>Xem chi tiết <span className="sr-only">{item.name}</span></Link></td></tr>)}</tbody></table><p className="admin-table-footnote">{users.length} tài khoản hiển thị · mọi thay đổi trạng thái đều do server xác nhận.</p></div>;
}
