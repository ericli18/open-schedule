import { auth } from "@/../auth/lucia";
import * as context from "next/headers";
import { redirect } from "next/navigation";

import Form from "@/components/Form";
import SignupForm from "@/components/SignupForm";
import Link from "next/link";

const Page = async () => {
  const authRequest = auth.handleRequest("GET", context);
  const session = await authRequest.validate();
  // if (session) redirect("/");
  if (session.user.level < 2) {
    redirect("/");
  }
  return (
    <>
      <h1>Create employee</h1>
      {/* <Form action='/api/signup'>
        <label htmlFor='username'>Username</label>
        <input name='username' id='username' />
        <br />
        <label htmlFor='password'>Password</label>
        <input type='password' name='password' id='password' />
        <br />
        <label htmlFor='hqsid'>HQSID</label>
        <input name='hqsid' id='hqsid' />
        <br />
        <input type='submit' />
      </Form> */}
      <SignupForm />
      <Link href='/login'>Sign in</Link>
    </>
  );
};

export default Page;
