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

//might not be needed since in a server component
export async function getShifts() {
  unstable_noStore()
  try {
    const shifts = await sql`
      SELECT * FROM shifts
    `
    return shifts.rows
  }
  catch (error) {
    console.error('Error getting shifts', error)
    throw error;
  }
}