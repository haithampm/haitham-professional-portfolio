import {
  ArrowUpRight,
  Download,
  Mail,
  Phone,
} from "lucide-react";
import Image from "next/image";

const displayName = "Haitham Elmohamady";

type LogoItem = {
  name: string;
  subtitle: string;
  source: string;
  logo?: string;
  mark?: string;
  dark?: boolean;
};

const achievements = [
  {
    metric: "15+",
    label: "years leading ERP and digital transformation programs",
  },
  {
    metric: "40+",
    label: "projects delivered across KSA, UAE, and Egypt",
  },
  {
    metric: "940",
    label: "Citizen Care Center solution delivered for municipal service quality",
  },
  {
    metric: "3",
    label: "core markets: government, oil and gas, and enterprise operations",
  },
];

const portfolioHighlights = [
  {
    title: "Smart City and municipal platforms",
    context:
      "Led delivery across Eastern Province, Madinah, and Hail municipalities.",
    details:
      "Smart lighting, smart irrigation, cleaning operations, visual distortion, and Citizen Care Center 940 programs aligned with Saudi Vision 2030.",
  },
  {
    title: "Enterprise ERP transformations",
    context:
      "Managed SAP, Oracle, Odoo, and custom ERP implementations for major organizations.",
    details:
      "Programs included ENPPI, Toyota, Egyptian International Motors, TEPCO, and Abu Dawood Group, with focus on process integration and operational efficiency.",
  },
  {
    title: "Delivery governance and adoption",
    context:
      "Directed cross-functional functional, technical, R&D, and government stakeholder teams.",
    details:
      "Built delivery cadence around scope, schedule, risk control, KPIs, change management, training, and post-go-live sustainability.",
  },
];

const experience = [
  {
    role: "Head of Solutions Implementation & Delivery",
    company: "Leader Investment Group (LIG), KSA",
    period: "Jan 2024 - Present",
    points: [
      "Lead municipal digital transformation programs from solution design through go-live and operational excellence.",
      "Deploy smart municipal platforms that improve field operations, contractor performance, and citizen experience.",
      "Align R&D, technical delivery, and government stakeholders around scalable, data-driven services.",
    ],
  },
  {
    role: "Senior Program & Delivery Manager",
    company: "Leader Investment Group (LIG), KSA",
    period: "May 2023 - Dec 2023",
    points: [
      "Directed ERP and municipal service delivery across government entities.",
      "Led cross-functional teams to deliver ERP and e-government initiatives on time and within budget.",
      "Connected solution outcomes to Saudi Vision 2030 and national digital transformation objectives.",
    ],
  },
  {
    role: "Senior Project Manager",
    company: "Eastern Province Municipality, Dammam, KSA",
    period: "May 2023 - Dec 2023",
    points: [
      "Managed end-to-end ERP and municipal digital transformation projects.",
      "Implemented agile delivery practices and digital governance tools for transparency and timely delivery.",
      "Coordinated technical solutions with strategic municipal objectives.",
    ],
  },
  {
    role: "SAP Program Manager",
    company: "Edraky - SAP Platinum Partner",
    period: "Jun 2021 - May 2023",
    points: [
      "Led SAP S/4HANA delivery programs across diverse sectors.",
      "Managed multiple simultaneous implementations with full accountability for scope, schedule, and stakeholders.",
      "Drove change management, training, and user adoption for sustainable post-go-live operations.",
    ],
  },
  {
    role: "Earlier ERP, IT, infrastructure, and telecom roles",
    company: "ACME Group, Al Kharafi Group, Practiq Consulting, TechOrg, MATA Group, ECCO, AAST, NTG Clarity Egypt",
    period: "2010 - 2017",
    points: [
      "Delivered SAP, Oracle, Odoo, and custom ERP implementations across trading, contracting, and industrial sectors.",
      "Led infrastructure modernization, network administration, enterprise support, and telecom operations analysis.",
      "Built a technical foundation that now strengthens executive delivery leadership.",
    ],
  },
];

const capabilities = [
  "ERP program and project management: SAP, Oracle, Odoo, and open-source ERP",
  "Digital transformation and Smart City solutions",
  "Strategic planning, change management, and stakeholder engagement",
  "Budgeting, cost control, resource allocation, and risk management",
  "EPM planning and consolidation with Oracle and Jedox",
  "Cloud and infrastructure across AWS, Google, and DigitalOcean",
];

