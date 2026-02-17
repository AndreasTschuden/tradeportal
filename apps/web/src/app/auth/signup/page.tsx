import React from "react";
import { Signup } from "@/components/app/Signup";

const Page = async () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4">Sign up (customer)</h1>
        <Signup />
      </div>
    </div>
  );
};

export default Page;
