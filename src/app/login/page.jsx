import { auth } from "@/auth/lucia";
import * as context from "next/headers";
import { redirect } from "next/navigation";

import Form from "@/components/Form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Page = async () => {
  const authRequest = auth.handleRequest("GET", context);
	const session = await authRequest.validate();
	if (session) redirect("/");

	return (
		<div className="min-h-screen flex flex-col justify-center items-center">
			<h1>Sign in</h1>
			<Form action="/api/login">
				<div className="flex flex-col gap-2">
					<Label htmlFor="username">Username</Label>
					<Input name="username" id="username" />
					<Label htmlFor="password">Password</Label>
					<Input type="password" name="password" id="password" />
					<Button type="submit" className="w-full">
						Sign in
					</Button>
				</div>
			</Form>
		</div>
	);
};

export default Page;