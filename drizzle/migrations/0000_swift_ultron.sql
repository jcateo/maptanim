CREATE TABLE `activities` (
	`id` int AUTO_INCREMENT NOT NULL,
	`farmId` int NOT NULL,
	`zoneId` int,
	`activityDate` date NOT NULL,
	`type` enum('labor','irrigation','fertilization','pestControl','harvesting','other') NOT NULL,
	`description` text,
	`laborCost` decimal(10,2) DEFAULT '0',
	`materialCost` decimal(10,2) DEFAULT '0',
	`totalCost` decimal(10,2),
	`createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `activities_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `communityComments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`postId` int NOT NULL,
	`authorId` int NOT NULL,
	`content` text NOT NULL,
	`createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `communityComments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `communityPosts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`authorId` int NOT NULL,
	`title` varchar(500) NOT NULL,
	`content` text NOT NULL,
	`category` enum('pestControl','harvest','general','market','weather') NOT NULL,
	`imageUrl` varchar(500),
	`createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `communityPosts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `companionPairs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`crop1Id` int NOT NULL,
	`crop2Id` int NOT NULL,
	`compatibility` enum('excellent','good','poor') NOT NULL,
	`lerValue` decimal(4,2),
	`notes` text,
	CONSTRAINT `companionPairs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `crops` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`localName` varchar(255),
	`family` varchar(255),
	`waterNeedMin` int,
	`waterNeedMax` int,
	`sunlightHours` int,
	`maturationDays` int,
	`soilPhMin` decimal(3,1),
	`soilPhMax` decimal(3,1),
	`season` enum('dry','wet','both'),
	`description` text,
	`imageUrl` varchar(500),
	CONSTRAINT `crops_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `farms` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`municipality` varchar(255) NOT NULL,
	`barangay` varchar(255),
	`latitude` decimal(10,8),
	`longitude` decimal(11,8),
	`totalArea` decimal(10,4),
	`status` enum('active','inactive') DEFAULT 'active',
	`createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `farms_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `harvests` (
	`id` int AUTO_INCREMENT NOT NULL,
	`farmId` int NOT NULL,
	`zoneId` int,
	`planId` int,
	`cropId` int,
	`harvestDate` date NOT NULL,
	`yieldKg` decimal(10,2) NOT NULL,
	`pricePerKg` decimal(8,2),
	`revenue` decimal(12,2),
	`notes` text,
	`createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `harvests_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `notifications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`body` text NOT NULL,
	`isRead` boolean DEFAULT false,
	`link` varchar(500),
	`createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `notifications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `plantingPlans` (
	`id` int AUTO_INCREMENT NOT NULL,
	`zoneId` int NOT NULL,
	`farmId` int NOT NULL,
	`status` enum('planned','active','harvested') DEFAULT 'planned',
	`layoutConfig` json,
	`projectedYield` decimal(10,2),
	`lerScore` decimal(4,2),
	`createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `plantingPlans_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `rotationCompatibility` (
	`id` int AUTO_INCREMENT NOT NULL,
	`previousCropId` int NOT NULL,
	`nextCropId` int NOT NULL,
	`rating` enum('excellent','good','poor') NOT NULL,
	`reason` text NOT NULL,
	CONSTRAINT `rotationCompatibility_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`passwordHash` varchar(255) NOT NULL,
	`role` enum('farmer','extension_officer','admin') NOT NULL DEFAULT 'farmer',
	`municipality` varchar(255),
	`barangay` varchar(255),
	`createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `zoneVerifications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`zoneId` int NOT NULL,
	`officerId` int NOT NULL,
	`farmerId` int NOT NULL,
	`status` enum('pending','approved','needs_correction') NOT NULL,
	`correctionNotes` text,
	`verifiedAt` datetime,
	`createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `zoneVerifications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `zones` (
	`id` int AUTO_INCREMENT NOT NULL,
	`farmId` int NOT NULL,
	`name` varchar(255),
	`geometry` json NOT NULL,
	`areaHectares` decimal(10,4),
	`croppingSystem` enum('monocrop','intercrop','rotation') NOT NULL,
	`prdpLabel` varchar(255),
	`cropBreakdown` json,
	`photoUrls` json,
	`verificationStatus` enum('pending','verified','needs_correction') DEFAULT 'pending',
	`soilType` varchar(100),
	`notes` text,
	`createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `zones_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `activities` ADD CONSTRAINT `activities_farmId_farms_id_fk` FOREIGN KEY (`farmId`) REFERENCES `farms`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `activities` ADD CONSTRAINT `activities_zoneId_zones_id_fk` FOREIGN KEY (`zoneId`) REFERENCES `zones`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `communityComments` ADD CONSTRAINT `communityComments_postId_communityPosts_id_fk` FOREIGN KEY (`postId`) REFERENCES `communityPosts`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `communityComments` ADD CONSTRAINT `communityComments_authorId_users_id_fk` FOREIGN KEY (`authorId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `communityPosts` ADD CONSTRAINT `communityPosts_authorId_users_id_fk` FOREIGN KEY (`authorId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `companionPairs` ADD CONSTRAINT `companionPairs_crop1Id_crops_id_fk` FOREIGN KEY (`crop1Id`) REFERENCES `crops`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `companionPairs` ADD CONSTRAINT `companionPairs_crop2Id_crops_id_fk` FOREIGN KEY (`crop2Id`) REFERENCES `crops`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `farms` ADD CONSTRAINT `farms_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `harvests` ADD CONSTRAINT `harvests_farmId_farms_id_fk` FOREIGN KEY (`farmId`) REFERENCES `farms`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `harvests` ADD CONSTRAINT `harvests_zoneId_zones_id_fk` FOREIGN KEY (`zoneId`) REFERENCES `zones`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `harvests` ADD CONSTRAINT `harvests_planId_plantingPlans_id_fk` FOREIGN KEY (`planId`) REFERENCES `plantingPlans`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `harvests` ADD CONSTRAINT `harvests_cropId_crops_id_fk` FOREIGN KEY (`cropId`) REFERENCES `crops`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `notifications` ADD CONSTRAINT `notifications_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `plantingPlans` ADD CONSTRAINT `plantingPlans_zoneId_zones_id_fk` FOREIGN KEY (`zoneId`) REFERENCES `zones`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `plantingPlans` ADD CONSTRAINT `plantingPlans_farmId_farms_id_fk` FOREIGN KEY (`farmId`) REFERENCES `farms`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `rotationCompatibility` ADD CONSTRAINT `rotationCompatibility_previousCropId_crops_id_fk` FOREIGN KEY (`previousCropId`) REFERENCES `crops`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `rotationCompatibility` ADD CONSTRAINT `rotationCompatibility_nextCropId_crops_id_fk` FOREIGN KEY (`nextCropId`) REFERENCES `crops`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `zoneVerifications` ADD CONSTRAINT `zoneVerifications_zoneId_zones_id_fk` FOREIGN KEY (`zoneId`) REFERENCES `zones`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `zoneVerifications` ADD CONSTRAINT `zoneVerifications_officerId_users_id_fk` FOREIGN KEY (`officerId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `zoneVerifications` ADD CONSTRAINT `zoneVerifications_farmerId_users_id_fk` FOREIGN KEY (`farmerId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `zones` ADD CONSTRAINT `zones_farmId_farms_id_fk` FOREIGN KEY (`farmId`) REFERENCES `farms`(`id`) ON DELETE no action ON UPDATE no action;