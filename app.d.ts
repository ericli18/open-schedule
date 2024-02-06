declare namespace Lucia {
	type Auth = import("./src/auth/lucia").Auth;
	type DatabaseUserAttributes = {
		username: string;
		email: string;
		email_verified: boolean;
		level: number;
		hqsid: string;
	};
	type DatabaseSessionAttributes = {};
}