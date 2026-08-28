export const SITE_CONFIG = {
  name: process.env.SITE_NAME || "Flyover Car Rental",
  description:
    process.env.SITE_DESCRIPTION ||
    "Premium and reliable car rental service in Pokhara.",
  url: process.env.SITE_URL || "http://localhost:3000",
  ogImage: "/uploads/flyover-logo.jpg",
  email: process.env.CONTACT_EMAIL || "contact@flyovertours.com",
  phone: process.env.CONTACT_PHONE || "9815178051",
  address: process.env.CONTACT_ADDRESS || "Lakeside-6, Pokhara",
};

export const ROUTES = {
  HOME: "/",
  TOURS: "/tours",
  DESTINATIONS: "/destinations",
  BLOG: "/blog",
  ABOUT: "/about",
  CONTACT: "/contact",
  ADMIN: "/admin",
  ADMIN_LOGIN: "/admin/login",
  ADMIN_SETTINGS: "/admin/settings",
  ADMIN_TOURS: "/admin/tours",
  ADMIN_DESTINATIONS: "/admin/destinations",
  ADMIN_BLOG: "/admin/blog",
  ADMIN_INQUIRIES: "/admin/inquiries",
};

export const TOUR_CATEGORIES = [
  "Trekking",
  "Cultural",
  "Adventure",
  "Jungle Safari",
  "Pilgrimage",
  "City",
  "Honeymoon",
];

export const DIFFICULTY_LEVELS = ["Easy", "Moderate", "Hard", "Expert"];

export const FEATURED_DESTINATIONS = [
  "Kathmandu",
  "Pokhara",
  "Chitwan",
  "Everest",
  "Annapurna",
  "Lumbini",
];

export const NEPAL_TOURS_META = {
  title: "Flyover Car Rental | Car Rental in Pokhara",
  description:
    "Reliable and premium car rental service in Pokhara with direct WhatsApp support and flexible bookings.",
  keywords:
    "Flyover Car Rental, Pokhara car rental, Nepal car hire, rent a car Pokhara",
};
