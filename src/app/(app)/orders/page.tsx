import type { Metadata } from "next";
import { OrderList } from "@/features/operations";
export const metadata: Metadata = {
  title: "Orders",
  robots: { index: false, follow: false },
};
export default function Page() {
  return <OrderList />;
}
