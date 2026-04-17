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
import NewHome from "./main";

type Props = {
  destinations: Destination[];
};

export default async function DisplayPageWithPlanner({ destinations }: Props) {
  return (
    <>
      <NewHome />
      <div className="w-full mt-auto">
        <Footer />
      </div>
    </>
  );
}
