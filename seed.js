import "dotenv/config";
import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import process from "process";

console.log("URL:", process.env.SUPABASE_URL);
console.log("Service Key:", process.env.SUPABASE_SERVICE_ROLE_KEY ? "Loaded" : "Missing");

const supabaseUrl = process.env.SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceKey) {
     console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in environment. Aborting.");
     process.exit(1);
}

// Small preflight check to surface DNS/network issues early
async function preflightCheck() {
     try {
          // HEAD is enough to verify the host resolves and is reachable
          const res = await fetch(supabaseUrl, { method: "HEAD" });
          console.log("Preflight check status:", res.status);
     } catch (e) {
          console.error("Preflight fetch failed:", e?.message || e);
          // Print nested cause (node's undici often nests the DNS error in `cause`)
          if (e?.cause) console.error("Cause:", e.cause);
          throw e;
     }
}

// Initialize Supabase client
const supabase = createClient(supabaseUrl, serviceKey);

// Load seed data
const data = JSON.parse(fs.readFileSync("./himalayan_treks.json", "utf8"));

async function seed() {
     const now = new Date().toISOString();

     // Add timestamps to each record
     const withTimestamps = data.map((d) => ({
          ...d,
          createdAt: now,
          updatedAt: now,
     }));

     console.log(`⛰️  Inserting ${withTimestamps.length} destinations...`);

     // Perform preflight network check before attempting DB insert
     await preflightCheck();

     // Insert data into Supabase
     const { data: inserted, error } = await supabase
          .from("Destination")
          .insert(withTimestamps)
          .select(); // <-- this tells Supabase to return inserted rows

     if (error) {
          console.error("❌ Error inserting:", error.message || error);
     } else {
          console.log(`✅ Inserted ${inserted?.length || 0} treks successfully!`);
     }
}

seed()
     .catch((e) => console.error("❌ Unexpected error:", e))
     .finally(() => process.exit());
