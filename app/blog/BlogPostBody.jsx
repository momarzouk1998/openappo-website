// Renders a post's `content` block array as semantic HTML. Kept as a plain
// mapping (no dangerouslySetInnerHTML) so headings stay real <h2>/<h3> tags —
// that structure is what search engines and screen readers use to outline
// the article.
export default function BlogPostBody({ content }) {
  return (
    <div className="blog-body">
      {content.map((block, i) => {
        if (block.type === "h2") return <h2 key={i}>{block.text}</h2>;
        if (block.type === "h3") return <h3 key={i}>{block.text}</h3>;
        if (block.type === "ul")
          return (
            <ul key={i}>
              {block.items.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
          );
        if (block.type === "blockquote")
          return <blockquote key={i}>{block.text}</blockquote>;
        return <p key={i}>{block.text}</p>;
      })}
    </div>
  );
}
