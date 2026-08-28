"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/common/Button";
import { ImageUploadField } from "@/components/common/ImageUploadField";
import { Sparkles, LayoutDashboard, Image as ImageIcon, Mail, Phone, MapPin, Plus, Trash2, Link as LinkIcon, Share2 } from "lucide-react";
import { DEFAULT_SITE_SETTINGS, type SiteSettingsValue } from "@/lib/site-settings";

interface NavbarLink {
  label: string;
  href: string;
}

interface FooterLink {
  label: string;
  href: string;
}

interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

async function parseJsonSafely(response: Response) {
  const contentType = response.headers.get("content-type") || "";
  const text = await response.text();

  if (!text) {
    return null;
  }

  if (!contentType.includes("application/json")) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

export default function SiteSettingsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState<SiteSettingsValue>(DEFAULT_SITE_SETTINGS);
  
  // Navigation links state
  const [navbarLinks, setNavbarLinks] = useState<NavbarLink[]>([]);
  const [footerLinks, setFooterLinks] = useState<FooterLink[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);

  useEffect(() => {
    fetch("/api/admin/site-settings")
      .then(async (response) => {
        const data = await parseJsonSafely(response);

        if (!response.ok) {
          const message = (data as any)?.error || "Failed to load site settings";
          throw new Error(message);
        }

        return data;
      })
      .then((data) => {
        if (data) {
          setFormData({
            ...DEFAULT_SITE_SETTINGS,
            ...data,
            logoText: data.logoText || data.siteName || DEFAULT_SITE_SETTINGS.logoText,
            heroImage: data.heroImage && !data.heroImage.endsWith("flyover-logo.jpg") ? data.heroImage : "",
          });
          
          // Parse JSON arrays for links
          try {
            setNavbarLinks(data.navbarLinks ? JSON.parse(data.navbarLinks) : []);
          } catch {
            setNavbarLinks([]);
          }
          
          try {
            setFooterLinks(data.footerLinks ? JSON.parse(data.footerLinks) : []);
          } catch {
            setFooterLinks([]);
          }
          
          try {
            setSocialLinks(data.socialLinks ? JSON.parse(data.socialLinks) : []);
          } catch {
            setSocialLinks([]);
          }
        }
      })
        .catch((err: any) => setError(err?.message || "Failed to load site settings"))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddNavbarLink = () => {
    setNavbarLinks([...navbarLinks, { label: "", href: "" }]);
  };

  const handleUpdateNavbarLink = (index: number, field: "label" | "href", value: string) => {
    const updated = [...navbarLinks];
    updated[index][field] = value;
    setNavbarLinks(updated);
  };

  const handleRemoveNavbarLink = (index: number) => {
    setNavbarLinks(navbarLinks.filter((_, i) => i !== index));
  };

  const handleAddFooterLink = () => {
    setFooterLinks([...footerLinks, { label: "", href: "" }]);
  };

  const handleUpdateFooterLink = (index: number, field: "label" | "href", value: string) => {
    const updated = [...footerLinks];
    updated[index][field] = value;
    setFooterLinks(updated);
  };

  const handleRemoveFooterLink = (index: number) => {
    setFooterLinks(footerLinks.filter((_, i) => i !== index));
  };

  const handleAddSocialLink = () => {
    setSocialLinks([...socialLinks, { name: "", url: "", icon: "" }]);
  };

  const handleUpdateSocialLink = (index: number, field: "name" | "url" | "icon", value: string) => {
    const updated = [...socialLinks];
    updated[index][field] = value;
    setSocialLinks(updated);
  };

  const handleRemoveSocialLink = (index: number) => {
    setSocialLinks(socialLinks.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/admin/site-settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          navbarLinks: JSON.stringify(navbarLinks),
          footerLinks: JSON.stringify(footerLinks),
          socialLinks: JSON.stringify(socialLinks),
        }),
      });

      if (!response.ok) {
        const payload = await parseJsonSafely(response);
        throw new Error((payload as any)?.error || "Failed to save site settings");
      }

      setSuccess("Site settings saved successfully.");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Unable to save site settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="glass-card p-8">Loading site settings...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <p className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-2 text-sm font-semibold text-primary-700">
          <Sparkles className="h-4 w-4" /> Site settings
        </p>
        <h1 className="text-3xl font-black tracking-tight text-slate-900 md:text-5xl">Manage homepage, branding, and contact details</h1>
        <p className="max-w-3xl text-slate-600">
          Edit the hero section, replace the homepage photo, and update the site-wide contact details without touching code.
        </p>
      </div>

      {error && <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">{error}</div>}
      {success && <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">{success}</div>}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6 rounded-3xl border border-white/70 bg-white p-6 shadow-soft md:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-600 text-white">
                <LayoutDashboard className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Brand information</h2>
                <p className="text-sm text-slate-500">Name, site URL, and contact details</p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Site Name" name="siteName" value={formData.siteName} onChange={handleChange} />
              <Field label="Logo Text" name="logoText" value={formData.logoText} onChange={handleChange} />
              <Field label="Site URL" name="siteUrl" value={formData.siteUrl} onChange={handleChange} />
              <Field label="Contact Email" name="contactEmail" value={formData.contactEmail} onChange={handleChange} />
              <Field label="Contact Phone" name="contactPhone" value={formData.contactPhone} onChange={handleChange} />
              <Field label="Address" name="address" value={formData.address} onChange={handleChange} />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Site Description</label>
              <textarea
                name="siteDescription"
                rows={4}
                value={formData.siteDescription}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-primary-400 focus:ring-4 focus:ring-primary-100"
              />
            </div>
          </div>

          <div className="space-y-6 rounded-3xl border border-white/70 bg-slate-950 p-6 text-white shadow-soft md:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-primary-700">
                <ImageIcon className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Hero section</h2>
                <p className="text-sm text-slate-300">What visitors see first</p>
              </div>
            </div>

            <div className="space-y-4">
              <Field label="Hero Eyebrow" name="heroEyebrow" value={formData.heroEyebrow} onChange={handleChange} dark />
              <Field label="Hero Title" name="heroTitle" value={formData.heroTitle} onChange={handleChange} dark />
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-200">Hero Subtitle</label>
                <textarea
                  name="heroSubtitle"
                  rows={5}
                  value={formData.heroSubtitle}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-accent-300 focus:ring-4 focus:ring-white/10"
                />
              </div>
              <ImageUploadField
                label="Hero Image"
                name="heroImage"
                value={formData.heroImage}
                onChange={(value) => setFormData((prev) => ({ ...prev, heroImage: value }))}
                helperText="Upload an image instead of pasting a URL."
                dark
              />

              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Primary CTA Label" name="heroPrimaryCtaLabel" value={formData.heroPrimaryCtaLabel} onChange={handleChange} dark />
                <Field label="Primary CTA Link" name="heroPrimaryCtaHref" value={formData.heroPrimaryCtaHref} onChange={handleChange} dark />
                <Field label="Secondary CTA Label" name="heroSecondaryCtaLabel" value={formData.heroSecondaryCtaLabel} onChange={handleChange} dark />
                <Field label="Secondary CTA Link" name="heroSecondaryCtaHref" value={formData.heroSecondaryCtaHref} onChange={handleChange} dark />
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Preview</p>
              <h3 className="mt-3 text-2xl font-black leading-tight">{formData.heroTitle}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-300">{formData.heroSubtitle}</p>
              <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold">
                <span className="rounded-full bg-white/10 px-4 py-2">{formData.heroPrimaryCtaLabel}</span>
                <span className="rounded-full bg-white/10 px-4 py-2">{formData.heroSecondaryCtaLabel}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navbar Links Section */}
        <div className="rounded-3xl border border-white/70 bg-white p-6 shadow-soft md:p-8">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white">
              <LinkIcon className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Navigation Bar Links</h2>
              <p className="text-sm text-slate-500">Customize the main navigation menu</p>
            </div>
          </div>

          <div className="space-y-4">
            {navbarLinks.map((link, index) => (
              <div key={index} className="flex gap-4 items-end">
                <div className="flex-1">
                  <label className="mb-2 block text-sm font-semibold text-slate-700">Label</label>
                  <input
                    type="text"
                    value={link.label}
                    onChange={(e) => handleUpdateNavbarLink(index, "label", e.target.value)}
                    placeholder="e.g., Tours"
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-primary-400 focus:ring-4 focus:ring-primary-100"
                  />
                </div>
                <div className="flex-1">
                  <label className="mb-2 block text-sm font-semibold text-slate-700">URL</label>
                  <input
                    type="text"
                    value={link.href}
                    onChange={(e) => handleUpdateNavbarLink(index, "href", e.target.value)}
                    placeholder="e.g., /tours"
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-primary-400 focus:ring-4 focus:ring-primary-100"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveNavbarLink(index)}
                  className="h-12 rounded-2xl bg-red-50 p-3 text-red-600 hover:bg-red-100 transition"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddNavbarLink}
              className="inline-flex items-center gap-2 rounded-2xl border-2 border-dashed border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 hover:border-slate-400 transition"
            >
              <Plus className="h-4 w-4" /> Add Link
            </button>
          </div>
        </div>

        {/* Footer Links Section */}
        <div className="rounded-3xl border border-white/70 bg-white p-6 shadow-soft md:p-8">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-600 text-white">
              <LinkIcon className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Footer Links</h2>
              <p className="text-sm text-slate-500">Quick links section in footer</p>
            </div>
          </div>

          <div className="space-y-4">
            {footerLinks.map((link, index) => (
              <div key={index} className="flex gap-4 items-end">
                <div className="flex-1">
                  <label className="mb-2 block text-sm font-semibold text-slate-700">Label</label>
                  <input
                    type="text"
                    value={link.label}
                    onChange={(e) => handleUpdateFooterLink(index, "label", e.target.value)}
                    placeholder="e.g., About Us"
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-primary-400 focus:ring-4 focus:ring-primary-100"
                  />
                </div>
                <div className="flex-1">
                  <label className="mb-2 block text-sm font-semibold text-slate-700">URL</label>
                  <input
                    type="text"
                    value={link.href}
                    onChange={(e) => handleUpdateFooterLink(index, "href", e.target.value)}
                    placeholder="e.g., /about"
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-primary-400 focus:ring-4 focus:ring-primary-100"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveFooterLink(index)}
                  className="h-12 rounded-2xl bg-red-50 p-3 text-red-600 hover:bg-red-100 transition"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddFooterLink}
              className="inline-flex items-center gap-2 rounded-2xl border-2 border-dashed border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 hover:border-slate-400 transition"
            >
              <Plus className="h-4 w-4" /> Add Link
            </button>
          </div>
        </div>

        {/* Social Links Section */}
        <div className="rounded-3xl border border-white/70 bg-white p-6 shadow-soft md:p-8">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-pink-600 text-white">
              <Share2 className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Social Media Links</h2>
              <p className="text-sm text-slate-500">Connect with followers on social platforms</p>
            </div>
          </div>

          <div className="space-y-4">
            {socialLinks.map((link, index) => (
              <div key={index} className="grid gap-4 md:grid-cols-3 items-end">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">Platform Name</label>
                  <input
                    type="text"
                    value={link.name}
                    onChange={(e) => handleUpdateSocialLink(index, "name", e.target.value)}
                    placeholder="e.g., Facebook"
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-primary-400 focus:ring-4 focus:ring-primary-100"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">URL</label>
                  <input
                    type="text"
                    value={link.url}
                    onChange={(e) => handleUpdateSocialLink(index, "url", e.target.value)}
                    placeholder="https://facebook.com/..."
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-primary-400 focus:ring-4 focus:ring-primary-100"
                  />
                </div>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="mb-2 block text-sm font-semibold text-slate-700">Icon</label>
                    <input
                      type="text"
                      value={link.icon}
                      onChange={(e) => handleUpdateSocialLink(index, "icon", e.target.value)}
                      placeholder="facebook"
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-primary-400 focus:ring-4 focus:ring-primary-100"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveSocialLink(index)}
                    className="h-12 rounded-2xl bg-red-50 p-3 text-red-600 hover:bg-red-100 transition"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddSocialLink}
              className="inline-flex items-center gap-2 rounded-2xl border-2 border-dashed border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 hover:border-slate-400 transition"
            >
              <Plus className="h-4 w-4" /> Add Social Link
            </button>
          </div>
        </div>

        <div className="flex gap-4">
          <Button variant="primary" type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save Site Settings"}
          </Button>
          <Button variant="secondary" type="button" onClick={() => router.back()}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  dark = false,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  dark?: boolean;
}) {
  return (
    <div>
      <label className={dark ? "mb-2 block text-sm font-semibold text-slate-200" : "mb-2 block text-sm font-semibold text-slate-700"}>{label}</label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className={dark ? "w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-accent-300 focus:ring-4 focus:ring-white/10" : "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-primary-400 focus:ring-4 focus:ring-primary-100"}
      />
    </div>
  );
}