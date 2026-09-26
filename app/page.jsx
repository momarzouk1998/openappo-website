import SiteNav from "./SiteNav";
import ScrollSequence from "./ScrollSequence";

export const metadata = {
  alternates: { canonical: "/", languages: { ar: "/", en: "/en" } },
};

export default function Page() {
  return (
    <>
      <span id="top" />
      <SiteNav current="/" />
      <ScrollSequence />
    </>
  );
}



