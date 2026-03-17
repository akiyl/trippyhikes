import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import fs from "fs";
import process from "process";

const prisma = new PrismaClient({
     adapter: new PrismaPg(new Pool({ connectionString: process.env.DATABASE_URL })),
});


// Load seed data
const data = JSON.parse(fs.readFileSync("./himalayan_treks.json", "utf8"));

function randomHeight() {
     const heights = [250, 200, 600];
     return heights[Math.floor(Math.random() * heights.length)];
}

async function seed() {
     const now = new Date();

     // Add timestamps to each record
     const withTimestamps = data.map((d) => ({
          ...d,
          height: randomHeight(),
          createdAt: now,
          updatedAt: now,
     }));

     console.log(`⛰️  Inserting ${withTimestamps.length} destinations...`);

     try {
          const inserted = await prisma.destination.createMany({
               data: withTimestamps,
               skipDuplicates: true,
          });
          console.log(`✅ Inserted ${inserted.count} treks successfully!`);
     } catch (error) {
          console.error("❌ Error inserting:", error.message || error);
          throw error;
     }
}

seed()
     .catch((e) => {
          console.error("❌ Unexpected error:", e);
          process.exit(1);
     })
     .finally(async () => {
          await prisma.$disconnect();
          process.exit(0);
     });
