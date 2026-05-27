import { db } from "./server/db";
import { companionPairs } from "./drizzle/schema";

async function seed() {
  const pairsToInsert = [
    {
      crop1Id: 31, // Ampalaya
      crop2Id: 38, // Kalabasa
      compatibility: "excellent" as const,
      lerValue: "1.45",
      notes: "Pest Deterrence: The secondary crop acts as a natural repellent against common aphids that target the primary crop.\\nNutrient Sharing: Complementary root depths prevent competition for topsoil nutrients."
    },
    {
      crop1Id: 33, // Kamatis
      crop2Id: 38, // Kalabasa
      compatibility: "excellent" as const,
      lerValue: "1.45",
      notes: "Pest Deterrence: Kalabasa acts as living mulch, reducing soil evaporation and weeds.\\nNutrient Sharing: Complementary root depths prevent competition."
    },
    {
      crop1Id: 31, // Ampalaya
      crop2Id: 43, // Letsugas
      compatibility: "good" as const,
      lerValue: "1.35",
      notes: "Sunlight Optimization: Tall Ampalaya trellis provides necessary shade for the heat-sensitive Letsugas during peak heat.\\nSpace Efficiency: Maximizes vertical and horizontal space."
    },
    {
      crop1Id: 32, // Talong
      crop2Id: 34, // Sitaw
      compatibility: "excellent" as const,
      lerValue: "1.50",
      notes: "Nitrogen Fixation: Sitaw fixes nitrogen in the soil, benefiting the heavy-feeding Talong.\\nYield Boost: Increased overall plot resilience."
    }
  ];

  for (const pair of pairsToInsert) {
    await db.insert(companionPairs).values(pair);
  }
  
  console.log("Seeding complete!");
  process.exit(0);
}

seed().catch(console.error);
