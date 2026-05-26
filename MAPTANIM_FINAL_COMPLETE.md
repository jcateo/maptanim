# MapTanim — Final Complete Implementation Blueprint
> Single source of truth for the entire MapTanim system.
> Source: MapTanim Capstone Document, STI West Negros University, May 2026.
> Authors: Jomarey D. Parreño, John Ryan R. Vasquez, Jason B. Juanillo, James M. Cateo.
> All 15 phases are fully specified. Nothing is "Coming Soon" in this document.
> Build forward only. Never delete. Never rewrite from scratch unless a file is completely empty.
> Update files in the exact order listed in Section 6. Do not skip. Do not jump ahead.

---

## SECTION 1 — WHAT MAPTANIM IS

MapTanim is a web and mobile-based intercropping management platform using geomapping. It enables smallholder vegetable farmers to draw their field zones on a digital satellite map. After drawing, the system automatically retrieves environmental data from free scientific APIs — SoilGrids, OpenWeatherMap, and NASA POWER — to classify each zone into one of nine biophysical condition profiles. An agroecological rule engine then matches scientifically compatible crop pairs to each zone based on soil pH, water need, sunlight hours, and temperature range. The database contains 60+ companion planting pairs sourced from peer-reviewed literature. The system generates auto-populated planting calendars, crop monitoring tools, plan health scoring, and a farm analytics dashboard that includes simulated Land Equivalent Ratio computation. Beyond intercropping planning, MapTanim provides a complete 15-phase farming ecosystem including team collaboration, strategic layout management, community knowledge sharing, and comprehensive farm operations management.

### 1.1 The Three User Roles
1. FARMER — primary user — draws farm polygons, receives crop pair recommendations, manages harvests and activities, tracks yield and revenue, views planting calendars, participates in community forum
2. EXTENSION OFFICER — monitors farmer intercropping plans, adds advisory notes directly within the system, verifies farm zones, provides correction feedback to farmers
3. ADMINISTRATOR — super admin dashboard, manages users, manages roles and permissions, views activity logs, manages verification workflows, views platform analytics, views zone performance reports, uses export tools

### 1.2 The Thirteen Vegetables in the System
Tomato, Eggplant, Pepper, Cabbage, Onion, Carrot, Beans, Lettuce, Cucumber, Okra, Corn, Squash, Kangkong.
These thirteen crops are the only crops in the system. No others exist.

### 1.3 The Nine Biophysical Condition Profiles
1. Dry-Sunny-Loam
2. Dry-Sunny-Clay
3. Dry-Sunny-Sandy
4. Dry-Shaded-Loam
5. Wet-Sunny-Loam
6. Wet-Sunny-Clay
7. Wet-Shaded-Loam
8. Wet-Shaded-Clay
9. Moderate-Mixed-Loam

### 1.4 The Three APIs
SoilGrids (ISRIC) — retrieves soil type, pH, and drainage class for polygon center coordinates.
Endpoint: https://rest.soilgrids.org/soilgrids/v2.0/properties/query?lon={lng}&lat={lat}

OpenWeatherMap — retrieves temperature, rainfall, and humidity for polygon center coordinates.
Endpoint: https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lng}&appid={key}

NASA POWER — retrieves average daily sunlight hours for polygon center coordinates.
Endpoint: https://power.larc.nasa.gov/api/temporal/climatology/point?parameters=ALLSKY_SFC_SW_DWN&community=AG&longitude={lng}&latitude={lat}&format=JSON

### 1.5 The Six Core Processes
1. Automatic zone condition classification — maps retrieved API values to one of nine biophysical condition profiles
2. Agroecological rule engine scoring — computes a match score from 0 to 100 for each candidate crop pair against the zone's condition profile
3. Strategic layout generation — creates drag-and-drop zone arrangements with rotation, drought, and wet season templates
4. Land Equivalent Ratio simulation — calculates expected land-use efficiency using published yield data
5. Plan health score computation — continuously grades the season plan using a weighted formula
6. Planting calendar generation — derives sow, transplant, fertilize, and harvest dates from published crop growth duration data

### 1.6 The System Outputs
- Ranked zone-specific crop pair recommendations with plain-language compatibility explanations
- Auto-generated planting calendar with task reminders
- Drag-and-drop strategic layouts with productivity heatmaps
- Plan health score trend graph for each zone
- Simulated and actual LER values at zone and farm level
- Comprehensive farm analytics dashboard displaying income estimates, zone performance rankings, team collaboration workspace, and multi-season comparison data

### 1.7 The LER Formula
LER = (Intercropped yield of Crop A / Monocrop yield of Crop A) + (Intercropped yield of Crop B / Monocrop yield of Crop B)
All yield values come from peer-reviewed published literature.
LER is always labeled in the UI as "Simulated LER (based on published data)" — never as a measured real field value.
LER greater than 1.0 means intercropping is more efficient than monoculture.

### 1.8 The Rule Engine Scoring
Score 75–100 = Excellent
Score 50–74 = Good
Score below 50 = Poor
Score is computed per crop pair against the zone's biophysical condition profile using four parameters: soil pH match, water need match, sunlight hours match, temperature range match. Each parameter contributes up to 25 points. Final score is average of both crops in the pair.

### 1.9 The Fifteen Phases
Phase 1: User Access and Farm Setup — farmer profile creation, farm registration, GPS location setup, interactive map picker, crop selection, and onboarding tutorial.
Phase 2: GIS Farm and Zone Mapping — interactive satellite map with polygon drawing tools, zone labeling, automated soil mapping via SoilGrids API, water source visualization, elevation, and terrain analysis overlays.
Phase 3: Crop Planning and Evaluation — crop library covering 13 high-value vegetables, seasonal evaluation, crop suitability scoring (0–100), companion planting matrix, crop rotation planning, financial projection dashboard, and auto-generated planting calendar.
Phase 4: Farm Monitoring and Harvest Management — crop growth tracking, daily activity logs, farm task scheduler, harvest logging, yield recording, revenue tracking, crop lifecycle timeline, and photo comparison gallery.
Phase 5: Administration and System Analytics — super admin dashboard, user management, role and permission system, activity logs, verification workflows, platform analytics, zone performance reports, and export tools.
Phase 6: Research and Data Collection — scientific literature archive, API data source documentation, agroecological database browser, and study citations powering the rule engine.
Phase 7: Expert and Farmer Collaboration Workspace — direct messaging between farmers and extension officers, threaded advisory notes, expert-assigned task lists, and shared zone review workspace.
Phase 8: Strategic Farm Layout Management — drag-and-drop grid layout designer, productivity heatmaps, rotation templates, drought templates, wet season templates, and layout history.
Phase 9: Land Exploration and Soil Visualization — advanced terrain overlays, elevation profile viewer, soil composition breakdown per zone, and drainage visualization.
Phase 10: Farm Operations Management — worker roster, task scheduling, labor cost tracking, material inventory, and operational calendar.
Phase 11: Community and Knowledge Sharing — public forum with category filtering, farmer-to-farmer posts, extension officer verified expert posts, photo attachments, and comment threads.
Phase 12: Reports and Documentation Generation — automated farm report builder, zone summary PDF export, season performance report, harvest summary, and activity log export.
Phase 13: Multi-language and Accessibility Features — full Filipino and English language toggle, pictogram UI mode for low-literacy users, font size adjustment, and high-contrast mode.
Phase 14: Real-time Team Collaboration — live shared zone editing, simultaneous multi-user farm view, real-time notifications, and team activity feed.
Phase 15: Unified Integrated Farming Ecosystem Dashboard — single dashboard combining all 15 phase data streams, cross-phase analytics, unified notification center, and farm health overview.

Phases 1 through 5 are the current deliverable.
Phases 6 through 15 are fully implemented pages — not hidden, not removed, fully rendered with their own content as specified in Section 4 of this document.

### 1.10 Delimitations
- Does NOT use IoT sensors or physical hardware
- Does NOT conduct actual field trials or controlled yield experiments
- Does NOT include NDVI, satellite imagery processing, or real-time remote sensing
- Does NOT include offline-first data saving or automatic synchronization (internet connection required)
- Does NOT include marketplace features, input supplier integrations, or e-commerce
- Does NOT include voice-based input, SMS alerting, or automatic speech recognition
- GPS polygon accuracy has an estimated error of 3 to 5 meters (smartphone hardware dependent)
- Rule engine covers only the 60+ companion planting pairs in the validated database

### 1.11 PWA Requirement
MapTanim is developed as a Progressive Web Application (PWA):
- No app store download required
- Can be installed on home screen from browser
- Static assets are cached for offline viewing (pages load even without internet, but data requires connection)
- Must function on low-cost Android smartphones

---

## SECTION 2 — DESIGN SYSTEM

### 2.1 Color Palette

```css
:root {
  /* Primary Brand — Forest Green */
  --brand-50:   #f0fdf4;
  --brand-100:  #dcfce7;
  --brand-200:  #bbf7d0;
  --brand-300:  #86efac;
  --brand-400:  #4ade80;
  --brand-500:  #22c55e;
  --brand-600:  #16a34a;
  --brand-700:  #15803d;
  --brand-800:  #166534;
  --brand-900:  #14532d;

  /* Earth Brown */
  --earth-50:   #fdf8f0;
  --earth-100:  #faebd7;
  --earth-300:  #e8b86d;
  --earth-500:  #b87333;
  --earth-700:  #7c4a1e;

  /* Sky Blue */
  --sky-50:     #f0f9ff;
  --sky-100:    #e0f2fe;
  --sky-500:    #0ea5e9;
  --sky-700:    #0369a1;

  /* Neutrals */
  --white:      #ffffff;
  --gray-50:    #f8fafc;
  --gray-100:   #f1f5f9;
  --gray-200:   #e2e8f0;
  --gray-300:   #cbd5e1;
  --gray-400:   #94a3b8;
  --gray-500:   #64748b;
  --gray-600:   #475569;
  --gray-700:   #334155;
  --gray-800:   #1e293b;
  --gray-900:   #0f172a;

  /* Status Colors */
  --status-verified:    #22c55e;
  --status-pending:     #f59e0b;
  --status-correction:  #ef4444;
  --status-excellent:   #22c55e;
  --status-good:        #3b82f6;
  --status-poor:        #ef4444;

  /* Amber */
  --amber-50:   #fffbeb;
  --amber-100:  #fef3c7;
  --amber-500:  #f59e0b;
  --amber-700:  #b45309;

  /* Red */
  --red-50:     #fef2f2;
  --red-100:    #fee2e2;
  --red-200:    #fecaca;
  --red-500:    #ef4444;
  --red-600:    #dc2626;
  --red-700:    #b91c1c;
}
```

