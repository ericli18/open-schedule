import { sql } from "@vercel/postgres";

export default async function Page() {
  const rows = await sql`SELECT * FROM auth_user`;
  const employees = rows.rows;
  return (
    <>
      <h1>Hello</h1>
      {employees.map((employee, i) => {
        return (<div key={i}>{employee.username}</div>);
      })}
    </>
  );
}
