const { db } = require('@vercel/postgres')
const { clocks } = require('../lib/sample.js')

async function seedClocks(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS clocks (
        id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        type TEXT NOT NULL,
        date TEXT NOT NULL,
        hqsid varchar(255) NOT NULL
      )`
    console.log('Created clocks table')

    const insertedClocks = await Promise.all(
      clocks.map(async (clock) => {
        return client.sql`
          INSERT INTO clocks (type, date, hqsid)
          VALUES (${clock.type}, ${clock.date}, ${clock.id})
          RETURNING *
        `
      })
    )

    console.log(`Seeded ${insertedClocks.length} employees`);

    return {
      createTable,
      clocks: insertedClocks,
    }
  }
  catch (error) {
    console.error('Error seeding clocks', error)
    throw error;
  }
}
async function main() {
  const client = await db.connect();

  await seedClocks(client);

  await client.end();
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
