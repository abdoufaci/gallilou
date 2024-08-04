"use server";

import { db } from "@/lib/db";

interface getStatesProps {
  timeline?: {
    from?: Date;
    to?: Date;
  };
}

export const getBeforeMonthStates = async ({ timeline }: getStatesProps) => {
  if (!timeline?.from) {
    return;
  }

  const to = new Date(timeline.from);

  let fromBefore = new Date(timeline.from);

  fromBefore.setMonth(fromBefore.getMonth() - 1);

  const soldProperties = await db.property.findMany({
    where: {
      isSold: true,
      soldAt: {
        gte: fromBefore,
        lte: to,
      },
    },
  });

  const propertiesForSell = await db.property.findMany({
    where: {
      isSold: false,
      createdAt: {
        gte: fromBefore,
        lte: to,
      },
    },
  });

  return {
    propertiesForSell,
    soldProperties,
  };
};
