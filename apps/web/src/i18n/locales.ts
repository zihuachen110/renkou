export const locales = ["zh-CN", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "zh-CN";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Resolve locale from pathname: `/en/...` → en, else zh-CN. */
export function getLocaleFromUrl(url: URL): Locale {
  const segment = url.pathname.split("/").filter(Boolean)[0];
  return segment === "en" ? "en" : defaultLocale;
}

/** Path for a given locale. `path` is site path without locale prefix (`/`, `/about`). */
export function localePath(locale: Locale, path = "/"): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (locale === defaultLocale) return clean;
  if (clean === "/") return "/en/";
  return `/en${clean}`;
}

/** Switch locale while preserving path + hash. */
export function switchLocalePath(currentUrl: URL, target: Locale): string {
  const pathname = currentUrl.pathname;
  const hash = currentUrl.hash;
  let path = pathname;

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    path = pathname.slice(3) || "/";
  }
  if (!path.startsWith("/")) path = `/${path}`;

  return `${localePath(target, path)}${hash}`;
}

export function htmlLang(locale: Locale): string {
  return locale === "en" ? "en" : "zh-CN";
}

export function numberLocale(locale: Locale): string {
  return locale === "en" ? "en-US" : "zh-CN";
}
