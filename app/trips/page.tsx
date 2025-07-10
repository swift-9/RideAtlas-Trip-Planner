import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
export default async function TripsPage() {
  const session = await auth();
  const trips = await prisma.trip.findMany({
    where: {
      userId: session?.user?.id,
    },
  });
  const sortedTrips = [...trips].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  );
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize to start of the day
  const upcomingTrips = sortedTrips.filter(
    (trip) => new Date(trip.startDate) >= today
  ); // Filter trips that are in the future

  if (!session) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-700 text-xl">
        {" "}
        Please sign in to view your trips.
      </div>
    );
  }

  return (
    <div className=" space-y-6 container mx-auto px-6 py-8">
      <div className="flex flex-col  md:flex-row  lg:flex-row justify-between items-center px-6 mb-6">
        <h1 className="text-3xl  font-bold mb-6">Dashboard</h1>
        <Link href="/trips/new">
          <Button>New Trip</Button>
        </Link>
      </div>
      <div className="px-6">
        <Card className="mb-6 ">
          <CardHeader>
            Welcome, {session.user?.name || "User"}! Here you can manage your
            trips.
          </CardHeader>
          <CardContent>
            <p>
              {trips.length == 0
                ? "Start planning your first trip by chick the button!!"
                : `You have ${trips.length} trip${
                    trips.length > 1 ? "s" : ""
                  } planned. ${
                    upcomingTrips.length > 0
                      ? `${upcomingTrips.length} of them are upcoming.`
                      : "No upcoming trips."
                  }`}
            </p>
          </CardContent>
        </Card>

        <h2 className="text-xl font-semibold mb-4">Your recent Trips</h2>
        {trips.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center  justify-center py-8">
              <h3 className="text-xl font-medium mb-2">No Trips yet.</h3>
              <p className="text-center mb-4 max-w-md">
                You have no trips planned yet. Click "New Trip" to get started!
              </p>
              <Link href="/trips/new">
                <Button>Create Trip</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedTrips.slice(0, 6).map((trip, key) => (
              <Link key={key} href={`/trips/${trip.id}`} className="block">
                <Card className=" h-full hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className=" line-clamp-1">
                    {trip.title}
                  </CardHeader>
                  <CardContent className="text-sm text-gray-600">
                    <p className="mt-2 line-clamp-2 mb-2">{trip.description}</p>
                    <div>
                      {new Date(trip.startDate).toLocaleDateString()} -{" "}
                      {new Date(trip.endDate).toLocaleDateString()}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
