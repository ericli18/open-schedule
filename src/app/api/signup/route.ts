import { auth } from "@/../auth/lucia";
import * as context from "next/headers";
import { NextResponse } from "next/server";
import { LuciaError } from "lucia";

import type { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  const formData = await request.formData();
  const username = formData.get("username");
  const password = formData.get("password");
  // basic check
  if (
    typeof username !== "string" ||
    username.length < 4 ||
    username.length > 31
  ) {
    return NextResponse.json(
      {
        error: "Invalid username",
      },
      {
        status: 400,
      }
    );
  }
  if (
    typeof password !== "string" ||
    password.length < 3 ||
    password.length > 255
  ) {
    return NextResponse.json(
      {
        error: "Invalid password",
      },
      {
        status: 400,
      }
    );
  }
  try {
    const user = await auth.createUser({
      key: {
        providerId: "username", // auth method
        providerUserId: username.toLowerCase(), // unique id when using "username" auth method
        password, // hashed by Lucia
      },
      attributes: {
        username,
        email: "",
        email_verified: false,
        level: 0,
      },
    });
    // const session = await auth.createSession({
    //   userId: user.userId,
    //   attributes: {},
    // });
    // const authRequest = auth.handleRequest(request.method, context);
    // authRequest.setSession(session);
    return new Response(null, {
      status: 302,
      // headers: {
      //   Location: "/", // redirect to profile page
      // },
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
          error: "Username already taken",
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
