"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronRight, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
} from "@/shared/components/ui";
import { ApiError } from "@/shared/lib";
import {
  useCategories,
  useCatalogueVersion,
  useCreateCatalogueItem,
} from "../services/catalogue.service";
import type { ItemCondition } from "../types";
import { DraftEditor } from "./DraftEditor";

const schema = z.object({
  categoryId: z.string().min(1, "Choose a category."),
  title: z.string().trim().min(1, "Enter an item title."),
  description: z.string().trim().min(1, "Describe the item."),
  item_condition: z.enum(["NEW", "USED", "REFURBISHED", "OTHER"]),
  seller_sku: z.string().max(128).optional(),
});
type Values = z.infer<typeof schema>;
type CreatedDraft = { itemId: string; versionId: string };

function DraftSetup({ draft }: { draft: CreatedDraft }) {
  const version = useCatalogueVersion(draft.itemId, draft.versionId);
  if (version.isPending)
    return (
      <p className="py-6 text-sm text-muted-foreground">
        Preparing your draft…
      </p>
    );
  if (version.error || !version.data)
    return (
      <p
        role="alert"
        className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm"
      >
        Your draft was created, but it could not be reloaded.{" "}
        <Link
          className="font-semibold text-primary underline"
          href={`/catalogue/items/${draft.itemId}/edit`}
        >
          Continue editing it
        </Link>
        .
      </p>
    );
  return (
    <section className="space-y-6">
      <header>
        <p className="text-sm font-semibold text-primary">Draft created</p>
        <h2 className="mt-1 text-xl font-bold">
          Add specifications and options
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Stay here to add specifications. You can return to this private draft
          at any time.
        </p>
      </header>
      <DraftEditor draft={version.data} />
      <Card>
        <CardHeader>
          <CardTitle>Variants</CardTitle>
          <CardDescription>
            Options such as colour or size are configured separately from
            specifications.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Variant dimensions are available from the category, but the registered
          interim variant route does not have a verified request contract.
          Variant changes are therefore not submitted from this screen.
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Media</CardTitle>
          <CardDescription>
            Photos and supporting media will appear with the item
            representation.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          The Catalogue API currently exposes media references only; it does not
          provide an upload or media-write route.
        </CardContent>
      </Card>
      <div className="flex flex-wrap gap-3">
        <Button asChild>
          <Link href={`/catalogue/items/${draft.itemId}`}>
            Review draft <ChevronRight />
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/catalogue">Return to catalogue</Link>
        </Button>
      </div>
    </section>
  );
}

