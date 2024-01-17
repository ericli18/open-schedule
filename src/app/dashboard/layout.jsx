import Header from "@/components/Header";

import { auth } from "@/../auth/lucia";
import * as context from "next/headers";
import { redirect } from "next/navigation";

export default async function Layout({ children }) {
  const authRequest = auth.handleRequest("GET", context);
	const session = await authRequest.validate();
	if (!session) redirect("/login");
	if (!session.user.email_verified) redirect("/verify");
  return (
    <>
      <Header />
      {children}
    </>
  );
}