"use server";
import { cookies } from "next/headers";

export async function setThemeCookie(theme) {
  cookies().set("theme", theme);
}

export async function getThemeFromCookie() {
  console.log("theme cookie", cookies().get("theme")?.value);
  return cookies().get("theme")?.value || "light";
}