import { getEmployees } from "@/lib/data"

export default async function Page() {
  const employees = await getEmployees()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl text-neutral-900">Welcome to the dashboard!</h1>
      <p className="text-lg text-neutral-700">This is a protected route.</p>
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-2xl text-neutral-900">Employees</h2>
        <ul className="mt-4">
          {employees.map((employee) => (
            <li key={employee.id} className="text-lg text-neutral-700">
              {employee.name}
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}