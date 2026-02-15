import React from "react";
import { Signin } from "@/components/app/Signin";
import { Signup } from "@/components/app/Signup";

const page = async () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4 lg:flex-row">
      <div>
        <h1 className="text-2xl font-bold">Login</h1>
        <Signin />
      </div>
      <div>
        <h1 className="text-2xl font-bold">Sign Up - customer</h1>
        <Signup />
      </div>
    </div>
  );
};

export default page;
