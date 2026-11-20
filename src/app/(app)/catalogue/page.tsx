import type { Metadata } from "next";
import { CataloguePage } from "@/features/catalogue";
export const metadata: Metadata = { title: "Catalogue", robots: { index: false, follow: false } };
export default function Page() { return <CataloguePage />; }
