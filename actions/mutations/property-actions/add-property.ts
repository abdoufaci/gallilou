"use server";

import { getCurrentUser } from "@/actions/queries/get-current-user";
import { AddPropertyformSchema } from "@/components/forms/add-property-form";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const AddProperty = async (
  data: z.infer<typeof AddPropertyformSchema>
) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    throw new Error("couldn't get current User");
  }

  const property = await db.property.create({
    data: {
      ...data,
    },
  });

  revalidatePath("/dashboard/properties");

  return property;
};
