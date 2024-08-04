import { Property } from "@prisma/client";

interface chartDataProps {
  properties?: Property[];
}

export const chartData = ({ properties }: chartDataProps) => {
  const data = [
    {
      month: "Jan",
      sales: properties
        ?.filter(
          (property) =>
            property.createdAt.toLocaleString("en-US", {
              month: "short",
            }) === "Jan"
        )
        .reduce((acc, property) => acc + property.profit, 0),
    },
    {
      month: "Feb",
      sales: properties
        ?.filter(
          (property) =>
            property.createdAt.toLocaleString("en-US", {
              month: "short",
            }) === "Feb"
        )
        .reduce((acc, property) => acc + property.profit, 0),
    },
    {
      month: "Mar",
      sales: properties
        ?.filter(
          (property) =>
            property.createdAt.toLocaleString("en-US", {
              month: "short",
            }) === "Mar"
        )
        .reduce((acc, property) => acc + property.profit, 0),
    },
    {
      month: "Apr",
      sales: properties
        ?.filter(
          (property) =>
            property.createdAt.toLocaleString("en-US", {
              month: "short",
            }) === "Apr"
        )
        .reduce((acc, property) => acc + property.profit, 0),
    },
    {
      month: "May",
      sales: properties
        ?.filter(
          (property) =>
            property.createdAt.toLocaleString("en-US", {
              month: "short",
            }) === "May"
        )
        .reduce((acc, property) => acc + property.profit, 0),
    },
    {
      month: "Jun",
      sales: properties
        ?.filter(
          (property) =>
            property.createdAt.toLocaleString("en-US", {
              month: "short",
            }) === "Jun"
        )
        .reduce((acc, property) => acc + property.profit, 0),
    },
    {
      month: "Jul",
      sales: properties
        ?.filter(
          (property) =>
            property.createdAt.toLocaleString("en-US", {
              month: "short",
            }) === "Jul"
        )
        .reduce((acc, property) => acc + property.profit, 0),
    },
    {
      month: "Aug",
      sales: properties
        ?.filter(
          (property) =>
            property.createdAt.toLocaleString("en-US", {
              month: "short",
            }) === "Aug"
        )
        .reduce((acc, property) => acc + property.profit, 0),
    },
    {
      month: "Sept",
      sales: properties
        ?.filter(
          (property) =>
            property.createdAt.toLocaleString("en-US", {
              month: "short",
            }) === "Sept"
        )
        .reduce((acc, property) => acc + property.profit, 0),
    },
    {
      month: "Oct",
      sales: properties
        ?.filter(
          (property) =>
            property.createdAt.toLocaleString("en-US", {
              month: "short",
            }) === "Oct"
        )
        .reduce((acc, property) => acc + property.profit, 0),
    },
    {
      month: "Nov",
      sales: properties
        ?.filter(
          (property) =>
            property.createdAt.toLocaleString("en-US", {
              month: "short",
            }) === "Nov"
        )
        .reduce((acc, property) => acc + property.profit, 0),
    },
    {
      month: "Dec",
      sales: properties
        ?.filter(
          (property) =>
            property.createdAt.toLocaleString("en-US", {
              month: "short",
            }) === "Dec"
        )
        .reduce((acc, property) => acc + property.profit, 0),
    },
  ];

  return data;
};
