// English mirror of the Arabic site. The document root stays lang="ar"/dir="rtl"
// (set once in the top-level app/layout.jsx), so this wraps every /en page in
// its own lang="en" dir="ltr" subtree — the standard way to mark a
// differently-directioned region inside an HTML document, and it needs no
// client-side script or hydration workaround.
export default function EnglishLayout({ children }) {
  return (
    <div lang="en" dir="ltr" className="lang-en">
      {children}
    </div>
  );
}
