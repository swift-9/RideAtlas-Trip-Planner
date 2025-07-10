"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createTrip } from "@/lib/actions/create-trip";
import { UploadButton } from "@/lib/uploadthing";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState, useTransition } from "react";

export default function NewTripPage() {
  const [isPending, startTransition] = useTransition();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  return (
    <div className=" max-w-lg  mx-auto mt-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Create New Trip</CardTitle>
          <CardDescription className="text-gray-600">
            Plan your next adventure with RIDEAtlas!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="space-y-6"
            action={(formData: FormData) => {
              if (imageUrl) {
                formData.append("imageUrl", imageUrl);
              }
              startTransition(() => {
                createTrip(formData);
              });
            }}
          >
            <div>
              <label
                htmlFor="tripName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Trip Name
              </label>
              <input
                type="text"
                name="title"
                id="tripName"
                className={cn(
                  "w-full border border-gray-300 px-3 py-2",
                  "rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                )}
                required
                placeholder="Enter trip name"
              />
            </div>
            {/*<div>
                            <label htmlFor="destination" className="block text-sm font-medium text-gray-700">
                                Destination
                            </label>
                            <input
                                type="text"
                                id="destination"
                                className={cn(
                                    "w-full border border-gray-300 px-3 py-2",
                                    "rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                )}
                                required
                                placeholder="Enter destination"
                            />
                        </div>*/}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                placeholder="Trip description..."
                className={cn(
                  "w-full border border-gray-300 px-3 py-2",
                  "rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                )}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  placeholder="YYYY-MM-DD"
                  type="date"
                  name="startDate"
                  className={cn(
                    "w-full border border-gray-300 px-3 py-2",
                    "rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  )}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {" "}
                  End Date
                </label>
                <input
                  type="date"
                  placeholder="YYYY-MM-DD"
                  name="endDate"
                  className={cn(
                    "w-full border border-gray-300 px-3 py-2",
                    "rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  )}
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Trip Image
              </label>
              {imageUrl && (
                <Image
                  src={imageUrl}
                  alt="Trip"
                  className="w-full max-h-48 object-cover rounded-md mb-4"
                  width={300}
                  height={100}
                />
              )}
              <UploadButton
                endpoint={"imageUploader"}
                onClientUploadComplete={(res) => {
                  if (res && res[0].ufsUrl) {
                    setImageUrl(res[0].ufsUrl);
                  }
                }}
                onUploadError={(error: Error) => {
                  console.error("Upload failed:", error);
                }}
              />
            </div>
            <Button
              type="submit"
              disabled={isPending}
              className="w-full hover:bg-blue-700 text-white"
            >
              {isPending ? "Creating Trip..." : "Create Trip"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
