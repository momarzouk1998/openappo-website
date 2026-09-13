"use client";

export default function TestimonialsCTA() {
  return (
    <section className="tm-section tm-cta-section">
      <div className="tm-cta-card">
        <div className="tm-cta-ambient tm-cta-ambient--teal" />
        <div className="tm-cta-ambient tm-cta-ambient--coral" />

        <div className="tm-cta-content">
          <span className="tm-cta-tag">ابدأ شراكتك الرقمية اليوم • GET STARTED</span>
          <h2 className="tm-cta-title">عملك فريد.. ونظامك البرمجي يجب أن يُصمم له خصيصاً</h2>
          <p className="tm-cta-desc">
            شاركنا تفاصيل نشاطك وتحديات إدارتك الحالية، ولنبدأ معاً في تصميم منظومة أعمال ذكية تنقل شركتك للمستوى التالي من الكفاءة والربحية.
          </p>

          <div className="tm-cta-buttons">
            <a
              href="https://wa.me/201558282760?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%20Openappo%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%AA%D8%AD%D8%AF%D9%8A%D8%AF%20%D9%85%D9%88%D8%B9%D8%AF%20%D8%A7%D8%B3%D8%AA%D8%B4%D8%A7%D8%B1%D8%A9%20%D9%84%D8%AA%D8%B5%D9%85%D9%8A%D9%85%20%D9%86%D8%B8%D8%A7%D9%85%20%D9%85%D8%AE%D8%B5%D8%B5"
              target="_blank"
              rel="noopener noreferrer"
              className="tm-btn-primary tm-btn-lg"
            >
              <span>ابدأ محادثة واتساب سريعة</span>
              <span className="tm-btn-icon">💬</span>
            </a>

            <a href="/portfolio" className="tm-btn-secondary tm-btn-lg">
              <span>استكشف سابقة أعمالنا</span>
              <span className="tm-btn-arrow">←</span>
            </a>
          </div>

          <div className="tm-cta-guarantees">
            <span className="tm-guarantee-item">✓ استشارة تحليلية أولية مجانية</span>
            <span className="tm-guarantee-item">✓ كود برمجي أصيل 100% بدون قوالب</span>
            <span className="tm-guarantee-item">✓ دعم فني وتطوير مستمر</span>
          </div>
        </div>
      </div>
    </section>
  );
}
