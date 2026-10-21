export type Language = "en" | "ar";

export type LocalizedText = {
  en: string;
  ar: string;
};

export type LogoCategory = "companies" | "partners" | "certifications";

export type LogoItem = {
  id?: string;
  category?: LogoCategory;
  name: string;
  subtitle: LocalizedText;
  source: string;
  logo?: string;
  mark?: string;
  dark?: boolean;
  sortOrder?: number;
};

export type GalleryImage = {
  id: string;
  titleEn: string;
  titleAr: string;
  altEn: string;
  altAr: string;
  src: string;
};

// Full legal name is the primary name (matches CV and job applications);
// "Haitham Elmohamady" is the name he is widely known by.
export const displayName = "Haitham Abd El-Azeem Khalifa";
export const displayNameAr = "هيثم عبد العظيم خليفة";
export const knownAs = "Haitham Elmohamady";
export const knownAsAr = "هيثم المحمدي";

export const copy = {
  nav: {
    portfolio: { en: "Portfolio", ar: "الأعمال" },
    experience: { en: "Experience", ar: "الخبرة" },
    capabilities: { en: "Capabilities", ar: "القدرات" },
    credentials: { en: "Credentials", ar: "الشهادات" },
    gallery: { en: "Gallery", ar: "الصور" },
    contact: { en: "Contact", ar: "تواصل" },
    admin: { en: "Admin", ar: "الإدارة" },
  },
  hero: {
    label: {
      en: "Head of Solutions Implementation & Delivery | SAP & Digital Transformation",
      ar: "رئيس تنفيذ وتسليم الحلول | SAP والتحول الرقمي",
    },
    title: {
      en: "Delivering Smart City, AI and ERP solutions that government and enterprise teams actually use.",
      ar: "تسليم حلول المدن الذكية والذكاء الاصطناعي وERP التي تستخدمها الجهات الحكومية والمؤسسات فعلاً.",
    },
    summary: {
      en: "Solutions and program delivery leader with 16+ years in Saudi Arabia, the UAE and Egypt. Heads solutions delivery at Leader Investment Group: about 18 concurrent government projects for the Ministry of Defense, Nazaha and five municipalities, including AI-based Visual Distortion detection, IoT Smart Lighting and the 940 citizen reports solution. Previously led end-to-end SAP S/4HANA implementations at an SAP Platinum Partner.",
      ar: "قائد تسليم حلول وبرامج بخبرة تتجاوز 16 عاماً في السعودية والإمارات ومصر. يرأس تنفيذ وتسليم الحلول في مجموعة ليدر للاستثمار: نحو 18 مشروعاً حكومياً متزامناً لوزارة الدفاع ونزاهة وخمس أمانات، منها رصد التشوه البصري بالذكاء الاصطناعي والإنارة الذكية بإنترنت الأشياء وحل بلاغات 940. وقبل ذلك قاد تطبيقات SAP S/4HANA متكاملة لدى شريك SAP بلاتيني.",
    },
    profileSummary: {
      en: "Head of Solutions Implementation & Delivery, Smart City and SAP delivery leader.",
      ar: "رئيس تنفيذ وتسليم الحلول، وقائد تسليم حلول المدن الذكية وSAP.",
    },
    email: { en: "Email Haitham", ar: "راسل هيثم" },
    cv: { en: "Download CV", ar: "تحميل السيرة" },
  },
  achievements: [
    { metric: "16+", label: { en: "years leading ERP and digital transformation delivery", ar: "عاماً في قيادة تسليم ERP والتحول الرقمي" } },
    { metric: "18", label: { en: "concurrent government projects on average, contract values around SAR 25M", ar: "مشروعاً حكومياً متزامناً في المتوسط، بمتوسط قيمة عقد نحو 25 مليون ريال" } },
    { metric: "~25", label: { en: "implementers and consultants in the Solutions team", ar: "منفذاً واستشارياً في فريق الحلول" } },
    { metric: "3rd", label: { en: "contract phase for IoT cleaning-contractor monitoring: clients keep renewing", ar: "مرحلة تعاقدية لحلول رقابة النظافة بإنترنت الأشياء: العملاء يجددون" } },
  ],
  portfolio: {
    eyebrow: { en: "Professional portfolio", ar: "الملف المهني" },
    title: {
      en: "Programs built around measurable public-service and enterprise outcomes.",
      ar: "برامج مصممة حول نتائج قابلة للقياس في الخدمات العامة وبيئات الشركات.",
    },
    intro: {
      en: "Haitham combines executive delivery discipline with technical ERP depth, giving leadership teams a single owner for governance, stakeholder alignment, delivery execution, and sustainable adoption.",
      ar: "يجمع هيثم بين انضباط التسليم التنفيذي والعمق التقني في ERP، ليمنح فرق القيادة مالكاً واضحاً للحوكمة ومواءمة أصحاب المصلحة والتنفيذ والاستدامة بعد الإطلاق.",
    },
    highlights: [
      {
        title: { en: "AI and IoT for municipal services", ar: "الذكاء الاصطناعي وإنترنت الأشياء للخدمات البلدية" },
        context: { en: "Eastern Province, Hail and Hafr Al-Batin municipalities.", ar: "أمانات المنطقة الشرقية وحائل وحفر الباطن." },
        details: {
          en: "AI-based Visual Distortion detection (computer vision and machine learning) that flags issues for proactive treatment; IoT Smart Lighting with remote street-lighting control and lower energy use; cleaning-contractor field monitoring and fleet tracking, now in its third contract phase; live KPIs on Smart City command-and-control screens.",
          ar: "رصد التشوه البصري بالذكاء الاصطناعي (الرؤية الحاسوبية وتعلم الآلة) للمعالجة الاستباقية؛ والإنارة الذكية بإنترنت الأشياء للتحكم عن بُعد وترشيد الاستهلاك؛ والرقابة الميدانية وتتبع أسطول مقاولي النظافة في مرحلتها التعاقدية الثالثة؛ ومؤشرات لحظية على شاشات مراكز القيادة والتحكم.",
        },
      },
      {
        title: { en: "Citizen services and government platforms", ar: "خدمات المواطنين والمنصات الحكومية" },
        context: { en: "Ministry of Defense, Nazaha and the Eastern Province and Madinah municipalities.", ar: "وزارة الدفاع ونزاهة وأمانتا المنطقة الشرقية والمدينة المنورة." },
        details: {
          en: "The 940 citizen reports solution (incident management system, call center, mobile app and chatbot) integrated with the Ministry of Municipalities and Housing; Nazaha 980; Ministry of Defense property management; Investment Agency platform improvements; and the Eastern Province e-portal and e-services.",
          ar: "حل بلاغات 940 (نظام البلاغات ومركز الاتصال وتطبيق الجوال وروبوت المحادثة) المرتبط بوزارة البلديات والإسكان؛ و980 لنزاهة؛ وإدارة الأملاك لوزارة الدفاع؛ وتطوير منصة وكالة الاستثمار؛ والبوابة الإلكترونية لأمانة الشرقية وخدماتها.",
        },
      },
      {
        title: { en: "SAP and enterprise ERP", ar: "SAP وأنظمة ERP للمؤسسات" },
        context: { en: "Led 4 project managers and about 30 consultants at an SAP Platinum Partner.", ar: "قيادة 4 مديري مشاريع ونحو 30 استشارياً لدى شريك SAP بلاتيني." },
        details: {
          en: "SAP S/4HANA for Toyota Egypt, ENPPI and Baheya; SAP Plant Maintenance for Nissan, Agiba and Abu Qir Petroleum; data migration, UAT and cutover under SAP Activate; Oracle EPM, NetSuite and Jedox in the UAE.",
          ar: "SAP S/4HANA لتويوتا مصر وإنبي وبهية؛ ووحدة الصيانة SAP PM لنيسان وعجيبة وأبو قير للبترول؛ ونقل البيانات واختبارات القبول والانتقال للتشغيل وفق SAP Activate؛ وOracle EPM وNetSuite وJedox في الإمارات.",
        },
      },
    ],
  },
  experience: {
    eyebrow: { en: "Experience", ar: "الخبرة" },
    title: {
      en: "Delivery leadership across government and enterprise transformation.",
      ar: "قيادة التسليم في التحول الحكومي وتحول المؤسسات.",
    },
    // Roles come from app/career-data.json, published by the job portal (see app/career.ts).
  },
  companies: {
    eyebrow: { en: "Companies worked with", ar: "جهات وشركات عمل معها" },
    title: {
      en: "Delivery experience connected to government, consulting, and enterprise organizations.",
      ar: "خبرة تسليم مرتبطة بجهات حكومية واستشارية ومؤسسات كبرى.",
    },
    intro: {
      en: "A visual map of the organizations and delivery environments represented in the professional timeline, with official-domain logo assets where available.",
      ar: "خريطة بصرية للجهات وبيئات التسليم الموجودة في المسار المهني، مع استخدام شعارات من مصادر رسمية حيثما أمكن.",
    },
  },
  capabilities: {
    eyebrow: { en: "Capabilities", ar: "القدرات" },
    title: {
      en: "Senior program management with strong technical fluency.",
      ar: "إدارة برامج متقدمة مع فهم تقني عميق.",
    },
    intro: {
      en: "The profile is suited for complex transformation environments where strategy, governance, vendor coordination, business change, and technical delivery have to move together.",
      ar: "هذا الملف مناسب لبيئات التحول المعقدة التي تحتاج إلى تحريك الاستراتيجية والحوكمة وتنسيق الموردين والتغيير المؤسسي والتسليم التقني معاً.",
    },
    items: [
      {
        en: "ERP program and project management: SAP, Oracle, Odoo, and open-source ERP",
        ar: "إدارة برامج ومشاريع ERP: SAP وOracle وOdoo وحلول ERP مفتوحة المصدر",
      },
      { en: "Digital transformation and Smart City solutions", ar: "التحول الرقمي وحلول المدن الذكية" },
      {
        en: "Strategic planning, change management, and stakeholder engagement",
        ar: "التخطيط الاستراتيجي وإدارة التغيير وإشراك أصحاب المصلحة",
      },
      {
        en: "Portfolio governance, risk and change control, resource planning and KPIs",
        ar: "حوكمة المحفظة وضبط المخاطر والتغيير وتخطيط الموارد ومؤشرات الأداء",
      },
      {
        en: "AI and IoT solution delivery: computer vision, smart lighting, field monitoring",
        ar: "تسليم حلول الذكاء الاصطناعي وإنترنت الأشياء: الرؤية الحاسوبية والإنارة الذكية والرقابة الميدانية",
      },
      {
        en: "EPM planning and consolidation with Oracle and Jedox",
        ar: "التخطيط والتجميع المالي EPM باستخدام Oracle وJedox",
      },
      {
        en: "Data migration, UAT and cutover under SAP Activate",
        ar: "نقل البيانات واختبارات القبول والانتقال للتشغيل وفق SAP Activate",
      },
    ],
  },
  partners: {
    eyebrow: { en: "Project partners", ar: "شركاء ومكونات المشاريع" },
    title: {
      en: "ERP, cloud, and client platforms behind major transformation programs.",
      ar: "منصات ERP والسحابة وبيئات العملاء خلف برامج التحول الكبرى.",
    },
    intro: {
      en: "The portfolio spans SAP, Oracle, Odoo, cloud infrastructure, and enterprise client environments across public-sector and private programs.",
      ar: "يغطي الملف SAP وOracle وOdoo والبنية السحابية وبيئات عملاء المؤسسات في برامج القطاعين العام والخاص.",
    },
  },
  education: {
    eyebrow: { en: "Education", ar: "التعليم" },
    items: [
      {
        title: { en: "Master of Business Administration (MBA)", ar: "ماجستير إدارة الأعمال (MBA)" },
        detail: {
          en: "Arab Academy for Science, Technology and Maritime Transport, 2023. GPA: 3.85.",
          ar: "الأكاديمية العربية للعلوم والتكنولوجيا والنقل البحري، 2023. المعدل: 3.85.",
        },
      },
      {
        title: {
          en: "B.Sc. in Computer Science and Information Systems",
          ar: "بكالوريوس علوم الحاسب ونظم المعلومات",
        },
        detail: {
          en: "6 October University - Culture and Science City, Egypt, 2009. Grade: Very Good.",
          ar: "جامعة 6 أكتوبر - مدينة الثقافة والعلوم، مصر، 2009. التقدير: جيد جداً.",
        },
      },
    ],
  },
  certifications: {
    eyebrow: { en: "Certifications", ar: "الشهادات المهنية" },
  },
  gallery: {
    eyebrow: { en: "Portfolio gallery", ar: "معرض الصور" },
    title: {
      en: "Visual proof points for leadership, delivery, and transformation programs.",
      ar: "لقطات بصرية تدعم القيادة والتسليم وبرامج التحول.",
    },
    intro: {
      en: "Use the admin panel to add project photos, certificate scans, event images, or delivery artifacts without changing source code.",
      ar: "يمكن إضافة صور المشاريع أو الشهادات أو الفعاليات أو مخرجات التسليم من لوحة الإدارة بدون تعديل الكود.",
    },
  },
  contact: {
    eyebrow: { en: "Contact", ar: "تواصل" },
    title: {
      en: "Available for Head of Solutions, digital transformation, Smart City and SAP delivery leadership roles.",
      ar: "متاح لأدوار قيادة الحلول والتحول الرقمي والمدن الذكية وتسليم SAP.",
    },
    intro: {
      en: "Arabic native speaker with professional English, based in Saudi Arabia and experienced across KSA, UAE, and Egypt.",
      ar: "متحدث عربي أصلي مع إنجليزية مهنية، مقيم في السعودية ولديه خبرة في السعودية والإمارات ومصر.",
    },
  },
};

