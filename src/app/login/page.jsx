import { auth } from "@/auth/lucia";
import * as context from "next/headers";
import { redirect } from "next/navigation";

import LoginForm from "@/components/Forms/LoginForm"

const Page = async () => {
  const authRequest = auth.handleRequest("GET", context);
	const session = await authRequest.validate();
	if (session) redirect("/");

	return (
		<div className="min-h-screen grid place-content-center">
			<LoginForm/>
		</div>
	);
};

export default Page;