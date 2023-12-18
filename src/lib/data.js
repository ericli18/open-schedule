import { sql } from '@vercel/postgres'
import { unstable_noStore } from 'next/cache'

export async function getEmployees() {
  unstable_noStore()
  try {
    const employees = await sql`
      SELECT * FROM employees
    `
    return employees.rows
  }
  catch (error) {
    console.error('Error getting employees', error)
    throw error;
  }
}