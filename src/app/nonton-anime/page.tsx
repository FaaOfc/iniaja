import type { Metadata } from "next";
import ComingSoon from "@/components/coming-soon";


export const metadata: Metadata = {
  title: "Nonton Anime — TaoSite",
  description: "Streaming anime — segera hadir di TaoSite.",
};

export default function NontonAnimePage() {
  return (
    <ComingSoon
      icon="tv"
      title="Nonton Anime"
      subtitle="Fitur streaming anime sedang kami siapkan. Nantikan update berikutnya — sabar ya, onii-chan!"
      accent="#a855f7"
    />
  );
}
