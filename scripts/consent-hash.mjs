// Prints the SHA-256 of every consent document version.
//
// The hash of `src/consent/vN.md` is what the app repo seeds into
// `consent_documents.content_sha256`, and what `/consent/vN/` shows.
import { createHash } from "node:crypto";
import { readdirSync, readFileSync } from "node:fs";

const folder = new URL("../src/consent/", import.meta.url);

const versions = readdirSync(folder)
  .filter((name) => /^v\d+\.md$/.test(name))
  .sort((a, b) => Number(a.slice(1, -3)) - Number(b.slice(1, -3)));

for (const name of versions) {
  const bytes = readFileSync(new URL(name, folder));
  const slug = name.replace(".md", "");
  const sha256 = createHash("sha256").update(bytes).digest("hex");
  console.log(`${slug}  ${sha256}  https://bosq.app/consent/${slug}/`);
}
