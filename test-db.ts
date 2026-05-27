import { db } from "./server/db";
import { crops, companionPairs } from "./drizzle/schema";

async function run() {
  const allCrops = await db.select().from(crops);
  console.log("Crops:", allCrops);
  const pairs = await db.select().from(companionPairs);
  console.log("Companion Pairs:", pairs);
  process.exit(0);
}
run();
