import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { redis } from "@/src/libs/redis";
const crypto = require("node:crypto");

export const config = { runtime: "edge" }

async function fetchUserLocation() {
  try {
    const response = await axios.get('https://ipapi.co/json/');
    return response;
  } catch (error) {
    console.error('Error fetching location:', error);
    return null;
  }
};

// increment the number of views of a blog post
// if the user has not already seen it in the last 24h 
export async function POST(req) {
  if (req.method !== "POST") 
    return new NextResponse("use POST", { status: 405 });

  if (req.headers.get("Content-Type") !== "application/json")
    return new NextResponse("must be json", { status: 400 });

  const body = await req.json();
  const slug = body.slug;

  if (!slug) 
    return new NextResponse("Slug not found", { status: 400 });
  
  const ip = (await fetchUserLocation()).data.ip;
  if (ip) {
    // hash the ip to respect the RGPD
    const hashedIp = crypto.createHash("sha256").update(ip).digest("hex");
    const isNewView = await redis.set(`deduplicate:${hashedIp}:${slug}`,true, {
      nx: true, // only set the key if it does not already exist
      ex: 60 * 60 * 24, // expires in 24 h -> (60 * 60 * 24) seconds
    });
    if (!isNewView) return new NextResponse(null, { status: 202 });
  }

  await redis.incr(`postviews:${slug}`);
  return new NextResponse(null, { status: 202 });
}