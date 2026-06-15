"use client";

/* eslint-disable @next/next/no-img-element */

import {
  AlertCircle,
  ArrowLeft,
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
import { copy, displayName, displayNameAr, type GalleryImage } from "../content";

type Status = {
  tone: "idle" | "success" | "error";
  text: string;
};

type AdminStatus = {
  isAdmin: boolean;
  email: string | null;
};

type AdminPanelId = "content" | "gallery" | "preview";

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
  { id: "preview", label: "Preview", icon: Eye },
];

function fieldDirection(field: ContentField) {
  return field.language === "العربية" ? "rtl" : "ltr";
}

function cleanValue(value: string | undefined, fallback: string) {
  return value?.trim() || fallback;
}

function statusClasses(tone: Status["tone"]) {
  if (tone === "success") {
    return "border-[#b7dacd] bg-[#eef8f4] text-[#0b6d5f]";
  }

  if (tone === "error") {
    return "border-[#efc0b7] bg-[#fff4f1] text-[#9a311f]";
  }

  return "border-[#d8ddd5] bg-white text-[#56615c]";
}

export default function AdminPanel() {
  const [activePanel, setActivePanel] = useState<AdminPanelId>("content");
  const [adminStatus, setAdminStatus] = useState<AdminStatus | null>(null);
  const [values, setValues] = useState<Record<string, string>>(initialValues);
  const [images, setImages] = useState<GalleryImage[]>([]);
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
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [storageWarning, setStorageWarning] = useState("");
  const [status, setStatus] = useState<Status>({ tone: "idle", text: "" });

  const storageReady = !storageWarning;
  const canEdit = Boolean(adminStatus?.isAdmin && storageReady);
  const pendingPreviewSrc = filePreview || imageUrl.trim();

  useEffect(
    () => () => {
      if (filePreviewRef.current) {
        URL.revokeObjectURL(filePreviewRef.current);
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

      await refreshGallery();
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

  return (
    <main className="min-h-screen bg-[#eef2ed] text-[#161817]">
      <header className="border-b border-[#d8ddd5] bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-5 sm:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#0b6d5f]">
              Portfolio Admin
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              Portfolio control center
            </h1>
          </div>
          <Link
            href="/"
            className="inline-flex min-h-11 items-center gap-2 rounded-md border border-[#d8ddd5] bg-white px-4 text-sm font-semibold transition hover:bg-[#eef2ed]"
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
            className="grid grid-cols-3 rounded-lg border border-[#d8ddd5] bg-white p-1 shadow-sm"
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
                      ? "bg-[#0f1513] text-white"
                      : "text-[#4f5954] hover:bg-[#eef2ed]"
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
              className="rounded-lg border border-[#d8ddd5] bg-white p-5 shadow-sm sm:p-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0b6d5f]">
                    Main content
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold">Hero text</h2>
                </div>
                <button
                  type="submit"
                  disabled={!canEdit || saving}
                  className="inline-flex min-h-11 items-center gap-2 rounded-md bg-[#0b6d5f] px-4 text-sm font-semibold text-white transition hover:bg-[#09594e] disabled:cursor-not-allowed disabled:opacity-50"
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
                        className="min-h-28 rounded-md border border-[#cfd6cc] bg-white px-3 py-2 text-sm leading-6 outline-none transition focus:border-[#0b6d5f] focus:ring-2 focus:ring-[#0b6d5f]/15"
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
                        className="min-h-11 rounded-md border border-[#cfd6cc] bg-white px-3 text-sm outline-none transition focus:border-[#0b6d5f] focus:ring-2 focus:ring-[#0b6d5f]/15"
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
              className="rounded-lg border border-[#d8ddd5] bg-white p-5 shadow-sm sm:p-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9a6a10]">
                    Gallery
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold">Add image</h2>
                </div>
                <button
                  type="submit"
                  disabled={!canEdit || uploading}
                  className="inline-flex min-h-11 items-center gap-2 rounded-md bg-[#f4c35f] px-4 text-sm font-semibold text-[#161817] transition hover:bg-[#ffd77b] disabled:cursor-not-allowed disabled:opacity-50"
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
                      className="inline-flex min-h-8 flex-none cursor-pointer items-center rounded-md bg-[#eef2ed] px-3 text-xs font-semibold text-[#2d3431] transition hover:bg-[#e0e7df]"
                    >
                      Choose
                    </label>
                    <span className="min-w-0 truncate text-sm text-[#56615c]">
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
                    className="min-h-11 rounded-md border border-[#cfd6cc] bg-white px-3 text-sm outline-none transition focus:border-[#0b6d5f] focus:ring-2 focus:ring-[#0b6d5f]/15"
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
                      className="min-h-11 rounded-md border border-[#cfd6cc] bg-white px-3 text-sm outline-none transition focus:border-[#0b6d5f] focus:ring-2 focus:ring-[#0b6d5f]/15"
                    />
                  </label>
                ))}
              </div>
            </form>
          ) : null}

          {activePanel === "preview" ? (
            <section className="grid gap-5 rounded-lg border border-[#d8ddd5] bg-white p-5 shadow-sm sm:p-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0b6d5f]">
                  Preview
                </p>
                <h2 className="mt-2 text-2xl font-semibold">Hero and gallery</h2>
              </div>

              <div className="grid overflow-hidden rounded-lg border border-[#d8ddd5] lg:grid-cols-[1fr_260px]">
                <div className="bg-[#101614] p-5 text-white">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6ed3bd]">
                    {heroPreview.labelEn}
                  </p>
                  <h3 className="mt-4 text-3xl font-semibold leading-tight">
                    {heroPreview.titleEn}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-white/72">
                    {heroPreview.summaryEn}
                  </p>
                  <div className="mt-6 border-t border-white/12 pt-5" dir="rtl">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6ed3bd]">
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
                <div className="bg-[#f7f8f5] p-4">
                  <img
                    src="/haitham-elmohamady-profile.png"
                    alt={`${displayName} portrait`}
                    className="aspect-square w-full rounded-md object-cover object-top"
                  />
                  <p className="mt-4 text-base font-semibold">{displayName}</p>
                  <p className="text-sm font-semibold text-[#0b6d5f]">
                    {displayNameAr}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[#56615c]">
                    {heroPreview.profileEn}
                  </p>
                </div>
              </div>

              {pendingPreviewSrc ? (
                <div className="overflow-hidden rounded-lg border border-[#d8ddd5] bg-[#f7f8f5]">
                  <img
                    src={pendingPreviewSrc}
                    alt={imageMeta.altEn || imageMeta.titleEn || "Pending image"}
                    className="max-h-72 w-full object-cover"
                  />
                  <div className="p-4">
                    <p className="font-semibold">
                      {imageMeta.titleEn || "Pending gallery image"}
                    </p>
                    <p className="mt-1 text-sm text-[#56615c]" dir="rtl">
                      {imageMeta.titleAr || "صورة جديدة"}
                    </p>
                  </div>
                </div>
              ) : null}
            </section>
          ) : null}
        </section>

        <aside className="grid content-start gap-5">
          <section className="rounded-lg border border-[#d8ddd5] bg-white p-5 shadow-sm">
            <div className="flex items-start gap-3">
              {storageReady ? (
                <ShieldCheck className="mt-1 text-[#0b6d5f]" size={20} />
              ) : (
                <AlertCircle className="mt-1 text-[#9a6a10]" size={20} />
              )}
              <div>
                <p className="text-sm font-semibold">Access</p>
                <p className="mt-1 text-sm leading-6 text-[#56615c]">
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
            <section className="rounded-lg border border-[#d8ddd5] bg-white p-5 text-sm leading-6 text-[#56615c] shadow-sm">
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

          <section className="rounded-lg border border-[#d8ddd5] bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0b6d5f]">
                  Uploaded
                </p>
                <h2 className="mt-2 text-2xl font-semibold">Images</h2>
              </div>
              <ImagePlus aria-hidden="true" className="text-[#9a6a10]" size={24} />
            </div>

            <div className="mt-5 grid gap-3">
              {images.length ? (
                images.map((image) => (
                  <article
                    key={image.id}
                    className="grid grid-cols-[72px_1fr_auto] items-center gap-3 rounded-md border border-[#d8ddd5] p-2"
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
                      <p className="truncate text-xs text-[#56615c]">
                        {image.titleAr || "بدون عنوان عربي"}
                      </p>
                    </div>
                    <button
                      type="button"
                      disabled={!canEdit}
                      onClick={() => deleteImage(image.id)}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[#d8ddd5] text-[#9a311f] transition hover:bg-[#fff4f1] disabled:cursor-not-allowed disabled:opacity-50"
                      aria-label="Delete image"
                    >
                      <Trash2 aria-hidden="true" size={17} />
                    </button>
                  </article>
                ))
              ) : (
                <p className="rounded-md border border-dashed border-[#cfd6cc] p-4 text-sm leading-6 text-[#56615c]">
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
