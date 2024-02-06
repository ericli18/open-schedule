import { sql } from "@vercel/postgres";
import { auth } from "@/auth/lucia";

export default async function Page() {
  const rows = await sql`SELECT * FROM auth_user WHERE level < 4`;
  const employees = rows.rows;

  const deleteUser = async (id) => {
    await auth.deleteUser(id);
  };
  return (
    <div className="flex flex-col gap-8">
      <h1>Hello</h1>
      {employees.map((employee) => {
        return (
            <div key={employee.id}>{employee.username}</div>
        );
      })}
    </div>
  );
}
