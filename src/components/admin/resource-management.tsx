"use client";
import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AlertCircle,
  Building2,
  Check,
  CircleDollarSign,
  Loader2,
  MapPin,
  Pencil,
  Plus,
  RefreshCw,
  Search,
  X,
} from "lucide-react";
import {
  activateZone,
  createZone,
  deactivateZone,
  deleteZone,
  getAdminZones,
  getZones,
  updateZone,
  type Zone,
  type ZonePayload,
} from "@/api/zone.api";
import {
  activateHub,
  createHub,
  deactivateHub,
  deleteHub,
  getHubs,
  updateHub,
  type Hub,
  type HubPayload,
} from "@/api/hub.api";
import {
  createPricingRule,
  deactivatePricingRule,
  deletePricingRule,
  getPricingRules,
  updatePricingRule,
  type PricingRule,
  type PricingPayload,
} from "@/api/pricing.api";
type ModuleKind = "zones" | "hubs" | "pricing";
type Resource = Zone | Hub | PricingRule;
type FormValues = Record<string, string>;
const inputClass =
  "mt-1.5 h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-[#1D3557] focus:ring-2 focus:ring-[#1D3557]/10";
const buttonClass =
  "inline-flex min-h-9 items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50";
function unwrap<T>(response: unknown): T {
  const root = response as { data?: unknown };
  const nested = root?.data;
  if (nested && typeof nested === "object" && "data" in (nested as object)) {
    return (nested as { data: T }).data;
  }
  return nested as T;
}
function messageFrom(error: unknown): string {
  if (error && typeof error === "object" && "message" in error)
    return String((error as { message: unknown }).message);
  return "Something went wrong. Please try again.";
}
const moduleMeta: Record<
  ModuleKind,
  { title: string; subtitle: string; singular: string }
