"use server";

import { InviteUserformSchema } from "@/components/forms/Invite-user-form";
import { clerkClient } from "@clerk/nextjs/server";
import { z } from "zod";

export const inviteUser = async ({
  email,
}: z.infer<typeof InviteUserformSchema>) => {
  await clerkClient.allowlistIdentifiers.createAllowlistIdentifier({
    identifier: email,
    notify: true,
  });
};
