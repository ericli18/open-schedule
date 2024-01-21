import { generateRandomString, isWithinExpiration } from "lucia/utils";
import { db, sql } from "@vercel/postgres";

const EXPIRES_IN = 1000 * 60 * 60 * 2; // 2 hours

export const generateEmailVerificationToken = async (userId: string) => {
  const storedUserTokensQuery = await sql`
    SELECT id, expires
    FROM email_verification_token
    WHERE user_id = ${userId}
    ORDER BY expires DESC
  `;
  const storedUserTokens = storedUserTokensQuery.rows;

  if (storedUserTokens.length > 0) {
    const reusableStoredToken = storedUserTokens.find((token) => {
      // check if expiration is within 1 hour
      // and reuse the token if true
      return isWithinExpiration(Number(token.expires) - EXPIRES_IN / 2);
    });
    if (reusableStoredToken) return reusableStoredToken.id;
  }
  const token = generateRandomString(63);
  await sql`INSERT INTO email_verification_token 
  (id, user_id, expires) VALUES 
  (${token}, ${userId}, ${Date.now() + EXPIRES_IN})`;

  return token;
};

export const validateEmailVerificationToken = async (token: string) => {
  const client = await db.connect();
  try {
    await client.query("BEGIN");
    const storedToken = await client.query(
      "SELECT * FROM email_verification_token WHERE id = $1",
      [token]
    );
    if (storedToken.rows.length === 0) throw new Error("Invalid token");
    await client.query("DELETE FROM email_verification_token WHERE id = $1", [token]);
    await client.query("COMMIT");
    return storedToken.rows[0].user_id;
  }
  catch (e) {
    await client.query("ROLLBACK");
    throw e;
  }
  finally {
    client.release();
  }
}
