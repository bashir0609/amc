import { NextResponse } from "next/server";
import { getVehicleMotHistory } from "@/lib/mot-api";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const vrm = searchParams.get('vrm');

  if (!vrm) {
    return NextResponse.json({ error: 'Vehicle Registration Mark (VRM) is required.' }, { status: 400 });
  }

  try {
    // Strip whitespace from the VRM
    const formattedVrm = vrm.replace(/\s+/g, '').toUpperCase();
    const data = await getVehicleMotHistory(formattedVrm);

    if (!data) {
      return NextResponse.json({ error: 'Vehicle not found.' }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in MOT History API route:', error);
    return NextResponse.json({ error: 'An error occurred while fetching vehicle data.' }, { status: 500 });
  }
}
