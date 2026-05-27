import { db } from "./server/db";
import { activities, harvests, plantingPlans, zones, crops } from "./drizzle/schema";
import { eq } from "drizzle-orm";

async function run() {
  const farmId = 1;

  // 1. Fetch activities
  const farmActivities = await db.select().from(activities).where(eq(activities.farmId, farmId));
  
  // 2. Fetch harvests
  const farmHarvests = await db.select().from(harvests).where(eq(harvests.farmId, farmId));

  // 3. Fetch planting plans
  const farmPlans = await db.select().from(plantingPlans).where(eq(plantingPlans.farmId, farmId));

  // We need zones to get prdpLabel
  const farmZones = await db.select().from(zones).where(eq(zones.farmId, farmId));

  // We need crops for maturationDays
  const allCrops = await db.select().from(crops);

  const events = [];

  // Map activities
  for (const act of farmActivities) {
    events.push({
      date: act.activityDate,
      title: act.type === 'irrigation' ? 'Irrigation' : 
             act.type === 'fertilization' ? 'Apply Fertilizer' :
             act.type === 'pestControl' ? 'Pest Control' :
             act.type === 'labor' ? 'Farm Labor' : 'Maintenance',
      type: 'maintenance'
    });
  }

  // Map manual harvests
  for (const harv of farmHarvests) {
    events.push({
      date: harv.harvestDate,
      title: `Harvest (Manual)`,
      type: 'harvest'
    });
  }

  // Map planting plans (automated)
  for (const plan of farmPlans) {
    const zone = farmZones.find(z => z.id === plan.zoneId);
    if (!zone || !plan.createdAt) continue;
    
    // Parse crops from prdpLabel (e.g. "Ampalaya_Kalabasa (60-40)")
    let cropNames = [];
    if (zone.prdpLabel) {
      const base = zone.prdpLabel.split(' (')[0];
      cropNames = base.split('_');
    } else if (zone.name) {
       cropNames = [zone.name];
    }

    for (const cName of cropNames) {
      const crop = allCrops.find(c => c.name.toLowerCase() === cName.toLowerCase());
      
      // Planting event
      events.push({
        date: plan.createdAt,
        title: `Plant ${cName}`,
        type: 'planting'
      });

      // Projected Harvest event
      if (crop && crop.maturationDays) {
        const harvestDate = new Date(plan.createdAt);
        harvestDate.setDate(harvestDate.getDate() + crop.maturationDays);
        events.push({
          date: harvestDate,
          title: `Expected ${cName} Harvest`,
          type: 'harvest'
        });
      }
    }
  }

  console.log(events);
}

run().catch(console.error);
