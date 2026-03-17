import DisplayPage from "./components/display";
import DestinationFetcher from "./components/destinationFetcher";
import BookYourNextTrip from "./components/bookYourNextTrip";
import SvgScrollPath from "./components/ui/ext-scroll";

export default function Home() {
  return (
    <>
      {/* add scroll path SVG component */}
      <SvgScrollPath />
      <div className=" text-gray-500">
        <DestinationFetcher>
          {(destinations) => <DisplayPage destinations={destinations} />}
        </DestinationFetcher>
      </div>
    </>
  );
}
