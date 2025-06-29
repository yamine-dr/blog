"use server";
import { cookies } from "next/headers";

export async function setThemeCookie(theme) {
  cookies().set("theme", theme);
}

export async function getThemeFromCookie() {
  const theme = (await cookies()).get("theme")?.value;
  return theme || "light";
}