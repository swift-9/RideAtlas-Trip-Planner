"use client";

import { Location, Trip } from "@/app/generated/prisma";
import Map from "@/components/map";
import { Calendar, MapPin, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import SortableItinerary from "./sortable-itinerary";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export type TripWithLocation = Trip & {
  locations: Location[];
};

interface TripDetailClientProps {
  trip: TripWithLocation;
}

export default function TripDetailClient({ trip }: TripDetailClientProps) {
  const [activeTab, setActiveTab] = useState("overview");
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {trip.imageUrl && (
        <div className=" w-full h-72 rounded-xl overflow-hidden md:h-98  shadow-lg relative">
          <Image
            src={trip.imageUrl}
            alt={trip.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <div className="bg-white p-6 shadow rounded-lg flex flex-col md:flex-row items-start  justify-between md:items-center">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900">
            {trip.title}
          </h1>
          <div className="flex items-center text-gray-500 mt-2">
            <Calendar className="h-5 w-5 mr-2" />
            <span className="text-lg">
              {trip.startDate.toLocaleDateString()} -{" "}
              {trip.endDate.toLocaleDateString()}
            </span>
            {trip.description}
          </div>
        </div>
        <div className="mt-4 md:mt-0">
          <Link href={`/trips/${trip.id}/itinerary/new`}>
            <Button>
              <Plus className=" mr-2 h-5 w-5" />
              Add Location
            </Button>
          </Link>
        </div>
      </div>
      <div className="bg-white p-6 shadow rounded-lg">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="overview" className="text-lg hover:bg-gray-200">
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="itinerary"
              className="text-lg hover:bg-gray-200"
            >
              Itinerary
            </TabsTrigger>
            <TabsTrigger value="map" className="text-lg hover:bg-gray-200">
              Map
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-6">
            <div className="grid  md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-2xl font-semibold mb-4">Trip Summary</h2>
                <div className="space-y-4">
                  <div className="flex items-start ">
                    <Calendar className="h-6 w-6 mr-3 text-gray-500" />
                    <div>
                      <p className=" font-medium text-gray-700 ">Trip Dates</p>
                      <p className="text-sm">
                        {trip.startDate.toLocaleDateString()} -{" "}
                        {trip.endDate.toLocaleDateString()}
                        <br />
                        {`${Math.round(
                          (trip.endDate.getTime() - trip.startDate.getTime()) /
                            (1000 * 60 * 60 * 24)
                        )} day(s)`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="h-6 w-6 mr-3 text-gray-500" />
                    <div>
                      <p>Destinations</p>
                      <p>
                        {" "}
                        {trip.locations.length}{" "}
                        {trip.locations.length === 1 ? "location" : "locations"}
                      </p>{" "}
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-72 rounded-lg overflow-hidden  shadow">
                <Map itineraries={trip.locations} />
              </div>
              {trip.locations.length === 0 && (
                <div className=" text-center p-4">
                  <p className="text-lg">
                    Add locations to see them on the map.
                  </p>
                  <Link href={`/trips/${trip.id}/itinerary/new`}>
                    <Button className="mt-4">
                      <Plus className="mr-2 h-5 w-5" />
                      Add Location
                    </Button>
                  </Link>
                </div>
              )}
              <div>
                <p className="text-gray-600 leading-relaxed">
                  {trip.description}
                </p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="itinerary" className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold"> Full Itinerary</h2>
            </div>

            {trip.locations.length === 0 ? (
              <div className="text-center p-4">
                <p>Add locations to see them on the itinerary.</p>
                <Link href={`/trips/${trip.id}/itinerary/new`}>
                  <Button>
                    {" "}
                    <Plus className="mr-2 h-5 w-5" /> Add Location
                  </Button>
                </Link>
              </div>
            ) : (
              <SortableItinerary locations={trip.locations} tripId={trip.id} />
            )}
          </TabsContent>

          <TabsContent value="map" className="space-y-6">
            <div className="h-72 rounded-lg overflow-hidden shadow">
              <Map itineraries={trip.locations} />
            </div>
            {trip.locations.length === 0 && (
              <div className="text-center p-4">
                <p>Add locations to see them on the map.</p>
                <Link href={`/trips/${trip.id}/itinerary/new`}>
                  <Button>
                    {" "}
                    <Plus className="mr-2 h-5 w-5" /> Add Location
                  </Button>
                </Link>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
      <div className="text-center">
        <Link href={`/trips`}>
          <Button> Back to Trips</Button>
        </Link>
      </div>
    </div>
  );
}
