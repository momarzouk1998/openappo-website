// Copy for /how-it-works (Arabic) and /en/how-it-works (English).
//
// One object per language, same shape, so the page, its JSON-LD and the client
// component all read from one place and the two languages cannot drift apart.
// Arabic is written in clear Modern Standard Arabic (the site's register);
// English is written natively rather than translated word for word.
//
// Answers in FAQ are deliberately answer-first: the direct answer in the first
// sentence, then one line of context. That is the shape search engines lift
// into featured answers and AI assistants quote.

export const LOGOS = ["mazaya", "rtx", "binqasim", "elhoot", "elnesr", "almotawakel", "elnazlawy", "kishk", "maspero", "roknalanaka", "sash", "opengym"];

export const PHONE_DISPLAY = { ar: "01558282760", en: "+20 155 828 2760" };

const AR = {
  dir: "rtl",
  meta: {
    title: "كيف نعمل — من أول مكالمة حتى تشغيل نظامك | Openappo",
    description:
      "نبني نظام إدارة أعمال سحابيًا على مقاس شركتك في 6 خطوات: نستمع، نحلّل، نصمّم، نبني على مراحل، ننقل بياناتك، ثم نشغّل وندرّب. التسليم من أسبوعين إلى شهر.",
    ogTitle: "كيف نعمل — رحلة بناء نظامك في 6 خطوات",
    ogDescription: "من أول مكالمة حتى يعمل نظامك: ست خطوات واضحة، والتسليم من أسبوعين إلى شهر.",
  },
  schemaName: "كيف تبني Openappo نظام إدارة أعمال لشركتك",
  waText: "مرحبًا Openappo، أودّ معرفة المزيد عن نظام لعملي",
  ui: {
    chip: "كيف نعمل",
    h1a: "من أول مكالمة..",
    h1b: "حتى تعمل شركتك على نظامها",
    heroP: "لا نبيعك برنامجًا جاهزًا؛ نبني نظامك أنت، على مقاس عملك، وترى كل خطوة بعينك.",
    facts: ["من أسبوعين إلى شهر", "سحابي على الحاسوب والهاتف", "معك بعد التسليم"],
    ctaMain: "حدّثنا عن عملك",
    ctaGhost: "تعرّف على الخطوات",
    timelineA: "رحلة نظامك في",
    timelineEm: "6 خطوات",
    step: "الخطوة",
    you: "أنت تفعل",
    get: "تحصل على",
    shotsAria: "شاشات حقيقية من نظام أحد عملائنا",
    shotDesktopAlt: "الشاشة الرئيسية لنظام سحابي على الحاسوب",
    shotMobileAlt: "النظام نفسه على الهاتف",
    baA: "من",
    baChaos: "الفوضى",
    baB: "إلى",
    baOne: "نظام واحد",
    baSub: "اسحب الخط لترى الفرق بنفسك 👇",
    baAria: "قارن بين قبل وبعد",
    baAfterAlt: "لوحة تحكم واحدة تجمع المبيعات والمخزون والتحصيل",
    sheetName: "حسابات_نهائي_٣ (٢).xlsx",
    note: "الحاج محمود: ٤٢٠٠ — لم تُحصَّل؟ 🤔",
    wa1: "هل حُصّلت هذه الفاتورة أم لا؟",
    wa2: "من أخرج البضاعة أمس؟",
    wa3: "المخزن يقول إن الرصيد يخالف ملف الإكسل 😩",
    before: "قبل",
    after: "بعد",
    logosA: "شركات",
    logosEm: "تعمل على أنظمتها معنا",
    proofA: "أنظمة",
    proofEm: "تعمل فعلًا",
    proofB: "لدى عملائنا",
    proofSub: "شاشات حقيقية من أنظمة بنيناها — اضغط على أي نظام لتراه من الداخل 👇",
    faqA: "أسئلة",
    faqEm: "قد تخطر ببالك",
    finalA: "دعنا",
    finalEm: "نستمع إليك",
    finalP: "حدّثنا عن عملك في رسالة واحدة، ونعود إليك بتصوّر واضح لنظامك.",
    finalBtn: "راسلنا عبر واتساب",
  },
  steps: [
    {
      icon: "PhoneCall", emoji: "📞",
      title: "نستمع إليك",
      lead: "مكالمة أو زيارة نفهم خلالها طبيعة عملك بدقة.",
      you: "تصف لنا كيف يسير عملك اليوم وما الذي يعطّله.",
      get: "تصوّر واضح لاحتياجاتك الفعلية، والجلسة مجانية.",
    },
    {
      icon: "ScanSearch", emoji: "🔍",
      title: "نحلّل عملك",
      lead: "نرسم دورة العمل كاملةً: من الفاتورة إلى المخزن إلى التحصيل.",
      you: "تراجع الخطوات معنا وتحدّد من يطّلع على ماذا.",
      get: "خريطة عمل وصلاحيات متفق عليها قبل كتابة أي كود.",
    },
    {
      icon: "PenTool", emoji: "🎨",
      title: "ترى التصميم الأول",
      lead: "نصمّم شاشات نظامك قبل كتابة أي سطر برمجي.",
      you: "تجرّب التصميم، ثم توافق عليه أو تطلب تعديلًا.",
      get: "تصميم نظامك أمام عينيك، لا وصفًا على الورق.",
      shot: true,
    },
    {
      icon: "Cog", emoji: "⚙️",
      title: "نبني على مراحل",
      lead: "عند اكتمال كل مرحلة تراها تعمل بنفسك.",
      you: "تجرّب كل جزء وتبدي رأيك أولًا بأول.",
      get: "لا مفاجآت في النهاية؛ ما تراه هو ما يُسلَّم.",
    },
    {
      icon: "DatabaseZap", emoji: "📦",
      title: "ننقل بياناتك",
      lead: "من ملفات إكسل والدفاتر إلى النظام دون أن يضيع شيء.",
      you: "ترسل لنا ملفاتك كما هي.",
      get: "أصنافك وعملاؤك وأرصدتك جاهزة من اليوم الأول.",
    },
    {
      icon: "Rocket", emoji: "🚀",
      title: "نشغّل وندرّب ونرافقك",
      lead: "يعمل نظامك سحابيًا على الحاسوب والهاتف.",
      you: "يتدرّب فريقك عليه خطوة بخطوة.",
      get: "دعم مستمر وتطوير بعد التسليم مع نموّ عملك.",
    },
  ],
  stats: [
    { from: 2, to: 4, label: "أسابيع للتسليم", sub: "من أسبوعين إلى شهر بحسب حجم عملك", icon: "CalendarCheck" },
    { to: 100, suffix: "%", label: "سحابي", sub: "حاسوب وهاتف، من أي مكان", icon: "CloudCheck" },
    { to: 1, label: "نظام واحد لكل عملك", sub: "مبيعات ومخازن وحسابات وموظفون", icon: "LayoutDashboard" },
    { to: 24, suffix: "/7", label: "بياناتك مؤمَّنة", sub: "صلاحيات لكل موظف ونسخ احتياطي", icon: "ShieldCheck" },
  ],
  faq: [
    {
      q: "ما الذي تبنونه بالضبط؟",
      a: "نبني أنظمة سحابية مخصّصة لإدارة الأعمال (ERP)، تجمع المبيعات والمخازن والحسابات والموظفين في نظام واحد مصمَّم على طبيعة عمل شركتك، لا برنامجًا جاهزًا تتكيّف معه.",
    },
    {
      q: "هل لديكم خبرة في مجال عملي؟",
      a: "نفّذنا أنظمة في التجارة والتوزيع، وتصنيع الأثاث والستائر، والاستيراد، وخدمات الدفع الرقمي ونقاط البيع، وتجارة التجزئة، والجمعيات الخيرية، والصالات الرياضية. وكل نظام يُبنى على تفاصيل العميل لا على قالب واحد.",
    },
    {
      q: "كم يستغرق تشغيل النظام؟",
      a: "من أسبوعين إلى شهر بحسب حجم عملك وعدد الأقسام. وتشاهد أجزاءً تعمل منذ الأسابيع الأولى دون انتظار النهاية.",
    },
    {
      q: "هل يمكن التعديل أو الإضافة بعد التسليم؟",
      a: "نعم. عملك ينمو وكذلك النظام؛ نضيف ونعدّل بعد التسليم، والتطوير جزء من عملنا معك.",
    },
    {
      q: "هل بياناتي في أمان؟",
      a: "نعم. يرى كل موظف ما يُسمح له به فقط، وتُحفظ البيانات على خوادم سحابية مع نسخ احتياطي منتظم.",
    },
    {
      q: "هل يعمل النظام على الهاتف؟",
      a: "نعم. النظام سحابي ويعمل على الحاسوب والهاتف، فتتابع عملك وأنت مسافر أو في المخزن أو في اجتماع.",
    },
    {
      q: "لدي أكثر من فرع أو مخزن، هل يناسبني؟",
      a: "نعم. تُدار جميع الفروع والمخازن في نظام واحد، وتطّلع على أرقام كل فرع منفردًا أو على الجميع معًا.",
    },
    {
      q: "موظفوني غير معتادين على الأنظمة، فماذا أفعل؟",
      a: "نصمّم الشاشات بما يناسب عملهم تمامًا، ونُدرّبهم خطوة بخطوة حتى يعتادوا عليها.",
    },
    {
      q: "لدي بيانات قديمة في إكسل ودفاتر، ماذا أفعل بها؟",
      a: "ننقلها نحن إلى النظام: الأصناف والعملاء والموردون والأرصدة، فتبدأ من اليوم الأول ببياناتك.",
    },
  ],
};