export const certificationLogos: LogoItem[] = [
  {
    name: "PMI",
    subtitle: {
      en: "PMP, PMI-RMP, PMI-PMOCP, GenAI for Project Managers",
      ar: "PMP وPMI-RMP وPMI-PMOCP والذكاء الاصطناعي لمديري المشاريع",
    },
    source: "https://www.pmi.org/certifications",
    mark: "PMI",
  },
  {
    name: "PMO Global Alliance",
    subtitle: { en: "PMO-CP professional credential", ar: "اعتماد PMO-CP المهني" },
    source: "https://pmoga.pmi.org/certification",
    mark: "PMO-CP",
  },
  {
    name: "The Open Group",
    subtitle: { en: "TOGAF Certified", ar: "اعتماد TOGAF" },
    source: "https://www.opengroup.org/certifications",
    logo: "/logos/the-open-group.png",
  },
  {
    name: "SAP",
    subtitle: { en: "SAP Activate Project Manager", ar: "مدير مشاريع SAP Activate" },
    source: "https://www.sap.com/",
    mark: "SAP",
  },
  {
    name: "Oracle",
    subtitle: { en: "Oracle Certified Associate", ar: "Oracle Certified Associate" },
    source: "https://www.oracle.com/",
    logo: "/logos/oracle.svg",
  },
  {
    name: "Fortinet",
    subtitle: { en: "FCNSA / FCNSP security professional", ar: "اعتمادات FCNSA / FCNSP للأمن السيبراني" },
    source: "https://www.fortinet.com/",
    logo: "/logos/fortinet.svg",
  },
  {
    name: "Microsoft",
    subtitle: {
      en: "MCSA / MCSE systems administration and engineering",
      ar: "MCSA / MCSE لإدارة وهندسة الأنظمة",
    },
    source: "https://www.microsoft.com/",
    mark: "Microsoft",
  },
];

