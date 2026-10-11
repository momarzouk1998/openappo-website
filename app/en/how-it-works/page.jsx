import HowItWorksView from "../../how-it-works/view";
import { buildMetadata } from "../../how-it-works/seo";

// Re-check the admin feeds at most once a minute ("changes go live within a minute").
export const revalidate = 60;

export const metadata = buildMetadata("en");

export default function HowItWorksPageEn() {
  return <HowItWorksView lang="en" />;
}
