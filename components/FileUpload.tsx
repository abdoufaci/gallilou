"use client";

import { XIcon } from "lucide-react";
import Image from "next/image";

import "@uploadthing/react/styles.css";
import { UploadDropzone } from "@/utils/uploadthing";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useModal } from "@/hooks/use-modal-store";
import { ElementRef, useRef } from "react";
import { Button } from "./ui/button";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { deleteFiles } from "@/actions/mutations/delete-file";

interface FileUploadProps {
  onChange: (url?: any[]) => void;
  value?: any[] | null;
  endpoint: "imageUploader" | "labelFile";
}

export const FileUpload = ({
  onChange,
  value,
  endpoint = "imageUploader",
}: FileUploadProps) => {
  const { type } = useModal();

  const { mutate } = useMutation({
    mutationFn: (image: any[]) =>
      //@ts-ignore
      deleteFiles(image),
    onSuccess(data) {
      onChange(value?.filter((value) => !data?.includes(value.key)));
    },
    onError() {
      toast.error("Something went wrong, try again.");
    },
    onMutate() {
      toast.loading("removing...");
    },
    onSettled() {
      toast.dismiss();
    },
  });

  return (
    <ScrollArea className="w-full max-w-[350px] md:!max-w-[450px]">
      {!!value?.length && value?.length > 1 && (
        <h1
          onClick={() =>
            type?.endsWith("Details") ? onChange([]) : mutate(value)
          }
          className="underline font-semibold text-sm cursor-pointer">
          clear all images
        </h1>
      )}
      <div className="flex items-center gap-2">
        {value?.map((image: any, idx) => (
          <div key={idx} className="w-[250px] h-[244px] relative">
            <Image
              key={image.key}
              alt="image"
              src={image.url || ""}
              height={600}
              width={300}
              className="rounded-lg w-full h-full object-cover"
            />
            <XIcon
              className="h-8 w-8 text-[#66717E] bg-[#66717E]/50 rounded-full p-1.5 cursor-pointer absolute top-2 right-2"
              onClick={() =>
                type?.endsWith("Details")
                  ? onChange(value?.filter((value) => value.key != image.key))
                  : mutate([image])
              }
            />
          </div>
        ))}
        <UploadDropzone
          endpoint={endpoint}
          onClientUploadComplete={(res) => {
            const convertedRes = res.map((res) => ({
              url: res.url,
              key: res.key,
            }));
            onChange([...(value ?? []), ...convertedRes]);
          }}
          onUploadError={(error: Error) => {
            console.log(error);
          }}
        />
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};
