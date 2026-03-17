#!/usr/bin/env node
// Simple helper: tries to run the SQL file using `psql`.
// Usage: node scripts/apply-grants.js

import { spawn } from "child_process";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const sqlPath = path.join(process.cwd(), "prisma", "sql", "grants_for_postgres.sql");
if (!fs.existsSync(sqlPath)) {
     console.error("SQL file not found:", sqlPath);
     process.exit(1);
}

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
     console.error("DATABASE_URL not found in environment. Please set it in .env or export it.");
     process.exit(1);
}

console.log("Running psql to apply grants using DATABASE_URL from environment...");

// Spawn psql: first attempt passing the connection string as the DBNAME argument.
const child = spawn("psql", [databaseUrl, "-f", sqlPath], { stdio: "inherit" });

child.on("error", (err) => {
     console.error("Failed to spawn psql. Is psql installed and on PATH?", err.message);
     console.error("You can run the SQL manually using the command below:");
     console.error(`psql "${databaseUrl}" -f ${sqlPath}`);
});

child.on("exit", (code) => {
     if (code === 0) {
          console.log("Grants applied successfully.");
     } else {
          console.error(`psql exited with code ${code}.`);
          console.error("If you're on Windows PowerShell, prefer cmd.exe or wrap the connection string in single quotes.");
     }
});
