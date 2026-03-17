import PopularLocations from "./yourDestination";
import ImageGallery from "./gallery";
import BookYourNextTripServer from "./server/bookYourNextTreipServer";
import TrendingTreks from "./TrendingTreks";
import Footer from "./footer";
import { Destination } from "@prisma/client";
import SchedulePlannerClient from "./SchedulePlanner";
import DicedBackground from "./ui/DicedBackgroundClean";
import AnimatedHeading from "./ui/AnimatedHeading";
import Home from "./ui/lottieImage";
import SvgScrollPath from "./ui/ext-scroll";

type Props = {
  destinations: Destination[];
};

export default async function DisplayPageWithPlanner({ destinations }: Props) {
  return (
    <>
      <div>
        <SvgScrollPath />
      </div>
      {/* <DicedBackground imageSrc="/pexels-stywo-1054218.jpg" cols={6} rows={4} /> */}
      <Home />
      <div
        className="flex flex-col items-center min-h-screen text-center gap-6
      "
      >
        <div className="mt-32 sm:mt-40 lg:mt-52 max-w-3xl">
          <AnimatedHeading
            as="h1"
            level={1}
            text={"Discover. Explore. Go!"}
            className="text-4xl sm:text-5xl lg:text-7xl text-black font-bold leading-snug"
          />
          <AnimatedHeading
            as="p"
            level={3}
            text={
              "Explore stunning destinations, breathtaking trails and plan your perfect trip today!"
            }
            className="text-base sm:text-lg lg:text-xl capitalize font-sans font-semibold text-gray-600 mt-6"
          />
        </div>

        {/* 👇 Client-side interactive form */}
        <SchedulePlannerClient destinations={destinations} />

        {/* Fallback when destinations are empty (e.g., DB unreachable) */}
        {(!destinations || destinations.length === 0) && (
          <div className="mt-8 bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-lg max-w-2xl">
            <h3 className="font-semibold">
              No destinations available right now
            </h3>
            <p className="text-sm mt-1">
              We couldn't load destinations at this time. Please try refreshing
              or come back later.
            </p>
          </div>
        )}

        <PopularLocations destination={destinations} />
        <BookYourNextTripServer />
        <TrendingTreks />
        <ImageGallery destinations={destinations} />
        <div className="w-full mt-auto">
          <Footer />
        </div>
      </div>
    </>
  );
}
