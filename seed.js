import "dotenv/config";
import { createClient } from "@supabase/supabase-js";
import fs from "fs";

console.log("URL:", process.env.SUPABASE_URL);
console.log("Service Key:", process.env.SUPABASE_SERVICE_ROLE_KEY ? "Loaded" : "Missing");

// Initialize Supabase client
const supabase = createClient(
     process.env.SUPABASE_URL,
     process.env.SUPABASE_SERVICE_ROLE_KEY
);

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
