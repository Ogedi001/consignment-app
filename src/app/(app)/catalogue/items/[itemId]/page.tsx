import { CatalogueItemPage } from "@/features/catalogue";
export default async function Page({ params }: { params: Promise<{ itemId: string }> }) { const { itemId } = await params; return <CatalogueItemPage itemId={itemId} />; }
