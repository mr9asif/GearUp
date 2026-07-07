import "dotenv/config";
import { Pool } from "pg";

async function main() {
  console.log("DATABASE_URL:");
  console.log(process.env.DATABASE_URL);

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    console.log("Connecting...");

    const result = await pool.query("SELECT NOW()");

    console.log("✅ PG SUCCESS");
    console.log(result.rows);
  } catch (e) {
    console.error("❌ PG FAILED");
    console.dir(e, { depth: null });
  } finally {
    await pool.end();
  }
}

main();