const certificationLogos: LogoItem[] = [
  {
    name: "PMI",
    subtitle: "PMP, PMI-RMP, PMI-PMOCP, GenAI for Project Managers",
    source: "https://www.pmi.org/certifications",
    mark: "PMI",
  },
  {
    name: "PMO Global Alliance",
    subtitle: "PMO-CP professional credential",
    source: "https://pmoga.pmi.org/certification",
    mark: "PMO-CP",
  },
  {
    name: "The Open Group",
    subtitle: "TOGAF Certified",
    source: "https://www.opengroup.org/certifications",
    logo: "/logos/the-open-group.png",
  },
  {
    name: "SAP",
    subtitle: "SAP Activate Project Manager",
    source: "https://www.sap.com/",
    mark: "SAP",
  },
  {
    name: "Oracle",
    subtitle: "Oracle Certified Associate",
    source: "https://www.oracle.com/",
    logo: "/logos/oracle.svg",
  },
  {
    name: "Fortinet",
    subtitle: "FCNSA / FCNSP security professional",
    source: "https://www.fortinet.com/",
    logo: "/logos/fortinet.svg",
  },
  {
    name: "Microsoft",
    subtitle: "MCSA / MCSE systems administration and engineering",
    source: "https://www.microsoft.com/",
    mark: "Microsoft",
  },
];

const companyLogos: LogoItem[] = [
  {
    name: "Leader Group",
    subtitle: "Solutions implementation and delivery leadership",
    source: "https://leadergroup.com/",
    logo: "/logos/leader-group.png",
    dark: true,
  },
  {
    name: "Eastern Province Municipality",
    subtitle: "Municipal digital transformation programs",
    source: "https://momah.gov.sa/en/branches/eastern-province-municipality",
    logo: "/logos/eastern-province-municipality.jpg",
  },
  {
    name: "Edraky",
    subtitle: "SAP Platinum Partner delivery programs",
    source: "https://www.edraky.com/",
    logo: "/logos/edraky.png",
  },
  {
    name: "NTG Clarity",
    subtitle: "Telecom and enterprise operations foundation",
    source: "https://ntgclarity.com/",
    logo: "/logos/ntg-clarity.png",
  },
  {
    name: "Al Kharafi Group",
    subtitle: "ERP and enterprise delivery experience",
    source: "https://malkharafi.com/",
    mark: "Al Kharafi",
  },
  {
    name: "AAST",
    subtitle: "Applications implementation experience",
    source: "https://aast.edu/",
    mark: "AAST",
  },
  {
    name: "PractiQ Consulting",
    subtitle: "SAP project management experience",
    source: "https://www.practiq.net/",
    mark: "PractiQ",
  },
  {
    name: "ACME Group",
    subtitle: "ERP project management experience",
    source: "https://acme-group.me/",
    mark: "ACME",
  },
];

const partnerLogos: LogoItem[] = [
  {
    name: "SAP",
    subtitle: "S/4HANA and Activate delivery",
    source: "https://www.sap.com/",
    mark: "SAP",
  },
  {
    name: "Oracle",
    subtitle: "ERP and EPM programs",
    source: "https://www.oracle.com/",
    logo: "/logos/oracle.svg",
  },
  {
    name: "Odoo",
    subtitle: "Open-source ERP implementation",
    source: "https://www.odoo.com/",
    logo: "/logos/odoo.png",
  },
  {
    name: "AWS",
    subtitle: "Cloud and infrastructure delivery",
    source: "https://aws.amazon.com/",
    logo: "/logos/aws.png",
  },
  {
    name: "Google Cloud",
    subtitle: "Cloud and data platform exposure",
    source: "https://cloud.google.com/",
    logo: "/logos/google-cloud.svg",
  },
  {
    name: "DigitalOcean",
    subtitle: "Cloud and infrastructure exposure",
    source: "https://www.digitalocean.com/",
    mark: "DigitalOcean",
  },
  {
    name: "Toyota",
    subtitle: "Automotive ERP program environment",
    source: "https://global.toyota/",
    mark: "Toyota",
  },
  {
    name: "ENPPI",
    subtitle: "Oil and gas ERP program environment",
    source: "https://www.enppi.com/",
    mark: "ENPPI",
  },
];

function LogoCard({ item }: { item: LogoItem }) {
  return (
    <a
      href={item.source}
      target="_blank"
      rel="noreferrer"
      className="logo-card motion-rise group"
    >
      <span className={`logo-stage ${item.dark ? "logo-stage-dark" : ""}`}>
        {item.logo ? (
          <Image
            src={item.logo}
            alt={`${item.name} logo`}
            width={170}
            height={76}
            className="max-h-12 w-auto object-contain transition duration-300 group-hover:scale-105"
          />
        ) : (
          <span className="brand-word">{item.mark ?? item.name}</span>
        )}
      </span>
      <span className="mt-4 text-sm font-semibold text-[#161817]">
        {item.name}
      </span>
      <span className="mt-1 text-xs leading-5 text-[#5c6862]">
        {item.subtitle}
      </span>
    </a>
  );
}

