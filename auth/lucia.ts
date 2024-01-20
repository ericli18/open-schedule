import { lucia } from "lucia";
import { nextjs_future } from "lucia/middleware";
import { pg } from "@lucia-auth/adapter-postgresql";
import { db } from "@vercel/postgres";

//! Change to PROD when deploying to HTTPS
export const auth = lucia({
	env: process.env.NODE_ENV === "development" ? "DEV" : "PROD",
	middleware: nextjs_future(), // NOT nextjs()
	sessionCookie: {
		expires: false
	},

  //! Add names to the object user key session
  adapter: pg(db, {
		user: "auth_user",
		key: "user_key",
		session: "user_session",
	}),

  getUserAttributes: (data) => {
		return {
			username: data.username,
			email: data.email,
			email_verified: data.email_verified,
			level: data.level,
		};
	}
});

export type Auth = typeof auth;
