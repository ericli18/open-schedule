import { sql } from "@vercel/postgres";
import { auth } from "@/auth/lucia";
import { DataTable } from "@/app/clocks/data-table";
import { defaultColumns } from "./EmployeeColumns";

// export const deleteUser = async (id) => {
//   console.log(id)
//   // await auth.deleteUser(id);
// };

export default async function Page() {
  const rows = await sql`SELECT * FROM auth_user WHERE level < 4`;
  const employees = rows.rows;

  return (
    <div className='container mx-auto py-10'>
      <DataTable columns={defaultColumns} data={employees} />
    </div>
  );
}
