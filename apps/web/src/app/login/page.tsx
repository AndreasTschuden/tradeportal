import React from "react";
import { Signin } from "@/components/app/Signin";
import { Signup } from "@/components/app/Signup";
import { SignupCompany } from "@/components/app/SignupCompany";

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
      <div>
        <h1 className="text-2xl font-bold">Sign Up - company</h1>
        <SignupCompany />
      </div>
    </div>
  );
};

export default page;
