import Navbar from "./Navbar";
import ScrollSequence from "./ScrollSequence";
import Portfolio from "./Portfolio";
import Testimonials from "./Testimonials";
import Dock from "./Dock";

export default function Page() {
  return (
    <>
      <Navbar />
      <span id="top" />
      <ScrollSequence />
      <Portfolio />
      <Testimonials />
      <Dock />
    </>
  );
}
