import { ArrowLeft, LockKey, LockKeyOpen, ShieldCheck, UserCircle } from "@phosphor-icons/react";
import { Link, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../auth/AuthProvider";
import { adminService } from "../services/adminService";
import { queryKeys } from "../../../lib/api/queryKeys";
import { ErrorState, LoadingState, SuccessState } from "../../../components/feedback/States";
import StatusBadge from "../../../components/ui/StatusBadge";
import { roleLabels } from "../../../lib/permissions/roles";

export default function AdminUserDetailPage() {
  const { user } = useAuth();
  const { userId } = useParams();
  const queryClient = useQueryClient();
  const userQuery = useQuery({ queryKey: queryKeys.adminUser(user.id, userId), queryFn: () => adminService.getUser({ userId }) });
  const mutation = useMutation({
    mutationFn: (status) => adminService.updateUserStatus({ userId, status }),
    onSuccess: (updated) => {
      queryClient.setQueryData(queryKeys.adminUser(user.id, userId), updated);
      queryClient.invalidateQueries({ queryKey: ["admin-users", user.id] });
    },
  });

  if (userQuery.isLoading) return <LoadingState label="Đang tải thông tin tài khoản" />;
  if (userQuery.isError) return <ErrorState title="Không thể mở tài khoản" message={userQuery.error.message} onRetry={() => userQuery.refetch()} />;
  const target = userQuery.data;
  const nextStatus = target.status === "locked" ? "active" : "locked";
  const isSelf = target.id === user.id;
  function changeStatus() {
    if (nextStatus === "locked" && !window.confirm(`Khóa tài khoản ${target.name}?`)) return;
    mutation.mutate(nextStatus);
  }

  return <div className="workspace-dashboard admin-user-detail"><div className="admin-detail-back"><Link to="/admin/users"><ArrowLeft size={17} aria-hidden="true" /> Quay lại danh sách</Link></div><div className="workspace-page-heading"><div><p className="workspace-eyebrow">ADMIN / TÀI KHOẢN</p><h1>Chi tiết tài khoản</h1><p>Xem trạng thái và thực hiện thao tác có kiểm soát từ server.</p></div><StatusBadge value={target.status} tone={target.status === "locked" ? "danger" : "success"} /></div><section className="admin-user-detail-card"><div className="admin-detail-identity"><span className="admin-detail-avatar"><UserCircle size={49} weight="duotone" aria-hidden="true" /></span><div><span className="workspace-eyebrow">{roleLabels[target.role] || target.role}</span><h2>{target.name}</h2><p>{target.email}</p></div></div><dl className="admin-user-meta"><div><dt>Gói / loại tài khoản</dt><dd>{target.plan}</dd></div><div><dt>ID tài khoản</dt><dd>{target.id}</dd></div><div><dt>Trạng thái</dt><dd>{target.status === "locked" ? "Đang khóa" : "Đang hoạt động"}</dd></div></dl><div className="admin-detail-actions">{mutation.isSuccess && <SuccessState>Server đã cập nhật trạng thái.</SuccessState>}{mutation.isError && <p className="admin-mutation-error" role="alert">{mutation.error.message}</p>}<button className={`workspace-button ${target.status === "locked" ? "" : "workspace-button-danger"}`} type="button" disabled={isSelf && nextStatus === "locked" || mutation.isPending} onClick={changeStatus}>{target.status === "locked" ? <LockKeyOpen size={18} aria-hidden="true" /> : <LockKey size={18} aria-hidden="true" />}{mutation.isPending ? "Đang cập nhật..." : target.status === "locked" ? "Mở khóa tài khoản" : "Khóa tài khoản"}</button>{isSelf && nextStatus === "locked" && <small><ShieldCheck size={15} aria-hidden="true" /> Không thể tự khóa tài khoản quản trị.</small>}</div></section></div>;
}
