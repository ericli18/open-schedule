"use client";

import { useRouter } from "next/navigation";

//! Change to using react-hook-form with lazy then aggressive validation
const Form = ({ children, action }) => {
  const router = useRouter();
  return (
    <form
      action={action}
      method='post'
      onSubmit={async (e) => {
        e.preventDefault();
        // console.log(e.currentTarget)
        const formData = new FormData(e.currentTarget);
        // console.log(formData)
        const response = await fetch(action, {
          method: "POST",
          body: formData,
          redirect: "manual",
        });

        if (response.status === 0) {
          // redirected
          // when using `redirect: "manual"`, response status 0 is returned
          return router.refresh();
        }
      }}
    >
      {children}
    </form>
  );
};

export default Form;
