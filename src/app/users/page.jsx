import { sql } from "@vercel/postgres";
import { auth } from "@/auth/lucia";

export default async function Page() {
  const rows = await sql`SELECT * FROM auth_user WHERE level < 4`;
  const employees = rows.rows;
  console.log(employees)

  const deleteUser = async (id) =>
  {
    await auth.deleteUser(id);
  }

  return (
    <>
      <h1>Hello</h1>
      {employees.map((employee, i) => {
        return <div key={i}>{employee.username}</div>;
      })}
    </>
  );
}
