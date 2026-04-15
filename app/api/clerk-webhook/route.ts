import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("🔥 EVENT:", body.type);

    if (body.type !== "user.created") {
      return new Response("Ignored", { status: 200 });
    }

    const { id, email_addresses, first_name, image_url } = body.data;

    const email = email_addresses?.[0]?.email_address;

    await db.user.upsert({
      where: { clerkId: id },
      update: {
        email,
        name: first_name,
        profileImage: image_url,
      },
      create: {
        clerkId: id,
        email,
        name: first_name || "",
        profileImage: image_url || "",
      },
    });

    console.log("✅ User stored");

    return new Response("OK", { status: 200 });

  } catch (error) {
    console.error("❌ ERROR:", error);
    return new Response("Error", { status: 500 });
  }
}