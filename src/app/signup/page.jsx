import { auth } from "@/auth/lucia";
import * as context from "next/headers";
import { redirect } from "next/navigation";

import SignupForm from "@/components/Forms/SignupForm";
import Link from "next/link";

const Page = async () => {
  const authRequest = auth.handleRequest("GET", context);
  const session = await authRequest.validate();
  // if (session) redirect("/");
  if (session.user.level < 2) {
    redirect("/");
  }
  return (
    <main className="min-h-screen grid place-content-center p-2">
      <SignupForm />
    </main>
  );
};

export default Page;
