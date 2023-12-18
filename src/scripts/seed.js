const { db } = require('@vercel/postgres')
const { employees, shifts } = require('../lib/placeholder-data')

async function seedEmployees(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"` //unique identifier, not sure if needed for this project
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS employees (
        id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        name varchar(255) NOT NULL,
        position varchar(255) NOT NULL,
        email TEXT NOT NULL UNIQUE
      )
    `

    console.log('Created employees table')

    const insertedEmployees = await Promise.all(
      employees.map(async (employee) => {
        return client.sql`
          INSERT INTO employees (name, position, email)
          VALUES (${employee.name}, ${employee.position}, ${employee.email})
          RETURNING *
        `
      })
    )

    console.log(`Seeded ${insertedEmployees.length} employees`);

    return {
      createTable,
      empoloyees: insertedEmployees,
    }
  }
  catch (error) {
    console.error('Error seeding employees', error)
    throw error;
  }
}

async function seedShifts(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"` //unique identifier, not sure if needed for this project

    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS shifts (
        id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        start_timedate TEXT NOT NULL,
        end_timedate TEXT NOT NULL,
        title varchar(255) NOT NULL
      )
    `

    console.log('Created shifts table')

    const insertedShifts = await Promise.all(
      shifts.map(async (shift) => {
        return client.sql`
          INSERT INTO shifts (start_timedate, end_timedate, title)
          VALUES (${shift.start}, ${shift.end}, ${shift.title})
          RETURNING *
        `
      })
    )

    console.log(`Seeded ${insertedShifts.length} shifts`);

    return {
      createTable,
      shifts: insertedShifts,
    }
  }
  catch (error) {
    console.error('Error seeding shifts', error)
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedEmployees(client);
  await seedShifts(client);

  await client.end();
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
