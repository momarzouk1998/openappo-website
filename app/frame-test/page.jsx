import FrameTest from "./FrameTest";

// TEMPORARY: on-device quality comparison so the codec decision is made by eye,
// not by a number. Delete this route (and /public/ftest) once decided.
export const metadata = {
  title: "اختبار جودة الإطارات",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <FrameTest />;
}
