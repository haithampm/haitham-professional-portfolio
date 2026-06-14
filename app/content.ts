export type Language = "en" | "ar";

export type LocalizedText = {
  en: string;
  ar: string;
};

export type LogoItem = {
  name: string;
  subtitle: LocalizedText;
  source: string;
  logo?: string;
  mark?: string;
  dark?: boolean;
};

export type GalleryImage = {
  id: string;
  titleEn: string;
  titleAr: string;
  altEn: string;
  altAr: string;
  src: string;
};

export const displayName = "Haitham Elmohamady";
export const displayNameAr = "هيثم المحمدي";

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
      en: "Solutions Delivery Manager | SAP Program Manager",
      ar: "مدير تسليم الحلول | مدير برامج SAP",
    },
    title: {
      en: "Digital transformation leader for ERP, Smart City, and municipal service delivery.",
      ar: "قائد تحول رقمي في أنظمة ERP والمدن الذكية وخدمات البلديات.",
    },
    summary: {
      en: "Results-driven program leader with 15+ years delivering complex ERP and digital transformation programs across Saudi Arabia, UAE, and Egypt, specializing in SAP S/4HANA, Oracle ERP, Odoo, and Vision 2030-aligned Smart City solutions.",
      ar: "قائد برامج يركز على النتائج بخبرة تتجاوز 15 عاماً في تنفيذ برامج ERP والتحول الرقمي في السعودية والإمارات ومصر، مع تخصص في SAP S/4HANA وOracle ERP وOdoo وحلول المدن الذكية المتوافقة مع رؤية 2030.",
    },
    profileSummary: {
      en: "Solutions Delivery Manager, SAP Program Manager, and digital transformation leader.",
      ar: "مدير تسليم حلول ومدير برامج SAP وقائد تحول رقمي.",
    },
    email: { en: "Email Haitham", ar: "راسل هيثم" },
    cv: { en: "Download CV", ar: "تحميل السيرة" },
  },
  achievements: [
    {
      metric: "15+",
      label: {
        en: "years leading ERP and digital transformation programs",
        ar: "عاماً في قيادة برامج ERP والتحول الرقمي",
      },
    },
    {
      metric: "40+",
      label: {
        en: "projects delivered across KSA, UAE, and Egypt",
        ar: "مشروعاً تم تسليمها في السعودية والإمارات ومصر",
      },
    },
    {
      metric: "940",
      label: {
        en: "Citizen Care Center solution delivered for municipal service quality",
        ar: "حل مركز البلاغات 940 لتحسين جودة الخدمات البلدية",
      },
    },
    {
      metric: "3",
      label: {
        en: "core markets: government, oil and gas, and enterprise operations",
        ar: "أسواق رئيسية: الحكومة، النفط والغاز، وعمليات الشركات",
      },
    },
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
        title: { en: "Smart City and municipal platforms", ar: "منصات المدن الذكية والبلديات" },
        context: {
          en: "Led delivery across Eastern Province, Madinah, and Hail municipalities.",
          ar: "قيادة التسليم في أمانات المنطقة الشرقية والمدينة المنورة وحائل.",
        },
        details: {
          en: "Smart lighting, smart irrigation, cleaning operations, visual distortion, and Citizen Care Center 940 programs aligned with Saudi Vision 2030.",
          ar: "برامج الإنارة الذكية والري الذكي وعمليات النظافة والتشوه البصري ومركز البلاغات 940 بما يتوافق مع رؤية السعودية 2030.",
        },
      },
      {
        title: { en: "Enterprise ERP transformations", ar: "تحولات ERP للمؤسسات" },
        context: {
          en: "Managed SAP, Oracle, Odoo, and custom ERP implementations for major organizations.",
          ar: "إدارة تطبيقات SAP وOracle وOdoo وحلول ERP مخصصة لجهات كبرى.",
        },
        details: {
          en: "Programs included ENPPI, Toyota, Egyptian International Motors, TEPCO, and Abu Dawood Group, with focus on process integration and operational efficiency.",
          ar: "شملت البرامج ENPPI وToyota وEgyptian International Motors وTEPCO وAbu Dawood Group مع تركيز على تكامل العمليات ورفع الكفاءة التشغيلية.",
        },
      },
      {
        title: { en: "Delivery governance and adoption", ar: "حوكمة التسليم والتبني" },
        context: {
          en: "Directed cross-functional functional, technical, R&D, and government stakeholder teams.",
          ar: "إدارة فرق وظيفية وتقنية وبحث وتطوير وأصحاب مصلحة حكوميين.",
        },
        details: {
          en: "Built delivery cadence around scope, schedule, risk control, KPIs, change management, training, and post-go-live sustainability.",
          ar: "بناء إيقاع تسليم حول النطاق والجدول والمخاطر ومؤشرات الأداء وإدارة التغيير والتدريب والاستدامة بعد التشغيل.",
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
    roles: [
      {
        role: { en: "Head of Solutions Implementation & Delivery", ar: "رئيس تنفيذ وتسليم الحلول" },
        company: "Leader Investment Group (LIG), KSA",
        period: { en: "Jan 2024 - Present", ar: "يناير 2024 - حتى الآن" },
        points: [
          {
            en: "Lead municipal digital transformation programs from solution design through go-live and operational excellence.",
            ar: "قيادة برامج التحول الرقمي البلدي من تصميم الحلول حتى التشغيل والتميز التشغيلي.",
          },
          {
            en: "Deploy smart municipal platforms that improve field operations, contractor performance, and citizen experience.",
            ar: "تطبيق منصات بلدية ذكية تحسن العمليات الميدانية وأداء المقاولين وتجربة المستفيد.",
          },
          {
            en: "Align R&D, technical delivery, and government stakeholders around scalable, data-driven services.",
            ar: "مواءمة البحث والتطوير والتسليم التقني والجهات الحكومية حول خدمات قابلة للتوسع ومدفوعة بالبيانات.",
          },
        ],
      },
      {
        role: { en: "Senior Program & Delivery Manager", ar: "مدير أول للبرامج والتسليم" },
        company: "Leader Investment Group (LIG), KSA",
        period: { en: "May 2023 - Dec 2023", ar: "مايو 2023 - ديسمبر 2023" },
        points: [
          {
            en: "Directed ERP and municipal service delivery across government entities.",
            ar: "إدارة تسليم ERP والخدمات البلدية عبر جهات حكومية.",
          },
          {
            en: "Led cross-functional teams to deliver ERP and e-government initiatives on time and within budget.",
            ar: "قيادة فرق متعددة التخصصات لتسليم مبادرات ERP والحكومة الإلكترونية في الوقت والميزانية المحددين.",
          },
          {
            en: "Connected solution outcomes to Saudi Vision 2030 and national digital transformation objectives.",
            ar: "ربط مخرجات الحلول برؤية السعودية 2030 وأهداف التحول الرقمي الوطني.",
          },
        ],
      },
      {
        role: { en: "Senior Project Manager", ar: "مدير مشاريع أول" },
        company: "Eastern Province Municipality, Dammam, KSA",
        period: { en: "May 2023 - Dec 2023", ar: "مايو 2023 - ديسمبر 2023" },
        points: [
          {
            en: "Managed end-to-end ERP and municipal digital transformation projects.",
            ar: "إدارة مشاريع ERP والتحول الرقمي البلدي من البداية للنهاية.",
          },
          {
            en: "Implemented agile delivery practices and digital governance tools for transparency and timely delivery.",
            ar: "تطبيق ممارسات تسليم مرنة وأدوات حوكمة رقمية لتعزيز الشفافية والتسليم في الوقت المناسب.",
          },
          {
            en: "Coordinated technical solutions with strategic municipal objectives.",
            ar: "مواءمة الحلول التقنية مع الأهداف الاستراتيجية للبلديات.",
          },
        ],
      },
      {
        role: { en: "SAP Program Manager", ar: "مدير برامج SAP" },
        company: "Edraky - SAP Platinum Partner",
        period: { en: "Jun 2021 - May 2023", ar: "يونيو 2021 - مايو 2023" },
        points: [
          {
            en: "Led SAP S/4HANA delivery programs across diverse sectors.",
            ar: "قيادة برامج تسليم SAP S/4HANA عبر قطاعات متعددة.",
          },
          {
            en: "Managed multiple simultaneous implementations with full accountability for scope, schedule, and stakeholders.",
            ar: "إدارة عدة تطبيقات متزامنة بمسؤولية كاملة عن النطاق والجدول وأصحاب المصلحة.",
          },
          {
            en: "Drove change management, training, and user adoption for sustainable post-go-live operations.",
            ar: "قيادة إدارة التغيير والتدريب وتبني المستخدمين لضمان الاستدامة بعد الإطلاق.",
          },
        ],
      },
      {
        role: {
          en: "Earlier ERP, IT, infrastructure, and telecom roles",
          ar: "أدوار سابقة في ERP وتقنية المعلومات والبنية التحتية والاتصالات",
        },
        company: "ACME Group, Al Kharafi Group, Practiq Consulting, TechOrg, MATA Group, ECCO, AAST, NTG Clarity Egypt",
        period: { en: "2010 - 2017", ar: "2010 - 2017" },
        points: [
          {
            en: "Delivered SAP, Oracle, Odoo, and custom ERP implementations across trading, contracting, and industrial sectors.",
            ar: "تنفيذ تطبيقات SAP وOracle وOdoo وحلول ERP مخصصة في قطاعات التجارة والمقاولات والصناعة.",
          },
          {
            en: "Led infrastructure modernization, network administration, enterprise support, and telecom operations analysis.",
            ar: "قيادة تحديث البنية التحتية وإدارة الشبكات ودعم المؤسسات وتحليل عمليات الاتصالات.",
          },
          {
            en: "Built a technical foundation that now strengthens executive delivery leadership.",
            ar: "بناء أساس تقني قوي يعزز اليوم قيادة التسليم التنفيذي.",
          },
        ],
      },
    ],
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
        en: "Budgeting, cost control, resource allocation, and risk management",
        ar: "إدارة الميزانيات والتكاليف وتوزيع الموارد وإدارة المخاطر",
      },
      {
        en: "EPM planning and consolidation with Oracle and Jedox",
        ar: "التخطيط والتجميع المالي EPM باستخدام Oracle وJedox",
      },
      {
        en: "Cloud and infrastructure across AWS, Google, and DigitalOcean",
        ar: "السحابة والبنية التحتية عبر AWS وGoogle وDigitalOcean",
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
      en: "Available for ERP, SAP, Smart City, and digital transformation leadership conversations.",
      ar: "متاح لمناقشة قيادة برامج ERP وSAP والمدن الذكية والتحول الرقمي.",
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
    altEn: "Haitham Elmohamady professional portrait",
    altAr: "الصورة المهنية لهيثم المحمدي",
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
