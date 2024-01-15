import { auth } from "@/../auth/lucia";
import { generateEmailVerificationToken } from "@/../auth/token";
import { sendEmailVerificationLink } from "@/../auth/email";

import type { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
	const authRequest = auth.handleRequest(request);
	const session = await authRequest.validate();
	if (!session) {
		return new Response(null, {
			status: 401
		});
	}
	if (session.user.email_verified) {
		return new Response(
			JSON.stringify({
				error: "Email already verified"
			}),
			{
				status: 422
			}
		);
	}
	try {
    console.log("here")
		const token = await generateEmailVerificationToken(session.user.userId);
    console.log(token)
		await sendEmailVerificationLink(token);
		return new Response();
	} catch (e) {
    console.log(e)
		return new Response(
			JSON.stringify({
				error: "An unknown error occurred"
			}),
			{
				status: 500
			}
		);
	}
};