export const companyLogos: LogoItem[] = [
  {
    name: "Leader Group",
    subtitle: { en: "Solutions implementation and delivery leadership", ar: "قيادة تنفيذ وتسليم الحلول" },
    source: "https://leadergroup.com/",
    logo: "/logos/leader-group.png",
    dark: true,
  },
  {
    name: "Eastern Province Municipality",
    subtitle: { en: "Municipal digital transformation programs", ar: "برامج التحول الرقمي البلدي" },
    source: "https://momah.gov.sa/en/branches/eastern-province-municipality",
    logo: "/logos/eastern-province-municipality.jpg",
  },
  {
    name: "Edraky",
    subtitle: { en: "SAP Platinum Partner delivery programs", ar: "برامج تسليم مع شريك SAP بلاتيني" },
    source: "https://www.edraky.com/",
    logo: "/logos/edraky.png",
  },
  {
    name: "NTG Clarity",
    subtitle: { en: "Telecom and enterprise operations foundation", ar: "خبرة في الاتصالات وعمليات المؤسسات" },
    source: "https://ntgclarity.com/",
    logo: "/logos/ntg-clarity.png",
  },
  {
    name: "Al Kharafi Group",
    subtitle: { en: "ERP and enterprise delivery experience", ar: "خبرة ERP وتسليم مؤسسي" },
    source: "https://malkharafi.com/",
    mark: "Al Kharafi",
  },
  {
    name: "AAST",
    subtitle: { en: "Applications implementation experience", ar: "خبرة تطبيق الأنظمة" },
    source: "https://aast.edu/",
    mark: "AAST",
  },
  {
    name: "PractiQ Consulting",
    subtitle: { en: "SAP project management experience", ar: "خبرة إدارة مشاريع SAP" },
    source: "https://www.practiq.net/",
    mark: "PractiQ",
  },
  {
    name: "ACME Group",
    subtitle: { en: "ERP project management experience", ar: "خبرة إدارة مشاريع ERP" },
    source: "https://acme-group.me/",
    mark: "ACME",
  },
];

