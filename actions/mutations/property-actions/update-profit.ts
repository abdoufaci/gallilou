"use server";

import { getCurrentUser } from "@/actions/queries/get-current-user";
import { ProfitformSchema } from "@/components/forms/profit-form";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const UpdateProfit = async ({
  data,
  propertyId,
}: {
  data: z.infer<typeof ProfitformSchema>;
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
