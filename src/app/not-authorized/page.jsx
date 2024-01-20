const Page = () => {
  return (
    <div class='min-h-screen flex flex-grow items-center justify-center bg-gray-50'>
      <div class='rounded-lg bg-white p-8 text-center shadow-xl'>
        <h1 class='mb-4 text-4xl font-bold'>Not authorized</h1>
        <p class='text-gray-600'>
          You do not have the permissions to access this page.
        </p>
        <a
          href='/'
          class='mt-4 inline-block rounded bg-sky-800 px-4 py-2 font-semibold text-white hover:bg-sky-950'
        >
          {" "}
          Go back to Home{" "}
        </a>
      </div>
    </div>
  );
};

export default Page;
