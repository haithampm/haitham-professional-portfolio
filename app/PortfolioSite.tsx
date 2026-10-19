"use client";

/* eslint-disable @next/next/no-img-element */

import {
  ArrowUpRight,
  Download,
  Languages,
  Mail,
  Phone,
  Settings,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
  certificationLogos,
  companyLogos,
  copy,
  defaultGalleryImages,
  displayName,
  displayNameAr,
  knownAs,
  knownAsAr,
  type GalleryImage,
  type Language,
  type LogoCategory,
  type LogoItem,
  pick,
  partnerLogos,
} from "./content";
import {
  bundledCareer,
  CAREER_DATA_URL,
  type CareerData,
  isCareerData,
  period,
  points,
  roleTitle,
} from "./career";

type ContentOverrides = Record<string, string>;

type LogoApiItem = {
  id: string;
  category: LogoCategory;
  name: string;
  subtitleEn: string;
  subtitleAr: string;
  source: string;
  logo: string | null;
  mark: string | null;
  dark: boolean;
  sortOrder: number;
};

const emptyDynamicLogos: Record<LogoCategory, LogoItem[]> = {
  companies: [],
  partners: [],
  certifications: [],
};

function normalizeLogo(item: LogoApiItem): LogoItem {
  return {
    id: item.id,
    category: item.category,
    name: item.name,
    subtitle: {
      en: item.subtitleEn,
      ar: item.subtitleAr || item.subtitleEn,
    },
    source: item.source,
    logo: item.logo ?? undefined,
    mark: item.mark ?? undefined,
    dark: item.dark,
    sortOrder: item.sortOrder,
  };
}

function LogoCard({ item, language }: { item: LogoItem; language: Language }) {
  const linkTarget = item.source || "#";

  return (
    <a
      href={linkTarget}
      target={item.source ? "_blank" : undefined}
      rel={item.source ? "noreferrer" : undefined}
      className="logo-card motion-rise group"
    >
      <span className={`logo-stage ${item.dark ? "logo-stage-dark" : ""}`}>
        {item.logo ? (
          <img
            src={item.logo}
            alt={`${item.name} logo`}
            loading="lazy"
            className="max-h-12 w-auto max-w-full object-contain transition duration-300 group-hover:scale-105"
          />
        ) : (
          <span className="brand-word">{item.mark ?? item.name}</span>
        )}
      </span>
      <span className="mt-4 text-sm font-semibold text-[#12112a]">
        {item.name}
      </span>
      <span className="mt-1 text-xs leading-5 text-[#5f6382]">
        {pick(item.subtitle, language)}
      </span>
    </a>
  );
}

function overrideText(
  overrides: ContentOverrides,
  key: string,
  fallback: string
) {
  return overrides[key]?.trim() || fallback;
}

function galleryTitle(image: GalleryImage, language: Language) {
  return language === "ar" ? image.titleAr || image.titleEn : image.titleEn;
}

function galleryAlt(image: GalleryImage, language: Language) {
  return language === "ar" ? image.altAr || image.altEn : image.altEn;
}

// Hero label from the published headline: the first two parts ("Title | Title").
function headlineLabel(career: CareerData, arabic: boolean) {
  const headline = (arabic ? career.headline_ar : "") || career.headline || "";
  return headline.split("|").slice(0, 2).map((part) => part.trim()).filter(Boolean).join(" | ");
}