const EN = {
  dir: "ltr",
  meta: {
    title: "How We Work: From First Call to Your Live System | Openappo",
    description:
      "We build a custom cloud business system around your company in 6 steps: listen, analyse, design, build in stages, migrate your data, then launch and train. Delivery takes two weeks to a month.",
    ogTitle: "How We Work: Your System in 6 Clear Steps",
    ogDescription: "From the first call to a live system: six clear steps, delivered in two weeks to a month.",
  },
  schemaName: "How Openappo builds a business management system for your company",
  waText: "Hello Openappo, I'd like to know more about a system for my business",
  ui: {
    chip: "How we work",
    h1a: "From the first call..",
    h1b: "to your company running on its own system",
    heroP: "We don't sell off-the-shelf software. We build your system around how you actually work, and you see it take shape at every step.",
    facts: ["Two weeks to a month", "Cloud, on computer and phone", "With you after delivery"],
    ctaMain: "Tell us about your business",
    ctaGhost: "See the steps",
    timelineA: "Your system's journey in",
    timelineEm: "6 steps",
    step: "Step",
    you: "You",
    get: "You get",
    shotsAria: "Real screens from one of our clients' systems",
    shotDesktopAlt: "The home screen of a cloud system on a computer",
    shotMobileAlt: "The same system on a phone",
    baA: "From",
    baChaos: "chaos",
    baB: "to",
    baOne: "one system",
    baSub: "Drag the line to see the difference 👇",
    baAria: "Compare before and after",
    baAfterAlt: "One dashboard bringing sales, stock and collections together",
    sheetName: "accounts_final_3 (2).xlsx",
    note: "Mr. Mahmoud: 4,200. Not collected? 🤔",
    wa1: "Was this invoice collected or not?",
    wa2: "Who released the stock yesterday?",
    wa3: "The warehouse says the balance doesn't match the Excel file 😩",
    before: "Before",
    after: "After",
    logosA: "Companies",
    logosEm: "running on systems we built",
    proofA: "Systems",
    proofEm: "running for real",
    proofB: "at our clients",
    proofSub: "Real screens from systems we built. Click any system to see it from the inside 👇",
    faqA: "Questions",
    faqEm: "you may be asking",
    finalA: "Let's",
    finalEm: "hear from you",
    finalP: "Tell us about your business in one message, and we'll come back with a clear picture of your system.",
    finalBtn: "Message us on WhatsApp",
  },
  steps: [
    {
      icon: "PhoneCall", emoji: "📞",
      title: "We listen",
      lead: "A call or a visit to understand how your business really runs.",
      you: "You tell us how you work today and what slows you down.",
      get: "A clear picture of what you actually need. The session is free.",
    },
    {
      icon: "ScanSearch", emoji: "🔍",
      title: "We analyse your workflow",
      lead: "We map the whole cycle: from invoice to warehouse to collection.",
      you: "You review the steps with us and decide who sees what.",
      get: "A workflow and permissions map agreed before any code is written.",
    },
    {
      icon: "PenTool", emoji: "🎨",
      title: "You see the first design",
      lead: "We design your system's screens before writing a single line of code.",
      you: "You try the design, then approve it or ask for changes.",
      get: "Your system in front of you, not a description on paper.",
      shot: true,
    },
    {
      icon: "Cog", emoji: "⚙️",
      title: "We build in stages",
      lead: "As each stage is completed, you see it running for yourself.",
      you: "You try each part and give feedback as we go.",
      get: "No surprises at the end: what you see is what gets delivered.",
    },
    {
      icon: "DatabaseZap", emoji: "📦",
      title: "We migrate your data",
      lead: "From Excel sheets and paper ledgers into the system, with nothing lost.",
      you: "You send us your files as they are.",
      get: "Your products, customers and balances ready from day one.",
    },
    {
      icon: "Rocket", emoji: "🚀",
      title: "We launch, train and stay with you",
      lead: "Your system runs in the cloud, on computer and phone.",
      you: "Your team is trained step by step.",
      get: "Ongoing support and development after delivery as your business grows.",
    },
  ],
  stats: [
    { from: 2, to: 4, label: "weeks to deliver", sub: "Two weeks to a month, depending on the size of your business", icon: "CalendarCheck" },
    { to: 100, suffix: "%", label: "cloud", sub: "Computer and phone, from anywhere", icon: "CloudCheck" },
    { to: 1, label: "system for your whole business", sub: "Sales, inventory, accounts and staff", icon: "LayoutDashboard" },
    { to: 24, suffix: "/7", label: "your data, protected", sub: "Per-employee permissions and backups", icon: "ShieldCheck" },
  ],
  faq: [
    {
      q: "What exactly do you build?",
      a: "We build custom cloud business-management (ERP) systems that bring sales, inventory, accounting and staff into one system designed around how your company works, rather than off-the-shelf software you have to adapt to.",
    },
    {
      q: "Do you have experience in my industry?",
      a: "We have delivered systems in trading and distribution, furniture and curtain manufacturing, import, digital payment services and point of sale, retail, charities, and gyms. Each system is built around the client's own details, not a single template.",
    },
    {
      q: "How long does it take to go live?",
      a: "Two weeks to a month, depending on the size of your business and the number of departments. You see working parts from the first weeks, rather than waiting until the end.",
    },
    {
      q: "Can I change or add things after delivery?",
      a: "Yes. Your business grows and the system grows with it. We add and adjust after delivery, and ongoing development is part of how we work with you.",
    },
    {
      q: "Is my data safe?",
      a: "Yes. Each employee sees only what they are allowed to see, and your data is stored on cloud servers with regular backups.",
    },
    {
      q: "Does it work on a phone?",
      a: "Yes. The system runs in the cloud on both computer and phone, so you can follow your business while travelling, in the warehouse or in a meeting.",
    },
    {
      q: "I have more than one branch or warehouse. Will it work for me?",
      a: "Yes. All branches and warehouses run in one system, and you can view each branch on its own or all of them together.",
    },
    {
      q: "My staff aren't used to business systems. What then?",
      a: "We design the screens around exactly how they work, and train them step by step until it feels natural.",
    },
    {
      q: "I have old data in Excel files and paper ledgers. What happens to it?",
      a: "We migrate it for you: products, customers, suppliers and balances, so you start on day one with your own data.",
    },
  ],
};

export const CONTENT = { ar: AR, en: EN };

export function waLink(lang) {
  return "https://wa.me/201558282760?text=" + encodeURIComponent(CONTENT[lang].waText);
}
