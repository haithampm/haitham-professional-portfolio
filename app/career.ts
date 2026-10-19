// Career data published from the job portal (the control board). The portal writes
// app/career-data.json in this repo; the site bundles it and refreshes it at runtime from
// GitHub so a publish shows up without a rebuild.
import bundled from "./career-data.json";
import type { Language } from "./content";

export type CareerEntry = {
  id: string;
  title: string;
  title_ar?: string;
  company: string;
  location?: string;
  start: string;
  end?: string;
  current: boolean;
  description?: string;
  description_ar?: string;
};

export type CareerData = {
  headline?: string;
  headline_ar?: string;
  summary?: string;
  summary_ar?: string;
  experience: CareerEntry[];
  updated_at?: string;
};

export const bundledCareer = bundled as CareerData;

export const CAREER_DATA_URL =
  "https://raw.githubusercontent.com/haithampm/haitham-professional-portfolio/main/app/career-data.json";

const MONTHS = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  ar: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"],
};

function month(ym: string | undefined, language: Language) {
  if (!ym) return "";
  const [year, m] = ym.split("-");
  return m ? `${MONTHS[language][Number(m) - 1]} ${year}` : year;
}

export function period(entry: CareerEntry, language: Language) {
  const end = entry.current ? (language === "ar" ? "حتى الآن" : "Present") : month(entry.end, language);
  return `${month(entry.start, language)} - ${end}`;
}

const lines = (text?: string) =>
  String(text || "")
    .split("\n")
    .map((line) => line.replace(/^[•\-–]\s*/, "").trim())
    .filter(Boolean);

export function points(entry: CareerEntry, language: Language) {
  const ar = lines(entry.description_ar);
  return language === "ar" && ar.length ? ar : lines(entry.description);
}

export function roleTitle(entry: CareerEntry, language: Language) {
  return language === "ar" && entry.title_ar ? entry.title_ar : entry.title;
}

export function isCareerData(value: unknown): value is CareerData {
  return !!value && Array.isArray((value as CareerData).experience);
}
