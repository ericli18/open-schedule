import { auth } from "@/auth/lucia";
import * as context from "next/headers";
import { redirect } from "next/navigation";

import LoginForm from "@/components/Forms/LoginForm"

const Page = async () => {
  const authRequest = auth.handleRequest("GET", context);
	const session = await authRequest.validate();
	if (session) redirect("/");

	return (
		<div className="min-h-screen flex flex-col justify-center items-center">
			<h1>Sign in</h1>
			<LoginForm/>
		</div>
	);
};

export default Page;