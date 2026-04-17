import { getDestinations } from "@/lib/getDestination";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const destinations = await getDestinations();
    return NextResponse.json(destinations);
  } catch (error) {
    console.error("[/api/destinations] Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch destinations" },
      { status: 500 },
    );
  }
}
