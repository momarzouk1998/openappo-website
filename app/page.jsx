import ScrollSequence from "./ScrollSequence";
import Dock from "./Dock";

export default function Page() {
  return (
    <>
      <span id="top" />
      <a href="/" className="brand-badge" aria-label="Openappo">
        <img src="/brand/openappo-wordmark.png" alt="Openappo" />
      </a>
      <ScrollSequence />
      <Dock />
    </>
  );
}
