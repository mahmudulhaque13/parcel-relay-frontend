"use client";

import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Edit3,
  Loader2,
  Search,
  ShieldCheck,
  UserCog,
  UserRound,
  X,
} from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import type {
  AdminUser,
  AdminUserRole,
  AdminUserStatus,
} from "@/api/admin.api";
import {
  useUpdateAdminUserRole,
  useUpdateAdminUserStatus,
} from "@/hooks/use-admin-user-actions";
import { useAdminUsers } from "@/hooks/use-admin-users";

const adminUserRoles: AdminUserRole[] = ["CUSTOMER", "COURIER", "ADMIN"];

const adminUserStatuses: AdminUserStatus[] = [
  "ACTIVE",
  "INACTIVE",
  "BLOCKED",
  "DELETED",
];

function isAdminUserRole(value: string): value is AdminUserRole {
  return adminUserRoles.includes(value as AdminUserRole);
}

function isAdminUserStatus(value: string): value is AdminUserStatus {
  return adminUserStatuses.includes(value as AdminUserStatus);
}

function getRoleLabel(role: AdminUserRole) {
  return role.charAt(0) + role.slice(1).toLowerCase();
}

function getStatusLabel(status: AdminUserStatus) {
  return status.charAt(0) + status.slice(1).toLowerCase();
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong. Please try again.";
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-BD", {
    dateStyle: "medium",
  }).format(new Date(date));
}

