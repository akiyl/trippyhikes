export const dynamic = "force-dynamic";

import DisplayPage from "./components/display";
import DestinationFetcher from "./components/destinationFetcher";
import BookYourNextTrip from "./components/bookYourNextTrip";

export default function Home() {
  return (
    <>
      <div className=" text-gray-500">
        <DestinationFetcher>
          {(destinations) => <DisplayPage destinations={destinations} />}
        </DestinationFetcher>
      </div>
    </>
  );
}
