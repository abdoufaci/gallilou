import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import Image from "next/image";

interface ImageCarouselProps {
  images?: Prisma.JsonValue[];
}

function ImageCarousel({ images }: ImageCarouselProps) {
  let convertedImages = images as Prisma.JsonArray;

  return (
    <Carousel className={cn("w-full max-w-[946px] mx-auto")}>
      <CarouselContent className="w-full ">
        {convertedImages?.map((image, index) => (
          <CarouselItem key={index} className="w-full ">
            <Card className="w-full">
              <CardContent className="flex flex-col h-[600px] items-center justify-center p-6 w-full">
                <Image
                  alt="travel"
                  src={
                    //@ts-ignore
                    image.url || ""
                  }
                  height={600}
                  width={600}
                  quality={100}
                  objectFit="cover"
                  className="w-full h-full object-cover"
                />
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export default ImageCarousel;