export default function AdminManagePage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const pageParam = Number(searchParams.get("page") ?? "1");
  const page = Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1;

  const searchParam = searchParams.get("q") ?? "";
  const roleParam = searchParams.get("role") ?? "";
  const statusParam = searchParams.get("status") ?? "";

  const role: AdminUserRole | undefined = isAdminUserRole(roleParam)
    ? roleParam
    : undefined;

  const status: AdminUserStatus | undefined = isAdminUserStatus(statusParam)
    ? statusParam
    : undefined;

  const [search, setSearch] = useState(searchParam);

  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [selectedRole, setSelectedRole] = useState<AdminUserRole>("CUSTOMER");
  const [selectedStatus, setSelectedStatus] =
    useState<AdminUserStatus>("ACTIVE");

  const [phone, setPhone] = useState("");

  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const query = useMemo(
    () => ({
      page,
      limit: 10,
      q: searchParam || undefined,
      role,
      status,
      sortOrder: "desc" as const,
    }),
    [page, searchParam, role, status],
  );

  const {
    data: usersResponse,
    isLoading,
    isFetching,
    isError,
    error,
  } = useAdminUsers(query);

  const updateRoleMutation = useUpdateAdminUserRole();
  const updateStatusMutation = useUpdateAdminUserStatus();

  const users = usersResponse?.data.data ?? [];
  const meta = usersResponse?.data.meta;

  const totalPages = meta?.totalPage ?? 1;
  const totalUsers = meta?.total ?? 0;

  useEffect(() => {
    setSearch(searchParam);
  }, [searchParam]);

  function updateUrl(updates: Record<string, string | undefined>) {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    router.push(`${pathname}?${params.toString()}`);
  }

  function handleSearchSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    updateUrl({
      q: search.trim() || undefined,
      page: "1",
    });
  }

  function handleRoleFilter(value: string) {
    updateUrl({
      role: value || undefined,
      page: "1",
    });
  }

  function handleStatusFilter(value: string) {
    updateUrl({
      status: value || undefined,
      page: "1",
    });
  }

  function goToPage(nextPage: number) {
    if (nextPage < 1 || nextPage > totalPages) {
      return;
    }

    updateUrl({
      page: nextPage === 1 ? undefined : String(nextPage),
    });
  }

  function openRoleModal(user: AdminUser) {
    setSelectedUser(user);
    setSelectedRole(user.role);
    setPhone("");

    setIsRoleModalOpen(true);
  }

  function openStatusModal(user: AdminUser) {
    setSelectedUser(user);
    setSelectedStatus(user.status);
    setConfirmDelete(false);

    setIsStatusModalOpen(true);
  }

  function closeModals() {
    if (updateRoleMutation.isPending || updateStatusMutation.isPending) {
      return;
    }

    setSelectedUser(null);
    setPhone("");

    setConfirmDelete(false);
    setIsRoleModalOpen(false);
    setIsStatusModalOpen(false);
  }

  async function handleRoleUpdate() {
    if (!selectedUser) {
      return;
    }

    if (selectedRole === selectedUser.role) {
      toast.error("Please select a different role.");
      return;
    }

    if (selectedRole === "COURIER" && phone.trim().length < 7) {
      toast.error("Phone number is required when changing role to COURIER.");
      return;
    }

    try {
      await updateRoleMutation.mutateAsync({
        userId: selectedUser.id,
        payload: {
          role: selectedRole,
          ...(selectedRole === "COURIER" ? { phone: phone.trim() } : {}),
        },
      });

      toast.success("User role updated successfully.");

      setTimeout(() => {
        closeModals();
      }, 700);
    } catch (mutationError) {
      toast.error(getErrorMessage(mutationError));
    }
  }

  async function handleStatusUpdate() {
    if (!selectedUser) {
      return;
    }

    if (selectedStatus === selectedUser.status) {
      toast.error("Please select a different status.");
      return;
    }

    if (selectedStatus === "DELETED" && !confirmDelete) {
      toast.error("Please confirm that you want to delete this user.");
      return;
    }

    try {
      await updateStatusMutation.mutateAsync({
        userId: selectedUser.id,
        payload: {
          status: selectedStatus,
        },
      });

      toast.success("User status updated successfully.");

      setTimeout(() => {
        closeModals();
      }, 700);
    } catch (mutationError) {
      toast.error(getErrorMessage(mutationError));
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
            <ShieldCheck className="size-4" />
            Admin
            <span>/</span>
            User Management
          </div>

          <h1 className="text-2xl font-bold tracking-tight">Manage Users</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Search, filter and manage customer, courier and admin accounts.
          </p>
        </div>

        <div className="rounded-lg border bg-card px-4 py-3">
          <p className="text-xs text-muted-foreground">Total Users</p>
          <p className="text-xl font-semibold">{totalUsers}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-xl border bg-card p-4">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end">
          <form onSubmit={handleSearchSubmit} className="flex-1">
            <label
              htmlFor="user-search"
              className="mb-2 block text-sm font-medium"
            >
              Search
            </label>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <input
                id="user-search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by name or email..."
                className="h-10 w-full rounded-md border bg-background pl-9 pr-3 text-sm outline-none transition focus:border-primary"
              />
            </div>
          </form>

          <div className="w-full xl:w-52">
            <label
              htmlFor="role-filter"
              className="mb-2 block text-sm font-medium"
            >
              Role
            </label>

            <select
              id="role-filter"
              value={role ?? ""}
              onChange={(event) => handleRoleFilter(event.target.value)}
              className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-primary"
            >
              <option value="">All Roles</option>

              {adminUserRoles.map((item) => (
                <option key={item} value={item}>
                  {getRoleLabel(item)}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full xl:w-52">
            <label
              htmlFor="status-filter"
              className="mb-2 block text-sm font-medium"
            >
              Status
            </label>

            <select
              id="status-filter"
              value={status ?? ""}
              onChange={(event) => handleStatusFilter(event.target.value)}
              className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-primary"
            >
              <option value="">All Statuses</option>

              {adminUserStatuses.map((item) => (
                <option key={item} value={item}>
                  {getStatusLabel(item)}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={() =>
              updateUrl({
                q: undefined,
                role: undefined,
                status: undefined,
                page: undefined,
              })
            }
            className="h-10 rounded-md border px-4 text-sm font-medium transition hover:bg-muted"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="rounded-xl border bg-card">
        {/* Loading */}
        {isLoading ? (
          <LoadingState />
        ) : isError ? (
          <ErrorState message={getErrorMessage(error)} />
        ) : users.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {/* Mobile cards */}
            <div className="divide-y md:hidden">
              {users.map((user) => (
                <MobileUserCard
                  key={user.id}
                  user={user}
                  onRoleChange={() => openRoleModal(user)}
                  onStatusChange={() => openStatusModal(user)}
                />
              ))}
            </div>

            {/* Desktop table */}
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/30 text-left text-sm">
                    <th className="px-5 py-4 font-medium">User</th>
                    <th className="px-5 py-4 font-medium">Role</th>
                    <th className="px-5 py-4 font-medium">Status</th>
                    <th className="px-5 py-4 font-medium">Provider</th>
                    <th className="px-5 py-4 font-medium">Created</th>
                    <th className="px-5 py-4 text-right font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b last:border-0">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <UserAvatar user={user} />

                          <div className="min-w-0">
                            <p className="truncate font-medium">{user.name}</p>

                            <p className="truncate text-sm text-muted-foreground">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <RoleBadge role={user.role} />
                      </td>

                      <td className="px-5 py-4">
                        <StatusBadge status={user.status} />
                      </td>

                      <td className="px-5 py-4 text-sm text-muted-foreground">
                        {user.authProvider}
                      </td>

                      <td className="px-5 py-4 text-sm text-muted-foreground">
                        {formatDate(user.createdAt)}
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => openRoleModal(user)}
                            className="inline-flex items-center gap-1.5 rounded-md border px-3 py-2 text-xs font-medium transition hover:bg-muted"
                          >
                            <UserCog className="size-3.5" />
                            Role
                          </button>

                          <button
                            type="button"
                            onClick={() => openStatusModal(user)}
                            className="inline-flex items-center gap-1.5 rounded-md border px-3 py-2 text-xs font-medium transition hover:bg-muted"
                          >
                            <Edit3 className="size-3.5" />
                            Status
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {/* Pagination */}
      {!isLoading && !isError && users.length > 0 && (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            Page {meta?.page ?? page} of {totalPages}
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={page <= 1 || isFetching}
              onClick={() => goToPage(page - 1)}
              className="inline-flex h-9 items-center gap-1 rounded-md border px-3 text-sm font-medium transition hover:bg-muted disabled:pointer-events-none disabled:opacity-50"
            >
              <ChevronLeft className="size-4" />
              Previous
            </button>

            <button
              type="button"
              disabled={page >= totalPages || isFetching}
              onClick={() => goToPage(page + 1)}
              className="inline-flex h-9 items-center gap-1 rounded-md border px-3 text-sm font-medium transition hover:bg-muted disabled:pointer-events-none disabled:opacity-50"
            >
              Next
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      )}

      {/* Role Modal */}
      {isRoleModalOpen && selectedUser && (
        <Modal
          title="Change User Role"
          onClose={closeModals}
          disabled={updateRoleMutation.isPending}
        >
          <div className="space-y-5">
            <UserModalHeader user={selectedUser} />

            <div>
              <label
                htmlFor="user-role"
                className="mb-2 block text-sm font-medium"
              >
                New Role
              </label>

              <select
                id="user-role"
                value={selectedRole}
                onChange={(event) =>
                  setSelectedRole(event.target.value as AdminUserRole)
                }
                disabled={updateRoleMutation.isPending}
                className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-primary"
              >
                {adminUserRoles.map((item) => (
                  <option key={item} value={item}>
                    {getRoleLabel(item)}
                  </option>
                ))}
              </select>
            </div>

            {selectedRole === "COURIER" && (
              <div>
                <label
                  htmlFor="courier-phone"
                  className="mb-2 block text-sm font-medium"
                >
                  Courier Phone
                </label>

                <input
                  id="courier-phone"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="Enter courier phone number"
                  disabled={updateRoleMutation.isPending}
                  className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-primary"
                />

                <p className="mt-1.5 text-xs text-muted-foreground">
                  Phone number is required when assigning the COURIER role.
                </p>
              </div>
            )}

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={closeModals}
                disabled={updateRoleMutation.isPending}
                className="rounded-md border px-4 py-2 text-sm font-medium transition hover:bg-muted disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleRoleUpdate}
                disabled={updateRoleMutation.isPending}
                className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 disabled:opacity-50"
              >
                {updateRoleMutation.isPending && (
                  <Loader2 className="size-4 animate-spin" />
                )}
                Update Role
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Status Modal */}
      {isStatusModalOpen && selectedUser && (
        <Modal
          title="Change User Status"
          onClose={closeModals}
          disabled={updateStatusMutation.isPending}
        >
          <div className="space-y-5">
            <UserModalHeader user={selectedUser} />

            <div>
              <label
                htmlFor="user-status"
                className="mb-2 block text-sm font-medium"
              >
                New Status
              </label>

              <select
                id="user-status"
                value={selectedStatus}
                onChange={(event) =>
                  setSelectedStatus(event.target.value as AdminUserStatus)
                }
                disabled={updateStatusMutation.isPending}
                className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-primary"
              >
                {adminUserStatuses.map((item) => (
                  <option key={item} value={item}>
                    {getStatusLabel(item)}
                  </option>
                ))}
              </select>
            </div>

            {selectedStatus === "DELETED" && (
              <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/5 p-3">
                <input
                  type="checkbox"
                  checked={confirmDelete}
                  onChange={(event) => setConfirmDelete(event.target.checked)}
                  disabled={updateStatusMutation.isPending}
                  className="mt-0.5 size-4"
                />

                <span className="text-sm">
                  I understand that this action will mark the user as deleted.
                </span>
              </label>
            )}

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={closeModals}
                disabled={updateStatusMutation.isPending}
                className="rounded-md border px-4 py-2 text-sm font-medium transition hover:bg-muted disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleStatusUpdate}
                disabled={updateStatusMutation.isPending}
                className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 disabled:opacity-50"
              >
                {updateStatusMutation.isPending && (
                  <Loader2 className="size-4 animate-spin" />
                )}
                Update Status
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Components                                                                  */
/* -------------------------------------------------------------------------- */

function UserAvatar({ user }: { user: AdminUser }) {
  if (user.imageUrl) {
    return (
      <Image
        src={user.imageUrl}
        alt={user.name}
        width={40}
        height={40}
        className="size-10 rounded-full object-cover"
      />
    );
  }

  return (
    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted">
      <UserRound className="size-5 text-muted-foreground" />
    </div>
  );
}

function RoleBadge({ role }: { role: AdminUserRole }) {
  return (
    <span className="inline-flex rounded-full border px-2.5 py-1 text-xs font-medium">
      {getRoleLabel(role)}
    </span>
  );
}

function StatusBadge({ status }: { status: AdminUserStatus }) {
  const className =
    status === "ACTIVE"
      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700"
      : status === "BLOCKED"
        ? "border-destructive/30 bg-destructive/10 text-destructive"
        : status === "DELETED"
          ? "border-destructive/30 bg-destructive/10 text-destructive"
          : "border-muted-foreground/30 bg-muted text-muted-foreground";

  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${className}`}
    >
      {getStatusLabel(status)}
    </span>
  );
}

function MobileUserCard({
  user,
  onRoleChange,
  onStatusChange,
}: {
  user: AdminUser;
  onRoleChange: () => void;
  onStatusChange: () => void;
}) {
  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center gap-3">
        <UserAvatar user={user} />

        <div className="min-w-0 flex-1">
          <p className="truncate font-medium">{user.name}</p>
          <p className="truncate text-sm text-muted-foreground">{user.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-xs text-muted-foreground">Role</p>
          <div className="mt-1">
            <RoleBadge role={user.role} />
          </div>
        </div>

        <div>
          <p className="text-xs text-muted-foreground">Status</p>
          <div className="mt-1">
            <StatusBadge status={user.status} />
          </div>
        </div>

        <div>
          <p className="text-xs text-muted-foreground">Provider</p>
          <p className="mt-1">{user.authProvider}</p>
        </div>

        <div>
          <p className="text-xs text-muted-foreground">Created</p>
          <p className="mt-1">{formatDate(user.createdAt)}</p>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={onRoleChange}
          className="flex-1 rounded-md border px-3 py-2 text-sm font-medium transition hover:bg-muted"
        >
          Change Role
        </button>

        <button
          type="button"
          onClick={onStatusChange}
          className="flex-1 rounded-md border px-3 py-2 text-sm font-medium transition hover:bg-muted"
        >
          Change Status
        </button>
      </div>
    </div>
  );
}

function UserModalHeader({ user }: { user: AdminUser }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border bg-muted/30 p-3">
      <UserAvatar user={user} />

      <div className="min-w-0">
        <p className="truncate font-medium">{user.name}</p>
        <p className="truncate text-sm text-muted-foreground">{user.email}</p>
      </div>
    </div>
  );
}

function Modal({
  title,
  children,
  onClose,
  disabled,
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  disabled: boolean;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-xl border bg-background shadow-xl">
        <div className="flex items-center justify-between border-b px-5 py-4">
          <h2 className="font-semibold">{title}</h2>

          <button
            type="button"
            onClick={onClose}
            disabled={disabled}
            aria-label="Close"
            className="rounded-md p-1.5 transition hover:bg-muted disabled:opacity-50"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="space-y-4 p-5">
      {["user", "user-2", "user-3", "user-4"].map((item) => (
        <div key={item} className="flex animate-pulse items-center gap-4">
          <div className="size-10 rounded-full bg-muted" />

          <div className="flex-1 space-y-2">
            <div className="h-4 w-1/3 rounded bg-muted" />
            <div className="h-3 w-1/2 rounded bg-muted" />
          </div>

          <div className="h-8 w-24 rounded bg-muted" />
        </div>
      ))}
    </div>
  );
}

function ErrorState({ message }: { message: string }) {
  return (
    <div className="flex min-h-60 flex-col items-center justify-center gap-2 p-6 text-center">
      <div className="rounded-full bg-destructive/10 p-3">
        <X className="size-5 text-destructive" />
      </div>

      <h2 className="font-semibold">Failed to load users</h2>

      <p className="max-w-md text-sm text-muted-foreground">{message}</p>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex min-h-60 flex-col items-center justify-center p-6 text-center">
      <div className="rounded-full bg-muted p-3">
        <UserRound className="size-5 text-muted-foreground" />
      </div>

      <h2 className="mt-3 font-semibold">No users found</h2>

      <p className="mt-1 text-sm text-muted-foreground">
        Try changing your search or filters.
      </p>
    </div>
  );
}
