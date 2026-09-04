// PLACEHOLDER CONTENT — names, roles and quotes below are generic samples,
// not real clients. Swap this array for real testimonials when available.
const TESTIMONIALS = [
  { name: "محمد الشريف", role: "صاحب شركة تجارة", quote: "النظام سهّل علينا متابعة الشغل يوميًا من مكان واحد بدل ما كنا مبعتّرين.", hue: "#3ddad2" },
  { name: "أحمد فوزي", role: "مدير عمليات", quote: "التقارير بقت جاهزة في ثواني، وفريقنا وفّر وقت كبير في المتابعة.", hue: "#ff7a7a" },
  { name: "كريم عبد الله", role: "صاحب مصنع", quote: "دعم فني سريع وفهموا احتياجاتنا صح من أول يوم.", hue: "#8b7bff" },
  { name: "طارق يوسف", role: "مدير تنفيذي", quote: "لوحة التحكم واضحة وسهلة حتى لموظفين مش متمرسين على الأنظمة.", hue: "#3ddad2" },
  { name: "عمرو حسن", role: "صاحب متجر", quote: "بقيت أشوف كل حاجة عن شغلي من موبايلي وأنا في أي مكان.", hue: "#ffb347" },
  { name: "خالد إبراهيم", role: "مدير مالي", quote: "دقة الأرقام والتقارير المالية خلّت القرارات أسهل بكتير.", hue: "#ff7a7a" },
];

function Avatar({ hue }) {
  return (
    <svg viewBox="0 0 64 64" className="testimonial-avatar-icon" style={{ color: hue }}>
      <circle cx="32" cy="32" r="32" fill="currentColor" opacity="0.16" />
      <circle cx="32" cy="25" r="11" fill="currentColor" />
      <path d="M12 54c2-11 10-17 20-17s18 6 20 17" fill="currentColor" />
    </svg>
  );
}

function Card({ t }) {
  return (
    <div className="testimonial-card">
      <div className="testimonial-avatar">
        <Avatar hue={t.hue} />
      </div>
      <div className="testimonial-bubble">
        <p>{t.quote}</p>
        <span className="testimonial-bubble-tail" />
      </div>
      <div className="testimonial-name">{t.name}</div>
      <div className="testimonial-role">{t.role}</div>
    </div>
  );
}

export default function Testimonials() {
  const loop = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section id="testimonials" className="testimonials">
      <h2 className="portfolio-title">آراء العملاء</h2>
      <div className="testimonials-track-wrap">
        <div className="testimonials-track">
          {loop.map((t, i) => (
            <Card key={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
