"use server";

import { getCurrentUser } from "@/actions/queries/get-current-user";
import { BuyerInfoformSchema } from "@/components/forms/buyer-info-form";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const UpdateBuyerInfo = async ({
  data,
  propertyId,
}: {
  data: z.infer<typeof BuyerInfoformSchema>;
  propertyId?: string;
}) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    throw new Error("couldn't get current User");
  }

  const property = await db.property.update({
    where: {
      id: propertyId,
    },
    data: {
      ...data,
    },
  });

  revalidatePath("/dashboard/properties");

  return property;
};
