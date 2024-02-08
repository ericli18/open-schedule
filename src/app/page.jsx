import { auth } from "@/auth/lucia";
import * as context from "next/headers";
import { redirect } from "next/navigation";

import Form from "@/components/Form";

const Page = async () => {
	const authRequest = auth.handleRequest("GET", context);
	const session = await authRequest.validate();
	if (!session) redirect("/login");
	const email = session.user.email;
	const email_verified = session.user.email_verified;
	return (
		<main>
			<h1>Profile</h1>
			<p>Username: {session.user.username}</p>
			<Form action="/api/email">
				<label htmlFor="email">Email</label>
				{email_verified ? (
					<input name="email" id="email" defaultValue={email} readOnly />
				) : (
					<input name="email" id="email" defaultValue={email} />
				)}
				<br />
				<input type="submit" />
			</Form>
			<Form action="/api/logout">
				<input type="submit" value="Sign out" />
			</Form>
		</main>
	);
};

export default Page;