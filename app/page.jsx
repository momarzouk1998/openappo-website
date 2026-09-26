import SiteNav from "./SiteNav";
import ScrollSequence from "./ScrollSequence";

export default function Page() {
  return (
    <>
      <span id="top" />
      <SiteNav current="/" />
      <ScrollSequence />
    </>
  );
}



