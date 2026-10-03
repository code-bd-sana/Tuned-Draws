import React from "react";
import { Metadata } from "next";
import UserAuthLayout from "../../components/user-auth/UserAuthLayout";
import ForgotPasswordForm from "../../components/user-auth/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Forgot Password | Tuned Draws",
  description: "Reset your Tuned Draws account password.",
};

export default function ForgotPasswordPage() {
  return (
    <UserAuthLayout mode="login">
      <ForgotPasswordForm />
    </UserAuthLayout>
  );
}
