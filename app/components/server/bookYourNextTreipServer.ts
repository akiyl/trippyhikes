export const dynamic = "force-dynamic";

import { getDestinations } from "@/lib/getDestination";
import BookYourNextTripClient from "../bookYourNextTrip";
import React from "react";

export default async function BookYourNextTripServer() {
  const destinations = await getDestinations();
  return React.createElement(BookYourNextTripClient, { destinations });
}
