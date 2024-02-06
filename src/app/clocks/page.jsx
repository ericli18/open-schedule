import { columns } from "./columns"
import { DataTable } from "./data-table"
import { sql } from "@vercel/postgres"

import { auth } from "@/auth/lucia";
import * as context from "next/headers";
import { redirect } from "next/navigation";

async function getData(hqsid){
  const { rows } = await sql`
    SELECT * FROM clocks
    WHERE hqsid = ${hqsid}
  `
  console.log(rows)
  return rows;
}

export default async function DemoPage() {
  const authRequest = auth.handleRequest("GET", context);
	const session = await authRequest.validate();
  if (!session) redirect("/login");
  if (!session.user.email_verified) redirect("/");
  const hqsid = session.user.hqsid;

  const data = await getData(hqsid)
  // console.log(data)

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
