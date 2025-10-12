import PopularLocations from "./yourDestination";
import ImageGallery from "./gallery";
import BookYourNextTripServer from "./server/bookYourNextTreipServer";
import WinterSpecial from "./winterTreks";
import Footer from "./footer";
import { Destination } from "@prisma/client";
import SchedulePlannerClient from "./SchedulePlanner";

type Props = {
  destinations: Destination[];
};

export default async function DisplayPageWithPlanner({ destinations }: Props) {
  return (
    <>
      {/* Background image */}
      <div className="w-full h-screen sm:h-[100vh] absolute top-0 bg-cover bg-center overflow-hidden -z-10 opacity-70">
        <img
          className="w-[100vw] h-full object-cover"
          src="/pexels-stywo-1054218.jpg"
          alt="Scenic background"
        />
      </div>

      <div className="flex flex-col items-center min-h-screen text-center gap-6 px-4">
        <div className="mt-32 sm:mt-40 lg:mt-52 max-w-3xl">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl text-black font-bold leading-snug">
            Discover. Explore. Go!
          </h1>
          <p className="text-base sm:text-lg lg:text-xl capitalize font-sans font-semibold text-gray-600 mt-6">
            Explore stunning destinations, breathtaking trails and plan your
            perfect trip today!
          </p>
        </div>

        {/* 👇 Client-side interactive form */}
        <SchedulePlannerClient destinations={destinations} />

        <PopularLocations />
        <BookYourNextTripServer />
        {/* <WinterSpecial /> */}
        <ImageGallery destinations={destinations} />
        <Footer />
      </div>
    </>
  );
}
