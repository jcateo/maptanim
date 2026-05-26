import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "../drizzle/schema";
import * as dotenv from "dotenv";

dotenv.config();

const cropsData = [
  { name: "Ampalaya", localName: "Ampalaya", family: "Cucurbitaceae", season: "both" as const, waterNeedMin: 1500, waterNeedMax: 2000, sunlightHours: 6, maturationDays: 60, soilPhMin: "6.0", soilPhMax: "6.7", description: "Isang paboritong gulay na kilala sa pait nito." },
  { name: "Talong", localName: "Talong", family: "Solanaceae", season: "both" as const, waterNeedMin: 1000, waterNeedMax: 1500, sunlightHours: 8, maturationDays: 90, soilPhMin: "5.5", soilPhMax: "6.8", description: "Mahaba o bilog na gulay na madalas gamitin sa torta." },
  { name: "Kamatis", localName: "Kamatis", family: "Solanaceae", season: "dry" as const, waterNeedMin: 400, waterNeedMax: 600, sunlightHours: 8, maturationDays: 75, soilPhMin: "6.0", soilPhMax: "6.8", description: "Pangunahing sangkap para sa sarsa at sinigang." },
  { name: "Sitaw", localName: "Sitaw", family: "Fabaceae", season: "both" as const, waterNeedMin: 500, waterNeedMax: 800, sunlightHours: 6, maturationDays: 50, soilPhMin: "5.5", soilPhMax: "7.5", description: "Mahabang beans na maganda sa pakbet." },
  { name: "Okra", localName: "Okra", family: "Malvaceae", season: "both" as const, waterNeedMin: 600, waterNeedMax: 1000, sunlightHours: 8, maturationDays: 60, soilPhMin: "6.0", soilPhMax: "6.8", description: "Gulay na madulas at masustansya." },
  { name: "Pechay", localName: "Pechay", family: "Brassicaceae", season: "both" as const, waterNeedMin: 500, waterNeedMax: 800, sunlightHours: 5, maturationDays: 30, soilPhMin: "5.5", soilPhMax: "6.5", description: "Madahong gulay na mabilis lumaki." },
  { name: "Kangkong", localName: "Kangkong", family: "Convolvulaceae", season: "both" as const, waterNeedMin: 1500, waterNeedMax: 2500, sunlightHours: 6, maturationDays: 30, soilPhMin: "5.5", soilPhMax: "7.0", description: "Gulay na tumutubo sa tubig o lupa." },
  { name: "Kalabasa", localName: "Kalabasa", family: "Cucurbitaceae", season: "both" as const, waterNeedMin: 800, waterNeedMax: 1200, sunlightHours: 8, maturationDays: 100, soilPhMin: "6.0", soilPhMax: "6.8", description: "Malaking bilog na gulay na matamis." },
  { name: "Upo", localName: "Upo", family: "Cucurbitaceae", season: "both" as const, waterNeedMin: 1000, waterNeedMax: 1500, sunlightHours: 8, maturationDays: 80, soilPhMin: "6.0", soilPhMax: "7.0", description: "Mahaba at malaking gulay na madalas isahog sa misua." },
  { name: "Patola", localName: "Patola", family: "Cucurbitaceae", season: "both" as const, waterNeedMin: 800, waterNeedMax: 1200, sunlightHours: 6, maturationDays: 70, soilPhMin: "6.0", soilPhMax: "7.0", description: "Gulay na nagiging sponge pag tumanda." },
  { name: "Mongo", localName: "Mongo", family: "Fabaceae", season: "dry" as const, waterNeedMin: 300, waterNeedMax: 500, sunlightHours: 8, maturationDays: 60, soilPhMin: "5.8", soilPhMax: "7.0", description: "Mung beans na ginagawang ginisang monggo." },
  { name: "Repolyo", localName: "Repolyo", family: "Brassicaceae", season: "dry" as const, waterNeedMin: 400, waterNeedMax: 600, sunlightHours: 6, maturationDays: 80, soilPhMin: "6.0", soilPhMax: "6.8", description: "Bilot na bilot na dahong gulay." },
  { name: "Letsugas", localName: "Letsugas", family: "Asteraceae", season: "dry" as const, waterNeedMin: 300, waterNeedMax: 500, sunlightHours: 5, maturationDays: 45, soilPhMin: "6.0", soilPhMax: "7.0", description: "Gulay na madalas gawing salad." },
  { name: "Sibuyas Dahon", localName: "Sibuyas Dahon", family: "Amaryllidaceae", season: "both" as const, waterNeedMin: 400, waterNeedMax: 600, sunlightHours: 6, maturationDays: 45, soilPhMin: "6.0", soilPhMax: "7.0", description: "Spring onions para pandagdag lasa." },
  { name: "Luya", localName: "Luya", family: "Zingiberaceae", season: "both" as const, waterNeedMin: 1300, waterNeedMax: 1500, sunlightHours: 6, maturationDays: 240, soilPhMin: "5.5", soilPhMax: "6.5", description: "Pampa-anghang at pampalasa sa sabaw." },
];

