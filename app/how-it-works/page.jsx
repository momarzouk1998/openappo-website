import HowItWorksView from "./view";
import { buildMetadata } from "./seo";

// Re-check the admin feeds at most once a minute ("changes go live within a minute").
export const revalidate = 60;

export const metadata = buildMetadata("ar");

export default function HowItWorksPage() {
  return <HowItWorksView lang="ar" />;
}
