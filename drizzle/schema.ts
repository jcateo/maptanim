import { mysqlTable, serial, varchar, text, int, decimal, datetime, json, boolean, date, mysqlEnum } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  passwordHash: varchar("passwordHash", { length: 255 }).notNull(),
  role: mysqlEnum("role", ["farmer", "extension_officer", "admin"]).notNull().default("farmer"),
  municipality: varchar("municipality", { length: 255 }),
  barangay: varchar("barangay", { length: 255 }),
  createdAt: datetime("createdAt").default(sql`CURRENT_TIMESTAMP`),
});

export const farms = mysqlTable("farms", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id),
  name: varchar("name", { length: 255 }).notNull(),
  municipality: varchar("municipality", { length: 255 }).notNull(),
  barangay: varchar("barangay", { length: 255 }),
  latitude: decimal("latitude", { precision: 10, scale: 8 }),
  longitude: decimal("longitude", { precision: 11, scale: 8 }),
  totalArea: decimal("totalArea", { precision: 10, scale: 4 }),
  status: mysqlEnum("status", ["active", "inactive"]).default("active"),
  createdAt: datetime("createdAt").default(sql`CURRENT_TIMESTAMP`),
});

export const zones = mysqlTable("zones", {
  id: int("id").autoincrement().primaryKey(),
  farmId: int("farmId").notNull().references(() => farms.id),
  name: varchar("name", { length: 255 }),
  geometry: json("geometry").notNull(),
  areaHectares: decimal("areaHectares", { precision: 10, scale: 4 }),
  croppingSystem: mysqlEnum("croppingSystem", ["monocrop", "intercrop", "rotation"]).notNull(),
  prdpLabel: varchar("prdpLabel", { length: 255 }),
  cropBreakdown: json("cropBreakdown"),
  photoUrls: json("photoUrls"),
  verificationStatus: mysqlEnum("verificationStatus", ["pending", "verified", "needs_correction"]).default("pending"),
  soilType: varchar("soilType", { length: 100 }),
  notes: text("notes"),
  createdAt: datetime("createdAt").default(sql`CURRENT_TIMESTAMP`),
});

export const crops = mysqlTable("crops", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  localName: varchar("localName", { length: 255 }),
  family: varchar("family", { length: 255 }),
  waterNeedMin: int("waterNeedMin"),
  waterNeedMax: int("waterNeedMax"),
  sunlightHours: int("sunlightHours"),
  maturationDays: int("maturationDays"),
  soilPhMin: decimal("soilPhMin", { precision: 3, scale: 1 }),
  soilPhMax: decimal("soilPhMax", { precision: 3, scale: 1 }),
  season: mysqlEnum("season", ["dry", "wet", "both"]),
  description: text("description"),
  imageUrl: varchar("imageUrl", { length: 500 }),
});

export const rotationCompatibility = mysqlTable("rotationCompatibility", {
  id: int("id").autoincrement().primaryKey(),
  previousCropId: int("previousCropId").notNull().references(() => crops.id),
  nextCropId: int("nextCropId").notNull().references(() => crops.id),
  rating: mysqlEnum("rating", ["excellent", "good", "poor"]).notNull(),
  reason: text("reason").notNull(),
});

export const companionPairs = mysqlTable("companionPairs", {
  id: int("id").autoincrement().primaryKey(),
  crop1Id: int("crop1Id").notNull().references(() => crops.id),
  crop2Id: int("crop2Id").notNull().references(() => crops.id),
  compatibility: mysqlEnum("compatibility", ["excellent", "good", "poor"]).notNull(),
  lerValue: decimal("lerValue", { precision: 4, scale: 2 }),
  notes: text("notes"),
});

export const plantingPlans = mysqlTable("plantingPlans", {
  id: int("id").autoincrement().primaryKey(),
  zoneId: int("zoneId").notNull().references(() => zones.id),
  farmId: int("farmId").notNull().references(() => farms.id),
  status: mysqlEnum("status", ["planned", "active", "harvested"]).default("planned"),
  layoutConfig: json("layoutConfig"),
  projectedYield: decimal("projectedYield", { precision: 10, scale: 2 }),
  lerScore: decimal("lerScore", { precision: 4, scale: 2 }),
  createdAt: datetime("createdAt").default(sql`CURRENT_TIMESTAMP`),
});

export const harvests = mysqlTable("harvests", {
  id: int("id").autoincrement().primaryKey(),
  farmId: int("farmId").notNull().references(() => farms.id),
  zoneId: int("zoneId").references(() => zones.id),
  planId: int("planId").references(() => plantingPlans.id),
  cropId: int("cropId").references(() => crops.id),
  harvestDate: date("harvestDate").notNull(),
  yieldKg: decimal("yieldKg", { precision: 10, scale: 2 }).notNull(),
  pricePerKg: decimal("pricePerKg", { precision: 8, scale: 2 }),
  revenue: decimal("revenue", { precision: 12, scale: 2 }),
  notes: text("notes"),
  createdAt: datetime("createdAt").default(sql`CURRENT_TIMESTAMP`),
});

export const activities = mysqlTable("activities", {
  id: int("id").autoincrement().primaryKey(),
  farmId: int("farmId").notNull().references(() => farms.id),
  zoneId: int("zoneId").references(() => zones.id),
  activityDate: date("activityDate").notNull(),
  type: mysqlEnum("type", ["labor", "irrigation", "fertilization", "pestControl", "harvesting", "other"]).notNull(),
  description: text("description"),
  laborCost: decimal("laborCost", { precision: 10, scale: 2 }).default("0"),
  materialCost: decimal("materialCost", { precision: 10, scale: 2 }).default("0"),
  totalCost: decimal("totalCost", { precision: 10, scale: 2 }),
  createdAt: datetime("createdAt").default(sql`CURRENT_TIMESTAMP`),
});

export const zoneVerifications = mysqlTable("zoneVerifications", {
  id: int("id").autoincrement().primaryKey(),
  zoneId: int("zoneId").notNull().references(() => zones.id),
  officerId: int("officerId").notNull().references(() => users.id),
  farmerId: int("farmerId").notNull().references(() => users.id),
  status: mysqlEnum("status", ["pending", "approved", "needs_correction"]).notNull(),
  correctionNotes: text("correctionNotes"),
  verifiedAt: datetime("verifiedAt"),
  createdAt: datetime("createdAt").default(sql`CURRENT_TIMESTAMP`),
});

export const notifications = mysqlTable("notifications", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id),
  title: varchar("title", { length: 255 }).notNull(),
  body: text("body").notNull(),
  isRead: boolean("isRead").default(false),
  link: varchar("link", { length: 500 }),
  createdAt: datetime("createdAt").default(sql`CURRENT_TIMESTAMP`),
});

export const communityPosts = mysqlTable("communityPosts", {
  id: int("id").autoincrement().primaryKey(),
  authorId: int("authorId").notNull().references(() => users.id),
  title: varchar("title", { length: 500 }).notNull(),
  content: text("content").notNull(),
  category: mysqlEnum("category", ["pestControl", "harvest", "general", "market", "weather"]).notNull(),
  imageUrl: varchar("imageUrl", { length: 500 }),
  createdAt: datetime("createdAt").default(sql`CURRENT_TIMESTAMP`),
});

export const communityComments = mysqlTable("communityComments", {
  id: int("id").autoincrement().primaryKey(),
  postId: int("postId").notNull().references(() => communityPosts.id),
  authorId: int("authorId").notNull().references(() => users.id),
  content: text("content").notNull(),
  createdAt: datetime("createdAt").default(sql`CURRENT_TIMESTAMP`),
});
