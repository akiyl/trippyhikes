import { getDestinations } from "@/lib/getDestination";
import TrekSliderGSAP from "./trekSlider";

export default async function TrekSliderWrapper() {
  const destinations = await getDestinations();

  return <TrekSliderGSAP destinations={destinations} />;
}
