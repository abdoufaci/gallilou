"use server";

import { db } from "@/lib/db";

export const Get6Properties = async () => {
  const properties = await db.property.findMany({
    where: {
      isSold: false,
    },
    take: 6,
    orderBy: {
      createdAt: "desc",
    },
  });

  return properties;
};