export default function PortfolioSite() {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === "undefined") {
      return "en";
    }

    const saved = window.localStorage.getItem("portfolio-language");

    if (saved === "ar" || saved === "en") {
      return saved;
    }

    return navigator.language.toLowerCase().startsWith("ar") ? "ar" : "en";
  });
  const [overrides, setOverrides] = useState<ContentOverrides>({});
  const [career, setCareer] = useState<CareerData>(bundledCareer);
  const [showAllRoles, setShowAllRoles] = useState(false);

  // Pick up the latest publish from the job portal without waiting for a rebuild.
  useEffect(() => {
    let cancelled = false;
    fetch(CAREER_DATA_URL, { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : null))
      .then((data: unknown) => {
        if (!cancelled && isCareerData(data) && data.experience.length) {
          setCareer(data);
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);
  const [uploadedGallery, setUploadedGallery] = useState<GalleryImage[]>([]);
  const [dynamicLogos, setDynamicLogos] =
    useState<Record<LogoCategory, LogoItem[]>>(emptyDynamicLogos);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    window.localStorage.setItem("portfolio-language", language);
  }, [language]);

  useEffect(() => {
    let cancelled = false;

    async function loadDynamicContent() {
      const [contentResponse, galleryResponse, logoResponse] =
        await Promise.allSettled([
          fetch("/api/site-content", { cache: "no-store" }),
          fetch("/api/gallery", { cache: "no-store" }),
          fetch("/api/logos", { cache: "no-store" }),
        ]);

      if (cancelled) {
        return;
      }

      if (contentResponse.status === "fulfilled" && contentResponse.value.ok) {
        const payload = (await contentResponse.value.json()) as {
          content?: ContentOverrides;
        };
        setOverrides(payload.content ?? {});
      }

      if (galleryResponse.status === "fulfilled" && galleryResponse.value.ok) {
        const payload = (await galleryResponse.value.json()) as {
          images?: GalleryImage[];
        };
        setUploadedGallery(payload.images ?? []);
      }

      if (logoResponse?.status === "fulfilled" && logoResponse.value.ok) {
        const payload = (await logoResponse.value.json()) as {
          logos?: LogoApiItem[];
        };
        const grouped: Record<LogoCategory, LogoItem[]> = {
          companies: [],
          partners: [],
          certifications: [],
        };

        for (const item of payload.logos ?? []) {
          grouped[item.category]?.push(normalizeLogo(item));
        }

        setDynamicLogos(grouped);
      }
    }

    loadDynamicContent().catch(() => {
      setOverrides({});
      setUploadedGallery([]);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const isArabic = language === "ar";
  const publicName = isArabic ? displayNameAr : displayName;

  const hero = useMemo(
    () => ({
      label: overrideText(
        overrides,
        isArabic ? "heroLabelAr" : "heroLabelEn",
        headlineLabel(career, isArabic) || pick(copy.hero.label, language)
      ),
      title: overrideText(
        overrides,
        isArabic ? "heroTitleAr" : "heroTitleEn",
        pick(copy.hero.title, language)
      ),
      summary: overrideText(
        overrides,
        isArabic ? "heroSummaryAr" : "heroSummaryEn",
        pick(copy.hero.summary, language)
      ),
      profileSummary: overrideText(
        overrides,
        isArabic ? "profileSummaryAr" : "profileSummaryEn",
        pick(copy.hero.profileSummary, language)
      ),
    }),
    [career, isArabic, language, overrides]
  );

  const galleryImages = uploadedGallery.length
    ? [...uploadedGallery, ...defaultGalleryImages]
    : defaultGalleryImages;
  const displayedCompanyLogos = dynamicLogos.companies.length
    ? [...dynamicLogos.companies, ...companyLogos]
    : companyLogos;
  const displayedPartnerLogos = dynamicLogos.partners.length
    ? [...dynamicLogos.partners, ...partnerLogos]
    : partnerLogos;
  const displayedCertificationLogos = dynamicLogos.certifications.length
    ? [...dynamicLogos.certifications, ...certificationLogos]
    : certificationLogos;

  return (
    <main dir={isArabic ? "rtl" : "ltr"} className="bg-[#f7f7fd] text-[#12112a]">
      <section className="hero-aurora relative isolate min-h-[84svh] overflow-hidden">
        <Image
          src="/smart-city-delivery-hero.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-20 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(10,8,36,0.94)_0%,rgba(10,8,36,0.82)_39%,rgba(10,8,36,0.38)_73%,rgba(10,8,36,0.26)_100%)] rtl:bg-[linear-gradient(270deg,rgba(10,8,36,0.94)_0%,rgba(10,8,36,0.82)_39%,rgba(10,8,36,0.38)_73%,rgba(10,8,36,0.26)_100%)]" />

        <header className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-5 text-white sm:px-8">
          <a href="#top" className="text-sm font-semibold tracking-wide">
            {publicName}
          </a>
          <nav className="hidden items-center gap-6 text-sm text-white/86 lg:flex">
            <a className="transition hover:text-white" href="#portfolio">
              {pick(copy.nav.portfolio, language)}
            </a>
            <a className="transition hover:text-white" href="#experience">
              {pick(copy.nav.experience, language)}
            </a>
            <a className="transition hover:text-white" href="#capabilities">
              {pick(copy.nav.capabilities, language)}
            </a>
            <a className="transition hover:text-white" href="#credentials">
              {pick(copy.nav.credentials, language)}
            </a>
            <a className="transition hover:text-white" href="#gallery">
              {pick(copy.nav.gallery, language)}
            </a>
            <a className="transition hover:text-white" href="#contact">
              {pick(copy.nav.contact, language)}
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setLanguage(isArabic ? "en" : "ar")}
              className="inline-flex min-h-10 items-center gap-2 rounded-md border border-white/24 bg-white/10 px-3 text-sm font-semibold text-white transition hover:bg-white/18"
            >
              <Languages aria-hidden="true" size={17} />
              {isArabic ? "English" : "العربية"}
            </button>
            <a
              href="/admin"
              className="inline-flex min-h-10 items-center gap-2 rounded-md border border-white/18 px-3 text-sm font-semibold text-white transition hover:bg-white/12"
              aria-label={pick(copy.nav.admin, language)}
            >
              <Settings aria-hidden="true" size={17} />
              <span className="hidden sm:inline">{pick(copy.nav.admin, language)}</span>
            </a>
          </div>
        </header>

        <div
          id="top"
          className="mx-auto grid max-w-7xl gap-12 px-5 pb-14 pt-10 text-white sm:px-8 lg:grid-cols-[minmax(0,1.02fr)_minmax(340px,0.58fr)] lg:items-center lg:pb-12 lg:pt-10"
        >
          <div className="max-w-4xl motion-rise">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9db4ff]">
              {hero.label}
            </p>
            <h1 className="text-gradient mt-5 max-w-4xl text-4xl font-semibold leading-[1.08] sm:text-6xl xl:text-7xl">
              {hero.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/90">
              {hero.summary}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="mailto:haitham.pm@hotmail.com"
                className="inline-flex min-h-12 items-center gap-2 btn-gradient rounded-full px-6 text-sm font-semibold text-white"
              >
                <Mail aria-hidden="true" size={18} />
                {pick(copy.hero.email, language)}
              </a>
              <a
                href="/Haitham_Mohamed_CV_2026.pdf"
                download
                className="inline-flex min-h-12 items-center gap-2 rounded-md border border-white/30 bg-white/10 px-5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/18"
              >
                <Download aria-hidden="true" size={18} />
                {pick(copy.hero.cv, language)}
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
            <article className="profile-card overflow-hidden rounded-lg border border-white/18 bg-[#0a0824]/72 text-white shadow-2xl backdrop-blur-md">
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
                <p className="text-lg font-semibold">{publicName}</p>
                <p className="text-sm text-white/62">
                  {isArabic ? `المعروف بـ ${knownAsAr}` : `Known as ${knownAs}`}
                </p>
                <p className="mt-1 text-sm leading-6 text-white/82">
                  {hero.profileSummary}
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="border-b border-[#e3e2f5] bg-white">
        <div className="mx-auto grid max-w-7xl gap-px px-5 py-4 sm:px-8 md:grid-cols-4 motion-grid">
          {copy.achievements.map((item) => (
            <div
              key={item.metric}
              className="py-5 md:border-e md:border-[#e3e2f5] md:px-6 last:md:border-e-0"
            >
              <p className="text-4xl font-semibold text-[#5b4cf0]">
                {item.metric}
              </p>
              <p className="mt-2 max-w-xs text-sm leading-6 text-[#4e5270]">
                {pick(item.label, language)}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="portfolio" className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#5b4cf0]">
              {pick(copy.portfolio.eyebrow, language)}
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              {pick(copy.portfolio.title, language)}
            </h2>
            <p className="mt-5 text-base leading-8 text-[#5b5f7a]">
              {pick(copy.portfolio.intro, language)}
            </p>
          </div>
          <div className="grid gap-4">
            {copy.portfolio.highlights.map((item) => (
              <article
                key={pick(item.title, "en")}
                className="card-lift rounded-2xl border border-[#e3e2f5] bg-white p-6 shadow-sm motion-rise"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#6d3ae0]">
                  {pick(item.context, language)}
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-[#12112a]">
                  {pick(item.title, language)}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#5b5f7a]">
                  {pick(item.details, language)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="section-deep bg-[#0e0b2e] px-5 py-20 text-white sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9db4ff]">
              {pick(copy.experience.eyebrow, language)}
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              {pick(copy.experience.title, language)}
            </h2>
          </div>

          <div className="mt-12 grid gap-4">
            {(showAllRoles ? career.experience : career.experience.slice(0, 6)).map((job) => (
              <article
                key={job.id}
                className="role-card grid gap-6 rounded-2xl border border-white/12 bg-white/[0.045] p-6 md:grid-cols-[0.34fr_1fr] motion-rise"
              >
                <div>
                  <p className="text-sm font-semibold text-[#c4a5ff]">
                    {period(job, language)}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold">
                    {roleTitle(job, language)}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-white/62">
                    {job.company}
                    {job.location ? ` · ${job.location}` : ""}
                  </p>
                </div>
                <ul className="grid gap-3 text-sm leading-7 text-white/76">
                  {points(job, language).map((point) => (
                    <li key={point} className="flex gap-3">
                      <span className="mt-3 h-1.5 w-1.5 flex-none rounded-full bg-[#9db4ff]" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          {career.experience.length > 6 ? (
            <button
              type="button"
              onClick={() => setShowAllRoles((value) => !value)}
              className="mt-6 rounded-md border border-white/20 px-4 py-2 text-sm font-semibold text-[#9db4ff] transition hover:bg-white/10"
            >
              {showAllRoles
                ? isArabic
                  ? "عرض أقل"
                  : "Show fewer roles"
                : isArabic
                  ? `عرض كل الخبرات (${career.experience.length})`
                  : `Show all ${career.experience.length} roles`}
            </button>
          ) : null}
        </div>
      </section>

      <section className="border-b border-[#e3e2f5] bg-white px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-[0.74fr_1fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#5b4cf0]">
                {pick(copy.companies.eyebrow, language)}
              </p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
                {pick(copy.companies.title, language)}
              </h2>
            </div>
            <p className="text-base leading-8 text-[#5b5f7a]">
              {pick(copy.companies.intro, language)}
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {displayedCompanyLogos.map((item) => (
              <LogoCard key={item.id ?? item.name} item={item} language={language} />
            ))}
          </div>
        </div>
      </section>

      <section
        id="capabilities"
        className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[0.9fr_1fr]"
      >
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#5b4cf0]">
            {pick(copy.capabilities.eyebrow, language)}
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            {pick(copy.capabilities.title, language)}
          </h2>
          <p className="mt-5 text-base leading-8 text-[#5b5f7a]">
            {pick(copy.capabilities.intro, language)}
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {copy.capabilities.items.map((skill) => (
            <div
              key={pick(skill, "en")}
              className="rounded-lg border border-[#e3e2f5] bg-white p-5 text-sm font-medium leading-7 text-[#2b2a4a] shadow-sm motion-rise"
            >
              {pick(skill, language)}
            </div>
          ))}
        </div>
      </section>

      <section className="section-deep bg-[#0e0b2e] px-5 py-20 text-white sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-[0.74fr_1fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9db4ff]">
                {pick(copy.partners.eyebrow, language)}
              </p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
                {pick(copy.partners.title, language)}
              </h2>
            </div>
            <p className="text-base leading-8 text-white/68">
              {pick(copy.partners.intro, language)}
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {displayedPartnerLogos.map((item) => (
              <LogoCard key={item.id ?? item.name} item={item} language={language} />
            ))}
          </div>
        </div>
      </section>

      <section id="credentials" className="border-y border-[#e3e2f5] bg-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.75fr_1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#5b4cf0]">
              {pick(copy.education.eyebrow, language)}
            </p>
            <div className="mt-6 grid gap-4">
              {copy.education.items.map((item) => (
                <article
                  key={pick(item.title, "en")}
                  className="rounded-lg border border-[#e3e2f5] p-5"
                >
                  <p className="text-lg font-semibold">
                    {pick(item.title, language)}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[#5b5f7a]">
                    {pick(item.detail, language)}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#6d3ae0]">
              {pick(copy.certifications.eyebrow, language)}
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {displayedCertificationLogos.map((item) => (
                <LogoCard key={item.id ?? item.name} item={item} language={language} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="gallery" className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.74fr_1fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#5b4cf0]">
              {pick(copy.gallery.eyebrow, language)}
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              {pick(copy.gallery.title, language)}
            </h2>
          </div>
          <p className="text-base leading-8 text-[#5b5f7a]">
            {pick(copy.gallery.intro, language)}
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {galleryImages.map((image) => (
            <article
              key={image.id}
              className="card-lift motion-rise overflow-hidden rounded-2xl border border-[#e3e2f5] bg-white shadow-sm"
            >
              <div className="aspect-[4/3] overflow-hidden bg-[#eeedfa]">
                <img
                  src={image.src}
                  alt={galleryAlt(image, language)}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-300 hover:scale-[1.03]"
                />
              </div>
              <div className="p-4">
                <p className="text-sm font-semibold text-[#12112a]">
                  {galleryTitle(image, language)}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="px-5 py-20 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 rounded-lg bg-[#0a0824] p-6 text-white sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9db4ff]">
              {pick(copy.contact.eyebrow, language)}
            </p>
            <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight">
              {pick(copy.contact.title, language)}
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/70">
              {pick(copy.contact.intro, language)}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <a
              href="mailto:haitham.pm@hotmail.com"
              className="inline-flex min-h-12 items-center gap-2 btn-gradient rounded-full px-6 text-sm font-semibold text-white"
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
