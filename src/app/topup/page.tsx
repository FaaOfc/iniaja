import type { Metadata } from "next";
import ComingSoon from "@/components/coming-soon";


export const metadata: Metadata = {
  title: "Top Up Murah — TaoSite",
  description: "Top up game murah — segera hadir di TaoSite.",
};

export default function TopupPage() {
  return (
    <ComingSoon
      icon="wallet"
      title="Top UP Murah"
      subtitle="Layanan top up game & voucher dengan harga termurah segera dibuka. Tunggu tanggal tayangnya!"
      accent="#10b981"
    />
  );
}
