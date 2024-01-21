export const sendEmailVerificationLink = async (token: string) => {
	const url = `http://localhost:3000/verify/${token}`;
  //TODO: Send email
	console.log(url);
};