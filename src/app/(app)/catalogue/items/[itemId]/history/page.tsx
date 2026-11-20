import { CatalogueItemWorkspace } from "@/features/catalogue";
export default async function Page({ params }: { params: Promise<{ itemId: string }> }) { const { itemId } = await params; return <CatalogueItemWorkspace itemId={itemId} mode="history" />; }
