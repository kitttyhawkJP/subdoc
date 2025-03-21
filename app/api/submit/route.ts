import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Extract fields from the request body
    const { subscriber_type, holding_type, entity_file, custodian_agreement } = body;

    // Save data to PostgreSQL (NeonDB)
    const newSubscriber = await prisma.subscriber.create({
      data: {
        subscriberType: subscriber_type,
        holdingType: holding_type || null,
        entityFile: entity_file || null,
        custodianCheck: custodian_agreement === "on",
      },
    });

    return NextResponse.json({ message: "Subscription saved!", data: newSubscriber }, { status: 200 });
  } catch (error) {
    console.error("Error saving subscription:", error);
    return NextResponse.json({ error: "Failed to save form data" }, { status: 500 });
  }
}