export function CreateCatalogueItemForm() {
  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: {
      categoryId: "",
      title: "",
      description: "",
      item_condition: "USED",
      seller_sku: "",
    },
  });
  const [step, setStep] = useState<"category" | "details">("category");
  const [parentId, setParentId] = useState<string | null>(null);
  const [created, setCreated] = useState<CreatedDraft>();
  const categories = useCategories(parentId);
  const create = useCreateCatalogueItem();
  const categoryId = form.watch("categoryId");
  const selected = categories.data?.find(
    (category) => category.category_id === categoryId,
  );
  const submit = form.handleSubmit(async (input) => {
    if (!selected) return;
    try {
      const result = await create.mutateAsync({
        category_key: selected.category_key,
        title: input.title,
        description: input.description,
        item_condition: input.item_condition as ItemCondition,
        seller_sku: input.seller_sku || null,
        representation_metadata: {},
      });
      setCreated({
        itemId: result.item_id,
        versionId: result.draft.version_id,
      });
    } catch {
      /* input remains in place for an explicit retry */
    }
  });
  const error =
    create.error instanceof ApiError
      ? create.error.message
      : create.error
        ? "We could not create this draft. Your details are still here."
        : null;
  if (created) return <DraftSetup draft={created} />;
  return (
    <form onSubmit={submit} noValidate className="space-y-6">
      <ol
        className="flex flex-wrap gap-x-4 gap-y-2 text-xs font-semibold text-muted-foreground"
        aria-label="Creation steps"
      >
        <li className={step === "category" ? "text-primary" : ""}>
          1. Category
        </li>
        <li className={step === "details" ? "text-primary" : ""}>
          2. Item details
        </li>
        <li>3. Specifications and options</li>
      </ol>
      {step === "category" ? (
        <section className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Start with one of the two main categories, then choose its specific
            item category.
          </p>
          {parentId && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                setParentId(null);
                form.setValue("categoryId", "");
              }}
            >
              ← Main categories
            </Button>
          )}
          {categories.isPending ? (
            <p className="text-sm text-muted-foreground">Loading categories…</p>
          ) : categories.error ? (
            <p role="alert" className="text-sm text-destructive">
              Categories could not be loaded. Try again.
            </p>
          ) : (
            <div className="grid gap-2 sm:grid-cols-2">
              {categories.data?.map((category) => (
                <button
                  type="button"
                  key={category.category_id}
                  onClick={() => {
                    if (parentId)
                      form.setValue("categoryId", category.category_id, {
                        shouldValidate: true,
                      });
                    else setParentId(category.category_id);
                  }}
                  className={`rounded-lg border p-4 text-left text-sm transition ${categoryId === category.category_id ? "border-primary bg-primary/5" : "border-border hover:bg-surface"}`}
                >
                  <span className="font-semibold">{category.display_name}</span>
                  <span className="mt-1 block text-xs text-muted-foreground">
                    {parentId ? "Select this category" : "View categories"}
                  </span>
                </button>
              ))}
            </div>
          )}
          {categoryId && (
            <p className="text-sm text-muted-foreground">
              Selected:{" "}
              <strong className="text-foreground">
                {selected?.display_name}
              </strong>
            </p>
          )}
          {form.formState.errors.categoryId && (
            <p className="text-sm text-destructive">
              {form.formState.errors.categoryId.message}
            </p>
          )}
        </section>
      ) : (
        <section className="grid gap-5">
          <div>
            <label className="text-sm font-semibold" htmlFor="catalogue-title">
              Item title
            </label>
            <Input
              id="catalogue-title"
              className="mt-2"
              {...form.register("title")}
            />
            {form.formState.errors.title && (
              <p className="mt-1 text-sm text-destructive">
                {form.formState.errors.title.message}
              </p>
            )}
          </div>
          <div>
            <label
              className="text-sm font-semibold"
              htmlFor="catalogue-description"
            >
              Description
            </label>
            <textarea
              id="catalogue-description"
              rows={5}
              className="mt-2 flex w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
              {...form.register("description")}
            />
            {form.formState.errors.description && (
              <p className="mt-1 text-sm text-destructive">
                {form.formState.errors.description.message}
              </p>
            )}
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                className="text-sm font-semibold"
                htmlFor="catalogue-condition"
              >
                Condition
              </label>
              <select
                id="catalogue-condition"
                className="mt-2 flex h-11 w-full rounded-lg border border-input bg-background px-3 text-sm"
                {...form.register("item_condition")}
              >
                <option value="NEW">New</option>
                <option value="USED">Used</option>
                <option value="REFURBISHED">Refurbished</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold" htmlFor="catalogue-sku">
                Seller SKU{" "}
                <span className="font-normal text-muted-foreground">
                  (optional)
                </span>
              </label>
              <Input
                id="catalogue-sku"
                className="mt-2"
                {...form.register("seller_sku")}
              />
            </div>
          </div>
        </section>
      )}
      {error && (
        <p
          role="alert"
          className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm"
        >
          {error}
        </p>
      )}
      <div className="flex justify-between gap-3">
        {step === "details" ? (
          <Button
            type="button"
            variant="outline"
            onClick={() => setStep("category")}
          >
            Back
          </Button>
        ) : (
          <span />
        )}
        {step === "category" ? (
          <Button
            type="button"
            onClick={async () => {
              if (await form.trigger("categoryId")) setStep("details");
            }}
          >
            Continue <ChevronRight />
          </Button>
        ) : (
          <Button type="submit" disabled={create.isPending}>
            {create.isPending ? (
              <>
                <LoaderCircle className="animate-spin" />
                Creating draft…
              </>
            ) : (
              "Create draft and continue"
            )}
          </Button>
        )}
      </div>
    </form>
  );
}
