"use server";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "../prisma";

export async function createTrip(formData: FormData) {
  const session = await auth();
  if (!session || !session.user?.id) {
    throw new Error("Unauthorized");
  }
  const title = formData.get("title")?.toString();
  const description = formData.get("description")?.toString();
  const imageUrl = formData.get("imageUrl")?.toString();
  const startDateStr = formData.get("startDate")?.toString();
  const endDateStr = formData.get("endDate")?.toString();

  if (!title || !description || !startDateStr || !endDateStr) {
    throw new Error("All fields are required");
  }
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);

  if (startDate >= endDate) {
    throw new Error("Start date must be before end date");
  }

  await prisma.trip.create({
    data: {
      title,
      description,
      imageUrl, // Optional field
      startDate,
      endDate,
      userId: session.user.id,
    },
  });
  redirect("/trips");
}
