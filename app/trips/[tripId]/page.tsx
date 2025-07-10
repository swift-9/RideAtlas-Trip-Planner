import { auth } from "@/auth";
import TripDetailClient from "@/components/trip-detail";
import { prisma } from "@/lib/prisma";

export default async function TripDetail({
  params,
}: {
  params: Promise<{ tripId: string }>;
}) {
  const { tripId } = await params;
  const session = await auth();

  if (!session) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-700 text-xl">
        Please sign in to view your trip details.
      </div>
    );
  }

  const trip = await prisma.trip.findFirst({
    where: {
      id: tripId,
      userId: session.user?.id,
    },
    include: { locations: true },
  });

  if (!trip) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-700 text-xl">
        Trip not found.
      </div>
    );
  }
  return <TripDetailClient trip={trip} />;
}
