"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { useSession } from "next-auth/react";
import { FomatUser } from "@/lib/utils";

const Page = () => {
  const { data: session } = useSession();

  return (
    <section className="py-20">
      <div className="container flex flex-col gap-2">
        <div className="flex gap-4 items-center">
          <p className="text-3xl font-bold">
            User {FomatUser(session?.user.username as string)}
          </p>
          <ArrowRight className="h-5 w-5" />
        </div>
        <p className="text-muted-foreground">
          create your own custom profile page
        </p>
      </div>
    </section>
  );
};

export default Page;
