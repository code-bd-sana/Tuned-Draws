import React, { Suspense } from "react";
import { Metadata } from "next";
import UserAuthLayout from "../../components/user-auth/UserAuthLayout";
import UserLoginForm from "../../components/user-auth/UserLoginForm";

export const metadata: Metadata = {
  title: "Player Login | Tuned Draws",
  description: "Log in to your Tuned Draws account to view live competitions, purchase tickets, and view winners.",
};

/**
 * Customer/User Login Page. Composes UserAuthLayout and UserLoginForm with Suspense boundary.
 */
export default function UserLoginPage() {
  return (
    <UserAuthLayout mode="login">
      <Suspense
        fallback={
          <div className="w-full max-w-xl mx-auto h-96 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-[#FF1E27] border-t-transparent rounded-full animate-spin" />
          </div>
        }
      >
        <UserLoginForm />
      </Suspense>
    </UserAuthLayout>
  );
}
