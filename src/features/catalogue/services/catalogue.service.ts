import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/shared/lib";
import type { ApiEnvelope, AttributeDefinition, CatalogueItem, Category, CreateItemInput, ExactItemVersion } from "../types/catalogue.types";

export const catalogueKeys = { all: ["catalogue"] as const, categories: () => [...catalogueKeys.all, "categories"] as const, attributes: (id: string) => [...catalogueKeys.all, "attributes", id] as const, items: () => [...catalogueKeys.all, "items"] as const, item: (id: string) => [...catalogueKeys.items(), id] as const, version: (itemId: string, versionId: string) => [...catalogueKeys.item(itemId), "version", versionId] as const, history: (id: string) => [...catalogueKeys.item(id), "history"] as const };

async function read<T>(path: string) { const result = await api<ApiEnvelope<T>>(path); return result.data; }
const key = () => typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `catalogue-${Date.now()}-${Math.random().toString(36).slice(2)}`;

export function useCategories() { return useQuery({ queryKey: catalogueKeys.categories(), queryFn: () => read<{ categories: Category[] }>("/api/catalog/categories"), select: (data) => data.categories }); }
export function useCategoryAttributes(categoryId?: string) { return useQuery({ queryKey: catalogueKeys.attributes(categoryId ?? ""), enabled: Boolean(categoryId), queryFn: () => read<{ attributes: AttributeDefinition[] }>(`/api/catalog/categories/${categoryId}/attributes`), select: (data) => [...data.attributes].sort((a, b) => a.display_order - b.display_order) }); }
export function useCatalogueItems() { return useQuery({ queryKey: catalogueKeys.items(), queryFn: () => read<{ items: CatalogueItem[]; next_cursor: string | null }>("/api/catalog/items") }); }
export function useCatalogueItem(itemId: string) { return useQuery({ queryKey: catalogueKeys.item(itemId), queryFn: () => read<CatalogueItem>(`/api/catalog/items/${itemId}`), enabled: Boolean(itemId) }); }
export function useCatalogueVersion(itemId: string, versionId?: string) { return useQuery({ queryKey: catalogueKeys.version(itemId, versionId ?? ""), queryFn: () => read<ExactItemVersion>(`/api/catalog/items/${itemId}/versions/${versionId}`), enabled: Boolean(itemId && versionId) }); }
export function useCreateCatalogueItem() { const client = useQueryClient(); return useMutation({ mutationFn: (input: CreateItemInput) => api<ApiEnvelope<{ item_id: string; draft: { version_id: string } }>>("/api/catalog/items", { method: "POST", body: input, headers: { "Idempotency-Key": key() } }).then((response) => response.data), onSuccess: () => client.invalidateQueries({ queryKey: catalogueKeys.items() }) }); }
