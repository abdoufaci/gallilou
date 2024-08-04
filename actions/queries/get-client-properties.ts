"use server";

import {
  ModalAdminPropertyData,
  ModalClientPropertyData,
} from "@/hooks/use-filter-modal-store";
import { db } from "@/lib/db";
import { Property } from "@prisma/client";
import { revalidatePath } from "next/cache";

interface getClientPropertiesProps {
  pageParam?: string;
  filterData?: ModalClientPropertyData;
}

const PROPERTIES_BATCH = 12;

export const getClientProperties = async ({
  pageParam: cursor,
  filterData = {},
}: getClientPropertiesProps) => {
  let properties: Property[];

  if (cursor) {
    properties = await db.property.findMany({
      where: {
        isSold: false,
        bathroom: {
          equals: filterData?.bathroom,
        },
        bedroom: {
          equals: filterData?.bedroom,
        },
        wilaya: {
          equals: filterData.wilaya,
        },
        city: {
          contains: filterData.city,
        },
        size: {
          gte: filterData.minSize ? filterData.minSize : 0,
          lte: filterData.maxSize ? filterData.maxSize : undefined,
        },
        type: {
          in: !!filterData.type?.length ? filterData.type : undefined,
        },
        target: {
          in: !!filterData.target?.length ? filterData.target : undefined,
        },
      },
      skip: 1,
      cursor: {
        id: cursor,
      },
      take:
        filterData.bathroom ||
        filterData.bedroom ||
        filterData.city ||
        !!filterData.target?.length ||
        filterData.wilaya ||
        filterData.maxSize ||
        filterData.minSize ||
        !!filterData.type?.length
          ? undefined
          : PROPERTIES_BATCH,
      orderBy: {
        createdAt: "desc",
      },
    });
  } else {
    properties = await db.property.findMany({
      where: {
        isSold: false,
        bathroom: {
          equals: filterData?.bathroom,
        },
        bedroom: {
          equals: filterData?.bedroom,
        },
        wilaya: {
          equals: filterData.wilaya,
        },
        city: {
          contains: filterData.city,
        },
        size: {
          gte: filterData.minSize ? filterData.minSize : 0,
          lte: filterData.maxSize ? filterData.maxSize : undefined,
        },
        type: {
          in: !!filterData.type?.length ? filterData.type : undefined,
        },
        target: {
          in: !!filterData.target?.length ? filterData.target : undefined,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take:
        filterData.bathroom ||
        filterData.bedroom ||
        filterData.city ||
        !!filterData.target?.length ||
        filterData.wilaya ||
        filterData.maxSize ||
        filterData.minSize ||
        !!filterData.type?.length
          ? undefined
          : PROPERTIES_BATCH,
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
