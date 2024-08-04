import { currentUser } from "@clerk/nextjs/server";

export const getCurrentUser = async () => {
  const clerkUser = await currentUser();
  const email = clerkUser?.emailAddresses[0].emailAddress;

  return email;
};
