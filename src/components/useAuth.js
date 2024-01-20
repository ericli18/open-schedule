import { auth } from "../../auth/lucia";
import { redirect } from "next/navigation";

const useAuth = async (context, level) => {
  const authRequest = auth.handleRequest("GET", context);
  const session = await authRequest.validate();

  if (!session) {
    redirect(context, "/login");
  }

  if (!session.user.email_verified || session.user.level < level) {
    redirect(context, "/login");
  }
}

export default useAuth;