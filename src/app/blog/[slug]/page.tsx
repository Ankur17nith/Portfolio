import { permanentRedirect } from "next/navigation";
export default async function LegacyPost() {
  permanentRedirect("/work");
}
