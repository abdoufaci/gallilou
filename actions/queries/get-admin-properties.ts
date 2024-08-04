"use server";

import { ModalAdminPropertyData } from "@/hooks/use-filter-modal-store";
import { db } from "@/lib/db";
import { Property } from "@prisma/client";
import { revalidatePath } from "next/cache";

interface getPropertiesProps {
  pageParam?: string;
  filterData?: ModalAdminPropertyData;
}

const PROPERTIES_BATCH = 12;

export const getProperties = async ({
  pageParam: cursor,
  filterData = {},
}: getPropertiesProps) => {
  let properties: Property[];

  if (cursor) {
    properties = await db.property.findMany({
      where: {
        OR: [
          {
            city: {
              contains: filterData.searchTerm,
              mode: "insensitive",
            },
          },
          {
            location: {
              contains: filterData.searchTerm,
              mode: "insensitive",
            },
          },
          {
            wilaya: {
              contains: filterData.searchTerm,
              mode: "insensitive",
            },
          },
        ],
        isSold:
          filterData.status && filterData.status != "all"
            ? filterData.status === "availabel"
              ? false
              : true
            : undefined,
        createdAt: filterData.timeline
          ? {
              gte: filterData.timeline.from,
              lte: filterData.timeline.to,
            }
          : undefined,
      },
      skip: 1,
      cursor: {
        id: cursor,
      },
      take:
        filterData.searchTerm === "" &&
        filterData.status === "" &&
        !filterData.timeline?.from &&
        !filterData.timeline?.to
          ? PROPERTIES_BATCH
          : undefined,
      orderBy: {
        createdAt: "desc",
      },
    });
  } else {
    properties = await db.property.findMany({
      where: {
        OR: [
          {
            city: {
              contains: filterData.searchTerm,
              mode: "insensitive",
            },
          },
          {
            location: {
              contains: filterData.searchTerm,
              mode: "insensitive",
            },
          },
          {
            wilaya: {
              contains: filterData.searchTerm,
              mode: "insensitive",
            },
          },
        ],
        isSold:
          filterData.status && filterData.status != "all"
            ? filterData.status === "availabel"
              ? false
              : true
            : undefined,
        createdAt: filterData.timeline
          ? {
              gte: filterData.timeline.from,
              lte: filterData.timeline.to,
            }
          : undefined,
      },
      orderBy: {
        createdAt: "desc",
      },
      take:
        filterData.searchTerm === "" &&
        filterData.status === "" &&
        !filterData.timeline?.from &&
        !filterData.timeline?.to
          ? PROPERTIES_BATCH
          : undefined,
    });
  }

  let nextCursor = null;
  if (properties.length === PROPERTIES_BATCH) {
    nextCursor = properties[properties.length - 1].id;
  }

  revalidatePath("/dashboard/properties");

  return {
    properties,
    nextCursor,
  };
};
