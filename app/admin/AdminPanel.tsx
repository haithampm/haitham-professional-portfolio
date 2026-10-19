"use client";

/* eslint-disable @next/next/no-img-element */

import {
  AlertCircle,
  ArrowLeft,
  BadgeCheck,
  Building2,
  Eye,
  FileText,
  ImagePlus,
  Images,
  Loader2,
  Lock,
  Save,
  ShieldCheck,
  Trash2,
  Upload,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import {
  copy,
  displayName,
  displayNameAr,
  type GalleryImage,
  type LogoCategory,
} from "../content";

type Status = {
  tone: "idle" | "success" | "error";
  text: string;
};

type AdminStatus = {
  isAdmin: boolean;
  email: string | null;
};

type AdminPanelId = "content" | "gallery" | "logos" | "preview";

type ManagedLogo = {
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

type ContentField = {
  key: string;
  label: string;
  language: "English" | "العربية";
  kind: "input" | "textarea";
  fallback: string;
};

const contentFields: ContentField[] = [
  {
    key: "heroLabelEn",
    label: "Hero label",
    language: "English",
    kind: "input",
    fallback: copy.hero.label.en,
  },
  {
    key: "heroLabelAr",
    label: "عنوان أعلى الصفحة",
    language: "العربية",
    kind: "input",
    fallback: copy.hero.label.ar,
  },
  {
    key: "heroTitleEn",
    label: "Hero headline",
    language: "English",
    kind: "textarea",
    fallback: copy.hero.title.en,
  },
  {
    key: "heroTitleAr",
    label: "العنوان الرئيسي",
    language: "العربية",
    kind: "textarea",
    fallback: copy.hero.title.ar,
  },
  {
    key: "heroSummaryEn",
    label: "Hero summary",
    language: "English",
    kind: "textarea",
    fallback: copy.hero.summary.en,
  },
  {
    key: "heroSummaryAr",
    label: "ملخص الصفحة الرئيسية",
    language: "العربية",
    kind: "textarea",
    fallback: copy.hero.summary.ar,
  },
  {
    key: "profileSummaryEn",
    label: "Profile card summary",
    language: "English",
    kind: "textarea",
    fallback: copy.hero.profileSummary.en,
  },
  {
    key: "profileSummaryAr",
    label: "ملخص كارت الصورة",
    language: "العربية",
    kind: "textarea",
    fallback: copy.hero.profileSummary.ar,
  },
];

const initialValues = Object.fromEntries(
  contentFields.map((field) => [field.key, field.fallback])
) as Record<string, string>;

const panels: Array<{
  id: AdminPanelId;
  label: string;
  icon: typeof FileText;
}> = [
  { id: "content", label: "Content", icon: FileText },
  { id: "gallery", label: "Gallery", icon: Images },
  { id: "logos", label: "Logos", icon: BadgeCheck },
  { id: "preview", label: "Preview", icon: Eye },
];

const logoCategoryLabels: Record<LogoCategory, string> = {
  companies: "Companies worked with",
  partners: "Project partners",
  certifications: "Certifications",
};

const emptyLogoGroups: Record<LogoCategory, ManagedLogo[]> = {
  companies: [],
  partners: [],
  certifications: [],
};

function fieldDirection(field: ContentField) {
  return field.language === "العربية" ? "rtl" : "ltr";
}

function cleanValue(value: string | undefined, fallback: string) {
  return value?.trim() || fallback;
}

function statusClasses(tone: Status["tone"]) {
  if (tone === "success") {
    return "border-[#b7dacd] bg-[#eef8f4] text-[#1f4e79]";
  }

  if (tone === "error") {
    return "border-[#efc0b7] bg-[#fff4f1] text-[#9a311f]";
  }

  return "border-[#e2e6eb] bg-white text-[#5f6b7a]";
}

export default function AdminPanel() {
  const [activePanel, setActivePanel] = useState<AdminPanelId>("content");
  const [adminStatus, setAdminStatus] = useState<AdminStatus | null>(null);
  const [values, setValues] = useState<Record<string, string>>(initialValues);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [logos, setLogos] =
    useState<Record<LogoCategory, ManagedLogo[]>>(emptyLogoGroups);
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState("");
  const filePreviewRef = useRef("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageMeta, setImageMeta] = useState({
    titleEn: "",
    titleAr: "",
    altEn: "",
    altAr: "",
    sortOrder: "10",
  });
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoFilePreview, setLogoFilePreview] = useState("");
  const logoFilePreviewRef = useRef("");
  const [logoUrl, setLogoUrl] = useState("");
  const [logoMeta, setLogoMeta] = useState({
    category: "companies" as LogoCategory,
    name: "",
    subtitleEn: "",
    subtitleAr: "",
    source: "",
    mark: "",
    sortOrder: "10",
    dark: false,
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [logoUploading, setLogoUploading] = useState(false);
  const [storageWarning, setStorageWarning] = useState("");
  const [status, setStatus] = useState<Status>({ tone: "idle", text: "" });

  const storageReady = !storageWarning;
  const canEdit = Boolean(adminStatus?.isAdmin && storageReady);
  const pendingPreviewSrc = filePreview || imageUrl.trim();
  const pendingLogoPreviewSrc = logoFilePreview || logoUrl.trim();

  useEffect(
    () => () => {
      if (filePreviewRef.current) {
        URL.revokeObjectURL(filePreviewRef.current);
      }

      if (logoFilePreviewRef.current) {
        URL.revokeObjectURL(logoFilePreviewRef.current);
      }
    },
    []
  );

  function updateFilePreview(nextFile: File | null) {
    if (filePreviewRef.current) {
      URL.revokeObjectURL(filePreviewRef.current);
      filePreviewRef.current = "";
    }

    setFile(nextFile);

    if (!nextFile) {
      setFilePreview("");
      return;
    }

    const nextPreview = URL.createObjectURL(nextFile);
    filePreviewRef.current = nextPreview;
    setFilePreview(nextPreview);
  }

  function updateLogoFilePreview(nextFile: File | null) {
    if (logoFilePreviewRef.current) {
      URL.revokeObjectURL(logoFilePreviewRef.current);
      logoFilePreviewRef.current = "";
    }

    setLogoFile(nextFile);

    if (!nextFile) {
      setLogoFilePreview("");
      return;
    }

    const nextPreview = URL.createObjectURL(nextFile);
    logoFilePreviewRef.current = nextPreview;
    setLogoFilePreview(nextPreview);
  }

  async function refreshGallery() {
    const response = await fetch("/api/gallery", { cache: "no-store" });
    const payload = (await response.json()) as {
      images?: GalleryImage[];
      warning?: string;
    };

    setImages(payload.images ?? []);

    if (payload.warning) {
      setStorageWarning(payload.warning);
    }
  }

  async function refreshLogos() {
    const response = await fetch("/api/logos", { cache: "no-store" });
    const payload = (await response.json()) as {
      logos?: ManagedLogo[];
      warning?: string;
    };
    const grouped: Record<LogoCategory, ManagedLogo[]> = {
      companies: [],
      partners: [],
      certifications: [],
    };

    for (const logo of payload.logos ?? []) {
      grouped[logo.category]?.push(logo);
    }

    setLogos(grouped);

    if (payload.warning) {
      setStorageWarning(payload.warning);
    }
  }

  useEffect(() => {
    async function load() {
      const [statusResponse, contentResponse] = await Promise.all([
        fetch("/api/admin/status", { cache: "no-store" }),
        fetch("/api/site-content", { cache: "no-store" }),
      ]);

      const statusPayload = (await statusResponse.json()) as AdminStatus;
      const contentPayload = (await contentResponse.json()) as {
        content?: Record<string, string>;
        warning?: string;
      };

      setAdminStatus(statusPayload);
      setValues({ ...initialValues, ...(contentPayload.content ?? {}) });

      if (contentPayload.warning) {
        setStorageWarning(contentPayload.warning);
      }

      await Promise.all([refreshGallery(), refreshLogos()]);
    }

    load().catch((error) => {
      setStatus({
        tone: "error",
        text: error instanceof Error ? error.message : "Unable to load admin data.",
      });
    });
  }, []);

  const heroPreview = useMemo(
    () => ({
      labelEn: cleanValue(values.heroLabelEn, copy.hero.label.en),
      labelAr: cleanValue(values.heroLabelAr, copy.hero.label.ar),
      titleEn: cleanValue(values.heroTitleEn, copy.hero.title.en),
      titleAr: cleanValue(values.heroTitleAr, copy.hero.title.ar),
      summaryEn: cleanValue(values.heroSummaryEn, copy.hero.summary.en),
      summaryAr: cleanValue(values.heroSummaryAr, copy.hero.summary.ar),
      profileEn: cleanValue(values.profileSummaryEn, copy.hero.profileSummary.en),
      profileAr: cleanValue(values.profileSummaryAr, copy.hero.profileSummary.ar),
    }),
    [values]
  );

  async function saveContent(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setStatus({ tone: "idle", text: "" });

    try {
      const response = await fetch("/api/site-content", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(values),
      });
      const payload = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(payload.error ?? "Unable to save content.");
      }

      setStatus({ tone: "success", text: "Content saved successfully." });
    } catch (error) {
      setStatus({
        tone: "error",
        text: error instanceof Error ? error.message : "Unable to save content.",
      });
    } finally {
      setSaving(false);
    }
  }

  async function uploadImage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setUploading(true);
    setStatus({ tone: "idle", text: "" });

    try {
      const form = new FormData();

      if (file) {
        form.set("file", file);
      }

      form.set("imageUrl", imageUrl);
      form.set("titleEn", imageMeta.titleEn);
      form.set("titleAr", imageMeta.titleAr);
      form.set("altEn", imageMeta.altEn);
      form.set("altAr", imageMeta.altAr);
      form.set("sortOrder", imageMeta.sortOrder);

      const response = await fetch("/api/gallery", {
        method: "POST",
        body: form,
      });
      const payload = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(payload.error ?? "Unable to add image.");
      }

      updateFilePreview(null);
      setImageUrl("");
      setImageMeta({
        titleEn: "",
        titleAr: "",
        altEn: "",
        altAr: "",
        sortOrder: "10",
      });
      await refreshGallery();
      setStatus({ tone: "success", text: "Image added successfully." });
    } catch (error) {
      setStatus({
        tone: "error",
        text: error instanceof Error ? error.message : "Unable to add image.",
      });
    } finally {
      setUploading(false);
    }
  }

  async function uploadLogo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLogoUploading(true);
    setStatus({ tone: "idle", text: "" });

    try {
      const form = new FormData();

      if (logoFile) {
        form.set("file", logoFile);
      }

      form.set("category", logoMeta.category);
      form.set("name", logoMeta.name);
      form.set("subtitleEn", logoMeta.subtitleEn);
      form.set("subtitleAr", logoMeta.subtitleAr);
      form.set("source", logoMeta.source);
      form.set("logoUrl", logoUrl);
      form.set("mark", logoMeta.mark);
      form.set("sortOrder", logoMeta.sortOrder);
      form.set("dark", String(logoMeta.dark));

      const response = await fetch("/api/logos", {
        method: "POST",
        body: form,
      });
      const payload = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(payload.error ?? "Unable to add logo.");
      }

      updateLogoFilePreview(null);
      setLogoUrl("");
      setLogoMeta((current) => ({
        ...current,
        name: "",
        subtitleEn: "",
        subtitleAr: "",
        source: "",
        mark: "",
        sortOrder: "10",
        dark: false,
      }));
      await refreshLogos();
      setStatus({ tone: "success", text: "Logo added successfully." });
    } catch (error) {
      setStatus({
        tone: "error",
        text: error instanceof Error ? error.message : "Unable to add logo.",
      });
    } finally {
      setLogoUploading(false);
    }
  }

  async function deleteImage(id: string) {
    setStatus({ tone: "idle", text: "" });

    try {
      const response = await fetch(`/api/gallery?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      const payload = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(payload.error ?? "Unable to delete image.");
      }

      await refreshGallery();
      setStatus({ tone: "success", text: "Image deleted." });
    } catch (error) {
      setStatus({
        tone: "error",
        text: error instanceof Error ? error.message : "Unable to delete image.",
      });
    }
  }

  async function deleteLogo(id: string) {
    setStatus({ tone: "idle", text: "" });

    try {
      const response = await fetch(`/api/logos?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      const payload = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(payload.error ?? "Unable to delete logo.");
      }

      await refreshLogos();
      setStatus({ tone: "success", text: "Logo deleted." });
    } catch (error) {
      setStatus({
        tone: "error",
        text: error instanceof Error ? error.message : "Unable to delete logo.",
      });
    }
  }

  return (
    <main className="min-h-screen bg-[#eef2ed] text-[#1c2430]">
      <header className="border-b border-[#e2e6eb] bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-5 sm:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#1f4e79]">
              Portfolio Admin
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              Portfolio control center
            </h1>
          </div>
          <Link
            href="/"
            className="inline-flex min-h-11 items-center gap-2 rounded-md border border-[#e2e6eb] bg-white px-4 text-sm font-semibold transition hover:bg-[#eef2ed]"
          >
            <ArrowLeft aria-hidden="true" size={18} />
            Back to site
          </Link>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-5 py-6 sm:px-8 lg:grid-cols-[minmax(0,1fr)_360px]">
        <section className="grid gap-6">
          <nav
            aria-label="Admin sections"
            className="grid grid-cols-2 rounded-lg border border-[#e2e6eb] bg-white p-1 shadow-sm sm:grid-cols-4"
          >
            {panels.map((panel) => {
              const Icon = panel.icon;
              const selected = activePanel === panel.id;

              return (
                <button
                  key={panel.id}
                  type="button"
                  onClick={() => setActivePanel(panel.id)}
                  className={`inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md px-3 text-sm font-semibold transition ${
                    selected
                      ? "bg-[#0b1f33] text-white"
                      : "text-[#4a5563] hover:bg-[#eef2ed]"
                  }`}
                >
                  <Icon aria-hidden="true" size={18} />
                  {panel.label}
                </button>
              );
            })}
          </nav>

          {activePanel === "content" ? (
            <form
              onSubmit={saveContent}
              className="rounded-lg border border-[#e2e6eb] bg-white p-5 shadow-sm sm:p-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1f4e79]">
                    Main content
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold">Hero text</h2>
                </div>
                <button
                  type="submit"
                  disabled={!canEdit || saving}
                  className="inline-flex min-h-11 items-center gap-2 rounded-md bg-[#1f4e79] px-4 text-sm font-semibold text-white transition hover:bg-[#09594e] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {saving ? (
                    <Loader2 aria-hidden="true" className="animate-spin" size={18} />
                  ) : (
                    <Save aria-hidden="true" size={18} />
                  )}
                  Save
                </button>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {contentFields.map((field) => (
                  <label key={field.key} className="grid gap-2">
                    <span className="flex items-center justify-between gap-3 text-sm font-semibold">
                      {field.label}
                      <span className="text-xs font-medium text-[#6a766f]">
                        {field.language}
                      </span>
                    </span>
                    {field.kind === "textarea" ? (
                      <textarea
                        dir={fieldDirection(field)}
                        value={values[field.key] ?? ""}
                        onChange={(event) =>
                          setValues((current) => ({
                            ...current,
                            [field.key]: event.target.value,
                          }))
                        }
                        rows={4}
                        className="min-h-28 rounded-md border border-[#cfd6cc] bg-white px-3 py-2 text-sm leading-6 outline-none transition focus:border-[#1f4e79] focus:ring-2 focus:ring-[#1f4e79]/15"
                      />
                    ) : (
                      <input
                        dir={fieldDirection(field)}
                        value={values[field.key] ?? ""}
                        onChange={(event) =>
                          setValues((current) => ({
                            ...current,
                            [field.key]: event.target.value,
                          }))
                        }
                        className="min-h-11 rounded-md border border-[#cfd6cc] bg-white px-3 text-sm outline-none transition focus:border-[#1f4e79] focus:ring-2 focus:ring-[#1f4e79]/15"
                      />
                    )}
                  </label>
                ))}
              </div>
            </form>
          ) : null}

          {activePanel === "gallery" ? (
            <form
              onSubmit={uploadImage}
              className="rounded-lg border border-[#e2e6eb] bg-white p-5 shadow-sm sm:p-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8a6a1f]">
                    Gallery
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold">Add image</h2>
                </div>
                <button
                  type="submit"
                  disabled={!canEdit || uploading}
                  className="inline-flex min-h-11 items-center gap-2 rounded-md bg-[#d4b26a] px-4 text-sm font-semibold text-[#1c2430] transition hover:bg-[#e6cf96] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {uploading ? (
                    <Loader2 aria-hidden="true" className="animate-spin" size={18} />
                  ) : (
                    <Upload aria-hidden="true" size={18} />
                  )}
                  Add
                </button>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                  <span className="text-sm font-semibold">Upload file</span>
                  <div className="flex min-h-11 min-w-0 items-center gap-3 rounded-md border border-[#cfd6cc] bg-white px-3">
                    <label
                      htmlFor="gallery-file-upload"
                      className="inline-flex min-h-8 flex-none cursor-pointer items-center rounded-md bg-[#eef2ed] px-3 text-xs font-semibold text-[#2b3440] transition hover:bg-[#e0e7df]"
                    >
                      Choose
                    </label>
                    <span className="min-w-0 truncate text-sm text-[#5f6b7a]">
                      {file?.name ?? "No file selected"}
                    </span>
                  </div>
                  <input
                    id="gallery-file-upload"
                    type="file"
                    accept="image/*"
                    onChange={(event) =>
                      updateFilePreview(event.target.files?.[0] ?? null)
                    }
                    className="sr-only"
                  />
                </div>
                <label className="grid gap-2">
                  <span className="text-sm font-semibold">Image URL</span>
                  <input
                    value={imageUrl}
                    onChange={(event) => setImageUrl(event.target.value)}
                    placeholder="https://..."
                    className="min-h-11 rounded-md border border-[#cfd6cc] bg-white px-3 text-sm outline-none transition focus:border-[#1f4e79] focus:ring-2 focus:ring-[#1f4e79]/15"
                  />
                </label>
                {[
                  ["titleEn", "Title", "English"],
                  ["titleAr", "العنوان", "العربية"],
                  ["altEn", "Alt text", "English"],
                  ["altAr", "النص البديل", "العربية"],
                  ["sortOrder", "Sort order", "Higher appears first"],
                ].map(([key, label, hint]) => (
                  <label key={key} className="grid gap-2">
                    <span className="flex items-center justify-between gap-3 text-sm font-semibold">
                      {label}
                      <span className="text-xs font-medium text-[#6a766f]">
                        {hint}
                      </span>
                    </span>
                    <input
                      dir={hint === "العربية" ? "rtl" : "ltr"}
                      value={imageMeta[key as keyof typeof imageMeta]}
                      onChange={(event) =>
                        setImageMeta((current) => ({
                          ...current,
                          [key]: event.target.value,
                        }))
                      }
                      className="min-h-11 rounded-md border border-[#cfd6cc] bg-white px-3 text-sm outline-none transition focus:border-[#1f4e79] focus:ring-2 focus:ring-[#1f4e79]/15"
                    />
                  </label>
                ))}
              </div>
            </form>
          ) : null}

          {activePanel === "logos" ? (
            <section className="grid gap-5">
              <form
                onSubmit={uploadLogo}
                className="rounded-lg border border-[#e2e6eb] bg-white p-5 shadow-sm sm:p-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1f4e79]">
                      Logos
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold">
                      Add company, partner, or certificate logo
                    </h2>
                  </div>
                  <button
                    type="submit"
                    disabled={!canEdit || logoUploading}
                    className="inline-flex min-h-11 items-center gap-2 rounded-md bg-[#1f4e79] px-4 text-sm font-semibold text-white transition hover:bg-[#09594e] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {logoUploading ? (
                      <Loader2 aria-hidden="true" className="animate-spin" size={18} />
                    ) : (
                      <BadgeCheck aria-hidden="true" size={18} />
                    )}
                    Add logo
                  </button>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <label className="grid gap-2">
                    <span className="text-sm font-semibold">Section</span>
                    <select
                      value={logoMeta.category}
                      onChange={(event) =>
                        setLogoMeta((current) => ({
                          ...current,
                          category: event.target.value as LogoCategory,
                        }))
                      }
                      className="min-h-11 rounded-md border border-[#cfd6cc] bg-white px-3 text-sm outline-none transition focus:border-[#1f4e79] focus:ring-2 focus:ring-[#1f4e79]/15"
                    >
                      <option value="companies">Companies worked with</option>
                      <option value="partners">Project partners</option>
                      <option value="certifications">Certifications</option>
                    </select>
                  </label>
                  <label className="grid gap-2">
                    <span className="text-sm font-semibold">Name</span>
                    <input
                      value={logoMeta.name}
                      onChange={(event) =>
                        setLogoMeta((current) => ({
                          ...current,
                          name: event.target.value,
                        }))
                      }
                      placeholder="SAP, PMI, Oracle..."
                      className="min-h-11 rounded-md border border-[#cfd6cc] bg-white px-3 text-sm outline-none transition focus:border-[#1f4e79] focus:ring-2 focus:ring-[#1f4e79]/15"
                    />
                  </label>
                  <div className="grid gap-2">
                    <span className="text-sm font-semibold">Upload logo file</span>
                    <div className="flex min-h-11 min-w-0 items-center gap-3 rounded-md border border-[#cfd6cc] bg-white px-3">
                      <label
                        htmlFor="logo-file-upload"
                        className="inline-flex min-h-8 flex-none cursor-pointer items-center rounded-md bg-[#eef2ed] px-3 text-xs font-semibold text-[#2b3440] transition hover:bg-[#e0e7df]"
                      >
                        Choose
                      </label>
                      <span className="min-w-0 truncate text-sm text-[#5f6b7a]">
                        {logoFile?.name ?? "No file selected"}
                      </span>
                    </div>
                    <input
                      id="logo-file-upload"
                      type="file"
                      accept="image/*"
                      onChange={(event) =>
                        updateLogoFilePreview(event.target.files?.[0] ?? null)
                      }
                      className="sr-only"
                    />
                  </div>
                  <label className="grid gap-2">
                    <span className="text-sm font-semibold">Logo URL</span>
                    <input
                      value={logoUrl}
                      onChange={(event) => setLogoUrl(event.target.value)}
                      placeholder="https://..."
                      className="min-h-11 rounded-md border border-[#cfd6cc] bg-white px-3 text-sm outline-none transition focus:border-[#1f4e79] focus:ring-2 focus:ring-[#1f4e79]/15"
                    />
                  </label>
                  <label className="grid gap-2">
                    <span className="text-sm font-semibold">Subtitle</span>
                    <input
                      value={logoMeta.subtitleEn}
                      onChange={(event) =>
                        setLogoMeta((current) => ({
                          ...current,
                          subtitleEn: event.target.value,
                        }))
                      }
                      placeholder="Official certification, SAP delivery..."
                      className="min-h-11 rounded-md border border-[#cfd6cc] bg-white px-3 text-sm outline-none transition focus:border-[#1f4e79] focus:ring-2 focus:ring-[#1f4e79]/15"
                    />
                  </label>
                  <label className="grid gap-2">
                    <span className="text-sm font-semibold">الوصف العربي</span>
                    <input
                      dir="rtl"
                      value={logoMeta.subtitleAr}
                      onChange={(event) =>
                        setLogoMeta((current) => ({
                          ...current,
                          subtitleAr: event.target.value,
                        }))
                      }
                      className="min-h-11 rounded-md border border-[#cfd6cc] bg-white px-3 text-sm outline-none transition focus:border-[#1f4e79] focus:ring-2 focus:ring-[#1f4e79]/15"
                    />
                  </label>
                  <label className="grid gap-2">
                    <span className="text-sm font-semibold">Official/source link</span>
                    <input
                      value={logoMeta.source}
                      onChange={(event) =>
                        setLogoMeta((current) => ({
                          ...current,
                          source: event.target.value,
                        }))
                      }
                      placeholder="https://..."
                      className="min-h-11 rounded-md border border-[#cfd6cc] bg-white px-3 text-sm outline-none transition focus:border-[#1f4e79] focus:ring-2 focus:ring-[#1f4e79]/15"
                    />
                  </label>
                  <label className="grid gap-2">
                    <span className="text-sm font-semibold">Text mark fallback</span>
                    <input
                      value={logoMeta.mark}
                      onChange={(event) =>
                        setLogoMeta((current) => ({
                          ...current,
                          mark: event.target.value,
                        }))
                      }
                      placeholder="PMI, SAP, Microsoft..."
                      className="min-h-11 rounded-md border border-[#cfd6cc] bg-white px-3 text-sm outline-none transition focus:border-[#1f4e79] focus:ring-2 focus:ring-[#1f4e79]/15"
                    />
                  </label>
                  <label className="grid gap-2">
                    <span className="text-sm font-semibold">Sort order</span>
                    <input
                      value={logoMeta.sortOrder}
                      onChange={(event) =>
                        setLogoMeta((current) => ({
                          ...current,
                          sortOrder: event.target.value,
                        }))
                      }
                      className="min-h-11 rounded-md border border-[#cfd6cc] bg-white px-3 text-sm outline-none transition focus:border-[#1f4e79] focus:ring-2 focus:ring-[#1f4e79]/15"
                    />
                  </label>
                  <label className="flex min-h-11 items-center gap-3 rounded-md border border-[#cfd6cc] px-3 text-sm font-semibold">
                    <input
                      type="checkbox"
                      checked={logoMeta.dark}
                      onChange={(event) =>
                        setLogoMeta((current) => ({
                          ...current,
                          dark: event.target.checked,
                        }))
                      }
                      className="h-4 w-4 accent-[#1f4e79]"
                    />
                    Dark logo background
                  </label>
                </div>

                <div className="mt-5 grid gap-3 rounded-lg border border-[#e2e6eb] bg-[#f6f7f9] p-4 sm:grid-cols-[160px_1fr] sm:items-center">
                  <div
                    className={`flex min-h-28 items-center justify-center rounded-md border border-[#e2e6eb] p-4 ${
                      logoMeta.dark ? "bg-[#0b1f33]" : "bg-white"
                    }`}
                  >
                    {pendingLogoPreviewSrc ? (
                      <img
                        src={pendingLogoPreviewSrc}
                        alt={logoMeta.name || "Logo preview"}
                        className="max-h-16 max-w-full object-contain"
                      />
                    ) : (
                      <span className="brand-word">
                        {logoMeta.mark || logoMeta.name || "Logo"}
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">
                      {logoMeta.name || "Logo preview"}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-[#5f6b7a]">
                      {logoMeta.subtitleEn ||
                        "Add an official logo, source link, and bilingual label."}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-[#5f6b7a]" dir="rtl">
                      {logoMeta.subtitleAr || "أضف الوصف العربي للشعار."}
                    </p>
                  </div>
                </div>
              </form>

              <section className="rounded-lg border border-[#e2e6eb] bg-white p-5 shadow-sm sm:p-6">
                <div className="flex items-center gap-3">
                  <Building2 aria-hidden="true" className="text-[#1f4e79]" size={22} />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1f4e79]">
                      Managed logos
                    </p>
                    <h2 className="mt-1 text-2xl font-semibold">
                      Uploaded logo controls
                    </h2>
                  </div>
                </div>

                <div className="mt-5 grid gap-5">
                  {(Object.keys(logoCategoryLabels) as LogoCategory[]).map(
                    (category) => (
                      <div key={category} className="grid gap-3">
                        <p className="text-sm font-semibold">
                          {logoCategoryLabels[category]}
                        </p>
                        {logos[category].length ? (
                          <div className="grid gap-3">
                            {logos[category].map((logo) => (
                              <article
                                key={logo.id}
                                className="grid grid-cols-[72px_1fr_auto] items-center gap-3 rounded-md border border-[#e2e6eb] p-2"
                              >
                                <div
                                  className={`flex h-14 w-18 items-center justify-center rounded border border-[#eef1f4] p-2 ${
                                    logo.dark ? "bg-[#0b1f33]" : "bg-[#f6f7f9]"
                                  }`}
                                >
                                  {logo.logo ? (
                                    <img
                                      src={logo.logo}
                                      alt={`${logo.name} logo`}
                                      className="max-h-full max-w-full object-contain"
                                    />
                                  ) : (
                                    <span className="text-center text-xs font-bold text-[#1f4e79]">
                                      {logo.mark || logo.name}
                                    </span>
                                  )}
                                </div>
                                <div className="min-w-0">
                                  <p className="truncate text-sm font-semibold">
                                    {logo.name}
                                  </p>
                                  <p className="truncate text-xs text-[#5f6b7a]">
                                    {logo.subtitleEn || logo.subtitleAr || "No subtitle"}
                                  </p>
                                </div>
                                <button
                                  type="button"
                                  disabled={!canEdit}
                                  onClick={() => deleteLogo(logo.id)}
                                  className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[#e2e6eb] text-[#9a311f] transition hover:bg-[#fff4f1] disabled:cursor-not-allowed disabled:opacity-50"
                                  aria-label="Delete logo"
                                >
                                  <Trash2 aria-hidden="true" size={17} />
                                </button>
                              </article>
                            ))}
                          </div>
                        ) : (
                          <p className="rounded-md border border-dashed border-[#cfd6cc] p-4 text-sm leading-6 text-[#5f6b7a]">
                            No uploaded logos in this section yet. The site still
                            shows the built-in logos until you add replacements or
                            additions here.
                          </p>
                        )}
                      </div>
                    )
                  )}
                </div>
              </section>
            </section>
          ) : null}

          {activePanel === "preview" ? (
            <section className="grid gap-5 rounded-lg border border-[#e2e6eb] bg-white p-5 shadow-sm sm:p-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1f4e79]">
                  Preview
                </p>
                <h2 className="mt-2 text-2xl font-semibold">Hero and gallery</h2>
              </div>

              <div className="grid overflow-hidden rounded-lg border border-[#e2e6eb] lg:grid-cols-[1fr_260px]">
                <div className="bg-[#101614] p-5 text-white">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9fc0e0]">
                    {heroPreview.labelEn}
                  </p>
                  <h3 className="mt-4 text-3xl font-semibold leading-tight">
                    {heroPreview.titleEn}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-white/72">
                    {heroPreview.summaryEn}
                  </p>
                  <div className="mt-6 border-t border-white/12 pt-5" dir="rtl">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9fc0e0]">
                      {heroPreview.labelAr}
                    </p>
                    <h3 className="mt-4 text-2xl font-semibold leading-tight">
                      {heroPreview.titleAr}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-white/72">
                      {heroPreview.summaryAr}
                    </p>
                  </div>
                </div>
                <div className="bg-[#f6f7f9] p-4">
                  <img
                    src="/haitham-elmohamady-profile.png"
                    alt={`${displayName} portrait`}
                    className="aspect-square w-full rounded-md object-cover object-top"
                  />
                  <p className="mt-4 text-base font-semibold">{displayName}</p>
                  <p className="text-sm font-semibold text-[#1f4e79]">
                    {displayNameAr}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[#5f6b7a]">
                    {heroPreview.profileEn}
                  </p>
                </div>
              </div>

              {pendingPreviewSrc ? (
                <div className="overflow-hidden rounded-lg border border-[#e2e6eb] bg-[#f6f7f9]">
                  <img
                    src={pendingPreviewSrc}
                    alt={imageMeta.altEn || imageMeta.titleEn || "Pending image"}
                    className="max-h-72 w-full object-cover"
                  />
                  <div className="p-4">
                    <p className="font-semibold">
                      {imageMeta.titleEn || "Pending gallery image"}
                    </p>
                    <p className="mt-1 text-sm text-[#5f6b7a]" dir="rtl">
                      {imageMeta.titleAr || "صورة جديدة"}
                    </p>
                  </div>
                </div>
              ) : null}
            </section>
          ) : null}
        </section>

        <aside className="grid content-start gap-5">
          <section className="rounded-lg border border-[#e2e6eb] bg-white p-5 shadow-sm">
            <div className="flex items-start gap-3">
              {storageReady ? (
                <ShieldCheck className="mt-1 text-[#1f4e79]" size={20} />
              ) : (
                <AlertCircle className="mt-1 text-[#8a6a1f]" size={20} />
              )}
              <div>
                <p className="text-sm font-semibold">Access</p>
                <p className="mt-1 text-sm leading-6 text-[#5f6b7a]">
                  {adminStatus
                    ? adminStatus.isAdmin
                      ? adminStatus.email
                        ? `Signed in as ${adminStatus.email}`
                        : "Signed in locally"
                      : "View only"
                    : "Checking access..."}
                </p>
                {!storageReady ? (
                  <p className="mt-3 rounded-md bg-[#fff8e8] p-3 text-xs leading-5 text-[#7a520a]">
                    {storageWarning}
                  </p>
                ) : null}
              </div>
            </div>
          </section>

          {!canEdit ? (
            <section className="rounded-lg border border-[#e2e6eb] bg-white p-5 text-sm leading-6 text-[#5f6b7a] shadow-sm">
              <div className="flex gap-3">
                <Lock className="mt-1 flex-none text-[#7c8781]" size={18} />
                <p>
                  Saving is available only when admin access and Cloudflare
                  storage are both active.
                </p>
              </div>
            </section>
          ) : null}

          {status.text ? (
            <section className={`rounded-lg border p-4 text-sm ${statusClasses(status.tone)}`}>
              {status.text}
            </section>
          ) : null}

          <section className="rounded-lg border border-[#e2e6eb] bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1f4e79]">
                  Uploaded
                </p>
                <h2 className="mt-2 text-2xl font-semibold">Images</h2>
              </div>
              <ImagePlus aria-hidden="true" className="text-[#8a6a1f]" size={24} />
            </div>

            <div className="mt-5 grid gap-3">
              {images.length ? (
                images.map((image) => (
                  <article
                    key={image.id}
                    className="grid grid-cols-[72px_1fr_auto] items-center gap-3 rounded-md border border-[#e2e6eb] p-2"
                  >
                    <img
                      src={image.src}
                      alt={image.altEn || image.titleEn}
                      className="h-14 w-18 rounded object-cover"
                    />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">
                        {image.titleEn || "Untitled image"}
                      </p>
                      <p className="truncate text-xs text-[#5f6b7a]">
                        {image.titleAr || "بدون عنوان عربي"}
                      </p>
                    </div>
                    <button
                      type="button"
                      disabled={!canEdit}
                      onClick={() => deleteImage(image.id)}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[#e2e6eb] text-[#9a311f] transition hover:bg-[#fff4f1] disabled:cursor-not-allowed disabled:opacity-50"
                      aria-label="Delete image"
                    >
                      <Trash2 aria-hidden="true" size={17} />
                    </button>
                  </article>
                ))
              ) : (
                <p className="rounded-md border border-dashed border-[#cfd6cc] p-4 text-sm leading-6 text-[#5f6b7a]">
                  No uploaded images yet.
                </p>
              )}
            </div>
          </section>
        </aside>
      </div>
    </main>
  );
}