tailwind.config.ts theme.extend.colors:
```typescript
brand: {
  50:'#f0fdf4', 100:'#dcfce7', 200:'#bbf7d0', 300:'#86efac',
  400:'#4ade80', 500:'#22c55e', 600:'#16a34a', 700:'#15803d',
  800:'#166534', 900:'#14532d',
},
earth: {
  50:'#fdf8f0', 100:'#faebd7', 300:'#e8b86d', 500:'#b87333', 700:'#7c4a1e',
},
```

tailwind.config.ts theme.extend.boxShadow:
```typescript
'card':    '0 1px 3px 0 rgba(0,0,0,0.06)',
'card-md': '0 4px 12px 0 rgba(0,0,0,0.08)',
'green':   '0 4px 12px rgba(34,197,94,0.25)',
'modal':   '0 25px 50px rgba(0,0,0,0.25)',
```

### 2.2 Typography
Add to client/index.html inside head:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
```

Typography scale:
| Role                | Tailwind Classes                                          |
|---------------------|-----------------------------------------------------------|
| Page Title (H1)     | text-2xl font-bold text-gray-800 leading-tight            |
| Section Title (H2)  | text-xl font-semibold text-gray-800                       |
| Card Title (H3)     | text-base font-semibold text-gray-800                     |
| Body Text           | text-sm text-gray-600 leading-relaxed                     |
| Label               | text-sm font-medium text-gray-700                         |
| Helper / Caption    | text-xs text-gray-400                                     |
| Stat Number         | text-3xl font-bold text-gray-900                          |
| Stat Label          | text-xs font-medium uppercase tracking-wide text-gray-500 |
| Badge Text          | text-xs font-medium                                       |
| Button Text         | text-sm font-medium                                       |
| Score Number        | text-4xl font-bold                                        |

### 2.3 Global CSS (client/src/index.css)
```css
@import 'tailwindcss';

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  -webkit-font-smoothing: antialiased;
  background-color: #f8fafc;
}

html { scroll-behavior: smooth; }

::-webkit-scrollbar { width: 5px; height: 5px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: #94a3b8; }

*:focus-visible { outline: none; box-shadow: 0 0 0 2px #22c55e; border-radius: 6px; }

.leaflet-container { z-index: 1; }
.leaflet-top, .leaflet-bottom { z-index: 10; }
.leaflet-draw-toolbar a {
  background-color: white !important;
  border-radius: 8px !important;
  border: 1px solid #e2e8f0 !important;
}

input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }

.page-enter { animation: fadeSlideUp 0.2s ease-out; }

@keyframes fadeSlideUp {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes slideInRight {
  from { transform: translateX(100%); opacity: 0; }
  to   { transform: translateX(0); opacity: 1; }
}
.slide-in-right { animation: slideInRight 0.25s ease-out; }

@keyframes slideInBottom {
  from { transform: translateY(100%); }
  to   { transform: translateY(0); }
}
.slide-in-bottom { animation: slideInBottom 0.3s ease-out; }

@keyframes pulseGreen {
  0%, 100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4); }
  50%       { box-shadow: 0 0 0 8px rgba(34, 197, 94, 0); }
}
.pulse-green { animation: pulseGreen 2s infinite; }

@keyframes shimmer {
  from { background-position: -600px 0; }
  to   { background-position: 600px 0; }
}
.skeleton {
  background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%);
  background-size: 600px 100%;
  animation: shimmer 1.5s ease infinite;
  border-radius: 8px;
}

@keyframes bounceDown {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(8px); }
}
.bounce-down { animation: bounceDown 1.6s ease-in-out infinite; }

@keyframes fillBar {
  from { width: 0%; }
  to   { width: var(--bar-width); }
}
.bar-fill { animation: fillBar 1s ease-out forwards; }

