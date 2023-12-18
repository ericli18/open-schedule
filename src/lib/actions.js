'use server'
import { sql } from '@vercel/postgres'

export async function createShift(formData) {
  try {
    const shifts = await sql`
      INSERT INTO shifts (employee_id, start_time, end_time)
      VALUES (${formData.employee_id}, ${formData.start_time}, ${formData.end_time})
      RETURNING *
    `
    return shifts.rows
  }
  catch (error) {
    console.error('Error creating shift', error)
    throw error;
  }

}