export default function Home() {
  return (
    <main className="bg-[#f7f8f5] text-[#161817]">
      <section className="relative isolate min-h-[84svh] overflow-hidden">
        <Image
          src="/smart-city-delivery-hero.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-20 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(10,16,15,0.88)_0%,rgba(10,16,15,0.72)_39%,rgba(10,16,15,0.24)_73%,rgba(10,16,15,0.18)_100%)]" />

        <header className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 text-white sm:px-8">
          <a href="#top" className="text-sm font-semibold tracking-wide">
            {displayName}
          </a>
          <nav className="hidden items-center gap-6 text-sm text-white/78 md:flex">
            <a className="transition hover:text-white" href="#portfolio">
              Portfolio
            </a>
            <a className="transition hover:text-white" href="#experience">
              Experience
            </a>
            <a className="transition hover:text-white" href="#capabilities">
              Capabilities
            </a>
            <a className="transition hover:text-white" href="#credentials">
              Credentials
            </a>
            <a className="transition hover:text-white" href="#contact">
              Contact
            </a>
          </nav>
        </header>

        <div
          id="top"
          className="mx-auto grid max-w-7xl gap-12 px-5 pb-14 pt-10 text-white sm:px-8 lg:grid-cols-[minmax(0,1.02fr)_minmax(340px,0.58fr)] lg:items-center lg:pb-12 lg:pt-10"
        >
          <div className="max-w-4xl motion-rise">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#6ed3bd]">
              Solutions Delivery Manager | SAP Program Manager
            </p>
            <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[1.02] sm:text-6xl xl:text-7xl">
              Digital transformation leader for ERP, Smart City, and municipal
              service delivery.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/82">
              Results-driven program leader with 15+ years delivering complex
              ERP and digital transformation programs across Saudi Arabia, UAE,
              and Egypt, specializing in SAP S/4HANA, Oracle ERP, Odoo, and
              Vision 2030-aligned Smart City solutions.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="mailto:haitham.pm@hotmail.com"
                className="inline-flex min-h-12 items-center gap-2 rounded-md bg-[#f4c35f] px-5 text-sm font-semibold text-[#161817] shadow-sm transition hover:bg-[#ffd77b]"
              >
                <Mail aria-hidden="true" size={18} />
                Email Haitham
              </a>
              <a
                href="/Haitham_Mohamed_CV_2026.pdf"
                download
                className="inline-flex min-h-12 items-center gap-2 rounded-md border border-white/30 bg-white/10 px-5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/18"
              >
                <Download aria-hidden="true" size={18} />
                Download CV
              </a>
              <a
                href="https://www.linkedin.com/in/haitham-elmohamady"
                className="inline-flex min-h-12 items-center gap-2 rounded-md border border-white/24 px-5 text-sm font-semibold text-white transition hover:bg-white/12"
              >
                LinkedIn
                <ArrowUpRight aria-hidden="true" size={18} />
              </a>
            </div>
          </div>

          <div className="motion-rise motion-delay-2">
            <article className="profile-card overflow-hidden rounded-lg border border-white/18 bg-[#111816]/72 text-white shadow-2xl backdrop-blur-md">
              <div className="relative aspect-square overflow-hidden lg:aspect-[4/3]">
                <Image
                  src="/haitham-elmohamady-profile.png"
                  alt={`${displayName} professional portrait`}
                  fill
                  priority
                  sizes="(min-width: 1024px) 360px, 90vw"
                  className="object-cover object-top"
                />
              </div>
              <div className="p-4">
                <p className="text-lg font-semibold">{displayName}</p>
                <p className="mt-1 text-sm leading-6 text-white/70">
                  Solutions Delivery Manager, SAP Program Manager, and digital
                  transformation leader.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="border-b border-[#d8ddd5] bg-white">
        <div className="mx-auto grid max-w-7xl gap-px px-5 py-4 sm:px-8 md:grid-cols-4 motion-grid">
          {achievements.map((item) => (
            <div key={item.metric} className="py-5 md:border-r md:border-[#d8ddd5] md:px-6 last:md:border-r-0">
              <p className="text-4xl font-semibold text-[#0b6d5f]">
                {item.metric}
              </p>
              <p className="mt-2 max-w-xs text-sm leading-6 text-[#4f5954]">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="portfolio" className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0b6d5f]">
              Professional portfolio
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              Programs built around measurable public-service and enterprise
              outcomes.
            </h2>
            <p className="mt-5 text-base leading-8 text-[#56615c]">
              Haitham combines executive delivery discipline with technical ERP
              depth, giving leadership teams a single owner for governance,
              stakeholder alignment, delivery execution, and sustainable
              adoption.
            </p>
          </div>
          <div className="grid gap-4">
            {portfolioHighlights.map((item) => (
              <article
                key={item.title}
                className="rounded-lg border border-[#d8ddd5] bg-white p-6 shadow-sm motion-rise"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#9a6a10]">
                  {item.context}
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-[#161817]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#56615c]">
                  {item.details}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="bg-[#19211f] px-5 py-20 text-white sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#6ed3bd]">
              Experience
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              Delivery leadership across government and enterprise
              transformation.
            </h2>
          </div>

          <div className="mt-12 grid gap-4">
            {experience.map((job) => (
              <article
                key={`${job.role}-${job.period}`}
                className="grid gap-6 rounded-lg border border-white/12 bg-white/[0.045] p-6 md:grid-cols-[0.34fr_1fr] motion-rise"
              >
                <div>
                  <p className="text-sm font-semibold text-[#f4c35f]">
                    {job.period}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold">{job.role}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/62">
                    {job.company}
                  </p>
                </div>
                <ul className="grid gap-3 text-sm leading-7 text-white/76">
                  {job.points.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span className="mt-3 h-1.5 w-1.5 flex-none rounded-full bg-[#6ed3bd]" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#d8ddd5] bg-white px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-[0.74fr_1fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0b6d5f]">
                Companies worked with
              </p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
                Delivery experience connected to government, consulting, and
                enterprise organizations.
              </h2>
            </div>
            <p className="text-base leading-8 text-[#56615c]">
              A visual map of the organizations and delivery environments
              represented in the professional timeline, with official-domain
              logo assets where available.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {companyLogos.map((item) => (
              <LogoCard key={item.name} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section id="capabilities" className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[0.9fr_1fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0b6d5f]">
            Capabilities
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            Senior program management with strong technical fluency.
          </h2>
          <p className="mt-5 text-base leading-8 text-[#56615c]">
            The profile is suited for complex transformation environments where
            strategy, governance, vendor coordination, business change, and
            technical delivery have to move together.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {capabilities.map((skill) => (
            <div
              key={skill}
              className="rounded-lg border border-[#d8ddd5] bg-white p-5 text-sm font-medium leading-7 text-[#2d3431] shadow-sm motion-rise"
            >
              {skill}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#19211f] px-5 py-20 text-white sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-[0.74fr_1fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#6ed3bd]">
                Project partners
              </p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
                ERP, cloud, and client platforms behind major transformation
                programs.
              </h2>
            </div>
            <p className="text-base leading-8 text-white/68">
              The portfolio spans SAP, Oracle, Odoo, cloud infrastructure, and
              enterprise client environments across public-sector and private
              programs.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {partnerLogos.map((item) => (
              <LogoCard key={item.name} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section id="credentials" className="border-y border-[#d8ddd5] bg-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.75fr_1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0b6d5f]">
              Education
            </p>
            <div className="mt-6 grid gap-4">
              <article className="rounded-lg border border-[#d8ddd5] p-5">
                <p className="text-lg font-semibold">
                  Master of Business Administration (MBA)
                </p>
                <p className="mt-2 text-sm leading-6 text-[#56615c]">
                  Arab Academy for Science, Technology and Maritime Transport,
                  2023. GPA: 3.85.
                </p>
              </article>
              <article className="rounded-lg border border-[#d8ddd5] p-5">
                <p className="text-lg font-semibold">
                  B.Sc. in Computer Science and Information Systems
                </p>
                <p className="mt-2 text-sm leading-6 text-[#56615c]">
                  6 October University - Culture and Science City, Egypt, 2009.
                  Grade: Very Good.
                </p>
              </article>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9a6a10]">
              Certifications
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {certificationLogos.map((item) => (
                <LogoCard key={item.name} item={item} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="px-5 py-20 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 rounded-lg bg-[#0f1513] p-6 text-white sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#6ed3bd]">
              Contact
            </p>
            <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight">
              Available for ERP, SAP, Smart City, and digital transformation
              leadership conversations.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/70">
              Arabic native speaker with professional English, based in Saudi
              Arabia and experienced across KSA, UAE, and Egypt.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <a
              href="mailto:haitham.pm@hotmail.com"
              className="inline-flex min-h-12 items-center gap-2 rounded-md bg-[#f4c35f] px-5 text-sm font-semibold text-[#161817] transition hover:bg-[#ffd77b]"
            >
              <Mail aria-hidden="true" size={18} />
              haitham.pm@hotmail.com
            </a>
            <a
              href="tel:+966536887901"
              className="inline-flex min-h-12 items-center gap-2 rounded-md border border-white/18 px-5 text-sm font-semibold transition hover:bg-white/10"
            >
              <Phone aria-hidden="true" size={18} />
              +966 536887901
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