@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}
.fade-in { animation: fadeIn 0.15s ease-out; }
```

### 2.4 Component Visual Specifications

SIDEBAR (DashboardLayout.tsx):
- Background: #14532d, width 240px fixed desktop, hidden mobile below lg
- Logo: Sprout icon 28px color #4ade80 + "MapTanim" text-lg font-bold text-white
- Nav section label: text-xs uppercase tracking-widest px-4 mt-5 mb-1 color #4ade80 font-medium
- Nav item height 44px px-4 rounded-lg flex items-center gap-2.5
  - Inactive: text #86efac bg transparent
  - Hover: bg #166634 text white transition 150ms
  - Active: bg #15803d text white font-semibold left border 3px solid #4ade80
- User profile pinned bottom border-top 1px solid #166534 p-4:
  - Avatar 34px circle bg-brand-800 text-white font-semibold text-sm initials
  - Name text-sm font-medium text-white, Role text-xs text-brand-300
  - Logout text-xs text-brand-300 hover:text-white

HEADER TOP BAR:
- Height 64px bg-white border-b border-gray-200 shadow 0 1px 3px rgba(0,0,0,0.04) px-6
- Left: page title text-xl font-semibold text-gray-800
- Right: search input w-56 bg-gray-100 rounded-full + notification bell 40px + user avatar 36px

STAT CARDS:
- bg-white rounded-xl border border-gray-200 p-5 shadow-card
- Hover: shadow-card-md border-brand-200 transition-all duration-200
- Left: 48px rounded-lg bg-{variant}-50 icon 24px
- Right: number text-3xl font-bold text-gray-900 + label text-xs uppercase tracking-wide text-gray-500

PRIMARY BUTTON:
- bg-brand-500 hover:bg-brand-600 active:bg-brand-700 text-white text-sm font-medium rounded-lg px-4 py-2.5 min-h-[40px] shadow-card hover:shadow-green

OUTLINE BUTTON:
- bg-white border border-gray-200 hover:border-brand-300 hover:bg-brand-50 text-gray-600 hover:text-brand-700 text-sm font-medium rounded-lg px-4 py-2.5

DESTRUCTIVE BUTTON:
- bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg px-4 py-2.5

STATUS BADGES (inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium):
- Verified: bg-brand-100 text-brand-700 + 6px dot bg-brand-500
- Pending Review: bg-amber-100 text-amber-700 + 6px dot bg-amber-500
- Needs Correction: bg-red-100 text-red-700 + 6px dot bg-red-500
- Excellent: bg-brand-100 text-brand-700
- Good: bg-blue-100 text-blue-700
- Poor: bg-red-100 text-red-700
- Verified Expert (officer): bg-brand-500 text-white + CheckCircle 11px
- Farmer role: bg-earth-100 text-earth-700
- Officer role: bg-sky-100 text-sky-700
- Admin role: bg-gray-100 text-gray-700

FORM INPUTS:
- Label text-sm font-medium text-gray-700 mb-1.5
- Input bg-white border border-gray-300 rounded-lg px-3 py-2.5 text-sm h-[40px] w-full
- Focus: border-brand-500 ring-2 ring-brand-500/20
- Error: border-red-500 ring-2 ring-red-500/15
- Read-only: bg-gray-100 border-gray-200 text-gray-500 cursor-not-allowed
- Error message: text-xs text-red-500 mt-1

TABLES:
- Container: bg-white rounded-xl border border-gray-200 shadow-card overflow-hidden
- Header row: bg-gray-50 border-b border-gray-200, header cell text-xs font-medium uppercase tracking-wide text-gray-500 px-4 py-3
- Data row: border-b border-gray-100 hover:bg-gray-50, cell text-sm text-gray-700 px-4 py-3.5
- Totals row: bg-brand-50 border-t-2 border-brand-200, cell text-sm font-semibold text-brand-700

MODALS:
- Overlay: fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center px-4
- Panel: bg-white rounded-2xl shadow-modal w-full max-w-md max-h-[90vh] overflow-y-auto
- Header: px-6 pt-6 pb-4 border-b border-gray-100 flex justify-between items-center
- Body: px-6 py-5 space-y-4
- Footer: px-6 pb-6 pt-4 border-t border-gray-100 flex justify-end gap-3

TOAST NOTIFICATIONS (fixed bottom-4 right-4 z-50):
- Success: bg-white border-l-4 border-brand-500 shadow-elevated rounded-lg px-4 py-3 w-[360px] slide-in-right
- Error: border-l-4 border-red-500
- Info: border-l-4 border-sky-500
- Auto-dismiss after 4000ms

TABS:
- Tab list: bg-gray-100 rounded-lg p-1 flex gap-1 overflow-x-auto
- Inactive: px-4 py-2 rounded-md text-sm font-medium text-gray-500 hover:bg-white
- Active: bg-white text-gray-800 font-semibold shadow-card rounded-md px-4 py-2 text-sm

SKELETON LOADERS (all use class="skeleton"):
- Stat card: h-24 w-full rounded-xl
- Farm card: h-44 w-full rounded-xl
- Table row: h-12 w-full rounded-md mb-1
- Text line: h-5 w-3/4 rounded

---

## SECTION 3 — COMPLETE NAVIGATION STRUCTURE

### 3.1 Public Routes
/ — Landing Page
/login — Login Page
/register — Register Page

### 3.2 Farmer Routes
/dashboard — Farmer Dashboard
/farms/new — New Farm Setup
/farms/:id — Farm Control Center
/monitoring — Monitoring Hub
/planting-plans — Planting Plans
/layout-builder — Strategic Layout Builder
/crops — Crop Library
/companion-planting — Companion Planting Guide
/community — Community Forum
/research — Research and Data
/land-explorer — Land Exploration
/reports — Reports and Documentation
/settings — Language and Accessibility Settings
/team — Team Collaboration

### 3.3 Extension Officer Routes
/dashboard — Officer Dashboard
/verify/:id — Zone Verification Page
/crops — Crop Library
/companion-planting — Companion Planting Guide
/community — Community Forum
/research — Research and Data

### 3.4 Admin Routes
/dashboard — Admin Dashboard
/admin/users — Manage Users
/admin/analytics — Platform Analytics
/admin/system — System Health
/admin/collaboration — Collaboration Workspace
/ecosystem — Unified Ecosystem Dashboard

### 3.5 Sidebar Navigation per Role

FARMER SIDEBAR:
Section MAIN:
- Dashboard (LayoutDashboard) → /dashboard
- Monitoring Hub (Activity) → /monitoring
Section FARM TOOLS:
- Planting Plans (Grid3X3) → /planting-plans
- Layout Builder (LayoutTemplate) → /layout-builder
Section KNOWLEDGE:
- Crop Library (BookOpen) → /crops
- Companion Planting (GitMerge) → /companion-planting
- Research Data (FlaskConical) → /research
Section COMMUNITY:
- Community Forum (MessageSquare) → /community
Section ADVANCED:
- Land Explorer (Globe) → /land-explorer
- Farm Operations (Briefcase) → /farm-operations
- Reports (FileText) → /reports
Section SETTINGS:
- Language & Access (Globe2) → /settings
- Team (Users) → /team
- Ecosystem Dashboard (LayoutDashboard) → /ecosystem

EXTENSION OFFICER SIDEBAR:
Section MAIN:
- Officer Dashboard (ClipboardCheck) → /dashboard
Section KNOWLEDGE:
- Crop Library (BookOpen) → /crops
- Companion Planting (GitMerge) → /companion-planting
- Research Data (FlaskConical) → /research
Section COMMUNITY:
- Community Forum (MessageSquare) → /community

ADMIN SIDEBAR:
Section ADMINISTRATION:
- System Overview (Shield) → /dashboard
- Manage Users (Users) → /admin/users
- Platform Analytics (BarChart3) → /admin/analytics
- System Health (Server) → /admin/system
Section TOOLS:
- Collaboration (Users2) → /admin/collaboration
- Ecosystem Dashboard (LayoutDashboard) → /ecosystem

---

## SECTION 4 — PAGE-BY-PAGE SPECIFICATIONS

### PAGE: Landing Page (/)

HEADER (sticky top-0 z-50 h-16):
- bg-white/90 backdrop-blur-md border-b border-gray-200
- Left: Sprout 26px text-brand-500 + "MapTanim" text-lg font-bold text-gray-800
- Right: "Log In" outline button border-brand-500 text-brand-700 px-5 py-2 rounded-lg text-sm font-medium

HERO SECTION (min-h-screen):
- Background: linear-gradient(160deg, #14532d 0%, #166534 55%, #15803d 100%)
- Dot grid SVG overlay white dots 1.5px every 28px 4% opacity
- Content max-w-4xl mx-auto px-6 flex flex-col items-center text-center pt-36 pb-24

Hero content top to bottom:
1. Eyebrow pill: "Aligned with DA-PRDP Commodity Mapping Standard" — bg-white/10 border border-white/20 text-xs text-brand-200 px-4 py-1.5 rounded-full
2. Headline mt-6: text-5xl md:text-6xl font-bold text-white — "Smart Farm Mapping" line 1, "for Negros Occidental Farmers" line 2
3. Sub-headline mt-5 max-w-2xl: text-lg text-brand-200 — "Draw your farm boundaries, classify your crops using PRDP standards, and get verified by DA Extension Officers — all in your browser, no GIS training required."
4. CTA buttons mt-9 flex gap-4:
   - "Get Started" → /register — bg-brand-500 hover:bg-brand-400 text-white px-9 py-4 rounded-xl text-base font-semibold shadow-green
   - "Log In" → /login — bg-white/10 text-white border border-white/25 px-9 py-4 rounded-xl
5. Scroll indicator mt-20: ChevronDown 28px text-white/35 class="bounce-down"

FEATURES SECTION (py-24 bg-white):
- Title: "Everything a Farmer Needs" text-3xl font-bold text-gray-800 text-center
- Grid mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto px-6
- Each card: bg-gray-50 hover:bg-white border border-gray-200 hover:border-brand-200 rounded-2xl p-6
  - Icon container 48px rounded-xl bg-brand-50 mb-4, icon 24px text-brand-600
  - Title text-base font-semibold text-gray-800
  - Description text-sm text-gray-500 mt-2 leading-relaxed

6 feature cards:
1. MapPin — "Farm Polygon Mapping" — "Draw your exact farm boundary on a real satellite map. Hectarage is calculated automatically from your polygon using geodesic math."
2. FlaskConical — "Zone Condition Profiling" — "Each zone you draw is automatically classified into one of nine biophysical profiles using real data from SoilGrids, OpenWeatherMap, and NASA POWER."
3. Sprout — "Agroecological Rule Engine" — "The rule engine scores 60+ scientifically validated crop pairs from 0 to 100 based on your zone's actual soil pH, temperature, water, and sunlight conditions."
4. CalendarDays — "Auto-Generated Planting Calendar" — "Get a sow, transplant, fertilize, and harvest schedule automatically generated from your selected crop pairs and published growth data."
5. BarChart3 — "LER Simulation" — "View your simulated Land Equivalent Ratio to understand how much more efficient your intercropping plan is compared to monoculture."
6. ClipboardCheck — "Officer Verification" — "Submit your farm zones for review by a DA Extension Officer who monitors your intercropping plan and can add advisory notes directly in the system."

HOW IT WORKS SECTION (py-24 bg-brand-50):
- Title: "How MapTanim Works" text-3xl font-bold text-gray-800 text-center
- 4 steps max-w-2xl mx-auto mt-14 px-6, vertical line connector absolute left-5 w-0.5 bg-brand-200
- Each step: flex items-start gap-5 mb-10, circle 40px bg-brand-500 text-white font-bold

Step 1: "Set Up Your Location" — "Use GPS to detect your exact location automatically, search by municipality name, or load an existing farm layout to edit."
Step 2: "Draw Your Field Boundary" — "Tap points on the satellite map to draw your field polygon. The area in hectares calculates automatically as you draw."
Step 3: "Classify and Profile Your Zone" — "Label each zone as Monocrop, Intercrop, or Rotation Crop. The system retrieves real soil and weather data and assigns a biophysical condition profile."
Step 4: "Get Recommendations and Verification" — "The rule engine ranks compatible crop pairs with a 0–100 score. Submit for Extension Officer review to receive an official advisory."

FOOTER (bg-brand-900 py-14):
- Sprout 22px text-brand-400 + "MapTanim" text-white font-bold + "Smart farm planning for Filipino farmers" text-brand-300 text-sm
- Right: "© 2026 Nexoria. All rights reserved." text-brand-400 text-sm

---

### PAGE: Login Page (/login)

Full page: min-h-screen bg-gradient-to-br from-brand-900 via-brand-800 to-[#0f4c29] flex items-center justify-center px-4 py-12

Card: bg-white/[0.08] backdrop-blur-2xl border border-white/[0.15] rounded-3xl shadow-modal w-full max-w-md p-8

Content:
1. Logo centered: Sprout 40px text-brand-400 + "MapTanim" text-2xl font-bold text-white + "West Negros University" text-xs text-brand-300 mt-1
2. Title mt-7: "Log in to your account" text-xl font-semibold text-white text-center
3. Subtitle: "Enter your credentials to continue" text-sm text-brand-200 text-center mt-1
4. Form mt-8 space-y-5:
   - Email: bg-white/10 border border-white/20 text-white placeholder:text-white/35 rounded-xl px-4 py-3 text-sm, Mail icon 16px text-white/45 left
   - Password: same + Lock icon left + Eye/EyeOff toggle right
5. Submit mt-7 w-full: bg-brand-500 hover:bg-brand-400 text-white py-3.5 rounded-xl text-base font-semibold
6. Register link mt-5 text-center: "Don't have an account?" + "Register here" text-brand-300 → /register

---

### PAGE: Register Page (/register)

Same background and card style as Login.

Content:
1. Same logo
2. "Create your account" text-xl font-semibold text-white text-center
3. "Join MapTanim and start planning your farm" text-sm text-brand-200 text-center

Form sections:
SECTION 1 — Personal Info mt-8 space-y-4:
- Full Name (User icon), Email (Mail icon), Password (Lock icon + Eye toggle), Confirm Password (Lock icon)

SECTION 2 — Role Selection mt-5:
- "I am a..." label text-sm font-medium text-white/75
- Two cards grid grid-cols-2 gap-3:
  - FARMER: Tractor 28px + "Farmer" + "Vegetable grower"
  - OFFICER: ClipboardCheck 28px + "Extension Officer" + "DA agricultural technician"
  - Unselected: border border-white/20 bg-white/5
  - Selected: border-2 border-brand-400 bg-brand-500/25

SECTION 3 — Location mt-4 space-y-4:
- Municipality select (placeholder "Select your municipality") — options in this exact order:
  Bacolod City, Bago City, Cadiz City, Escalante City, Himamaylan City, Isabela City, Kabankalan City, La Carlota City, La Castellana, Manapla, Moises Padilla, Murcia, Pontevedra, Pulupandan, Sagay City, Salvador Benedicto, San Carlos City, San Enrique, Silay City, Sipalay City, Talisay City, Toboso, Valladolid, Victorias City, Don Salvador Benedicto, Enrique B. Magalona, Ilog
- Barangay text input with MapPin icon

Submit: "Create Account" primary button w-full mt-7
Login link mt-5: "Already have an account?" + "Log in" → /login
Admin note: Admin accounts cannot be created from /register. Admin role is assigned only by existing admins from /admin/users.

---

### PAGE: Farmer Dashboard (/dashboard)

Add class page-enter to root div. Header title: "Dashboard"

GREETING (mb-8):
- Time-based: before 12 = "Good morning", 12–17 = "Good afternoon", after 17 = "Good evening"
- "[greeting], [firstName]!" text-2xl font-bold text-gray-800
- Current date text-sm text-gray-400 mt-1 formatted "Monday, May 26, 2026"

ONBOARDING BANNER (shows only if farmer has 0 farms):
- bg-brand-50 border border-brand-200 rounded-xl p-4 flex items-start gap-3 mb-6
- Lightbulb 20px text-brand-600 + "Welcome to MapTanim!" text-sm font-semibold text-brand-800
- Message text-sm text-brand-700 mt-0.5 + "Take a Tour" ghost button text-brand-600 text-xs mt-2

STATS GRID (grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8):
1. Total Farms — MapPin icon bg-brand-50 text-brand-600
2. Total Hectares — Layers icon bg-earth-100 text-earth-500
3. Pending Verifications — Clock icon bg-amber-50 text-amber-600
4. Needs Correction — AlertCircle icon bg-red-50 text-red-500
All show skeleton loaders while fetching.

FARMS LIST SECTION:
- Header: "My Farms" text-xl font-semibold text-gray-800 + "+ New Farm" primary button → /farms/new

IF 0 farms: dashed border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50 py-20 text-center
- Map 56px text-gray-300 + "You have no farms yet" + "+ Create Your First Farm" button

IF farms exist: grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4
Farm card:
- Header: farm name text-base font-semibold + status badge
- Body grid grid-cols-3: Total Area X.XX ha | Zone Count X zones | Last Activity X days ago
- Footer: "View Farm" outline button full width → /farms/{id}

---

### PAGE: Farm Setup (/farms/new)

STEP 1 — LOCATION METHOD (modal overlay on blank map):
3-dot step indicator, title "Where is your farm?", 3 option cards:
1. GPS Location: Navigation icon — "Use My Current Location" + "Fastest" badge
2. Search Location: Search icon — "Search by Municipality" + Nominatim geocoding dropdown when selected
3. Existing Layout: Copy icon — "Load Existing Farm Layout" (grayed if no farms exist)
"Continue to Map" primary button full width mt-7

STEP 2 — MAP DRAWING (full screen Leaflet satellite map):

Top-center area counter (absolute top-4 left-1/2 -translate-x-1/2 z-10):
- bg-white/95 backdrop-blur-sm rounded-xl px-5 py-2.5 shadow-card border border-gray-200
- Ruler 16px text-brand-600 + "0.00 ha" text-sm font-semibold
- Updates real-time via turf.area() on draw:drawvertex
- class="pulse-green" when area > 0

Top-left map controls (absolute top-4 left-4 z-10 flex flex-col gap-2):
- Pencil (draw polygon) — active: bg-brand-50 border-brand-500 text-brand-600
- Edit2 (edit polygon)
- Trash2 (delete polygon)
- Layers (toggle satellite/standard)

Bottom-center instruction banner (before any vertex placed):
- bg-brand-900/80 backdrop-blur-sm text-white rounded-xl px-7 py-3 flex items-center gap-2 text-sm
- MousePointer 16px + "Click on the map to start drawing your farm boundary."
- Disappears when first point placed

STEP 3 — ZONE CLASSIFICATION SIDE PANEL (slides in from right on polygon complete):
- absolute right-0 top-0 h-full w-[380px] bg-white shadow-2xl border-l border-gray-200 z-20 class="slide-in-right"

Panel header: "Zone Details" text-lg font-semibold + X button (clears polygon)

Form fields:
1. Farm Name — Building2 icon
2. Zone Name — MapPin icon placeholder "Zone A"
3. Municipality — pre-filled read-only
4. Barangay — text input
5. Calculated Area — read-only "X.XXXX ha" label "Area (Auto-calculated from polygon)"
6. Cropping System — 3 radio cards: Minus+"Monocrop" | GitMerge+"Intercrop" | RotateCcw+"Rotation Crop"

IF MONOCROP: crop select dropdown (13 vegetables)

IF INTERCROP:
- Up to 3 crop rows: select + percentage number input + X remove
- "Total: XX%" — red if not 100, green-600 if exactly 100
- "+ Add Crop" ghost button (hidden at 3 rows)
- PRDP label "Crop1_Crop2 (60-40)" in bg-brand-50 text-brand-700 text-xs rounded px-2 py-1

IF ROTATION CROP:
- Season 1: crop select + planting month select + harvest month select
- Season 2: crop select + planting month select + harvest month select
- PRDP label "Crop1-Crop2" same style
- "A planting calendar will be generated after saving" text-xs text-gray-400

7. Notes textarea 3 rows
8. Photo upload up to 3 photos — upload area dashed border, thumbnails 64px with X remove

Panel footer sticky: "Save Zone" primary button full width, Loader2 on loading

ON MOBILE: zone form = bottom sheet slide-in-bottom 75vh, handle bar 4px x 36px bg-gray-300 at top

---

### PAGE: Farm Control Center (/farms/:id)

Back link: ChevronLeft + "Back to Dashboard" → /dashboard
Farm name text-2xl font-bold text-gray-800
Location MapPin 14px text-gray-400 + "[Municipality], [Barangay]"
Stats row: "X.XX ha total" bg-brand-50 text-brand-700 rounded-full px-3 py-1 | "X zones" bg-gray-100

TABS (scroll horizontally on mobile):
Overview | Map View | Planting Calendar | Crop Health | Harvest Logs | Daily Activities | Rotation Planner

OVERVIEW TAB:
"Farm Zones" + "+ Add Zone" outline button
Zone card per zone:
- Zone name + status badge
- PRDP label bg-brand-50 text-brand-700 text-xs rounded px-2 py-1
- Zone condition profile bg-sky-50 text-sky-700 text-xs rounded px-2 py-0.5
- Area Ruler 14px + "X.XX ha" | Sprout 14px + cropping system
- IF INTERCROP: percentage bar (brand-500, sky-500, earth-500 segments) + crop labels
- IF NEEDS CORRECTION: bg-red-50 border-l-4 border-red-500 banner with correction notes + "Resubmit for Review"
- Photos: thumbnails 60px rounded-lg, click opens Dialog fullscreen

MAP VIEW TAB:
- Leaflet map 100% width 450px height rounded-2xl
- All zones as GeoJSON polygons: brand-500 fill 15% opacity, brand-600 stroke 2px
- Zone label tooltip white bg shadow-sm rounded px-2 py-0.5 text-xs font-medium
- Layer toggle satellite/standard

PLANTING CALENDAR TAB:
Per zone, horizontal 12-month timeline (flex overflow-x-auto):
- 12 columns 60px each, month label text-xs text-gray-400
- Planting month: bg-brand-500 text-white text-xs "Plant"
- Fertilization month: bg-earth-500 text-white "Fertilize"
- Harvest month: bg-amber-500 text-white "Harvest"
- Empty month: bg-gray-100
- Legend: colored dots + "Planting" "Fertilization" "Harvest"

CROP HEALTH TAB:
Per zone:
- Growth stage pills: Seedling | Vegetative | Flowering | Fruiting | Harvest-Ready
- Plan health score circular display text-4xl font-bold 0–100
  - 75–100: text-brand-600 bg-brand-50 ring-brand-200
  - 50–74: text-amber-600 bg-amber-50 ring-amber-200
  - Below 50: text-red-600 bg-red-50 ring-red-200
- "Flag an Issue" outline destructive button with AlertTriangle icon

HARVEST LOGS TAB:
- "+ Add Harvest" primary button top-right
- Table: Date | Crop | Yield (kg) | Price/kg (₱) | Revenue (₱) | Notes
- Revenue: ₱X,XXX.XX, Totals row bg-brand-50
- Empty state: Wheat 48px text-gray-300
- Add Harvest modal: Date, Crop select, Yield kg, Price/kg, Revenue auto-calculated readonly, Notes

DAILY ACTIVITIES TAB:
- "+ Add Activity" primary button top-right
- Table: Date | Type | Description | Labor Cost (₱) | Material Cost (₱) | Total (₱)
- Activity type badge: earth-100 bg earth-700 text
- Totals row
- Add Activity modal: Date, Type select (Labor/Irrigation/Fertilization/Pest Control/Harvesting/Other), Description, Labor Cost ₱, Material Cost ₱, Total auto-calculated

ROTATION PLANNER TAB:
IF harvest record exists:
- "Last Harvested" label + crop name + arrow down + "Recommended Next Crops:"
- 3 recommendation cards: crop name + score "XX/100" badge + Excellent/Good/Poor badge + reason text-sm text-gray-500

IF no harvest recorded:
- RotateCcw 40px text-gray-300 + "Log a harvest first to receive rotation recommendations"

---

### PAGE: Monitoring Hub (/monitoring)

Header: "Monitoring Hub" + "View all your farms at a glance" text-sm text-gray-400

Dynamic tab bar: one tab per farm (Farm 1 | Farm 2 | etc.)

Per selected farm:
- Leaflet map 300px height rounded-2xl showing all zones
- Zone status cards grid grid-cols-1 md:grid-cols-2 gap-3:
  zone name + PRDP label + verification status badge + last activity + "View Details" → /farms/:id

---

### PAGE: Planting Plans (/planting-plans)

Header: "Planting Plans" + "Design and evaluate your intercropping layout"

CROP SELECTOR PANEL (left w-64):
- "Select Crops" text-sm font-semibold text-gray-700 mb-3
- Crop A dropdown + Crop B dropdown (13 vegetables each)
- "Calculate LER" primary button

LER DISPLAY (after calculation):
- bg-white border border-gray-200 rounded-2xl p-6 text-center
- LER value text-5xl font-bold: text-brand-700 if >1.0, text-red-600 if <1.0
- "Simulated LER (based on published data)" text-xs text-gray-400 mt-1
- "LER > 1.0 — Intercropping is more land-efficient than monoculture" text-sm text-brand-600 mt-3 if >1.0

LAYOUT GRID (12 x 8 cells, each 40px x 40px border border-gray-200):
- Crop A cells: bg-brand-200 text-brand-800 text-xs font-medium
- Crop B cells: bg-sky-200 text-sky-800
- Empty cells: bg-gray-50
- Productivity heatmap toggle: gradient overlay, brand-900 highest yield brand-50 lowest
- Templates row: "Standard" | "Rotation" | "Drought-Tolerant" | "Wet Season" outline buttons

PLAN HEALTH SCORE:
- Progress bar bg-gray-200 rounded-full h-3, inner bar bg-brand-500 class="bar-fill" --bar-width:{score}%
- "XX/100" text-sm font-semibold text-gray-700 right
- Breakdown: pH Match XX% | Water XX% | Sunlight XX% | Temperature XX%

---

### PAGE: Extension Officer Dashboard (/dashboard for officer role)

Header: "Officer Dashboard" + "Welcome back, [officer name]" text-xl font-semibold text-gray-800

STATS GRID (grid grid-cols-3 gap-4 mb-8):
- Assigned Farmers: Users bg-sky-50 text-sky-600
- Pending Verifications: Clock bg-amber-50 text-amber-600
- Completed This Month: CheckCircle bg-brand-50 text-brand-600

VERIFICATION QUEUE:
- "Pending Verification Queue" text-xl font-semibold + count badge bg-amber-100 text-amber-700

IF empty: bg-brand-50 rounded-2xl py-14 text-center, CheckCircle 52px text-brand-400, "All zones are verified!"

IF has items: space-y-3
Queue item card (bg-white border border-gray-200 rounded-xl p-4 border-l-4 border-l-amber-400):
- Farmer name + Farm name + Submitted date
- PRDP label badge + Area badge + Zone name badge
- "Review" outline button → /verify/:id

ASSIGNED FARMERS (mt-8):
Each farmer row: avatar 36px initials + name + municipality + "X farms" badge right

ADVISORY NOTES TOOL (mt-8):
- Farmer select dropdown
- Farm select dropdown (populates from selected farmer)
- Note textarea placeholder "Enter your advisory note..."
- "Send Advisory Note" primary button

---

### PAGE: Zone Verification (/verify/:id)

Back link + "Zone Verification" text-2xl font-bold text-gray-800

TWO COLUMNS (flex gap-6 stack on mobile):

LEFT (flex-1):
- "Farm Location" label text-sm font-semibold text-gray-500 uppercase
- Leaflet map 420px height rounded-2xl: zone polygon brand-500 fill 20%, brand-600 stroke, zone label

RIGHT (w-[380px] space-y-4):
FARMER INFO CARD (bg-white border border-gray-200 rounded-xl p-5):
Each row: Icon text-gray-400 + label text-xs + value text-sm text-gray-700

ZONE DETAILS CARD:
- PRDP Label + Area (ha) + Cropping System + Zone Condition Profile + Submitted date
- IF intercrop: percentage bar
- IF rotation: Season 1 crop + months + Season 2 crop + months

ZONE PHOTOS (if exist): grid grid-cols-3 gap-2, 90px height rounded-lg, click opens fullscreen Dialog

RULE ENGINE RESULTS:
- Zone condition profile badge bg-sky-50 text-sky-700
- Soil pH | Drainage | Temperature | Sunlight values with icons

ACTION BUTTONS (mt-2 space-y-3):
1. "Approve Zone" — bg-brand-500 text-white full width, CheckCircle icon
   → calls verifyZone approve → toast "Zone approved. Farmer has been notified." → /dashboard
2. "Request Correction" — border border-red-300 bg-red-50 text-red-600 full width, AlertCircle icon
   → opens Dialog: correction notes textarea + "Send Correction Request" red button
   → calls verifyZone reject + notes → toast "Correction request sent."

---

### PAGE: Admin Dashboard (/dashboard for admin role)

Header: "System Overview"

STATS ROW 1 (grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4):
1. Total Users — Users bg-sky-50 text-sky-600
2. Total Farms — MapPin bg-brand-50 text-brand-600
3. Verified Zones — CheckCircle bg-brand-50 text-brand-600
4. Pending Verifications — Clock bg-amber-50 text-amber-600

STATS ROW 2 (grid grid-cols-3 gap-4 mb-8):
5. Total Farmers | 6. Total Officers | 7. Total Zones

ROLE DISTRIBUTION (bg-white border border-gray-200 rounded-xl p-6 mb-6):
- "Platform User Distribution" text-base font-semibold
- Recharts PieChart: Farmers=brand-500, Officers=sky-500, Admins=gray-400
- Legend flex gap-6 justify-center text-xs text-gray-600

RECENT REGISTRATIONS (bg-white border border-gray-200 rounded-xl p-6):
- Last 5 users: avatar initials 36px + name + email + role badge + "X days ago"

---

### PAGE: Manage Users (/admin/users)

Header: "Manage Users"

TOOLBAR: search input w-72 with Search icon + "Export Users" outline button with Download icon

USERS TABLE:
Columns: Name + Email | Role | Municipality | Farms | Registered | Change Role
- Name: avatar 32px + name text-sm font-medium + email text-xs text-gray-400
- Role: role badge
- Change Role: select dropdown + "Update" small outline button → updateRole mutation → toast

---

### PAGE: Platform Analytics (/admin/analytics)

Header: "Platform Analytics"

SUMMARY CARDS (grid grid-cols-3 gap-4 mb-8):
- Total Platform Revenue: Banknote bg-brand-50 text-brand-600, ₱X,XXX,XXX.XX
- Total Platform Expenses: TrendingDown bg-red-50 text-red-500
- Net Platform Value: TrendingUp bg-sky-50 text-sky-600

REVENUE CHART (bg-white border border-gray-200 rounded-xl p-6 mb-6):
- "Monthly Revenue" text-base font-semibold
- Recharts BarChart, bar fill brand-500, Y-axis ₱ formatted, tooltip ₱X,XXX.XX

ZONE PERFORMANCE REPORTS:
- Table: Farm | Zone | LER Score | Verification Status | Total Yield | Total Revenue

---

### PAGE: System Health (/admin/system)

Header: "System Health"

ACTIVITY LOGS (bg-white border border-gray-200 rounded-xl p-6 mb-6):
- "Activity Logs" + Table: Timestamp | User | Action | Details
- Filter by user and action type

EXPORT TOOLS (bg-white border border-gray-200 rounded-xl p-6):
- "Data Export"
- "Export Farmers CSV" outline + Download icon
- "Export Farms CSV" outline + Download icon
- "Export Analytics CSV" outline + Download icon

---

### PAGE: Crop Library (/crops)

Header: "Crop Library" + "13 high-value vegetables with biophysical requirements and companion planting data"

SEARCH: input w-80 rounded-lg with Search icon — client-side filter by name

CROPS GRID (grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4):
Each crop card (bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-card-md):
- Image area h-28 object-cover or bg-brand-50 with Sprout 36px text-brand-200
- Body p-4: crop name text-base font-semibold + season badge
- Stats grid grid-cols-2 gap-x-3 gap-y-2 mt-3:
  - Droplets 14px text-gray-400 + "XXX–XXX mm" water need
  - Sun + "X hrs/day" sunlight
  - Clock + "XX days" maturation
  - FlaskConical + "pH X.X–X.X"
- Description text-xs text-gray-500 mt-3 line-clamp-2

Clicking card opens Detail Dialog:
- Full name, full description, all biophysical parameters
- "Compatible Pairs" section listing companion pairs with LER values and ratings

---

### PAGE: Companion Planting Guide (/companion-planting)

Header: "Companion Planting Guide" + "Compatibility matrix for the 13 vegetables. Based on 60+ peer-reviewed companion planting pairs."

MATRIX TABLE:
- Header row: empty cell + 13 crop name columns text-xs font-medium text-gray-500 text-center
- Data rows: crop name first cell + 13 cells
- Cell 48px x 48px text-xs font-semibold flex-center rounded-md cursor-pointer hover:ring-2 hover:ring-brand-300
  - Excellent "E": bg-brand-100 text-brand-700
  - Good "G": bg-sky-100 text-sky-700
  - Poor "P": bg-red-100 text-red-700
  - No data "—": bg-gray-100 text-gray-400

LEGEND (flex gap-6 mt-4):
- E = "Excellent — highly compatible, significant yield benefit"
- G = "Good — compatible with moderate benefit"
- P = "Poor — incompatible, avoid planting together"

DETAIL PANEL (Dialog on cell click):
- "Crop A + Crop B" title + compatibility badge
- "Simulated LER: X.XX" bg-brand-50 text-brand-700 font-semibold px-3 py-2 rounded-lg
- "LER above 1.0 means intercropping outperforms monoculture" text-xs text-gray-400
- Notes text-sm text-gray-600 + row ratio recommendation

---

### PAGE: Community Forum (/community) — Phase 11

Header: "Community Forum" + "Connect with fellow farmers and Extension Officers"

TOOLBAR:
- Category filter tabs (flex gap-2 overflow-x-auto):
  "All" | "Pest Control" | "Harvest" | "General" | "Market" | "Weather"
  Active: bg-brand-500 text-white rounded-full px-4 py-1.5
  Inactive: bg-gray-100 text-gray-600 rounded-full px-4 py-1.5
- "+ New Post" primary button with Plus icon

POST FEED (space-y-4):
Post card (bg-white border border-gray-200 rounded-xl p-5 hover:shadow-card):
- Top row: avatar 34px bg-brand-100 text-brand-700 + author name text-sm font-semibold
  - IF extension_officer: "Verified Expert" badge bg-brand-500 text-white CheckCircle 10px
  - Category badge earth-100 text-earth-700 + time ago text-xs text-gray-400 ml-auto
- Title mt-3 text-base font-semibold text-gray-800
- Content preview mt-1 text-sm text-gray-600 line-clamp-3
- Footer mt-3: MessageSquare 14px + comment count + "View Discussion" text-xs text-brand-600 ml-auto

NEW POST DIALOG:
- Title field + Category select + Content textarea min-h-[120px]
- Optional photo upload (same style as zone form)
- "Post to Community" primary button + Cancel outline button

POST DISCUSSION (Dialog on "View Discussion"):
- Full post + all comments
- Each comment: avatar + author name + Verified Expert badge if officer + content + time
- Comment input at bottom: textarea + "Post Comment" button

---

### PAGE: Research and Data (/research) — Phase 6

Header: "Research & Data" + "Scientific data sources and literature behind MapTanim's recommendations"

LITERATURE SOURCES SECTION:
Title "Scientific Foundation" text-xl font-semibold text-gray-800 mb-4

Each study card (bg-white border border-gray-200 rounded-xl p-5 mb-3):
- Citation text-sm font-medium text-gray-800
- Description text-sm text-gray-500 mt-1
- DOI or journal badge text-xs text-sky-600 bg-sky-50 px-2 py-0.5 rounded mt-2

8 study cards:
1. Martin-Guay et al. (2018) — Science of the Total Environment — 226 intercropping experiments, mean LER 1.30. This is the primary quantitative source for LER benchmarks in MapTanim's rule engine.
2. Vijayakumar et al. (2025) — Agriculture 4.0 adoption review — sorghum-soybean LER 1.31, row ratio 2:2 achieving LER as high as 1.43. Informed MapTanim's row layout generator.
3. Ardanov et al. (2023) — Systematic review of spice and aromatic plants as companion crops in vegetable cultivation. Documents benefits and practical barriers of companion planting.
4. Choruma et al. (2024) — Journal of Agriculture and Food Research — digital agriculture in Sub-Saharan Africa. Identified four primary adoption barriers: connectivity, literacy, infrastructure, affordability.
5. Muñoz et al. (2025) — Frontiers in Plant Science — WebGIS decision support for precision agriculture. Confirmed browser-based GIS tools deliver production-quality analytics to non-expert users.
6. Goodchild (1990) — Foundational account of spatial decision support systems. Argues GIS is most valuable as an analytical platform integrating environmental data with domain knowledge.
7. Altieri (1987) — Agroecology: The Scientific Basis of Alternative Agriculture. Established the theoretical basis for zone-level biophysical profiling approach used in MapTanim.
8. FAO PrAEctiCe Project (2022–2026) — EU Horizon-funded digital decision support tool for agroecology farmers in East Africa. Direct precedent for MapTanim's integration of scientific knowledge into a farmer-facing platform.

API DATA SOURCES SECTION:
Title "Environmental Data Sources" text-xl font-semibold text-gray-800 mt-8 mb-4

Three cards:
1. SoilGrids (ISRIC) — soil type, pH, drainage class — link to https://soilgrids.org
   Card body: "Global digital soil mapping service providing automated soil property predictions at any geographic coordinate via REST API. MapTanim uses this to classify each zone's soil profile." text-sm text-gray-600
2. OpenWeatherMap — temperature, rainfall, humidity — link to https://openweathermap.org
   Card body: "Free weather API providing current conditions and climate data. MapTanim retrieves temperature and rainfall to classify each zone's moisture and heat conditions." text-sm text-gray-600
3. NASA POWER — average daily sunlight hours — link to https://power.larc.nasa.gov
   Card body: "NASA's Prediction of Worldwide Energy Resource API providing climatological solar data. MapTanim retrieves average daily sunlight hours to classify each zone's light exposure." text-sm text-gray-600

RULE ENGINE EXPLAINER SECTION:
Title "How the Rule Engine Works" text-xl font-semibold text-gray-800 mt-8 mb-4
Card bg-white border border-gray-200 rounded-xl p-6:

Step-by-step explainer (space-y-4):
1. "Step 1 — Zone Profiling" text-sm font-semibold text-gray-800
   "After you draw a polygon, the system calls SoilGrids, OpenWeatherMap, and NASA POWER for the center coordinates. The retrieved values are mapped to one of nine biophysical condition profiles: Dry-Sunny-Loam, Dry-Sunny-Clay, Dry-Sunny-Sandy, Dry-Shaded-Loam, Wet-Sunny-Loam, Wet-Sunny-Clay, Wet-Shaded-Loam, Wet-Shaded-Clay, or Moderate-Mixed-Loam." text-sm text-gray-600 mt-1

2. "Step 2 — Crop Pair Scoring" text-sm font-semibold text-gray-800
   "Each of the 60+ companion planting pairs in the database is scored against the zone's condition profile using four parameters: soil pH match (25 points), water need match (25 points), sunlight hours match (25 points), and temperature range match (25 points). The final score is the average of both crops in the pair." text-sm text-gray-600 mt-1

3. "Step 3 — Ranking and Display" text-sm font-semibold text-gray-800
   "Pairs scoring 75–100 are rated Excellent (green). Pairs scoring 50–74 are rated Good (blue). Pairs below 50 are rated Poor (red). Recommendations are displayed ranked from highest to lowest score with plain-language compatibility explanations." text-sm text-gray-600 mt-1

Note at bottom: "The rule engine uses if-then logic based on biophysical parameter comparisons. It is not AI, machine learning, or neural network inference." text-xs text-gray-400 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 mt-4

---

### PAGE: Strategic Layout Builder (/layout-builder) — Phase 8

Header: "Strategic Layout Builder" + "Design your field layout with drag-and-drop zones"

FARM SELECTOR: select dropdown at top — choose which farm to design layout for

GRID AREA (bg-white border border-gray-200 rounded-xl p-6):
- Drag-and-drop grid 12 x 8 cells, each 44px x 44px border border-gray-100
- Crop A cells: bg-brand-200 text-brand-800 text-xs font-medium flex-center
- Crop B cells: bg-sky-200 text-sky-800
- Empty cells: bg-gray-50

PRODUCTIVITY HEATMAP TOGGLE (above grid):
- Toggle switch "Show Productivity Heatmap" text-sm text-gray-600
- When on: gradient overlay — brand-900 for highest expected yield density, brand-50 for lowest

TEMPLATES (flex gap-2 mb-4):
- "Standard" | "Rotation" | "Drought-Tolerant" | "Wet Season" — outline buttons pre-filling grid

SIDE PANEL (w-48 flex-shrink-0):
- "Crops" label text-xs uppercase tracking-wide text-gray-500 mb-2
- Crop A: draggable bg-brand-100 text-brand-700 rounded-lg px-3 py-2 text-sm font-medium
- Crop B: draggable bg-sky-100 text-sky-700 rounded-lg px-3 py-2 text-sm font-medium

LAYOUT STATS (below grid bg-white border border-gray-200 rounded-xl p-4 mt-4):
- "Layout Summary" text-sm font-semibold text-gray-800 mb-3
- Crop A cells: XX cells — bg-brand-100 text-brand-700 text-sm
- Crop B cells: XX cells — bg-sky-100 text-sky-700 text-sm
- Empty cells: XX cells — text-sm text-gray-500
- Crop A coverage: XX% of grid
- Crop B coverage: XX% of grid

"Save Layout" primary button below grid
"Clear Grid" outline button beside it

---

### PAGE: Land Exploration and Soil Visualization (/land-explorer) — Phase 9

Header: "Land Exploration" + "Terrain, elevation, and soil composition for your farm zones"

FARM SELECTOR: select dropdown at top

MAP VIEW (Leaflet 500px height rounded-2xl border border-gray-200):
- Satellite tile base
- Zone polygons rendered as GeoJSON: brand-500 fill 15% opacity, brand-600 stroke 2px
- Layer toggles top-right (flex flex-col gap-2):
  - "Satellite" toggle (active state bg-brand-50 border-brand-500)
  - "Terrain" toggle
  - "Soil Type" toggle — when active: each polygon fill color changes by soil type (Loam=brand-200, Clay=earth-200, Sandy=amber-200)
  - "Elevation" toggle — when active: elevation profile overlay

SOIL COMPOSITION PANEL (mt-4 grid grid-cols-1 md:grid-cols-2 gap-4):
Per zone card (bg-white border border-gray-200 rounded-xl p-5):
- Zone name text-sm font-semibold text-gray-800
- Zone condition profile badge bg-sky-50 text-sky-700 text-xs px-2 py-0.5 rounded
- Soil data (space-y-3 mt-3):
  Each row: label text-xs text-gray-500 uppercase tracking-wide + value text-sm font-medium text-gray-700
  - Soil Type: [value from SoilGrids]
  - pH Level: [value from SoilGrids] + small progress bar 0–14 showing pH position
  - Drainage Class: [value from SoilGrids] (Well Drained / Moderately Well Drained / Poorly Drained)
  - Water Need Category: [derived] Low / Moderate / High
  - Sunlight Hours: [value from NASA POWER] X.X hrs/day
  - Temperature: [value from OpenWeatherMap] XX°C avg
- "Refresh API Data" ghost button text-xs text-brand-600 mt-3 — re-calls the three APIs for the zone

ELEVATION PROFILE SECTION (bg-white border border-gray-200 rounded-xl p-5 mt-4 if terrain data available):
- "Elevation Profile" text-sm font-semibold text-gray-800 mb-3
- Recharts AreaChart showing elevation along farm perimeter
- Fill brand-100, stroke brand-500
- Y-axis: meters above sea level
- Note text-xs text-gray-400 mt-2: "Elevation data is derived from satellite terrain tiles. Accuracy is subject to map tile resolution."

---

### PAGE: Farm Operations Management (/farm-operations) — Phase 10

Header: "Farm Operations" + "Worker management, scheduling, and task tracking"

TABS: Workers | Task Schedule | Labor Costs | Material Inventory

WORKERS TAB:
- "+ Add Worker" primary button top-right
- Workers grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4:
  Each worker card (bg-white border border-gray-200 rounded-xl p-4):
  - Avatar 40px initials circle bg-earth-100 text-earth-700 font-semibold
  - Name text-sm font-semibold text-gray-800 + Role text-xs text-gray-400 (Farm Hand / Supervisor / Irrigation / Other)
  - Contact number text-xs text-gray-500 mt-1
  - Status badge: Active bg-brand-100 text-brand-700 | Inactive bg-gray-100 text-gray-500
  - "Edit" ghost button text-xs text-brand-600 ml-auto
- Add Worker modal: Name, Role select, Contact Number, Status select

TASK SCHEDULE TAB:
- "+ Add Task" primary button top-right
- Week view grid (7 columns, one per day):
  Column header: day name text-xs text-gray-500 uppercase + date text-sm font-medium text-gray-800
  Each column: space-y-2 min-h-[200px]
  Task pill (rounded-lg px-3 py-2 text-xs font-medium):
  - Irrigation: bg-sky-100 text-sky-700
  - Fertilization: bg-earth-100 text-earth-700
  - Harvesting: bg-amber-100 text-amber-700
  - Pest Control: bg-red-100 text-red-700
  - Labor: bg-brand-100 text-brand-700
  - Other: bg-gray-100 text-gray-600
- Add Task modal: Task Name, Type select, Assigned Worker select, Date, Notes

LABOR COSTS TAB:
- Table: Worker | Date | Hours | Rate/hr (₱) | Total (₱) | Task
- All monetary values ₱X,XXX.XX
- Totals row bg-brand-50
- "+ Log Labor" primary button top-right
- Monthly summary card top: Total Labor ₱X,XXX.XX | Avg Daily ₱X,XXX.XX | Workers Active X

MATERIAL INVENTORY TAB:
- "+ Add Item" primary button top-right
- Table: Item | Category | Quantity | Unit | Cost/Unit (₱) | Total Value (₱) | Last Updated
- Categories: Fertilizer | Pesticide | Seeds | Tools | Packaging | Other
- Totals row: Total Inventory Value ₱X,XXX.XX
- Low Stock badge: bg-red-100 text-red-700 "Low Stock" on items with quantity < threshold
- Add Item modal: Item Name, Category select, Quantity number, Unit (kg/L/pcs/bags), Cost per Unit ₱

---

### PAGE: Reports and Documentation (/reports) — Phase 12

Header: "Reports & Documentation" + "Generate and export farm reports"

REPORT TYPES (grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8):
Each report type card (bg-white border border-gray-200 rounded-xl p-5 hover:border-brand-300 hover:shadow-card-md cursor-pointer):
- Icon 40px bg-brand-50 rounded-xl flex-center, icon 22px text-brand-600
- Name text-base font-semibold text-gray-800 mt-3
- Description text-sm text-gray-500 mt-1
- "Generate" primary button mt-4 full width

6 report types:
1. FileText icon — "Farm Zone Summary" — "Complete overview of all zones including condition profiles, PRDP labels, verification status, and crop assignments."
2. BarChart3 icon — "Season Performance Report" — "Yield totals, revenue totals, and LER scores across all zones for a selected season."
3. CalendarDays icon — "Planting Calendar Export" — "Full planting calendar for all zones showing sow, fertilize, and harvest dates."
4. Wheat icon (or Sprout) — "Harvest Log Report" — "All harvest entries with totals by crop, zone, and date range."
5. Zap icon — "Activity Log Report" — "All daily activities with labor and material cost totals."
6. TrendingUp icon — "LER Comparison Report" — "Side-by-side simulated LER versus actual yield comparison across zones."

REPORT GENERATOR PANEL (shown after clicking a report type):
- Selected report title text-lg font-semibold text-gray-800
- Farm selector dropdown
- Date range: From date input + To date input
- Format selector: PDF | CSV (two pill buttons, active bg-brand-500 text-white)
- "Generate & Download" primary button with Download icon
- Preview panel below: bg-gray-50 border border-gray-200 rounded-xl p-5 min-h-[200px]
  Shows a text preview of the report content before download.

RECENT REPORTS (mt-8):
- "Recent Reports" text-xl font-semibold text-gray-800 mb-4
- Table: Report Name | Farm | Generated Date | Format | Download
  Download cell: "Download" text-xs text-brand-600 underline cursor-pointer

---

### PAGE: Language and Accessibility Settings (/settings) — Phase 13

Header: "Language & Accessibility" + "Customize MapTanim for your preferred language and display needs"

LANGUAGE SECTION (bg-white border border-gray-200 rounded-xl p-6 mb-4):
- "Language / Wika" text-base font-semibold text-gray-800 mb-4
- Two language cards (grid grid-cols-2 gap-3):
  ENGLISH card: Globe2 28px + "English" text-sm font-semibold text-gray-800 mt-2 + "All interface text in English" text-xs text-gray-500
  FILIPINO card: Globe2 28px + "Filipino" text-sm font-semibold text-gray-800 mt-2 + "Lahat ng teksto sa Filipino" text-xs text-gray-500
  Unselected: border border-gray-200 bg-white hover:border-brand-300
  Selected: border-2 border-brand-500 bg-brand-50

UI COMPLEXITY SECTION (bg-white border border-gray-200 rounded-xl p-6 mb-4):
- "Interface Mode" text-base font-semibold text-gray-800 mb-4
- Two mode cards (grid grid-cols-2 gap-3):
  STANDARD card: LayoutDashboard 28px + "Standard" + "Full interface with all labels and data"
  PICTOGRAM card: Image 28px + "Pictogram Mode" + "Simplified icons with minimal text — for low-literacy users"
  Unselected / Selected: same pattern as language cards

FONT SIZE SECTION (bg-white border border-gray-200 rounded-xl p-6 mb-4):
- "Font Size" text-base font-semibold text-gray-800 mb-4
- Three size options (flex gap-3):
  Small | Medium (default) | Large — pill buttons, active bg-brand-500 text-white rounded-full px-4 py-2 text-sm

CONTRAST SECTION (bg-white border border-gray-200 rounded-xl p-6 mb-4):
- "Display Contrast" text-base font-semibold text-gray-800 mb-4
- Toggle switch row: "High Contrast Mode" label text-sm text-gray-700 + toggle right
  When on: entire app applies higher contrast color scheme (dark borders, stronger text weights)

"Save Preferences" primary button bottom full width
Success toast on save: "Preferences saved. Refresh the page to apply all changes."

---

### PAGE: Team Collaboration (/team) — Phase 14

Header: "Team Collaboration" + "Real-time workspace for your farm team"

LAYOUT (grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-200px)]):

LEFT PANEL (md:col-span-1 bg-white border border-gray-200 rounded-xl overflow-hidden):
- Header px-4 py-3 border-b border-gray-100: "Team Members" text-sm font-semibold text-gray-800 + team count badge
- Member list (space-y-0 overflow-y-auto):
  Each member row (px-4 py-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer flex items-center gap-3):
  - Online indicator: 8px circle — green bg-brand-500 if online, gray bg-gray-300 if offline
  - Avatar 36px initials circle
  - Name text-sm font-medium text-gray-800 + role text-xs text-gray-400
  - "Active now" or "Last seen X min ago" text-xs text-gray-400 ml-auto
- "+ Invite Member" ghost button px-4 py-3 text-xs text-brand-600 border-t border-gray-100

CENTER PANEL (md:col-span-2 bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col):
- Header px-4 py-3 border-b border-gray-100 flex items-center gap-3:
  - Team name "Farm Team" text-sm font-semibold text-gray-800
  - "X members online" text-xs text-brand-600
- Messages area flex-1 overflow-y-auto px-4 py-4 space-y-4:
  Each message:
  - Avatar 32px + sender name text-xs text-gray-500 mb-0.5 + timestamp text-xs text-gray-400 ml-auto
  - Message bubble: bg-brand-50 text-gray-700 text-sm rounded-2xl px-4 py-2 max-w-[70%]
    My messages: bg-brand-500 text-white ml-auto
    Others: bg-gray-100 text-gray-700
- Activity feed (between messages, centered):
  "[name] updated Zone A status" text-xs text-gray-400 text-center py-2
- Input area px-4 py-3 border-t border-gray-100 flex items-center gap-3:
  - Textarea flex-1 bg-gray-100 rounded-xl px-4 py-2.5 text-sm resize-none max-h-[100px]
  - Send button: 40px circle bg-brand-500 hover:bg-brand-600 Send icon 18px text-white

SHARED ZONE ACTIVITY (mt-4 bg-white border border-gray-200 rounded-xl p-5):
- "Recent Zone Activity" text-sm font-semibold text-gray-800 mb-3
- Activity list (space-y-3):
  Each entry: avatar 28px + "[name] [action] [zone name]" text-xs text-gray-600 + time text-xs text-gray-400 ml-auto
  Actions: "updated", "added harvest to", "flagged an issue in", "approved"

---

### PAGE: Collaboration Workspace (/admin/collaboration) — Phase 7

Header: "Collaboration Workspace" + "Expert and farmer direct messaging and advisory coordination"

LAYOUT (grid grid-cols-1 md:grid-cols-3 gap-6):

LEFT PANEL (md:col-span-1 bg-white border border-gray-200 rounded-xl overflow-hidden):
- "Farmer Directory" text-sm font-semibold text-gray-800 px-4 py-3 border-b border-gray-100
- Search input w-full px-4 py-2 text-xs border-b border-gray-100
- Farmer list (overflow-y-auto):
  Each farmer (px-4 py-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer):
  - Avatar 34px initials + name text-sm font-medium text-gray-800 + municipality text-xs text-gray-400
  - Unread badge right: bg-brand-500 text-white text-xs rounded-full px-1.5 if unread messages exist
  - Last message preview text-xs text-gray-400 line-clamp-1 mt-0.5

CENTER PANEL (md:col-span-2 bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col):
- Header: selected farmer name + farm count + "Assigned to: [officer name]" text-xs text-gray-400
- Messages area: same structure as Team page messages
- Input area: textarea + "Send Advisory" button bg-brand-500

ADVISORY NOTES SIDEBAR (w-64 bg-white border border-gray-200 rounded-xl p-4 mt-4 md:mt-0):
- "Advisory Notes" text-sm font-semibold text-gray-800 mb-3
- All advisory notes sent to selected farmer (space-y-3):
  Each note card bg-brand-50 border border-brand-200 rounded-lg p-3:
  - Note content text-xs text-brand-800
  - Sent by text-xs text-brand-500 mt-1 + date text-xs text-gray-400
- "Add Note" ghost button text-xs text-brand-600 mt-2

---

### PAGE: Unified Ecosystem Dashboard (/ecosystem) — Phase 15

Header: "Farming Ecosystem" + "Your complete MapTanim overview across all 15 phases"

FARM HEALTH OVERVIEW (bg-white border border-gray-200 rounded-xl p-6 mb-6):
- "Farm Health Summary" text-base font-semibold text-gray-800 mb-4
- Farm selector dropdown if multiple farms
- Large circular health score 120px diameter center text-5xl font-bold:
  Color logic same as Crop Health tab (brand/amber/red by range)
- "Overall Farm Health Score" text-xs text-gray-500 uppercase tracking-wide text-center mt-2
- Score breakdown (grid grid-cols-2 md:grid-cols-4 gap-3 mt-5):
  Each score item bg-gray-50 rounded-xl p-3 text-center:
  - Value text-2xl font-bold text-gray-800
  - Label text-xs text-gray-500 uppercase tracking-wide mt-0.5
  Items: Avg Zone Score | Active Zones | Pending Verifications | Harvests This Season

PHASE PROGRESS CARDS (grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-6):
15 small cards, one per phase:
Each card (bg-white border border-gray-200 rounded-xl p-3 text-center):
- Phase number text-xs text-gray-400 uppercase tracking-wide
- Phase name text-xs font-semibold text-gray-700 mt-0.5 line-clamp-2
- Status indicator:
  Phases 1–5: bg-brand-500 rounded-full px-2 py-0.5 text-white text-xs "Active"
  Phases 6–15: bg-gray-100 text-gray-500 text-xs "Integrated"

CROSS-PHASE ANALYTICS (grid grid-cols-1 md:grid-cols-2 gap-5 mb-6):

LEFT — Activity Timeline (bg-white border border-gray-200 rounded-xl p-5):
- "Recent Activity Across All Phases" text-sm font-semibold text-gray-800 mb-3
- Timeline list (space-y-3):
  Each entry: colored left border (brand/amber/sky/earth by phase) + activity description text-xs text-gray-700 + time text-xs text-gray-400 + phase badge text-xs bg-gray-100 text-gray-500 rounded

RIGHT — Key Metrics Snapshot (bg-white border border-gray-200 rounded-xl p-5):
- "Key Metrics" text-sm font-semibold text-gray-800 mb-3
- Metrics grid (space-y-3):
  Each metric: label text-xs text-gray-500 uppercase tracking-wide + value text-lg font-bold text-gray-800
  - Total Yield This Season: XX kg
  - Total Revenue This Season: ₱X,XXX.XX
  - Best Performing Zone: [zone name]
  - Highest LER Zone: X.XX (Simulated)
  - Community Posts: X posts
  - Team Messages: X messages

NOTIFICATION CENTER (bg-white border border-gray-200 rounded-xl p-5 mb-6):
- "Unified Notifications" text-sm font-semibold text-gray-800 mb-3
- All platform notifications in one list (space-y-2):
  Each notification: colored dot by type + message text-xs text-gray-700 + time text-xs text-gray-400 + "View" text-xs text-brand-600 underline
  Types: zone verified (brand-500) | correction requested (red-500) | advisory note (sky-500) | harvest due (amber-500) | team message (earth-500)
- "Mark All Read" text-xs text-brand-600 top-right of section

QUICK ACTIONS (grid grid-cols-2 md:grid-cols-4 gap-3):
Each action card (bg-white border border-gray-200 rounded-xl p-4 hover:border-brand-300 hover:bg-brand-50 cursor-pointer text-center):
- Icon 28px text-brand-600 mx-auto
- Label text-xs font-medium text-gray-700 mt-2
Actions:
1. Plus icon + "Add Zone" → /farms/new
2. Sprout icon + "View Crops" → /crops
3. MessageSquare icon + "Community" → /community
4. BarChart3 icon + "Analytics" → /admin/analytics (admin) or /planting-plans (farmer)

---

## SECTION 5 — RULE ENGINE LOGIC

The rule engine uses if-then logic. It is not AI, not machine learning, not neural network inference.

ZONE PROFILING LOGIC:
Retrieved from APIs per zone center coordinates:
- Soil pH (SoilGrids)
- Drainage class (SoilGrids): Well Drained | Moderately Well Drained | Poorly Drained
- Average temperature °C (OpenWeatherMap)
- Rainfall mm (OpenWeatherMap)
- Sunlight hours/day (NASA POWER)

Mapping to nine profiles:
- Rainfall < 1000mm AND sunlight > 6hrs AND drainage = Well Drained AND loam soil → Dry-Sunny-Loam
- Rainfall < 1000mm AND sunlight > 6hrs AND drainage = Well Drained AND clay soil → Dry-Sunny-Clay
- Rainfall < 1000mm AND sunlight > 6hrs AND drainage = Well Drained AND sandy soil → Dry-Sunny-Sandy
- Rainfall < 1000mm AND sunlight ≤ 6hrs AND loam soil → Dry-Shaded-Loam
- Rainfall ≥ 1000mm AND sunlight > 6hrs AND loam soil → Wet-Sunny-Loam
- Rainfall ≥ 1000mm AND sunlight > 6hrs AND clay soil → Wet-Sunny-Clay
- Rainfall ≥ 1000mm AND sunlight ≤ 6hrs AND loam soil → Wet-Shaded-Loam
- Rainfall ≥ 1000mm AND sunlight ≤ 6hrs AND clay soil → Wet-Shaded-Clay
- All other combinations → Moderate-Mixed-Loam

SCORING LOGIC (per crop pair against zone profile):
pH match (25 pts): if zone pH within crop's optimal range → 25. If within 0.5 outside → 12. Otherwise → 0.
Water match (25 pts): if zone rainfall class matches crop's water need class → 25. If adjacent class → 12. Otherwise → 0.
Sunlight match (25 pts): if zone sunlight hours within crop's required range → 25. If within 1hr outside → 12. Otherwise → 0.
Temperature match (25 pts): if zone temperature within crop's range → 25. If within 2°C outside → 12. Otherwise → 0.

Final score = average of (Crop A score + Crop B score).

PLAN HEALTH SCORE:
Weighted formula applied continuously:
- Zone condition classification complete: +20 pts
- At least one Excellent-rated crop pair assigned: +25 pts
- Planting calendar generated: +20 pts
- At least one harvest recorded: +20 pts
- Zone verified by Extension Officer: +15 pts
Max = 100 pts.

LER FORMULA:
LER = (Intercropped yield of Crop A / Published monocrop yield of Crop A) + (Intercropped yield of Crop B / Published monocrop yield of Crop B)
All yields from peer-reviewed literature (Martin-Guay et al. 2018, Vijayakumar et al. 2025).
LER > 1.0 = intercropping is more efficient than monoculture.
Always labeled "Simulated LER (based on published data)."

---

## SECTION 6 — FILE UPDATE ORDER

Update files in this exact order. Never skip. Never rewrite from scratch unless the file is completely empty. Never delete working logic. Build forward only.

ORDER 1: client/index.html — Add Inter font link. Do not change anything else.
ORDER 2: client/src/index.css — Replace with full global CSS from Section 2.3.
ORDER 3: tailwind.config.ts — Add brand, earth colors, boxShadow tokens, Inter font.
ORDER 4: client/src/components/DashboardLayout.tsx — Update sidebar and header visuals per Section 2.4. Do not touch routing, auth, or role protection logic.
ORDER 5: client/src/components/NotificationBell.tsx — Update dropdown visuals. Do not touch tRPC queries.
ORDER 6: client/src/pages/Landing.tsx — Full visual redesign per Section 4 Landing.
ORDER 7: client/src/pages/Login.tsx — Update visuals. Do not touch auth mutations.
ORDER 8: client/src/pages/Register.tsx — Update visuals. Do not touch auth mutations. Ensure all municipalities listed.
ORDER 9: client/src/pages/dashboards/FarmerDashboard.tsx — Update visuals. Do not touch tRPC queries. Add skeleton loaders and empty states.
ORDER 10: client/src/pages/farmer/FarmNew.tsx — Update three-step flow visuals. Do not touch Leaflet draw, turf.area(), GeoJSON, or tRPC mutations.
ORDER 11: client/src/components/FarmControlCenter.tsx — Update all tab visuals. Do not touch tRPC queries.
ORDER 12: client/src/pages/farmer/Monitoring.tsx — Update visuals.
ORDER 13: client/src/pages/farmer/PlantingPlans.tsx — Update visuals including LER display, grid, health score bar.
ORDER 14: client/src/pages/dashboards/OfficerDashboard.tsx — Update visuals.
ORDER 15: client/src/pages/officer/VerifyZone.tsx — Update visuals. Do not touch approve/reject mutations.
ORDER 16: client/src/pages/dashboards/AdminDashboard.tsx — Update visuals.
ORDER 17: client/src/pages/admin/ManageUsers.tsx — Update visuals.
ORDER 18: client/src/pages/admin/Analytics.tsx — Update visuals.
ORDER 19: client/src/pages/shared/CropLibrary.tsx — Update visuals.
ORDER 20: client/src/pages/shared/CompanionPlanting.tsx — Update visuals.
ORDER 21: client/src/pages/shared/Community.tsx — Update visuals per Phase 11 spec.
ORDER 22: client/src/pages/shared/Research.tsx — Create if missing. Implement Phase 6 Research page per Section 4.
ORDER 23: client/src/pages/farmer/LayoutBuilder.tsx — Create if missing. Implement Phase 8 per Section 4.
ORDER 24: client/src/pages/admin/SystemHealth.tsx — Create if missing. Implement per Section 4.
ORDER 25: client/src/pages/admin/Collaboration.tsx — Create if missing. Implement Phase 7 per Section 4.
ORDER 26: client/src/pages/farmer/LandExplorer.tsx — Create if missing. Implement Phase 9 per Section 4.
ORDER 27: client/src/pages/farmer/FarmOperations.tsx — Create if missing. Implement Phase 10 per Section 4.
ORDER 28: client/src/pages/shared/Reports.tsx — Create if missing. Implement Phase 12 per Section 4.
ORDER 29: client/src/pages/shared/Settings.tsx — Create if missing. Implement Phase 13 per Section 4.
ORDER 30: client/src/pages/farmer/Team.tsx — Create if missing. Implement Phase 14 per Section 4.
ORDER 31: client/src/pages/Ecosystem.tsx — Create if missing. Implement Phase 15 per Section 4.
ORDER 32: App.tsx — Register all routes from Section 3. Apply role protection per Section 7.

---

## SECTION 7 — ROLE ACCESS MATRIX

| Route                    | Farmer | Extension Officer | Admin |
|--------------------------|--------|-------------------|-------|
| /                        | ✅     | ✅                | ✅    |
| /login                   | ✅     | ✅                | ✅    |
| /register                | ✅     | ✅                | ❌    |
| /dashboard (farmer)      | ✅     | ❌                | ❌    |
| /farms/new               | ✅     | ❌                | ❌    |
| /farms/:id               | ✅     | ❌                | ❌    |
| /monitoring              | ✅     | ❌                | ❌    |
| /planting-plans          | ✅     | ❌                | ❌    |
| /layout-builder          | ✅     | ❌                | ❌    |
| /land-explorer           | ✅     | ❌                | ❌    |
| /farm-operations         | ✅     | ❌                | ❌    |
| /reports                 | ✅     | ❌                | ❌    |
| /settings                | ✅     | ✅                | ✅    |
| /team                    | ✅     | ❌                | ❌    |
| /dashboard (officer)     | ❌     | ✅                | ❌    |
| /verify/:id              | ❌     | ✅                | ✅    |
| /dashboard (admin)       | ❌     | ❌                | ✅    |
| /admin/users             | ❌     | ❌                | ✅    |
| /admin/analytics         | ❌     | ❌                | ✅    |
| /admin/system            | ❌     | ❌                | ✅    |
| /admin/collaboration     | ❌     | ❌                | ✅    |
| /ecosystem               | ✅     | ❌                | ✅    |
| /crops                   | ✅     | ✅                | ✅    |
| /companion-planting      | ✅     | ✅                | ✅    |
| /community               | ✅     | ✅                | ❌    |
| /research                | ✅     | ✅                | ❌    |

---

## SECTION 8 — ABSOLUTE RULES

1. Update files in the exact order listed in Section 6. Never skip. Never jump ahead.
2. After updating each file, read it back and confirm it matches the spec before moving to the next.
3. Do not add any feature, page, component, or database table not described in this document.
4. Do not remove any feature, page, or component that is described in this document.
5. All tRPC query and mutation logic stays exactly as it currently works. Only visual and layout code changes when updating existing files.
6. All color references must use the token names from Section 2.1 or the exact hex values. Never use generic Tailwind green-500 for brand colors.
7. Every monetary value displays with ₱ symbol formatted as ₱X,XXX.XX.
8. Every area value displays with 2 decimal places and "ha" suffix formatted as X.XX ha.
9. Every LER value displays with the label "Simulated LER (based on published data)" below it. Never show LER as a real measured field value.
10. Every page that fetches data must show skeleton loaders while loading and an empty state when no data exists.
11. Every form submission must show a success toast (brand-500 left border) on success or error toast (red-500 left border) on failure.
12. Mobile responsiveness: sidebar hidden below lg (hamburger trigger), stats grid 2 columns mobile / 4 desktop, zone form = bottom sheet on mobile.
13. The nine zone condition profiles appear exactly as named in Section 1.3. No variations.
14. The thirteen crops are exactly as listed in Section 1.2. No others.
15. The system does not use IoT sensors, machine learning, AI inference, or real-time hardware. The rule engine uses if-then logic. Never describe it as AI.
16. All 15 phases are accessible and rendered. Phases 1–5 are fully functional. Phases 6–15 are fully rendered pages with their own content as specified in Section 4.
17. The PWA manifest and service worker registration must remain intact.
18. PRDP label format for intercrop: "Crop1_Crop2 (60-40)" — underscore between crops, percentages in parentheses.
19. PRDP label format for rotation crop: "Crop1-Crop2" — hyphen between crops.
20. Admin accounts cannot be created from /register. Admin role is assigned only by existing admins from /admin/users.
21. Build forward only. Never delete working code. Never rewrite from scratch unless a file is completely empty. The waterfall direction is forward — accumulate, never demolish.
