"use client";

/* eslint-disable @next/next/no-img-element */

import {
  ArrowLeft,
  ImagePlus,
  Loader2,
  Save,
  ShieldCheck,
  Trash2,
  Upload,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { copy, type GalleryImage } from "../content";

type Status = {
  tone: "idle" | "success" | "error";
  text: string;
};

type AdminStatus = {
  isAdmin: boolean;
  email: string | null;
};

const contentFields = [
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

export default function AdminPanel() {
  const [adminStatus, setAdminStatus] = useState<AdminStatus | null>(null);
  const [values, setValues] = useState<Record<string, string>>(initialValues);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [file, setFile] = useState<File | null>(null);
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
  const [status, setStatus] = useState<Status>({ tone: "idle", text: "" });

  const canEdit = adminStatus?.isAdmin ?? false;

  async function refreshGallery() {
    const response = await fetch("/api/gallery", { cache: "no-store" });
    const payload = (await response.json()) as { images?: GalleryImage[] };
    setImages(payload.images ?? []);
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
      };

      setAdminStatus(statusPayload);
      setValues({ ...initialValues, ...(contentPayload.content ?? {}) });
      await refreshGallery();
    }

    load().catch((error) => {
      setStatus({
        tone: "error",
        text: error instanceof Error ? error.message : "Unable to load admin data.",
      });
    });
  }, []);

  const statusClass = useMemo(() => {
    if (status.tone === "success") {
      return "border-[#b7dacd] bg-[#eef8f4] text-[#0b6d5f]";
    }

    if (status.tone === "error") {
      return "border-[#efc0b7] bg-[#fff4f1] text-[#9a311f]";
    }

    return "border-[#d8ddd5] bg-white text-[#56615c]";
  }, [status.tone]);

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

      setFile(null);
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
    <main className="min-h-screen bg-[#f7f8f5] text-[#161817]">
      <header className="border-b border-[#d8ddd5] bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-5 sm:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0b6d5f]">
              Portfolio Admin
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">
              Edit bilingual hero content and gallery
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

      <div className="mx-auto grid max-w-7xl gap-6 px-5 py-8 sm:px-8 lg:grid-cols-[0.66fr_0.34fr]">
        <section className="grid gap-6">
          <form
            onSubmit={saveContent}
            className="rounded-lg border border-[#d8ddd5] bg-white p-5 shadow-sm"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#0b6d5f]">
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

          <form
            onSubmit={uploadImage}
            className="rounded-lg border border-[#d8ddd5] bg-white p-5 shadow-sm"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#9a6a10]">
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
              <label className="grid gap-2">
                <span className="text-sm font-semibold">Upload file</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) => setFile(event.target.files?.[0] ?? null)}
                  className="min-h-11 rounded-md border border-[#cfd6cc] bg-white px-3 py-2 text-sm"
                />
              </label>
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
        </section>

        <aside className="grid content-start gap-6">
          <section className="rounded-lg border border-[#d8ddd5] bg-white p-5 shadow-sm">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-1 text-[#0b6d5f]" size={20} />
              <div>
                <p className="text-sm font-semibold">Access</p>
                <p className="mt-1 text-sm leading-6 text-[#56615c]">
                  {adminStatus
                    ? canEdit
                      ? `Signed in${adminStatus.email ? ` as ${adminStatus.email}` : " locally"}`
                      : "You can view this panel, but saving is restricted."
                    : "Checking access..."}
                </p>
              </div>
            </div>
          </section>

          {status.text ? (
            <section className={`rounded-lg border p-4 text-sm ${statusClass}`}>
              {status.text}
            </section>
          ) : null}

          <section className="rounded-lg border border-[#d8ddd5] bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#0b6d5f]">
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
