import DestinationFetcher from "../components/destinationFetcher";
import ScrollSlider from "../components/ui/slidergallery";

export default function DiscoverPage() {
  return (
    <DestinationFetcher>
      {(destinations) => <ScrollSlider destinations={destinations} />}
    </DestinationFetcher>
  );
}
