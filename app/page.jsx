import ScrollSequence from "./ScrollSequence";

export default function Page() {
  return (
    <>
      <span id="top" />
      <header className="openappo-nav">
        <a href="/" className="openappo-logo-wrap" aria-label="Openappo">
          <img
            src="/brand/openappo-wordmark.png"
            alt="Openappo"
            className="openappo-logo-img"
          />
        </a>
        <a href="/contact" className="nav-cta-btn">
          <span>تواصل معنا</span>
          <span>←</span>
        </a>
      </header>
      <ScrollSequence />
    </>
  );
}


