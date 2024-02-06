import { auth } from "@/auth/lucia";
import { NextResponse } from "next/server";
import { LuciaError } from "lucia";
import * as context from "next/headers";

import type { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
	const authRequest = auth.handleRequest("GET", context);
	const session = await authRequest.validate();
  if (!session) {
		return new Response(null, {
			status: 401
		});
	}
  const userId = session.user.userId;

  const isValidEmail = (maybeEmail: unknown): maybeEmail is string => {
    if (typeof maybeEmail !== "string") return false;
    if (maybeEmail.length > 255) return false;
    const emailRegexp = /^.+@.+$/; // [one or more character]@[one or more character]
    return emailRegexp.test(maybeEmail);
  };

  const formData = await request.formData();
  const email = formData.get("email");
  // basic check
  if (!isValidEmail(email)) {
    return NextResponse.json(
      {
        error: "Invalid email",
      },
      {
        status: 400,
      }
    );
  }
  try {

    //TODO: Add error handling for duplicate keys
    //? Should I just delete before?
    await auth.createKey({
      userId: userId, 
      providerId: "email",
      providerUserId: email.toLowerCase(),
      password: null
    });
    await auth.updateUserAttributes(
      userId,
      {
        email: email.toLowerCase(),
      }
    );
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/", // redirect to profile page
      },
    });
  } catch (e) {
    console.log(e)
    // this part depends on the database you're using
    // check for unique constraint error in user table
    if (
      e //*Check error later
    ) {
      return NextResponse.json(
        {
          error: "Unknown error occurred",
        },
        {
          status: 400,
        }
      );
    }

    if (e instanceof LuciaError && e.message === `AUTH_INVALID_USER_ID`) {
      console.log(e);
    }

    return NextResponse.json(
      {
        error: "An unknown error occurred",
      },
      {
        status: 500,
      }
    );
  }
};
