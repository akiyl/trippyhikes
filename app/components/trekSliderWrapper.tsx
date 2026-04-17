import { getDestinations } from "@/lib/getDestination";
import TrekSliderGSAP from "./trekSlider";

export default async function TrekSliderWrapper() {
  const destinations = (await getDestinations()).slice(0, 7);

  return <TrekSliderGSAP destinations={destinations} />;
}
