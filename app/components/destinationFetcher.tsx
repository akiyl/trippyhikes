// components/DestinationFetcher.tsx
import {
  getDestinations,
  getDestinationsByTrailType,
} from "@/lib/getDestination";
import { Destination } from "@prisma/client";

type Props = {
  children: (destinations: Destination[]) => React.ReactNode;
  trailType?: string;
};

export const dynamic = "force-dynamic";

export default async function DestinationFetcher({
  children,
  trailType,
}: Props) {
  const destinations = trailType
    ? await getDestinationsByTrailType(trailType)
    : await getDestinations();

  return <>{children(destinations)}</>;
}
