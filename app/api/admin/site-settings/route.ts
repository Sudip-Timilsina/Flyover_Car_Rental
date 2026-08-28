import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { siteSettingsSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import { persistImageReference } from "@/lib/image-storage";

export const dynamic = 'force-dynamic';

const singletonId = "singleton";

export async function GET() {
  try {
    const settings = await db.siteSettings.findUnique({
      where: { id: singletonId },
    });

    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const validated = await siteSettingsSchema.parseAsync(data);
    
    // Prevent the default logo file from being used as the hero image
    let heroImage = validated.heroImage || "";
    if (heroImage && heroImage.endsWith("flyover-logo.jpg")) {
      heroImage = "";
    } else {
      try {
        const storedHeroImage = await persistImageReference(heroImage, "hero");
        heroImage = storedHeroImage || "";
      } catch (err: any) {
        return NextResponse.json(
          { error: err.message || "Failed to process image" },
          { status: 400 }
        );
      }
    }

    const settings = await db.siteSettings.upsert({
      where: { id: singletonId },
      update: {
        siteName: validated.siteName,
        siteDescription: validated.siteDescription,
        siteUrl: validated.siteUrl,
        contactEmail: validated.contactEmail,
        contactPhone: validated.contactPhone,
        address: validated.address,
        logoText: validated.logoText || null,
        heroEyebrow: validated.heroEyebrow,
        heroTitle: validated.heroTitle,
        heroSubtitle: validated.heroSubtitle,
        heroImage: heroImage || "",
        heroPrimaryCtaLabel: validated.heroPrimaryCtaLabel,
        heroPrimaryCtaHref: validated.heroPrimaryCtaHref,
        heroSecondaryCtaLabel: validated.heroSecondaryCtaLabel,
        heroSecondaryCtaHref: validated.heroSecondaryCtaHref,
        navbarLinks: validated.navbarLinks || "[]",
        footerLinks: validated.footerLinks || "[]",
        socialLinks: validated.socialLinks || "[]",
      },
      create: {
        id: singletonId,
        siteName: validated.siteName,
        siteDescription: validated.siteDescription,
        siteUrl: validated.siteUrl,
        contactEmail: validated.contactEmail,
        contactPhone: validated.contactPhone,
        address: validated.address,
        logoText: validated.logoText || null,
        heroEyebrow: validated.heroEyebrow,
        heroTitle: validated.heroTitle,
        heroSubtitle: validated.heroSubtitle,
        heroImage: heroImage || "",
        heroPrimaryCtaLabel: validated.heroPrimaryCtaLabel,
        heroPrimaryCtaHref: validated.heroPrimaryCtaHref,
        heroSecondaryCtaLabel: validated.heroSecondaryCtaLabel,
        heroSecondaryCtaHref: validated.heroSecondaryCtaHref,
        navbarLinks: validated.navbarLinks || "[]",
        footerLinks: validated.footerLinks || "[]",
        socialLinks: validated.socialLinks || "[]",
      },
    });

    revalidatePath("/");
    revalidatePath("/about");
    revalidatePath("/contact");

    return NextResponse.json(settings);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Server error" }, { status: 400 });
  }
}