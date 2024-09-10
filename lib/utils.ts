"use client";

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useSession } from "next-auth/react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const FomatUser = (username: string) => {
  const { data: session } = useSession();

  if (username === undefined) {
    return session?.user.name?.split(" ").join("");
  }

  return session?.user.username;
};
