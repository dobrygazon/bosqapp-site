import type { APIRoute } from "astro";
import { consentVersions } from "@/consent/index";

// The exact text a consent record is hashed from, byte for byte.
export function getStaticPaths() {
  return consentVersions.map((document) => ({
    params: { version: document.slug },
    props: { text: document.text },
  }));
}

export const GET: APIRoute = ({ props }) =>
  new Response(props.text as string, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
