import { notFound } from "next/navigation";
import { CreateTransaction } from "@/features/operations";
const steps = new Set(["item", "buyer", "protection", "review", "complete"]);
export default async function Page({ params }: { params: Promise<{ step: string }> }) { const { step } = await params; if (!steps.has(step)) notFound(); return <CreateTransaction step={step} />; }