> = {
  zones: {
    title: "Zone Management",
    subtitle: "Manage delivery zones and their identifiers.",
    singular: "Zone",
  },
  hubs: {
    title: "Hub Management",
    subtitle: "Manage hubs and assign each hub to a delivery zone.",
    singular: "Hub",
  },
  pricing: {
    title: "Pricing Management",
    subtitle:
      "Configure base delivery charges, weight rates and COD percentage.",
    singular: "Pricing Rule",
  },
};
export default function ResourceManagement({ kind }: { kind: ModuleKind }) {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<Resource | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [successText, setSuccessText] = useState("");
  const [values, setValues] = useState<FormValues>({});
  const meta = moduleMeta[kind];
  // Admin Zone Management must include inactive zones.
  const adminZonesQuery = useQuery({
    queryKey: ["admin-zones"],
    queryFn: getAdminZones,
    enabled: kind === "zones",
  });
  // Hub form dropdown should only offer active zones.
  const zonesQuery = useQuery({
    queryKey: ["zones"],
    queryFn: getZones,
    enabled: kind === "hubs",
  });
  const hubsQuery = useQuery({
    queryKey: ["hubs"],
    queryFn: getHubs,
    enabled: kind === "hubs",
  });
  const pricingQuery = useQuery({
    queryKey: ["pricing"],
    queryFn: getPricingRules,
    enabled: kind === "pricing",
  });
  const query =
    kind === "zones"
      ? adminZonesQuery
      : kind === "hubs"
        ? hubsQuery
        : pricingQuery;
  const resources = useMemo(() => {
    const raw = query.data ? unwrap<Resource[]>(query.data) : [];
    return Array.isArray(raw) ? raw : [];
  }, [query.data]);
  const zones = useMemo(() => {
    const raw = zonesQuery.data ? unwrap<Zone[]>(zonesQuery.data) : [];
    return Array.isArray(raw) ? raw : [];
  }, [zonesQuery.data]);
  const invalidate = async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ["admin-zones"] }),
      queryClient.invalidateQueries({ queryKey: ["zones"] }),
      queryClient.invalidateQueries({ queryKey: ["hubs"] }),
      queryClient.invalidateQueries({ queryKey: ["pricing"] }),
    ]);
  };
  const saveMutation = useMutation({
    mutationFn: async () => {
      if (kind === "zones") {
        const payload: ZonePayload = {
          name: values.name?.trim() ?? "",
          code: values.code?.trim() ?? "",
          description: values.description?.trim() ?? "",
        };
        return editing ? updateZone(editing.id, payload) : createZone(payload);
      }
      if (kind === "hubs") {
        const payload: HubPayload = {
          name: values.name?.trim() ?? "",
          code: values.code?.trim() ?? "",
          address: values.address?.trim() ?? "",
          zoneId: values.zoneId ?? "",
        };
        return editing ? updateHub(editing.id, payload) : createHub(payload);
      }
      const payload: PricingPayload = {
        name: values.name?.trim() ?? "",
        basePrice: Number(values.basePrice),
        perKgPrice: Number(values.perKgPrice),
        codPercentage: Number(values.codPercentage),
      };
      return editing
        ? updatePricingRule(editing.id, payload)
        : createPricingRule(payload);
    },
    onSuccess: async () => {
      setErrorText("");
      setSuccessText(
        `${meta.singular} ${editing ? "updated" : "created"} successfully.`,
      );
      setFormOpen(false);
      setEditing(null);
      await invalidate();
    },
    onError: (error) => {
      setSuccessText("");
      setErrorText(messageFrom(error));
    },
  });
  const statusMutation = useMutation({
    mutationFn: async (resource: Resource) => {
      if (!window.confirm(`Deactivate ${resource.name}?`)) return null;
      if (kind === "zones") return deactivateZone(resource.id);
      if (kind === "hubs") return deactivateHub(resource.id);
      return deactivatePricingRule(resource.id);
    },
    onSuccess: async (result) => {
      if (!result) return;
      setErrorText("");
      setSuccessText("Item deactivated successfully.");
      await invalidate();
    },
    onError: (error) => {
      setSuccessText("");
      setErrorText(messageFrom(error));
    },
  });
  const activateMutation = useMutation({
    mutationFn: async (resource: Resource) => {
      if (!window.confirm(`Activate "${resource.name}"?`)) return null;
      if (kind === "zones") return activateZone(resource.id);
      if (kind === "hubs") return activateHub(resource.id);
      throw new Error("Activation is not supported for pricing rules.");
    },
    onSuccess: async (result) => {
      if (!result) return;
      setErrorText("");
      setSuccessText("Item activated successfully.");
      await invalidate();
    },
    onError: (error) => {
      setSuccessText("");
      setErrorText(messageFrom(error));
    },
  });
  const deleteMutation = useMutation({
    mutationFn: async (resource: Resource) => {
      if (
        !window.confirm(
          `Permanently delete "${resource.name}"? This action cannot be undone.`,
        )
      )
        return null;
      if (kind === "zones") return deleteZone(resource.id);
      if (kind === "hubs") return deleteHub(resource.id);
      return deletePricingRule(resource.id);
    },
    onSuccess: async (result) => {
      if (!result) return;
      setErrorText("");
      setSuccessText("Item deleted successfully.");
      await invalidate();
    },
    onError: (error) => {
      setSuccessText("");
      setErrorText(messageFrom(error));
    },
  });
  function openCreate() {
    setEditing(null);
    setValues(
      kind === "zones"
        ? { name: "", code: "", description: "" }
        : kind === "hubs"
          ? { name: "", code: "", address: "", zoneId: zones[0]?.id ?? "" }
          : { name: "", basePrice: "0", perKgPrice: "0", codPercentage: "0" },
    );
    setErrorText("");
    setSuccessText("");
    setFormOpen(true);
  }
  function openEdit(resource: Resource) {
    setEditing(resource);
    if (kind === "zones") {
      const item = resource as Zone;
      setValues({
        name: item.name,
        code: item.code,
        description: item.description ?? "",
      });
    } else if (kind === "hubs") {
      const item = resource as Hub;
      setValues({
        name: item.name,
        code: item.code,
        address: item.address,
        zoneId: item.zoneId ?? item.zone?.id ?? "",
      });
    } else {
      const item = resource as PricingRule;
      setValues({
        name: item.name,
        basePrice: String(item.basePrice),
        perKgPrice: String(item.perKgPrice),
        codPercentage: String(item.codPercentage),
      });
    }
    setErrorText("");
    setSuccessText("");
    setFormOpen(true);
  }
  function updateField(key: string, value: string) {
    setValues((current) => ({ ...current, [key]: value }));
  }
  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorText("");
    if (values.name?.trim().length < 2) {
      setErrorText("Name must be at least 2 characters.");
      return;
    }
    if (kind === "zones" && values.code?.trim().length < 2) {
      setErrorText("Zone code must be at least 2 characters.");
      return;
    }
    if (kind === "hubs" && values.code?.trim().length < 2) {
      setErrorText("Hub code must be at least 2 characters.");
      return;
    }
    if (kind === "hubs" && values.address?.trim().length < 5) {
      setErrorText("Address must be at least 5 characters.");
      return;
    }
    if (kind === "hubs" && !values.zoneId) {
      setErrorText("Select a zone.");
      return;
    }
    if (kind === "pricing") {
      for (const field of ["basePrice", "perKgPrice", "codPercentage"]) {
        const number = Number(values[field]);
        if (!Number.isFinite(number) || number < 0) {
          setErrorText(`${field} must be a non-negative number.`);
          return;
        }
      }
      if (Number(values.codPercentage) > 100) {
        setErrorText("COD percentage cannot exceed 100.");
        return;
      }
    }
    saveMutation.mutate();
  }
  const filtered = resources.filter((item) => {
    const haystack = [
      item.name,
      "code" in item ? item.code : "",
      "address" in item ? item.address : "",
      "description" in item ? (item.description ?? "") : "",
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(search.toLowerCase());
  });
  const Icon =
    kind === "zones" ? MapPin : kind === "hubs" ? Building2 : CircleDollarSign;
  const loading = query.isLoading;
  const isError = query.isError;
  const queryError = query.error ? messageFrom(query.error) : "";
  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
            <Icon className="size-4" /> Admin <span>/</span> {meta.title}
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            {meta.title}
          </h1>
          <p className="mt-1 text-sm text-slate-600">{meta.subtitle}</p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className={`${buttonClass} bg-[#1D3557] text-white hover:bg-[#27466f]`}
        >
          <Plus className="size-4" /> Add {meta.singular}
        </button>
      </div>
      {successText && (
        <div
          role="status"
          className="flex items-start gap-2 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800"
        >
          <Check className="mt-0.5 size-4 shrink-0" />
          {successText}
        </div>
      )}
      {(errorText || (isError && queryError)) && (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800"
        >
          <AlertCircle className="mt-0.5 size-4 shrink-0" />
          {errorText || queryError}
        </div>
      )}
      <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`Search ${meta.title.toLowerCase()}...`}
            className="h-10 w-full rounded-lg border border-slate-200 pl-9 pr-3 text-sm outline-none focus:border-[#1D3557]"
          />
        </div>
        <div className="flex items-center gap-3 text-sm text-slate-500">
          <span>
            {filtered.length} item{filtered.length === 1 ? "" : "s"}
          </span>
          <button
            type="button"
            onClick={() => void query.refetch()}
            className={`${buttonClass} border border-slate-200 text-slate-700 hover:bg-slate-50`}
          >
            <RefreshCw className="size-4" /> Refresh
          </button>
        </div>
      </div>
      {formOpen && (
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">
              {editing ? "Edit" : "Create"} {meta.singular}
            </h2>
            <button
              type="button"
              aria-label="Close form"
              onClick={() => {
                if (!saveMutation.isPending) setFormOpen(false);
              }}
              className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
            >
              <X className="size-4" />
            </button>
          </div>
          <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-medium text-slate-700">
              Name
              <input
                required
                minLength={2}
                value={values.name ?? ""}
                onChange={(e) => updateField("name", e.target.value)}
                className={inputClass}
              />
            </label>
            {kind !== "pricing" && (
              <label className="text-sm font-medium text-slate-700">
                Code
                <input
                  required
                  minLength={2}
                  value={values.code ?? ""}
                  onChange={(e) =>
                    updateField("code", e.target.value.toUpperCase())
                  }
                  className={inputClass}
                />
              </label>
            )}
            {kind === "zones" && (
              <label className="text-sm font-medium text-slate-700 sm:col-span-2">
                Description{" "}
                <span className="font-normal text-slate-400">(optional)</span>
                <textarea
                  value={values.description ?? ""}
                  onChange={(e) => updateField("description", e.target.value)}
                  rows={3}
                  className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#1D3557]"
                />
              </label>
            )}
            {kind === "hubs" && (
              <>
                <label className="text-sm font-medium text-slate-700 sm:col-span-2">
                  Address
                  <input
                    required
                    minLength={5}
                    value={values.address ?? ""}
                    onChange={(e) => updateField("address", e.target.value)}
                    className={inputClass}
                  />
                </label>
                <label className="text-sm font-medium text-slate-700 sm:col-span-2">
                  Zone
                  <select
                    required
                    value={values.zoneId ?? ""}
                    onChange={(e) => updateField("zoneId", e.target.value)}
                    className={inputClass}
                  >
                    <option value="">Select a zone</option>
                    {zones
                      .filter((z) => z.isActive)
                      .map((z) => (
                        <option key={z.id} value={z.id}>
                          {z.name} ({z.code})
                        </option>
                      ))}
                  </select>
                  {zonesQuery.isError && (
                    <span className="mt-1 block text-xs text-red-600">
                      Unable to load zones.
                    </span>
                  )}
                </label>
              </>
            )}
            {kind === "pricing" && (
              <>
                <label className="text-sm font-medium text-slate-700">
                  Base price (BDT)
                  <input
                    required
                    type="number"
                    min="0"
                    step="0.01"
                    value={values.basePrice ?? "0"}
                    onChange={(e) => updateField("basePrice", e.target.value)}
                    className={inputClass}
                  />
                </label>
                <label className="text-sm font-medium text-slate-700">
                  Per kg price (BDT)
                  <input
                    required
                    type="number"
                    min="0"
                    step="0.01"
                    value={values.perKgPrice ?? "0"}
                    onChange={(e) => updateField("perKgPrice", e.target.value)}
                    className={inputClass}
                  />
                </label>
                <label className="text-sm font-medium text-slate-700">
                  COD percentage (%)
                  <input
                    required
                    type="number"
                    min="0"
                    max="100"
                    step="0.01"
                    value={values.codPercentage ?? "0"}
                    onChange={(e) =>
                      updateField("codPercentage", e.target.value)
                    }
                    className={inputClass}
                  />
                </label>
              </>
            )}
            <div className="flex flex-wrap justify-end gap-2 sm:col-span-2">
              <button
                type="button"
                onClick={() => setFormOpen(false)}
                disabled={saveMutation.isPending}
                className={`${buttonClass} border border-slate-200 text-slate-700 hover:bg-slate-50`}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={
                  saveMutation.isPending ||
                  (kind === "hubs" && zones.length === 0)
                }
                className={`${buttonClass} bg-[#1D3557] text-white hover:bg-[#27466f]`}
              >
                {saveMutation.isPending && (
                  <Loader2 className="size-4 animate-spin" />
                )}
                {editing ? "Save changes" : "Create"}
              </button>
            </div>
          </form>
        </div>
      )}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        {loading ? (
          <div className="space-y-4 p-6">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="h-12 animate-pulse rounded-lg bg-slate-100"
              />
            ))}
          </div>
        ) : isError ? (
          <div className="flex min-h-48 flex-col items-center justify-center gap-3 p-6 text-center">
            <AlertCircle className="size-7 text-red-500" />
            <p className="font-semibold text-slate-900">
              Unable to load {meta.title.toLowerCase()}
            </p>
            <p className="text-sm text-slate-500">{queryError}</p>
            <button
              type="button"
              onClick={() => void query.refetch()}
              className={`${buttonClass} border border-slate-200`}
            >
              <RefreshCw className="size-4" /> Try again
            </button>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex min-h-48 flex-col items-center justify-center p-8 text-center">
            <Icon className="size-8 text-slate-300" />
            <h2 className="mt-3 font-semibold text-slate-900">
              {search
                ? "No matching items"
                : `No ${meta.title.toLowerCase()} yet`}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {search
                ? "Try another search term."
                : `Create your first ${meta.singular.toLowerCase()} to get started.`}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
                  <th className="px-5 py-4 font-semibold">Name / Details</th>
                  {kind !== "pricing" && (
                    <th className="px-5 py-4 font-semibold">Code</th>
                  )}
                  {kind === "hubs" && (
                    <th className="px-5 py-4 font-semibold">Zone</th>
                  )}
                  {kind === "pricing" && (
                    <>
                      <th className="px-5 py-4 font-semibold">Base price</th>
                      <th className="px-5 py-4 font-semibold">Per kg</th>
                      <th className="px-5 py-4 font-semibold">COD %</th>
                    </>
                  )}
                  <th className="px-5 py-4 font-semibold">Status</th>
                  <th className="px-5 py-4 text-right font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((resource) => {
                  const active = resource.isActive !== false;
                  const hub = resource as Hub;
                  const price = resource as PricingRule;
                  return (
                    <tr
                      key={resource.id}
                      className="text-sm hover:bg-slate-50/70"
                    >
                      <td className="px-5 py-4">
                        <p className="font-semibold text-slate-900">
                          {resource.name}
                        </p>
                        <p className="mt-1 max-w-sm truncate text-xs text-slate-500">
                          {kind === "zones"
                            ? (resource as Zone).description || "No description"
                            : kind === "hubs"
                              ? hub.address
                              : "Delivery pricing configuration"}
                        </p>
                      </td>
                      {kind !== "pricing" && (
                        <td className="px-5 py-4 font-mono text-xs text-slate-600">
                          {(resource as Zone | Hub).code}
                        </td>
                      )}
                      {kind === "hubs" && (
                        <td className="px-5 py-4 text-slate-600">
                          {hub.zone?.name ??
                            zones.find((z) => z.id === hub.zoneId)?.name ??
                            "—"}
                        </td>
                      )}
                      {kind === "pricing" && (
                        <>
                          <td className="px-5 py-4 tabular-nums">
                            ৳{Number(price.basePrice).toFixed(2)}
                          </td>
                          <td className="px-5 py-4 tabular-nums">
                            ৳{Number(price.perKgPrice).toFixed(2)}
                          </td>
                          <td className="px-5 py-4 tabular-nums">
                            {Number(price.codPercentage).toFixed(2)}%
                          </td>
                        </>
                      )}
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${active ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"}`}
                        >
                          {active ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => openEdit(resource)}
                            className={`${buttonClass} border border-slate-200 text-slate-700 hover:bg-slate-100`}
                          >
                            <Pencil className="size-3.5" /> Edit
                          </button>
                          {active ? (
                            <button
                              type="button"
                              disabled={statusMutation.isPending}
                              onClick={() => statusMutation.mutate(resource)}
                              className={`${buttonClass} border border-amber-200 text-amber-800 hover:bg-amber-50`}
                            >
                              Deactivate
                            </button>
                          ) : kind !== "pricing" ? (
                            <button
                              type="button"
                              disabled={activateMutation.isPending}
                              onClick={() => activateMutation.mutate(resource)}
                              className={`${buttonClass} border border-emerald-200 text-emerald-700 hover:bg-emerald-50`}
                            >
                              {activateMutation.isPending && (
                                <Loader2 className="size-3.5 animate-spin" />
                              )}
                              Activate
                            </button>
                          ) : null}
                          <button
                            type="button"
                            disabled={deleteMutation.isPending}
                            onClick={() => deleteMutation.mutate(resource)}
                            className={`${buttonClass} border border-red-200 text-red-700 hover:bg-red-50`}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <p className="text-xs leading-5 text-slate-500">
        Administrative changes are sent to the backend API. Inactive zones and
        hubs can be reactivated. Deleted items cannot be restored from this
        screen. Deleting a zone or hub may be rejected by the server if related
        records depend on it.
      </p>
    </div>
  );
}
