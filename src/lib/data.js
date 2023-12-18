import { sql } from '@vercel/postgres'

export async function getEmployees() {
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