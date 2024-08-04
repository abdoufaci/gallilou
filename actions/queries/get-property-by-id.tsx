import { db } from "@/lib/db";

export const getPropertyById = async (id: string) => {
  const property = await db.property.findUnique({
    where: {
      id,
    },
  });

  return property;
};
