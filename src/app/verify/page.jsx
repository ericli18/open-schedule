import { auth } from  "@/auth/lucia";
import * as context from "next/headers";
import { redirect } from "next/navigation";

import Form from "@/components/Form";

const Page = async () => {
	const authRequest = auth.handleRequest("GET", context);
	const session = await authRequest.validate();
	if (!session) redirect("/login");
	if (session.user.email_verified) redirect("/");
	return (
		<>
			<h1>Email verification</h1>
			<p>Your email verification link was sent to your inbox (i.e. console).</p>
			<h2>Resend verification link</h2>
			<Form
				action="/api/email-verification"
			>
				<input type="submit" value="Resend" />
			</Form>
		</>
	);
};

export default Page;