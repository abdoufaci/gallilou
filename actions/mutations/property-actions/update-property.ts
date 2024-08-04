"use server";

import { getCurrentUser } from "@/actions/queries/get-current-user";
import { JsonValue } from "@prisma/client/runtime/library";
import { deleteFiles } from "../delete-file";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const UpdateProperty = async ({
  data,
  images,
  id,
}: {
  data: any;
  images?: JsonValue;
  id?: string;
}) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    throw new Error("couldn't get current User");
  }

  if (data?.images) {
    //@ts-ignore
    deleteFiles(images);
  }

  const property = await db.property.update({
    where: {
      id: id ?? "",
    },
    data: {
      ...data,
    },
  });

  revalidatePath("/dashboard/properties");

  return property;
};
