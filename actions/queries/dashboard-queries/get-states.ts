"use server";

import { db } from "@/lib/db";

interface getStatesProps {
  timeline?: {
    from?: Date;
    to?: Date;
  };
}

export const getDashboardStates = async ({ timeline }: getStatesProps) => {
  if (!timeline) {
    return;
  }

  var date = new Date();
  var thisMonthfirstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  var thisMonthlastDay = new Date(date.getFullYear(), date.getMonth() + 1, 1);

  const currentYear = new Date().getFullYear();

  // Get the first day of the year
  const firstDay = new Date(currentYear, 0, 1); // January 1st

  // Get the last day of the year
  const lastDay = new Date(currentYear, 11, 31);

  const revenue = await db.property.aggregate({
    where: {
      isSold: true,
    },
    _sum: {
      profit: true,
    },
  });

  const chartData = await db.property.findMany({
    where: {
      isSold: true,
      soldAt: {
        gte: firstDay,
        lte: lastDay,
      },
    },
  });

  const soldProperties = await db.property.findMany({
    where: {
      isSold: true,
      soldAt: {
        gte: timeline.from,
        lte: timeline.to,
      },
    },
  });

  const propertiesForSell = await db.property.findMany({
    where: {
      isSold: false,
      createdAt: {
        gte: timeline.from,
        lte: timeline.to,
      },
    },
  });

  return {
    revenue,
    propertiesForSell,
    soldProperties,
    chartData,
  };
};
