import { createHash } from "node:crypto";
import type { AstroComponentFactory } from "astro/runtime/server/index.js";

/**
 * The published versions of the consent document.
 *
 * Each `vN.md` here is one version. A published file is never edited: consent
 * records in Supabase point at its permalink and store the SHA-256 of its
 * exact bytes, so a change of even one character is a new `vN+1.md`.
 */
export interface ConsentVersion {
  /** Permalink segment and file name, e.g. `v1`. */
  slug: string;
  /** The `Versiya:` line of the document, e.g. `1`. */
  version: string;
  /** The `Son yenilənmə:` line of the document, as written. */
  updated: string;
  /** The exact published text. `/consent/<slug>.txt` serves these bytes. */
  text: string;
  /** SHA-256 of [text] as UTF-8, lowercase hex. */
  sha256: string;
  Content: AstroComponentFactory;
}

const texts = import.meta.glob<string>("./v*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

const rendered = import.meta.glob<{ Content: AstroComponentFactory }>(
  "./v*.md",
  { eager: true }
);

function line(text: string, label: string, file: string): string {
  const match = text.match(new RegExp(`^${label}: (.+)$`, "m"));
  if (!match) {
    throw new Error(`${file} has no "${label}:" line`);
  }
  return match[1].trim();
}

export const consentVersions: ConsentVersion[] = Object.entries(texts)
  .map(([file, text]) => {
    const slug = file.replace("./", "").replace(".md", "");
    const version = line(text, "Versiya", file);
    if (slug !== `v${version}`) {
      throw new Error(`${file} says "Versiya: ${version}"; rename one of them`);
    }
    return {
      slug,
      version,
      updated: line(text, "Son yenilənmə", file),
      text,
      sha256: createHash("sha256").update(text, "utf8").digest("hex"),
      Content: rendered[file].Content,
    };
  })
  .sort((a, b) => Number(a.version) - Number(b.version));

export const latestConsent = consentVersions[consentVersions.length - 1];