const rotationRules = [
  { prev: "Ampalaya", next: "Pechay", rating: "excellent" as const, reason: "Pechay recovers on nitrogen-depleted soil" },
  { prev: "Ampalaya", next: "Kangkong", rating: "good" as const, reason: "Tolerant of residual soil stress" },
  { prev: "Ampalaya", next: "Upo", rating: "poor" as const, reason: "Same cucurbit family, shared pests" },
  { prev: "Talong", next: "Mongo", rating: "excellent" as const, reason: "Mongo fixes nitrogen lost by Talong" },
  { prev: "Talong", next: "Sitaw", rating: "excellent" as const, reason: "Legume restores soil after solanaceous crop" },
  { prev: "Talong", next: "Kamatis", rating: "poor" as const, reason: "Same family, bacterial wilt risk doubles" },
  { prev: "Kamatis", next: "Sitaw", rating: "excellent" as const, reason: "Breaks solanaceous disease cycle" },
  { prev: "Kamatis", next: "Okra", rating: "good" as const, reason: "Different family, moderate soil recovery" },
  { prev: "Kamatis", next: "Talong", rating: "poor" as const, reason: "Same solanaceous family, high disease risk" },
  { prev: "Sitaw", next: "Kalabasa", rating: "excellent" as const, reason: "Sitaw nitrogen feeds heavy Kalabasa demand" },
  { prev: "Sitaw", next: "Talong", rating: "good" as const, reason: "Different family, good disease break" },
  { prev: "Okra", next: "Pechay", rating: "excellent" as const, reason: "Okra roots loosen clay loam for Pechay" },
  { prev: "Okra", next: "Ampalaya", rating: "good" as const, reason: "Different families, acceptable transition" },
  { prev: "Kalabasa", next: "Mongo", rating: "excellent" as const, reason: "Mongo restores nitrogen after heavy Kalabasa use" },
  { prev: "Kalabasa", next: "Upo", rating: "poor" as const, reason: "Same cucurbit family" },
  { prev: "Pechay", next: "Talong", rating: "good" as const, reason: "Light feeder followed by moderate feeder" },
  { prev: "Mongo", next: "Ampalaya", rating: "excellent" as const, reason: "Legume nitrogen feeds demanding Ampalaya" },
  { prev: "Mongo", next: "Kamatis", rating: "excellent" as const, reason: "Best rotation for Kamatis disease prevention" },
];

async function seed() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }

  const connection = await mysql.createConnection(process.env.DATABASE_URL);
  const db = drizzle(connection, { schema, mode: 'default' });

  console.log("Seeding Database...");

  try {
    console.log("Clearing existing data...");
    await db.delete(schema.rotationCompatibility);
    await db.delete(schema.zones);
    await db.delete(schema.farms);
    await db.delete(schema.crops);
    await db.delete(schema.users); // Clear users for clean seed

    // 0. Seed Admin Account
    console.log("Seeding Admin Account...");
    await db.insert(schema.users).values({
      email: "admin@maptanim.ph",
      passwordHash: "$2b$10$xyz123mockhash", // In production, use bcrypt
      name: "System Admin",
      role: "admin",
      municipality: "Bacolod City",
    });

    // 1. Seed Crops
    console.log("Seeding Crops...");
    for (const crop of cropsData) {
      await db.insert(schema.crops).values(crop);
    }
    const allCrops = await db.query.crops.findMany();

    // Create map for easy lookup
    const cropMap = new Map(allCrops.map(c => [c.name, c.id]));

    // 2. Seed Rotation Compatibility
    console.log("Seeding Rotation Compatibility...");
    for (const rule of rotationRules) {
      const prevId = cropMap.get(rule.prev);
      const nextId = cropMap.get(rule.next);

      if (prevId && nextId) {
        await db.insert(schema.rotationCompatibility).values({
          previousCropId: prevId,
          nextCropId: nextId,
          rating: rule.rating,
          reason: rule.reason,
        });
      }
    }

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await connection.end();
  }
}

seed();