export const partnerLogos: LogoItem[] = [
  {
    name: "SAP",
    subtitle: { en: "S/4HANA and Activate delivery", ar: "تسليم S/4HANA وActivate" },
    source: "https://www.sap.com/",
    mark: "SAP",
  },
  {
    name: "Oracle",
    subtitle: { en: "ERP and EPM programs", ar: "برامج ERP وEPM" },
    source: "https://www.oracle.com/",
    logo: "/logos/oracle.svg",
  },
  {
    name: "Odoo",
    subtitle: { en: "Open-source ERP implementation", ar: "تطبيق ERP مفتوح المصدر" },
    source: "https://www.odoo.com/",
    logo: "/logos/odoo.png",
  },
  {
    name: "AWS",
    subtitle: { en: "Cloud and infrastructure delivery", ar: "تسليم السحابة والبنية التحتية" },
    source: "https://aws.amazon.com/",
    logo: "/logos/aws.png",
  },
  {
    name: "Google Cloud",
    subtitle: { en: "Cloud and data platform exposure", ar: "منصات سحابية وبيانات" },
    source: "https://cloud.google.com/",
    logo: "/logos/google-cloud.svg",
  },
  {
    name: "DigitalOcean",
    subtitle: { en: "Cloud and infrastructure exposure", ar: "خبرة سحابية وبنية تحتية" },
    source: "https://www.digitalocean.com/",
    mark: "DigitalOcean",
  },
  {
    name: "Toyota",
    subtitle: { en: "Automotive ERP program environment", ar: "بيئة برامج ERP لقطاع السيارات" },
    source: "https://global.toyota/",
    mark: "Toyota",
  },
  {
    name: "ENPPI",
    subtitle: { en: "Oil and gas ERP program environment", ar: "بيئة برامج ERP للنفط والغاز" },
    source: "https://www.enppi.com/",
    mark: "ENPPI",
  },
];

export const defaultGalleryImages: GalleryImage[] = [
  {
    id: "profile",
    titleEn: "Executive profile portrait",
    titleAr: "الصورة المهنية",
    altEn: "Haitham Abd El-Azeem Khalifa professional portrait",
    altAr: "الصورة المهنية لهيثم عبد العظيم خليفة",
    src: "/haitham-elmohamady-profile.png",
  },
  {
    id: "smart-city",
    titleEn: "Smart City command environment",
    titleAr: "بيئة قيادة المدن الذكية",
    altEn: "Smart city delivery command environment",
    altAr: "بيئة تحكم وتسليم لحلول المدن الذكية",
    src: "/smart-city-delivery-hero.png",
  },
  {
    id: "portfolio-preview",
    titleEn: "Portfolio experience preview",
    titleAr: "معاينة تجربة الموقع",
    altEn: "Professional portfolio preview",
    altAr: "معاينة الملف المهني",
    src: "/screenshot.jpeg",
  },
];

export function pick(text: LocalizedText, language: Language) {
  return text[language];
}
