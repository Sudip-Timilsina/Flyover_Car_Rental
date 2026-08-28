import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const createTourSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  overview: z.string().min(20, "Overview must be at least 20 characters"),
  price: z.coerce.number(),
  duration: z.coerce.number().int(),
  groupSize: z.string().min(1, "Group size is required"),
  difficulty: z.enum(["Easy", "Moderate", "Hard", "Expert"]),
  category: z.enum([
    "Trekking",
    "Cultural",
    "Adventure",
    "Jungle Safari",
    "Pilgrimage",
    "City",
    "Honeymoon",
  ]),
  bestSeason: z.string().min(1, "Best season is required"),
  inclusions: z.string().optional(),
  exclusions: z.string().optional(),
  destinationId: z.string().optional().nullable(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  keywords: z.string().optional(),
  image: z.string().optional(),
  published: z.boolean().optional().default(false),
});

export const createBlogPostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(20, "Content must be at least 20 characters"),
  excerpt: z.string().min(10, "Excerpt must be at least 10 characters"),
  image: z.string().optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  keywords: z.string().optional(),
  published: z.boolean().optional().default(false),
});

export const siteSettingsSchema = z.object({
  siteName: z.string().min(1, "Site name is required"),
  siteDescription: z.string().min(1, "Site description is required"),
  siteUrl: z.string().min(1, "Site URL is required"),
  contactEmail: z.string().email("Valid email is required"),
  contactPhone: z.string().min(1, "Contact phone is required"),
  address: z.string().min(1, "Address is required"),
  logoText: z.string().optional().default(""),
  heroEyebrow: z.string().min(1, "Hero eyebrow is required"),
  heroTitle: z.string().min(1, "Hero title is required"),
  heroSubtitle: z.string().min(1, "Hero subtitle is required"),
  heroImage: z.string().optional().default(""),
  heroPrimaryCtaLabel: z.string().min(1, "Primary CTA label is required"),
  heroPrimaryCtaHref: z.string().min(1, "Primary CTA link is required"),
  heroSecondaryCtaLabel: z.string().min(1, "Secondary CTA label is required"),
  heroSecondaryCtaHref: z.string().min(1, "Secondary CTA link is required"),
  navbarLinks: z.string().optional().default("[]"),
  footerLinks: z.string().optional().default("[]"),
  socialLinks: z.string().optional().default("[]"),
});

export const bookingInquirySchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Valid phone number is required"),
  tourId: z.string().optional(),
  tourTitle: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
  adults: z.coerce.number().int().min(1).optional(),
  children: z.coerce.number().int().min(0).optional(),
  startDate: z.string().optional(),
});

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  subject: z.string().min(5, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type CreateTourInput = z.infer<typeof createTourSchema>;
export type CreateBlogPostInput = z.infer<typeof createBlogPostSchema>;
export type SiteSettingsInput = z.infer<typeof siteSettingsSchema>;
export type BookingInquiryInput = z.infer<typeof bookingInquirySchema>;
export type ContactFormInput = z.infer<typeof contactFormSchema>;
