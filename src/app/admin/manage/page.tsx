"use client";

import { ChevronLeft, ChevronRight, Search, Users } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { useAdminUsers } from "@/hooks/use-admin-users";

const roles = ["", "CUSTOMER", "COURIER", "ADMIN"];

export default function AdminManagePage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page") || "1");
  const role = searchParams.get("role") || "";
  const status = searchParams.get("status") || "";
  const query = searchParams.get("q") || "";

  const [search, setSearch] = useState(query);
  const [statusInput, setStatusInput] = useState(status);

  const { data, isLoading, isError } = useAdminUsers({
    page,
    limit: 10,
    ...(role ? { role } : {}),
    ...(status ? { status } : {}),
    ...(query ? { q: query } : {}),
    sortOrder: "desc",
  });

  useEffect(() => {
    setSearch(query);
  }, [query]);

  useEffect(() => {
    setStatusInput(status);
  }, [status]);

  function updateUrl(updates: Record<string, string | null>) {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    if (!("page" in updates)) {
      params.set("page", "1");
    }

    router.push(`${pathname}?${params.toString()}`);
  }

  function handleSearchSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    updateUrl({
      q: search.trim() || null,
      page: "1",
    });
  }

  function handleRoleChange(value: string) {
    updateUrl({
      role: value || null,
      page: "1",
    });
  }

  function handleStatusSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    updateUrl({
      status: statusInput.trim() || null,
      page: "1",
    });
  }

  function handlePageChange(nextPage: number) {
    if (!data?.data.meta) return;

    if (nextPage < 1 || nextPage > data.data.meta.totalPage) {
      return;
    }

    updateUrl({
      page: String(nextPage),
    });
  }

  const users = data?.data.data ?? [];
  const meta = data?.data.meta;

  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <header>
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2">
              <Users className="h-6 w-6 text-primary" />
            </div>

            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                User Management
              </h1>

              <p className="mt-1 text-muted-foreground">
                Manage ParcelRelay users, roles, and account status.
              </p>
            </div>
          </div>
        </header>

        <section className="rounded-xl border bg-card p-4 shadow-sm">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto_auto]">
            <form onSubmit={handleSearchSubmit} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search by name or email..."
                  className="h-10 w-full rounded-md border bg-background pl-9 pr-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <button
                type="submit"
                className="h-10 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
              >
                Search
              </button>
            </form>

            <select
              value={role}
              onChange={(event) => handleRoleChange(event.target.value)}
              className="h-10 rounded-md border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            >
              <option value="">All Roles</option>

              {roles.filter(Boolean).map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <form onSubmit={handleStatusSubmit} className="flex gap-2">
              <input
                value={statusInput}
                onChange={(event) => setStatusInput(event.target.value)}
                placeholder="Status"
                className="h-10 w-32 rounded-md border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />

              <button
                type="submit"
                className="h-10 rounded-md border bg-background px-4 text-sm font-medium transition hover:bg-muted"
              >
                Apply
              </button>
            </form>
          </div>
        </section>

        {isLoading ? (
          <LoadingState />
        ) : isError ? (
          <ErrorState />
        ) : users.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <section className="overflow-hidden rounded-xl border bg-card shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px]">
                  <thead className="border-b bg-muted/40">
                    <tr>
                      <th className="px-5 py-4 text-left text-sm font-semibold">
                        User
                      </th>

                      <th className="px-5 py-4 text-left text-sm font-semibold">
                        Role
                      </th>

                      <th className="px-5 py-4 text-left text-sm font-semibold">
                        Status
                      </th>

                      <th className="px-5 py-4 text-left text-sm font-semibold">
                        Auth Provider
                      </th>

                      <th className="px-5 py-4 text-left text-sm font-semibold">
                        Email Verified
                      </th>

                      <th className="px-5 py-4 text-left text-sm font-semibold">
                        Created
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y">
                    {users.map((user) => (
                      <tr
                        key={user.id}
                        className="transition hover:bg-muted/30"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            {user.imageUrl ? (
                              <Image
                                src={user.imageUrl}
                                alt={user.name}
                                width={40}
                                height={40}
                                className="h-10 w-10 rounded-full object-cover"
                              />
                            ) : (
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-sm font-semibold">
                                {getInitials(user.name)}
                              </div>
                            )}

                            <div>
                              <p className="font-medium">{user.name}</p>

                              <p className="text-sm text-muted-foreground">
                                {user.email}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <Badge>{user.role}</Badge>
                        </td>

                        <td className="px-5 py-4">
                          <Badge>{user.status}</Badge>
                        </td>

                        <td className="px-5 py-4 text-sm">
                          {user.authProvider}
                        </td>

                        <td className="px-5 py-4 text-sm">
                          {user.emailVerified ? "Verified" : "Not verified"}
                        </td>

                        <td className="px-5 py-4 text-sm text-muted-foreground">
                          {formatDate(user.createdAt)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {meta && (
              <section className="flex flex-col gap-4 rounded-xl border bg-card p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-muted-foreground">
                  Showing page {meta.page} of {meta.totalPage} ({meta.total}{" "}
                  users)
                </p>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={meta.page <= 1}
                    onClick={() => handlePageChange(meta.page - 1)}
                    className="inline-flex h-9 items-center gap-1 rounded-md border px-3 text-sm font-medium transition hover:bg-muted disabled:pointer-events-none disabled:opacity-50"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </button>

                  <span className="min-w-9 text-center text-sm font-medium">
                    {meta.page}
                  </span>

                  <button
                    type="button"
                    disabled={meta.page >= meta.totalPage}
                    onClick={() => handlePageChange(meta.page + 1)}
                    className="inline-flex h-9 items-center gap-1 rounded-md border px-3 text-sm font-medium transition hover:bg-muted disabled:pointer-events-none disabled:opacity-50"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </main>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex rounded-full border bg-muted px-2.5 py-1 text-xs font-medium">
      {children}
    </span>
  );
}

function LoadingState() {
  return (
    <section className="overflow-hidden rounded-xl border bg-card shadow-sm">
      <div className="space-y-4 p-5">
        {["one", "two", "three", "four", "five"].map((item) => (
          <div key={item} className="h-16 animate-pulse rounded-lg bg-muted" />
        ))}
      </div>
    </section>
  );
}

function ErrorState() {
  return (
    <section className="rounded-xl border border-destructive/30 bg-destructive/5 p-6">
      <h2 className="text-lg font-semibold">Unable to load users</h2>

      <p className="mt-1 text-sm text-muted-foreground">
        User data could not be loaded from the server.
      </p>
    </section>
  );
}

function EmptyState() {
  return (
    <section className="rounded-xl border bg-card p-10 text-center shadow-sm">
      <Users className="mx-auto h-10 w-10 text-muted-foreground" />

      <h2 className="mt-4 text-lg font-semibold">No users found</h2>

      <p className="mt-1 text-sm text-muted-foreground">
        Try changing your search or filters.
      </p>
    </section>
  );
}

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
  }).format(new Date(value));
}
