"use server";

import { getCurrentUser } from "@/actions/queries/get-current-user";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const MakeUnsold = async ({ id }: { id?: string }) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    throw new Error("couldn't get current User");
  }

  const property = await db.property.update({
    where: {
      id,
    },
    data: {
      isSold: false,
    },
  });

  revalidatePath("/dashboard/properties");

  return property;
};
