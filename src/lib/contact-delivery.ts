import "server-only";

import { siteConfig } from "@/config/site";
import type { ContactDelivery } from "@/lib/contact";

export function getContactDelivery(): ContactDelivery {
  const webhook = process.env.CONTACT_WEBHOOK_URL?.trim() ?? "";
  if (webhook.startsWith("https://") || webhook.startsWith("http://")) {
    return { mode: "webhook" };
  }
  if (siteConfig.email) return { mode: "mailto", email: siteConfig.email };
  return { mode: "unconfigured" };
}
