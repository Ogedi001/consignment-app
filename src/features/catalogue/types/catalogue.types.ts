export type ApiEnvelope<T> = { success: boolean; message?: string; data: T };
export type Category = { category_id: string; category_key: string; display_name: string; parent_category_id: string | null };
export type AllowedValue = { value_code: string; display_name: string };
export type ValuePolicy = "FREEFORM" | "CONTROLLED_ONLY" | "CONTROLLED_WITH_CUSTOM";
export type AttributeDefinition = {
  attribute_key: string; display_name: string; data_type: "TEXT" | "DECIMAL" | "BOOLEAN" | "DATE" | "JSON";
  unit_of_measure_code: string | null; validation_rules: Record<string, unknown>; value_policy: ValuePolicy;
  is_required: boolean; display_order: number; variant_dimension: { is_required: boolean; display_order: number; value_policy: ValuePolicy } | null;
  allowed_values: AllowedValue[];
};
export type ItemCondition = "NEW" | "USED" | "REFURBISHED" | "OTHER";
export type ItemSummary = { version_id: string; version_number: number; status: "DRAFT" | "PUBLISHED" | "SUPERSEDED"; category: Pick<Category, "category_id" | "category_key" | "display_name"> | null; title: string | null; published_at?: string };
export type CatalogueItem = { item_id: string; item_status: "ACTIVE" | "UNPUBLISHED" | "ARCHIVED"; aggregate_version: number; current_published_version_id: string | null; current_publication: ItemSummary | null; latest_draft: ItemSummary | null };
export type ExactItemVersion = { item_id: string; version_id: string; version_number: number; item_status: CatalogueItem["item_status"]; aggregate_version: number; version_status: ItemSummary["status"]; category_id: string | null; category_key: string | null; title: string | null; description: string | null; item_condition: ItemCondition | null; seller_sku: string | null; unit_of_measure_code: string | null; attributes: unknown[]; variants: Array<{ variant_id: string; display_name: string; seller_sku: string | null; is_selectable: boolean; dimension_values: Array<{ attribute_key: string; value: unknown; controlled_value_code: string | null; custom_value: string | null }> }>; media: unknown[] };
export type CreateItemInput = { category_key: string; title: string; description: string; item_condition: ItemCondition; seller_sku?: string | null; unit_of_measure_code?: string | null; representation_metadata: Record<string, never> };
