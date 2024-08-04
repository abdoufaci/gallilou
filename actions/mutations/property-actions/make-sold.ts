"use server";

import { getCurrentUser } from "@/actions/queries/get-current-user";
import { MakeSoldformSchema } from "@/components/forms/make-sold-form";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const MakeSold = async ({
  data,
  propertyId,
}: {
  data: z.infer<typeof MakeSoldformSchema>;
  propertyId?: string;
}) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    throw new Error("couldn't get current User");
  }

  const property = await db.property.update({
    where: {
      id: propertyId ?? "",
    },
    data: {
      ...data,
      isSold: true,
      soldAt: new Date(new Date().toUTCString()),
    },
  });

  revalidatePath("/dashboard/properties");

  return property;
};
