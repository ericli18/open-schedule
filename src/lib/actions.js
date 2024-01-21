'use server'
import { sql } from '@vercel/postgres'
import dayjs from 'dayjs'

export async function createShift(formData) {
  try {
    const rawFormData = {
      title: formData.title,
    }
    const startDatetime = dayjs(formData.startDate).format('YYYY-MM-DD') + 'T' + formData.startTime
    const endDatetime = dayjs(formData.endDate).format('YYYY-MM-DD') + 'T' + formData.endTime
    const query = sql`
      INSERT INTO shifts
      (title, start_timedate, end_timedate)
      VALUES
      (${rawFormData.title}, ${startDatetime}, ${endDatetime})
      RETURNING *
    `
    return query
  }
  catch (error) {
    console.error('Error creating shift', error)
    throw error;
  }

}