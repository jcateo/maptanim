cat > /home/claude/MAPTANIM_FULL_MASTER.md << 'EOF'
# MapTanim — Complete Antigravity Implementation Master Guide
> This is the single source of truth for the entire MapTanim system.
> Source: MapTanim Capstone Document, STI West Negros University, May 2026.
> Authors: Jomarey D. Parreño, John Ryan R. Vasquez, Jason B. Juanillo, James M. Cateo.
> Every word in this document comes directly from the capstone document. Nothing is added. Nothing is removed.
> Antigravity must read this entire file before touching any code file.
> Update existing files one by one in the exact order listed. Do not skip. Do not rewrite from scratch unless a file is completely empty.

---

## SECTION 1 — WHAT MAPTANIM IS (from Chapter 1 of the capstone document)

MapTanim is a web and mobile-based intercropping management platform using geomapping. It enables smallholder vegetable farmers to draw their field zones on a digital satellite map. After drawing, the system automatically retrieves environmental data from free scientific APIs — SoilGrids, OpenWeatherMap, and NASA POWER — to classify each zone into one of nine biophysical condition profiles. An agroecological rule engine then matches scientifically compatible crop pairs to each zone based on soil pH, water need, sunlight hours, and temperature range. The database contains 60+ companion planting pairs sourced from peer-reviewed literature. The system generates auto-populated planting calendars, crop monitoring tools, plan health scoring, and a farm analytics dashboard that includes simulated Land Equivalent Ratio computation. Beyond intercropping planning, MapTanim provides a complete 15-phase farming ecosystem including team collaboration, strategic layout management, community knowledge sharing, and comprehensive farm operations management.

### 1.1 The Three User Roles
1. FARMER — primary user — draws farm polygons, receives crop pair recommendations, manages harvests and activities, tracks yield and revenue, views planting calendars, participates in community forum
2. EXTENSION OFFICER — monitors farmer intercropping plans, adds advisory notes directly within the system, verifies farm zones, provides correction feedback to farmers
3. ADMINISTRATOR — super admin dashboard, manages users, manages roles and permissions, views activity logs, manages verification workflows, views platform analytics, views zone performance reports, uses export tools

### 1.2 The Thirteen Vegetables in the System
From the capstone document Phase 3 scope exactly:
Tomato, Eggplant, Pepper, Cabbage, Onion, Carrot, Beans, Lettuce, Cucumber, Okra, Corn, Squash, Kangkong.
These thirteen crops are the only crops in the system. No others exist.

### 1.3 The Nine Biophysical Condition Profiles
The system maps retrieved API values to exactly one of these nine profiles:
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

### 1.5 The Six Core Processes (from Conceptual Framework Section 2.4.2)
1. Automatic zone condition classification — maps retrieved API values to one of nine biophysical condition profiles
2. Agroecological rule engine scoring — computes a match score from 0 to 100 for each candidate crop pair against the zone's condition profile
3. Strategic layout generation — creates drag-and-drop zone arrangements with rotation, drought, and wet season templates
4. Land Equivalent Ratio simulation — calculates expected land-use efficiency using published yield data
5. Plan health score computation — continuously grades the season plan using a weighted formula
6. Planting calendar generation — derives sow, transplant, fertilize, and harvest dates from published crop growth duration data

### 1.6 The System Outputs (from Conceptual Framework Section 2.4.3)
- Ranked zone-specific crop pair recommendations with plain-language compatibility explanations
- Auto-generated planting calendar with task reminders
- Drag-and-drop strategic layouts with productivity heatmaps
- Plan health score trend graph for each zone
- Simulated and actual LER values at zone and farm level
- Comprehensive farm analytics dashboard displaying income estimates, zone performance rankings, team collaboration workspace, and multi-season comparison data

### 1.7 The LER Formula
LER = (Intercropped yield of Crop A / Monocrop yield of Crop A) + (Intercropped yield of Crop B / Monocrop yield of Crop B)
All yield values come from peer-reviewed published literature. LER is always labeled in the UI as "Simulated LER (based on published data)" — never as a measured real field value.
LER greater than 1.0 means intercropping is more efficient than monoculture.

### 1.8 The Rule Engine Scoring
Score 75–100 = Excellent
Score 50–74 = Good
Score below 50 = Poor
Score is computed per crop pair against the zone's biophysical condition profile using four parameters: soil pH match, water need match, sunlight hours match, temperature range match. Each parameter contributes up to 25 points. Final score is average of both crops in the pair.

### 1.9 The Fifteen Phases (from Scope Section 1.3.1 — exact wording)
Phase 1: User Access and Farm Setup — farmer profile creation, farm registration, GPS location setup, interactive map picker, crop selection, and onboarding tutorial.
Phase 2: GIS Farm and Zone Mapping — interactive satellite map with polygon drawing tools, zone labeling, automated soil mapping via SoilGrids API, water source visualization, elevation, and terrain analysis overlays.
Phase 3: Crop Planning and Evaluation — crop library covering 13 high-value vegetables, seasonal evaluation, crop suitability scoring (0–100), companion planting matrix, crop rotation planning, financial projection dashboard, and auto-generated planting calendar.
Phase 4: Farm Monitoring and Harvest Management — crop growth tracking, daily activity logs, farm task scheduler, harvest logging, yield recording, revenue tracking, crop lifecycle timeline, and photo comparison gallery.
Phase 5: Administration and System Analytics — super admin dashboard, user management, role and permission system, activity logs, verification workflows, platform analytics, zone performance reports, and export tools.
Phase 6: Research and Data Collection.
Phase 7: Expert and Farmer Collaboration Workspace.
Phase 8: Strategic Farm Layout Management — drag-and-drop grid and productivity heatmaps.
Phase 9: Land Exploration and Soil Visualization.
Phase 10: Farm Operations Management — including worker and scheduling.
Phase 11: Community and Knowledge Sharing.
Phase 12: Reports and Documentation Generation.
Phase 13: Multi-language and Accessibility Features — Filipino and English.
Phase 14: Real-time Team Collaboration.
Phase 15: Unified Integrated Farming Ecosystem Dashboard.

Phases 1 through 5 are the current deliverable being built and evaluated.
Phases 6 through 15 are the complete vision — they are defined in the document and must be shown in the system as "Coming Soon" sections, not hidden or removed.

### 1.10 Delimitations (what the system does NOT do)
- Does NOT use IoT sensors or physical hardware
- Does NOT conduct actual field trials or controlled yield experiments
- Does NOT include NDVI, satellite imagery processing, or real-time remote sensing
- Does NOT include offline-first data saving or automatic synchronization (internet connection required)
- Does NOT include marketplace features, input supplier integrations, or e-commerce
- Does NOT include voice-based input, SMS alerting, or automatic speech recognition
- GPS polygon accuracy has an estimated error of 3 to 5 meters (smartphone hardware dependent)
- Rule engine covers only the 60+ companion planting pairs in the validated database

### 1.11 PWA Requirement
MapTanim is developed as a Progressive Web Application (PWA). This means:
- No app store download required
- Can be installed on home screen from browser
- Static assets are cached for offline viewing (pages load even without internet, but data requires connection)
- Must function on low-cost Android smartphones

---

## SECTION 2 — DESIGN SYSTEM

### 2.1 Color Palette
These are the exact color values. Add them to client/src/index.css as CSS custom properties.
Never use raw Tailwind green-500 or similar generic classes for brand colors. Always reference these tokens.

```css
:root {
  /* Primary Brand — Forest Green */
  --brand-50:   #f0fdf4;
  --brand-100:  #dcfce7;
  --brand-200:  #bbf7d0;
  --brand-300:  #86efac;
  --brand-400:  #4ade80;
  --brand-500:  #22c55e;   /* primary buttons, active nav, links, success */
  --brand-600:  #16a34a;   /* hover state on primary buttons */
  --brand-700:  #15803d;   /* pressed/active state */
  --brand-800:  #166534;   /* dark accents */
  --brand-900:  #14532d;   /* sidebar background, hero background, footer */

  /* Earth Brown — warm agricultural accent */
  --earth-50:   #fdf8f0;
  --earth-100:  #faebd7;
  --earth-300:  #e8b86d;
  --earth-500:  #b87333;   /* activity badges, harvest tags, earth accents */
  --earth-700:  #7c4a1e;

  /* Sky Blue — information and secondary data */
  --sky-50:     #f0f9ff;
  --sky-100:    #e0f2fe;
  --sky-500:    #0ea5e9;   /* info states, officer badge, zone profile badges */
  --sky-700:    #0369a1;

  /* Neutrals */
  --white:      #ffffff;
  --gray-50:    #f8fafc;   /* page background — never pure white */
  --gray-100:   #f1f5f9;   /* card backgrounds, input backgrounds */
  --gray-200:   #e2e8f0;   /* borders, dividers */
  --gray-300:   #cbd5e1;   /* disabled borders */
  --gray-400:   #94a3b8;   /* placeholder text, disabled states */
  --gray-500:   #64748b;   /* secondary text */
  --gray-600:   #475569;   /* body text */
  --gray-700:   #334155;   /* strong body text */
  --gray-800:   #1e293b;   /* headings */
  --gray-900:   #0f172a;   /* page titles, strongest text */

  /* Status Colors */
  --status-verified:    #22c55e;
  --status-pending:     #f59e0b;
  --status-correction:  #ef4444;
  --status-excellent:   #22c55e;
  --status-good:        #3b82f6;
  --status-poor:        #ef4444;

  /* Amber for pending states */
  --amber-50:   #fffbeb;
  --amber-100:  #fef3c7;
  --amber-500:  #f59e0b;
  --amber-700:  #b45309;

  /* Red for errors and corrections */
  --red-50:     #fef2f2;
  --red-100:    #fee2e2;
  --red-200:    #fecaca;
  --red-500:    #ef4444;
  --red-600:    #dc2626;
  --red-700:    #b91c1c;
}
```

Add to tailwind.config.ts theme.extend.colors:
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

Add to tailwind.config.ts theme.extend.boxShadow:
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

Add to client/src/index.css:
```css
body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f8fafc;
  color: #475569;
}
```

Typography scale — use these Tailwind classes consistently:
| Role                | Tailwind Classes                                      |
|---------------------|-------------------------------------------------------|
| Page Title (H1)     | text-2xl font-bold text-gray-800 leading-tight        |
| Section Title (H2)  | text-xl font-semibold text-gray-800                   |
| Card Title (H3)     | text-base font-semibold text-gray-800                 |
| Body Text           | text-sm text-gray-600 leading-relaxed                 |
| Label               | text-sm font-medium text-gray-700                     |
| Helper / Caption    | text-xs text-gray-400                                 |
| Stat Number         | text-3xl font-bold text-gray-900                      |
| Stat Label          | text-xs font-medium uppercase tracking-wide text-gray-500 |
| Badge Text          | text-xs font-medium                                   |
| Button Text         | text-sm font-medium                                   |
| Nav Item Text       | text-sm font-medium                                   |
| Score Number        | text-4xl font-bold                                    |

### 2.3 Global CSS (full content to replace client/src/index.css after the Tailwind import)
```css
@import 'tailwindcss';

/* Font */
body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  -webkit-font-smoothing: antialiased;
  background-color: #f8fafc;
}

/* Smooth scrolling */
html { scroll-behavior: smooth; }

/* Scrollbar */
::-webkit-scrollbar { width: 5px; height: 5px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: #94a3b8; }

/* Focus */
*:focus-visible { outline: none; box-shadow: 0 0 0 2px #22c55e; border-radius: 6px; }

/* Leaflet z-index fix */
.leaflet-container { z-index: 1; }
.leaflet-top, .leaflet-bottom { z-index: 10; }
.leaflet-draw-toolbar a {
  background-color: white !important;
  border-radius: 8px !important;
  border: 1px solid #e2e8f0 !important;
}

/* Remove number input arrows */
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }

/* Page entry animation */
.page-enter { animation: fadeSlideUp 0.2s ease-out; }

@keyframes fadeSlideUp {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Slide in from right — zone form panel */
@keyframes slideInRight {
  from { transform: translateX(100%); opacity: 0; }
  to   { transform: translateX(0); opacity: 1; }
}
.slide-in-right { animation: slideInRight 0.25s ease-out; }

/* Slide up from bottom — mobile bottom sheet */
@keyframes slideInBottom {
  from { transform: translateY(100%); }
  to   { transform: translateY(0); }
}
.slide-in-bottom { animation: slideInBottom 0.3s ease-out; }

/* Pulse on live area counter */
@keyframes pulseGreen {
  0%, 100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4); }
  50%       { box-shadow: 0 0 0 8px rgba(34, 197, 94, 0); }
}
.pulse-green { animation: pulseGreen 2s infinite; }

/* Skeleton shimmer */
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

/* Bounce down for scroll indicator */
@keyframes bounceDown {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(8px); }
}
.bounce-down { animation: bounceDown 1.6s ease-in-out infinite; }

/* Plan health score bar fill */
@keyframes fillBar {
  from { width: 0%; }
  to   { width: var(--bar-width); }
}
.bar-fill { animation: fillBar 1s ease-out forwards; }

/* Fade in for route transitions */
@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}
.fade-in { animation: fadeIn 0.15s ease-out; }
```

### 2.4 Component Visual Specifications

SIDEBAR (applies to DashboardLayout.tsx):
- Background: #14532d
- Width: 240px fixed on desktop (w-60), hidden on mobile screens below lg breakpoint
- On mobile: sidebar slides in from left as an overlay triggered by hamburger button in header
- Logo area: height 64px, padding px-6, flex items-center gap-3
  - Sprout icon from lucide-react, size 28px, color #4ade80
  - "MapTanim" text-lg font-bold text-white
- Navigation section label: text-xs uppercase tracking-widest px-4 mt-5 mb-1 color #4ade80 font-medium
- Nav item: height 44px, padding px-4, border-radius rounded-lg, flex items-center gap-2.5
  - Inactive: text color #86efac, icon color #86efac, bg transparent
  - Hover: bg #166534, text white, icon white, transition 150ms
  - Active: bg #15803d, text white font-semibold, left border 3px solid #4ade80
  - Icon size: 18px
- Divider line between nav sections: 1px solid #166534, mx-4 my-3
- User profile (pinned at bottom, border-top 1px solid #166534, p-4):
  - Avatar: 34px circle bg-brand-800 text-white font-semibold text-sm, shows initials
  - Name: text-sm font-medium text-white
  - Role: text-xs text-brand-300
  - Logout button: text-xs text-brand-300 hover:text-white flex items-center gap-1

HEADER TOP BAR (applies to DashboardLayout.tsx):
- Height: 64px
- Background: white
- Border bottom: 1px solid #e2e8f0
- Shadow: 0 1px 3px rgba(0,0,0,0.04)
- Padding: px-6
- Left: page title text-xl font-semibold text-gray-800
- Right (flex items-center gap-3):
  - Global search: input w-56 bg-gray-100 rounded-full px-4 py-2 text-sm text-gray-600 border-none focus:ring-2 focus:ring-brand-500, Search icon 15px text-gray-400 inside
  - Notification bell: 40px circle bg-gray-100 hover:bg-gray-200 relative, Bell icon 20px text-gray-600, red badge -top-1 -right-1 18px circle bg-red-500 text-white text-xs font-bold
  - User avatar: 36px circle bg-brand-100 text-brand-700 font-semibold text-sm, shows initials

STAT CARDS:
- bg-white rounded-xl border border-gray-200 p-5 shadow-card
- Hover: shadow-card-md border-brand-200 transition-all duration-200
- Layout: flex items-center gap-4
- Left: 48px rounded-lg bg-{variant}-50 flex items-center justify-center, icon 24px text-{variant}-600
- Right: flex-col
  - Number: text-3xl font-bold text-gray-900
  - Label: text-xs font-medium uppercase tracking-wide text-gray-500 mt-0.5

PRIMARY BUTTON:
- bg-brand-500 hover:bg-brand-600 active:bg-brand-700 text-white
- text-sm font-medium rounded-lg px-4 py-2.5 min-h-[40px]
- shadow-card hover:shadow-green transition-all duration-150
- Disabled: opacity-50 cursor-not-allowed
- Loading state: Loader2 icon spinning replaces button text or shows alongside

OUTLINE BUTTON:
- bg-white border border-gray-200 hover:border-brand-300 hover:bg-brand-50
- text-gray-600 hover:text-brand-700 text-sm font-medium rounded-lg px-4 py-2.5

DESTRUCTIVE BUTTON:
- bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg px-4 py-2.5

STATUS BADGES (all use: inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium):
- Verified: bg-brand-100 text-brand-700 + 6px circle bg-brand-500 dot
- Pending Review: bg-amber-100 text-amber-700 + 6px circle bg-amber-500 dot
- Needs Correction: bg-red-100 text-red-700 + 6px circle bg-red-500 dot
- Excellent: bg-brand-100 text-brand-700
- Good: bg-blue-100 text-blue-700
- Poor: bg-red-100 text-red-700
- Verified Expert (officer in forum): bg-brand-500 text-white + CheckCircle 11px icon
- Farmer role: bg-earth-100 text-earth-700
- Officer role: bg-sky-100 text-sky-700
- Admin role: bg-gray-100 text-gray-700
- Dry Season: bg-orange-100 text-orange-700
- Wet Season: bg-sky-100 text-sky-700
- Year-round: bg-brand-100 text-brand-700

FORM INPUTS:
- Label: text-sm font-medium text-gray-700 mb-1.5 block
- Required asterisk: text-red-500 ml-0.5
- Input: bg-white border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-800 w-full
  - Height: 40px
  - Focus: border-brand-500 ring-2 ring-brand-500/20 outline-none
  - Error: border-red-500 ring-2 ring-red-500/15
  - Placeholder: text-gray-400
  - Disabled: bg-gray-100 text-gray-400 cursor-not-allowed
  - Read-only / auto-calculated: bg-gray-100 border-gray-200 text-gray-500 cursor-not-allowed
- Error message: text-xs text-red-500 mt-1 flex items-center gap-1
- Helper text: text-xs text-gray-400 mt-1

TABLES:
- Container: bg-white rounded-xl border border-gray-200 shadow-card overflow-hidden
- Header row: bg-gray-50 border-b border-gray-200
- Header cell: text-xs font-medium uppercase tracking-wide text-gray-500 px-4 py-3
- Data row: border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors
- Data cell: text-sm text-gray-700 px-4 py-3.5
- Totals row: bg-brand-50 border-t-2 border-brand-200
- Totals cell: text-sm font-semibold text-brand-700 px-4 py-3
- Empty state: py-16 text-center (icon 48px text-gray-300, title text-sm font-medium text-gray-500 mt-3, subtitle text-xs text-gray-400 mt-1)

MODALS:
- Overlay: fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center px-4
- Panel: bg-white rounded-2xl shadow-modal w-full max-w-md max-h-[90vh] overflow-y-auto
- Header: px-6 pt-6 pb-4 border-b border-gray-100 flex justify-between items-center
  - Title: text-lg font-semibold text-gray-800
  - X button: 32px circle hover:bg-gray-100 flex-center
- Body: px-6 py-5 space-y-4
- Footer: px-6 pb-6 pt-4 border-t border-gray-100 flex justify-end gap-3

TOAST NOTIFICATIONS (position: fixed bottom-4 right-4 z-50):
- Success: bg-white border-l-4 border-brand-500 shadow-elevated rounded-lg px-4 py-3 w-[360px] slide-in-right
- Error: border-l-4 border-red-500
- Info: border-l-4 border-sky-500
- Inside: flex items-start gap-3, icon 20px, title text-sm font-semibold text-gray-800, message text-xs text-gray-500 mt-0.5
- Auto-dismiss after 4000ms

TABS:
- Tab list: bg-gray-100 rounded-lg p-1 flex gap-1 overflow-x-auto
- Inactive tab: px-4 py-2 rounded-md text-sm font-medium text-gray-500 hover:bg-white hover:text-gray-700 transition-all whitespace-nowrap
- Active tab: bg-white text-gray-800 font-semibold shadow-card rounded-md px-4 py-2 text-sm

NOTIFICATION BELL DROPDOWN:
- bg-white rounded-xl shadow-modal border border-gray-200 w-80 max-h-96 overflow-y-auto
- Header: px-4 py-3 border-b border-gray-100 flex justify-between
  - "Notifications" text-sm font-semibold text-gray-800
  - "Mark all read" text-xs text-brand-600 cursor-pointer hover:text-brand-700
- Notification item: px-4 py-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer
  - Unread: bg-brand-50 border-l-3 border-brand-500
  - Read: bg-white
  - Message: text-sm text-gray-700 line-clamp-2
  - Time: text-xs text-gray-400 mt-0.5
- Empty: py-10 text-center, BellOff 32px text-gray-300 mx-auto, "No new notifications" text-sm text-gray-400 mt-3

SKELETON LOADERS:
- All use class="skeleton" defined in global CSS
- Stat card: h-24 w-full rounded-xl
- Farm card: h-44 w-full rounded-xl
- Table row: h-12 w-full rounded-md mb-1
- Text line tall: h-5 w-3/4 rounded
- Text line short: h-4 w-1/2 rounded

---

## SECTION 3 — COMPLETE NAVIGATION STRUCTURE

### 3.1 Public Routes (no login required)
/ — Landing Page
/login — Login Page
/register — Register Page

### 3.2 Farmer Routes (role: farmer only)
/dashboard — Farmer Dashboard (Phase 1: home with stats, farms list, quick actions)
/farms/new — New Farm Setup (Phase 1 + Phase 2: location selection, map drawing, zone form)
/farms/:id — Farm Control Center (Phase 2, 3, 4: tabs for all farm management)
/monitoring — Monitoring Hub (Phase 2: tabbed view of all farms at once)
/planting-plans — Planting Plans (Phase 3: LER calculator, drag-and-drop layout, health score)
/layout-builder — Strategic Layout Builder (Phase 8: drag-and-drop grid, productivity heatmaps)
/crops — Crop Library (Phase 3: shared)
/companion-planting — Companion Planting Guide (Phase 3: shared)
/community — Community Forum (Phase 11: shared)
/research — Research and Data (Phase 6: shared)

### 3.3 Extension Officer Routes (role: extension_officer only)
/dashboard — Officer Dashboard (Phase 5: queue, assigned farmers, advisory tools)
/verify/:id — Zone Verification Page (Phase 5: review and approve or flag zones)
/crops — Crop Library (shared)
/companion-planting — Companion Planting Guide (shared)
/community — Community Forum (shared)
/research — Research and Data (Phase 6: shared)

### 3.4 Admin Routes (role: admin only)
/dashboard — Admin Dashboard (Phase 5: system overview, stats, recent users)
/admin/users — Manage Users (Phase 5: user directory, role management)
/admin/analytics — Platform Analytics (Phase 5: financial aggregation, zone reports)
/admin/system — System Health (Phase 5: activity logs, export tools)
/admin/collaboration — Collaboration Workspace (Phase 7)

### 3.5 Sidebar Navigation Items per Role

FARMER SIDEBAR (in this exact order):
Section label: MAIN
- Dashboard (LayoutDashboard icon) → /dashboard
- Monitoring Hub (Activity icon) → /monitoring
Section label: FARM TOOLS
- Planting Plans (Grid3X3 icon) → /planting-plans
- Layout Builder (LayoutTemplate icon) → /layout-builder
Section label: KNOWLEDGE
- Crop Library (BookOpen icon) → /crops
- Companion Planting (GitMerge icon) → /companion-planting
- Research Data (FlaskConical icon) → /research
Section label: COMMUNITY
- Community Forum (MessageSquare icon) → /community

EXTENSION OFFICER SIDEBAR (in this exact order):
Section label: MAIN
- Officer Dashboard (ClipboardCheck icon) → /dashboard
Section label: KNOWLEDGE
- Crop Library (BookOpen icon) → /crops
- Companion Planting (GitMerge icon) → /companion-planting
- Research Data (FlaskConical icon) → /research
Section label: COMMUNITY
- Community Forum (MessageSquare icon) → /community

ADMIN SIDEBAR (in this exact order):
Section label: ADMINISTRATION
- System Overview (Shield icon) → /dashboard
- Manage Users (Users icon) → /admin/users
- Platform Analytics (BarChart3 icon) → /admin/analytics
- System Health (Server icon) → /admin/system
Section label: TOOLS
- Collaboration (Users2 icon) → /admin/collaboration

---

## SECTION 4 — PAGE-BY-PAGE SPECIFICATIONS

### PAGE: Landing Page (/)

HEADER (sticky top-0 z-50 h-16):
- bg-white/90 backdrop-blur-md border-b border-gray-200
- Left: Sprout icon 26px text-brand-500 + "MapTanim" text-lg font-bold text-gray-800 — flex items-center gap-2
- Right: "Log In" button — outline style border-brand-500 text-brand-700 hover:bg-brand-50 px-5 py-2 rounded-lg text-sm font-medium

HERO SECTION (min-h-screen):
- Background: linear-gradient(160deg, #14532d 0%, #166534 55%, #15803d 100%)
- Dot grid overlay: SVG pattern, white dots 1.5px radius every 28px at 4% opacity, position absolute inset-0
- Two decorative blurred circles (position absolute pointer-events-none):
  - Circle 1: 500px, bg-brand-400 at 7% opacity, top-right, blur-3xl
  - Circle 2: 400px, bg-earth-500 at 5% opacity, bottom-left, blur-3xl
- Content: max-w-4xl mx-auto px-6 flex flex-col items-center text-center pt-36 pb-24

Content items in hero (top to bottom):
1. Eyebrow pill: "Aligned with DA-PRDP Commodity Mapping Standard" — bg-white/10 border border-white/20 text-xs text-brand-200 px-4 py-1.5 rounded-full backdrop-blur-sm
2. Headline (mt-6): text-5xl md:text-6xl font-bold text-white leading-tight — "Smart Farm Mapping" on line 1, "for Negros Occidental Farmers" on line 2
3. Sub-headline (mt-5 max-w-2xl): text-lg text-brand-200 leading-relaxed — "Draw your farm boundaries, classify your crops using PRDP standards, and get verified by DA Extension Officers — all in your browser, no GIS training required."
4. Two CTA buttons (mt-9 flex gap-4 flex-wrap justify-center):
   - "Get Started" → /register — bg-brand-500 hover:bg-brand-400 text-white px-9 py-4 rounded-xl text-base font-semibold shadow-green hover:shadow-xl transition-all
   - "Log In" → /login — bg-white/10 hover:bg-white/15 text-white border border-white/25 px-9 py-4 rounded-xl text-base font-medium
5. Scroll indicator (mt-20): ChevronDown icon 28px text-white/35 class="bounce-down"

FEATURES SECTION (py-24 bg-white):
- Title: "Everything a Farmer Needs" — text-3xl font-bold text-gray-800 text-center
- Subtitle: "Integrated tools that turn your field knowledge into a verified scientific farming plan" — text-base text-gray-500 text-center mt-3 max-w-xl mx-auto
- Grid (mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto px-6):

Each feature card: bg-gray-50 hover:bg-white border border-gray-200 hover:border-brand-200 rounded-2xl p-6 cursor-default transition-all duration-200 hover:shadow-card-md
- Icon container: 48px rounded-xl bg-brand-50 flex items-center justify-center mb-4
- Icon: 24px text-brand-600
- Title: text-base font-semibold text-gray-800
- Description: text-sm text-gray-500 mt-2 leading-relaxed

6 feature cards in this exact order:
1. MapPin icon — "Farm Polygon Mapping" — "Draw your exact farm boundary on a real satellite map. Hectarage is calculated automatically from your polygon using geodesic math."
2. FlaskConical icon — "Zone Condition Profiling" — "Each zone you draw is automatically classified into one of nine biophysical profiles using real data from SoilGrids, OpenWeatherMap, and NASA POWER."
3. Sprout icon — "Agroecological Rule Engine" — "The rule engine scores 60+ scientifically validated crop pairs from 0 to 100 based on your zone's actual soil pH, temperature, water, and sunlight conditions."
4. CalendarDays icon — "Auto-Generated Planting Calendar" — "Get a sow, transplant, fertilize, and harvest schedule automatically generated from your selected crop pairs and published growth data."
5. BarChart3 icon — "LER Simulation" — "View your simulated Land Equivalent Ratio to understand how much more efficient your intercropping plan is compared to monoculture. Based on peer-reviewed published data."
6. ClipboardCheck icon — "Officer Verification" — "Submit your farm zones for review by a DA Extension Officer who monitors your intercropping plan and can add advisory notes directly in the system."

HOW IT WORKS SECTION (py-24 bg-brand-50):
- Title: "How MapTanim Works" — text-3xl font-bold text-gray-800 text-center
- Subtitle: "Four steps from an empty field to a verified scientific intercropping plan" — text-base text-gray-500 text-center mt-3
- Steps container: max-w-2xl mx-auto mt-14 px-6 relative

Vertical line connector: absolute left-5 top-5 bottom-5 w-0.5 bg-brand-200
4 steps, each: flex items-start gap-5 mb-10 last:mb-0 relative
- Step circle: 40px flex-shrink-0 rounded-full bg-brand-500 text-white font-bold text-base flex items-center justify-center
- Right side: Title text-base font-semibold text-gray-800 + Description text-sm text-gray-500 mt-1 leading-relaxed

Step 1: "Set Up Your Location" — "Use GPS to detect your exact location automatically, search by municipality name, or load an existing farm layout to edit."
Step 2: "Draw Your Field Boundary" — "Tap points on the satellite map to draw your field polygon. The area in hectares calculates automatically as you draw — no manual entry needed."
Step 3: "Classify and Profile Your Zone" — "Label each zone as Monocrop, Intercrop, or Rotation Crop. The system retrieves real soil and weather data for your exact location and assigns a biophysical condition profile."
Step 4: "Get Recommendations and Verification" — "The rule engine ranks compatible crop pairs for your zone with a 0–100 score and reason. Submit for Extension Officer review to receive an official advisory."

FOOTER (bg-brand-900 py-14):
- max-w-5xl mx-auto px-6 flex justify-between items-center
- Left: Sprout 22px text-brand-400 + "MapTanim" text-white font-bold + "Smart farm planning for Filipino farmers" text-brand-300 text-sm mt-1
- Right: "© 2026 Nexoria. All rights reserved." text-brand-400 text-sm

---

### PAGE: Login Page (/login)

FULL PAGE:
- min-h-screen bg-gradient-to-br from-brand-900 via-brand-800 to-[#0f4c29]
- Two decorative blurred circles: 450px bg-brand-400 opacity-[0.07] top-right blur-3xl absolute, 350px bg-earth-500 opacity-[0.06] bottom-left blur-3xl absolute
- flex items-center justify-center px-4 py-12 relative

CARD:
- bg-white/[0.08] backdrop-blur-2xl border border-white/[0.15] rounded-3xl shadow-modal
- w-full max-w-md p-8

Card content (top to bottom):
1. Logo: centered, flex-col items-center — Sprout 40px text-brand-400 + "MapTanim" text-2xl font-bold text-white + "West Negros University" text-xs text-brand-300 mt-1
2. Title (mt-7 text-center): "Log in to your account" text-xl font-semibold text-white
3. Subtitle: "Enter your credentials to continue" text-sm text-brand-200 text-center mt-1
4. Form (mt-8 space-y-5):
   - Email field:
     - Label: text-sm font-medium text-white/75 mb-1.5
     - Input: bg-white/10 border border-white/20 text-white placeholder:text-white/35 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-400 focus:border-transparent w-full
     - Mail icon 16px text-white/45 absolute left-4 top-1/2 -translate-y-1/2 inside relative wrapper
   - Password field: same styling, Lock icon left, Eye/EyeOff toggle button right
5. Submit button (mt-7 w-full): bg-brand-500 hover:bg-brand-400 text-white py-3.5 rounded-xl text-base font-semibold shadow-green transition-all
   - Loading state: Loader2 icon spinning
6. Register link (mt-5 text-center): "Don't have an account?" text-white/50 text-sm + "Register here" text-brand-300 font-medium underline hover:text-brand-200 — links to /register

---

### PAGE: Register Page (/register)

Same full page background and card style as Login page.

Card content (top to bottom):
1. Same logo as login
2. Title (mt-7 text-center): "Create your account" text-xl font-semibold text-white
3. Subtitle: "Join MapTanim and start planning your farm" text-sm text-brand-200 text-center mt-1
4. Form sections:

SECTION 1 — Personal Info (mt-8 space-y-4):
- Full Name: same input styling, User icon left
- Email: same styling, Mail icon left
- Password: same styling, Lock icon left, Eye toggle right
- Confirm Password: same styling, Lock icon left

SECTION 2 — Role Selection (mt-5):
- Label: "I am a..." text-sm font-medium text-white/75 mb-3
- Two cards (grid grid-cols-2 gap-3):
  - FARMER CARD: Tractor 28px, "Farmer" text-sm font-semibold text-white mt-2, "Vegetable grower" text-xs text-white/60
  - OFFICER CARD: ClipboardCheck 28px, "Extension Officer" text-sm font-semibold text-white mt-2, "DA agricultural technician" text-xs text-white/60
  - Each card: rounded-xl p-4 text-center cursor-pointer transition-all
  - Unselected: border border-white/20 bg-white/5 hover:bg-white/10
  - Selected: border-2 border-brand-400 bg-brand-500/25

SECTION 3 — Location (mt-4 space-y-4):
- Municipality: Select dropdown — same input styling
  Pre-populated options in this exact order (placeholder first: "Select your municipality"):
  Bacolod City, Bago City, Cadiz City, Escalante City, Himamaylan City, Isabela City, Kabankalan City, La Carlota City, La Castellana, Manapla, Moises Padilla, Murcia, Pontevedra, Pulupandan, Sagay City, Salvador Benedicto, San Carlos City, San Enrique, Silay City, Sipalay City, Talisay City, Toboso, Valladolid, Victorias City, Don Salvador Benedicto, Enrique B. Magalona, Ilog
- Barangay: Text input, MapPin icon left, placeholder "Enter your barangay"

5. Submit button (mt-7 w-full): "Create Account" — same primary button style as login
6. Login link (mt-5 text-center): "Already have an account?" + "Log in" link → /login

---

### PAGE: Farmer Dashboard (/dashboard)

Add class page-enter to root div. Header title: "Dashboard"

GREETING (mb-8):
- "Good morning, [firstName]!" — greeting changes by time: before 12 = "Good morning", 12–17 = "Good afternoon", after 17 = "Good evening"
- text-2xl font-bold text-gray-800
- Current date below: text-sm text-gray-400 mt-1 — formatted as "Monday, May 26, 2026"

ONBOARDING TUTORIAL BANNER (shows only if farmer has 0 farms, below greeting):
- bg-brand-50 border border-brand-200 rounded-xl p-4 flex items-start gap-3 mb-6
- Lightbulb icon 20px text-brand-600 flex-shrink-0
- Title: "Welcome to MapTanim!" text-sm font-semibold text-brand-800
- Message: "Start by creating your first farm. Click '+ New Farm' to draw your field boundary on the map and get personalized crop recommendations." text-sm text-brand-700 mt-0.5
- "Take a Tour" ghost button text-brand-600 text-xs mt-2 (Phase 1 onboarding tutorial trigger)

STATS GRID (grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8):
4 stat cards in this order:
1. Total Farms — MapPin icon bg-brand-50 text-brand-600
2. Total Hectares — Layers icon bg-earth-100 text-earth-500
3. Pending Verifications — Clock icon bg-amber-50 text-amber-600
4. Needs Correction — AlertCircle icon bg-red-50 text-red-500
All show skeleton loader while data is fetching.

FARMS LIST SECTION (mt-2):
- Header: flex justify-between items-center mb-5
  - "My Farms" text-xl font-semibold text-gray-800
  - "+ New Farm" primary button with Plus icon 16px → /farms/new

IF 0 farms: empty state inside dashed border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50 py-20 text-center:
- Map icon 56px text-gray-300 mx-auto
- "You have no farms yet" text-base font-medium text-gray-500 mt-4
- "Create your first farm to start getting intercropping recommendations" text-sm text-gray-400 mt-1 max-w-xs mx-auto
- "+ Create Your First Farm" primary button mt-6 mx-auto

IF farms exist: grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4
Farm card structure:
- Card header (p-4 border-b border-gray-100 flex justify-between items-start):
  - Left: Farm name text-base font-semibold text-gray-800 + Municipality text-xs text-gray-400 mt-0.5
  - Right: Overall status badge
- Card body (p-4 grid grid-cols-3 gap-3):
  - Each stat: value text-lg font-semibold text-gray-800 + label text-xs text-gray-400 mt-0.5
  - Stats: Total Area "X.XX ha" | Zone Count "X zones" | Last Activity "X days ago"
- Card footer (px-4 pb-4):
  - "View Farm" outline button full width → /farms/{id}

---

### PAGE: Farm Setup — /farms/new (Phase 1 and Phase 2)

STEP 1 — LOCATION METHOD SELECTION:
Overlay modal on top of blank map background.
Modal: bg-white rounded-2xl shadow-modal max-w-lg w-full mx-4 p-8

Step indicator (flex justify-center gap-2 mb-8):
- 3 dots: active dot = 8px circle bg-brand-500, inactive = 8px circle bg-gray-200

Title: "Where is your farm?" text-2xl font-bold text-gray-800 text-center
Subtitle: "Choose how you want to locate your farm on the map" text-sm text-gray-500 text-center mt-2

Three option cards (grid grid-cols-1 gap-3 mt-7):
Each card: border-2 rounded-2xl p-5 cursor-pointer transition-all duration-200 flex items-start gap-4
Unselected: border-gray-200 bg-white hover:border-brand-300 hover:bg-brand-50
Selected: border-brand-500 bg-brand-50

Card 1 — GPS Location:
- Left: 48px rounded-xl bg-brand-100 flex-center, Navigation icon 24px text-brand-600
- Title: "Use My Current Location" text-sm font-semibold text-gray-800
- Description: "Detects your GPS position and centers the map automatically" text-xs text-gray-500 mt-1
- "Fastest" badge: bg-brand-100 text-brand-700 text-xs px-2 py-0.5 rounded-full mt-2

Card 2 — Search Location:
- Left: 48px rounded-xl bg-sky-100, Search icon 24px text-sky-600
- Title: "Search by Municipality" text-sm font-semibold text-gray-800
- Description: "Type your municipality or barangay name and select from results" text-xs text-gray-500 mt-1
- When selected: search input slides in below with Nominatim geocoding results dropdown

Card 3 — Existing Layout:
- Left: 48px rounded-xl bg-earth-100, Copy icon 24px text-earth-500
- Title: "Load Existing Farm Layout" text-sm font-semibold text-gray-800
- Description: "Load a previous farm polygon and edit its boundaries" text-xs text-gray-500 mt-1
- If no farms exist: grayed out (opacity-50 cursor-not-allowed), "No existing farms found" text replacing description

"Continue to Map" primary button full width mt-7

STEP 2 — MAP DRAWING:
Full screen Leaflet satellite map. No modal — map fills 100% width calc(100vh - 64px) height.

Floating elements:

TOP-CENTER AREA COUNTER (absolute top-4 left-1/2 -translate-x-1/2 z-10):
bg-white/95 backdrop-blur-sm rounded-xl px-5 py-2.5 shadow-card border border-gray-200 flex items-center gap-2
- Ruler icon 16px text-brand-600
- "0.00 ha" text-sm font-semibold text-gray-800
- Adds class pulse-green when area > 0
Updates in real time using turf.area() as each Leaflet polygon vertex is added via draw:drawvertex event.
On polygon completion: value locks and is passed to the zone form.

TOP-LEFT MAP CONTROLS (absolute top-4 left-4 z-10 flex flex-col gap-2):
Each control: 40px square bg-white shadow-card rounded-lg border border-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors
- Pencil icon (draw polygon) — bg-brand-50 border-brand-500 text-brand-600 when drawing mode is active
- Edit2 icon (edit polygon)
- Trash2 icon (delete polygon)
- Layers icon (toggle satellite/standard tiles)

BOTTOM-CENTER INSTRUCTION BANNER (shown only before any polygon points placed, absolute bottom-8 left-1/2 -translate-x-1/2 z-10):
bg-brand-900/80 backdrop-blur-sm text-white rounded-xl px-7 py-3 flex items-center gap-2 text-sm
- MousePointer icon 16px
- "Click on the map to start drawing your farm boundary. Click the first point again to close."
Banner disappears when first polygon point is placed.

STEP 3 — ZONE CLASSIFICATION SIDE PANEL (slides in from right when polygon is completed):
Position: absolute right-0 top-0 h-full w-[380px] bg-white shadow-2xl border-l border-gray-200 z-20 class="slide-in-right"

Panel header (px-6 pt-5 pb-4 border-b border-gray-100 flex justify-between items-center):
- "Zone Details" text-lg font-semibold text-gray-800
- X button 32px circle hover:bg-gray-100 (clears polygon, resets map)

Scrollable form body (px-6 py-5 overflow-y-auto space-y-5):
Field 1: Farm Name — input with Building2 icon 16px text-gray-400 absolute left-3
Field 2: Zone Name — input with MapPin icon, placeholder "Zone A"
Field 3: Municipality — pre-filled from GPS or search, read-only style
Field 4: Barangay — text input
Field 5: Calculated Area — read-only field showing "X.XXXX ha", label "Area (Auto-calculated from polygon)"
Field 6: Cropping System — 3 radio cards horizontal (flex gap-2):
  Each radio card: border border-gray-200 rounded-lg p-3 flex-1 cursor-pointer text-center text-xs font-medium transition-all
  Selected: border-brand-500 bg-brand-50 text-brand-700
  - Minus icon + "Monocrop"
  - GitMerge icon + "Intercrop"
  - RotateCcw icon + "Rotation Crop"

IF MONOCROP SELECTED:
- "Crop" label + select dropdown populated from crops database (13 vegetables)

IF INTERCROP SELECTED:
- Up to 3 crop rows, each: select dropdown + number input for percentage + X remove button
- Below rows: "Total: XX%" counter — red if not 100, green-600 if exactly 100
- "+ Add Crop" ghost button with Plus icon (hidden when 3 rows exist)
- Auto-generated PRDP label below: "Crop1_Crop2 (60-40)" shown in bg-brand-50 text-brand-700 text-xs rounded px-2 py-1 inline-block

IF ROTATION CROP SELECTED:
- Season 1 block: "First Season" label + crop select + planting month select + harvest month select
- Season 2 block: "Second Season" label + crop select + planting month select + harvest month select
- Month selects: January through December
- Auto-generated PRDP label: "Crop1-Crop2" shown same style as intercrop label
- Planting calendar note: "A planting calendar will be generated after saving" text-xs text-gray-400

Field 7: Notes (optional) — textarea 3 rows, placeholder "Additional notes about this zone"
Field 8: Photo Upload — up to 3 photos per zone
  - Label: "Zone Photos (up to 3)" with Camera icon 16px
  - Upload area: dashed border rounded-xl py-4 text-center cursor-pointer hover:bg-gray-50
    - Upload icon 24px text-gray-300 mx-auto
    - "Click to upload or drag and drop" text-xs text-gray-400 mt-1
  - After upload: photo thumbnails 64px x 64px rounded-lg object-cover with X button overlay to remove

Panel footer (sticky bottom-0 px-6 py-4 border-t border-gray-100 bg-white):
"Save Zone" primary button full width
Loading state: Loader2 spinning + "Saving..." text

ON MOBILE: zone form becomes bottom sheet (slide-in-bottom, 75vh height)
- Handle bar at top: 4px x 36px bg-gray-300 rounded-full mx-auto mt-3 mb-4

---

### PAGE: Farm Control Center (/farms/:id) — Phase 2, 3, 4

Page header (below app header, mb-6):
- Back link: ChevronLeft 16px + "Back to Dashboard" text-sm text-gray-500 hover:text-gray-700 → /dashboard
- Farm name: text-2xl font-bold text-gray-800 mt-3
- Location: MapPin 14px text-gray-400 + "[Municipality], [Barangay]" text-sm text-gray-400 mt-1
- Farm stats row (mt-3 flex flex-wrap gap-3):
  - "X.XX ha total" — bg-brand-50 text-brand-700 text-sm font-medium px-3 py-1 rounded-full
  - "X zones" — bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full
  - Overall verification status badge

TAB LIST (mt-5): Overview | Map View | Planting Calendar | Crop Health | Harvest Logs | Daily Activities | Rotation Planner
Tab list scrolls horizontally on mobile.

OVERVIEW TAB:
Section title "Farm Zones" + "+ Add Zone" outline button right → goes back to /farms/new with existing farm pre-loaded
Zones in grid grid-cols-1 lg:grid-cols-2 gap-4:

Zone card (bg-white rounded-xl border border-gray-200 p-4 shadow-card):
- Top row: Zone name text-sm font-semibold text-gray-800 + status badge right
- PRDP label (mt-1): bg-brand-50 text-brand-700 text-xs font-medium px-2 py-1 rounded inline-block
- Zone condition profile (mt-1): bg-sky-50 text-sky-700 text-xs px-2 py-0.5 rounded inline-block (e.g. "Dry-Sunny-Loam")
- Details row (mt-3 flex gap-4 text-sm text-gray-500):
  - Ruler icon 14px + "X.XX ha"
  - Sprout icon 14px + cropping system type
- IF INTERCROP: horizontal percentage bar (mt-3 rounded-full h-3 overflow-hidden flex):
  - Segment 1: bg-brand-500 width=percentage1% 
  - Segment 2: bg-sky-500 width=percentage2%
  - Segment 3: bg-earth-500 width=percentage3% (if exists)
  - Crop name + % labels below bar in text-xs text-gray-500
- IF NEEDS CORRECTION: correction banner (mt-3 bg-red-50 border-l-4 border-red-500 rounded-lg p-3):
  - AlertTriangle 16px text-red-500 + "Correction Required" text-sm font-medium text-red-700
  - Correction notes: text-sm text-red-600 mt-1
  - "Resubmit for Review" text-xs text-red-600 underline cursor-pointer mt-2
- Photos row (mt-3 flex gap-2): thumbnails 60px square rounded-lg object-cover border border-gray-200, click opens Dialog fullscreen

MAP VIEW TAB:
Leaflet map 100% width 450px height rounded-2xl overflow-hidden border border-gray-200 shadow-card
All farm zones rendered as GeoJSON polygons:
- Fill: brand-500 at 15% opacity
- Stroke: brand-600 2px
Zone label tooltip floating above each polygon center: white bg shadow-sm rounded px-2 py-0.5 text-xs font-medium showing zone name and PRDP label
Layer toggle top-right to switch satellite/standard

PLANTING CALENDAR TAB (Phase 3):
For each zone that has crops assigned, show a calendar block:
Section header: Zone name text-base font-semibold text-gray-800 mb-3
Horizontal month timeline (flex overflow-x-auto gap-1):
- 12 month columns, each 60px wide flex-shrink-0
- Month label: text-xs text-gray-400 mb-1 text-center
- Month cell: 36px h, rounded-lg
  - If planting month: bg-brand-500 text-white text-xs font-medium text-center py-2 "Plant"
  - If fertilization month: bg-earth-500 text-white text-xs text-center py-2 "Fertilize"
  - If harvest month: bg-amber-500 text-white text-xs text-center py-2 "Harvest"
  - If none: bg-gray-100 text-transparent
Legend below timeline: three colored dots with labels "Planting", "Fertilization", "Harvest"
If no crops assigned to zone: "Assign crops to this zone to generate a planting calendar" text-sm text-gray-400 empty state

CROP HEALTH TAB (Phase 4 — crop growth tracking):
For each zone, show growth tracking card:
- Zone name header
- Current growth stage selector: Seedling | Vegetative | Flowering | Fruiting | Harvest-Ready — pill buttons
- Plan health score: large circular score display text-4xl font-bold, score 0–100
  - 75–100: text-brand-600 bg-brand-50 ring-brand-200
  - 50–74: text-amber-600 bg-amber-50 ring-amber-200
  - Below 50: text-red-600 bg-red-50 ring-red-200
- "Health Score" label below circle text-xs text-gray-500 uppercase tracking-wide
- Issue flag button: "Flag an Issue" outline destructive button with AlertTriangle icon

HARVEST LOGS TAB (Phase 4):
- "+ Add Harvest" primary button top-right
- Table: Date | Crop | Yield (kg) | Price/kg (₱) | Revenue (₱) | Notes
  Revenue formatted as ₱X,XXX.XX
- Totals row: "TOTAL" | — | Sum kg | — | Sum ₱
- Empty state: Wheat icon 48px text-gray-300, "No harvests recorded yet" text-sm text-gray-500 mt-3, "+ Add Harvest" button mt-4
- Add Harvest modal: Date picker, Crop select (13 crops), Yield kg number input, Price per kg number input, Revenue auto-calculated (readonly), Notes textarea

DAILY ACTIVITIES TAB (Phase 4):
- "+ Add Activity" primary button top-right
- Table: Date | Type | Description | Labor Cost (₱) | Material Cost (₱) | Total (₱)
- Activity type shown as badge using earth-100 bg earth-700 text
- Totals row at bottom
- Empty state: Zap icon 48px text-gray-300, "No activities logged yet" text-sm text-gray-500 mt-3
- Add Activity modal: Date, Type select (Labor/Irrigation/Fertilization/Pest Control/Harvesting/Other), Description, Labor Cost ₱, Material Cost ₱, Total auto-calculated

ROTATION PLANNER TAB (Phase 3):
For each zone:
Zone name header text-base font-semibold text-gray-800 mb-3
IF zone has at least one harvest record:
  "Last Harvested" label text-xs text-gray-500 uppercase tracking-wide
  Crop name text-base font-semibold text-gray-800 mt-1
  Arrow down icon
  "Recommended Next Crops:" text-xs text-gray-500 uppercase tracking-wide mt-3
  3 recommendation cards (flex flex-col gap-3):
    Each: bg-white border border-gray-200 rounded-xl p-4 flex items-start justify-between
    - Crop name text-sm font-semibold text-gray-800
    - Score badge right: "XX/100" in brand-100 text-brand-700 text-xs font-medium px-2 py-0.5 rounded-full
    - Rating badge: Excellent/Good/Poor
    - Reason: text-sm text-gray-500 mt-1

IF no harvest recorded:
  RotateCcw 40px text-gray-300 mx-auto
  "Log a harvest first to receive rotation recommendations for this zone" text-sm text-gray-400 text-center mt-3

---

### PAGE: Monitoring Hub (/monitoring) — Phase 2

Page header title: "Monitoring Hub"
Subtitle: "View all your farms at a glance" text-sm text-gray-400

Dynamic tab bar: one tab per farm (Farm 1 | Farm 2 | Farm 3 | etc.)
Clicking a tab instantly renders that farm's zone list and map — no page reload.

For selected farm:
- Map view (Leaflet, 300px height rounded-2xl) showing all zones
- Zone status cards below map in grid grid-cols-1 md:grid-cols-2 gap-3:
  Each shows: zone name, PRDP label, verification status badge, last activity date, "View Details" link → /farms/:id

---

### PAGE: Planting Plans (/planting-plans) — Phase 3

Page header title: "Planting Plans"
Subtitle: "Design and evaluate your intercropping layout" text-sm text-gray-400

CROP SELECTOR PANEL (left side, w-64):
Title "Select Crops" text-sm font-semibold text-gray-700 mb-3
Two crop dropdowns: Crop A and Crop B — populated from 13 vegetables
"Calculate LER" primary button below

LER DISPLAY (after calculation):
Large card: bg-white border border-gray-200 rounded-2xl p-6 text-center
LER value: text-5xl font-bold mt-2
- text-brand-700 if > 1.0, text-red-600 if < 1.0
"Simulated LER (based on published data)" text-xs text-gray-400 mt-1
Interpretation: "LER > 1.0 — Intercropping is more land-efficient than monoculture" text-sm text-brand-600 mt-3 if LER > 1.0

LAYOUT GRID (Phase 8 — drag-and-drop):
Title "Strategic Layout" text-base font-semibold text-gray-800 mb-3
Drag-and-drop grid (12 x 8 cells):
- Each cell: 40px x 40px border border-gray-200
- Cells can be assigned Crop A color (brand-200) or Crop B color (sky-200)
- Dragging a crop from the panel assigns it to cells
- Productivity heatmap toggle: shows gradient overlay on cells based on expected yield density
Templates row (flex gap-2 mt-3): "Standard" | "Rotation" | "Drought-Tolerant" | "Wet Season" — outline buttons that pre-fill grid

PLAN HEALTH SCORE (below grid):
Horizontal progress bar:
- bg-gray-200 rounded-full h-3, inner bar bg-brand-500 class="bar-fill" --bar-width:{score}%
- Score text right: "XX/100" text-sm font-semibold text-gray-700
Score components breakdown below bar: pH Match XX% | Water XX% | Sunlight XX% | Temperature XX%

---

### PAGE: Extension Officer Dashboard (/dashboard for officer role) — Phase 5

Page header title: "Officer Dashboard"
Greeting: "Welcome back, [officer name]" text-xl font-semibold text-gray-800

STATS GRID (grid grid-cols-3 gap-4 mb-8):
- Assigned Farmers: Users icon bg-sky-50 text-sky-600
- Pending Verifications: Clock icon bg-amber-50 text-amber-600
- Completed This Month: CheckCircle icon bg-brand-50 text-brand-600

VERIFICATION QUEUE SECTION (mt-2):
Header: flex items-center gap-2 mb-4
- "Pending Verification Queue" text-xl font-semibold text-gray-800
- Count badge: bg-amber-100 text-amber-700 rounded-full px-2.5 text-xs font-semibold

IF queue is empty: bg-brand-50 rounded-2xl py-14 text-center
- CheckCircle 52px text-brand-400 mx-auto
- "All zones are verified!" text-base font-semibold text-brand-700 mt-4
- "No pending verification requests at this time." text-sm text-brand-500 mt-1

IF queue has items: space-y-3
Queue item card (bg-white border border-gray-200 rounded-xl p-4 shadow-card border-l-4 border-l-amber-400):
- Top row: Farmer name text-sm font-semibold text-gray-800 + Farm name text-xs text-gray-500 + Submitted date text-xs text-gray-400 ml-auto
- Middle row (mt-2 flex flex-wrap gap-2): PRDP label badge + Area badge + Zone name badge
- Bottom row (mt-3 flex justify-end): "Review" outline button with ExternalLink 14px icon → /verify/:id

ASSIGNED FARMERS (mt-8):
Header: "Assigned Farmers" text-xl font-semibold text-gray-800 mb-4
List: space-y-2
Each farmer row (bg-white border border-gray-200 rounded-xl px-4 py-3 flex items-center gap-3):
- Avatar 36px bg-brand-100 text-brand-700 font-semibold rounded-full text-sm, shows initials
- Name text-sm font-medium text-gray-800 + Municipality text-xs text-gray-400
- Farm count badge right: "X farms" bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full

ADVISORY NOTES TOOL (mt-8, Phase 5):
Header: "Add Advisory Note" text-xl font-semibold text-gray-800 mb-4
Card: bg-white border border-gray-200 rounded-xl p-5
- Farmer select dropdown
- Farm select dropdown (populated based on selected farmer)
- Note textarea placeholder "Enter your advisory note for this farmer..."
- "Send Advisory Note" primary button

---

### PAGE: Zone Verification (/verify/:id) — Phase 5

Page header: back link "← Back to Dashboard" + "Zone Verification" text-2xl font-bold text-gray-800 mt-3

TWO-COLUMN LAYOUT (flex gap-6 — stack on mobile):

LEFT COLUMN (flex-1):
Section label "Farm Location" text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3
Leaflet map 420px height rounded-2xl overflow-hidden border border-gray-200 shadow-card
- Zone polygon: brand-500 fill 20% opacity, brand-600 stroke 2px
- Zone label floating above polygon
- Satellite tile base

RIGHT COLUMN (w-[380px] space-y-4 — full width on mobile):
FARMER INFO CARD (bg-white border border-gray-200 rounded-xl p-5):
Header "Farmer Information" text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3
Each row: Icon 16px text-gray-400 + label text-xs text-gray-400 + value text-sm text-gray-700

ZONE DETAILS CARD (bg-white border border-gray-200 rounded-xl p-5):
Header "Zone Details" text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3
Rows: PRDP Label (as brand badge) | Area (ha) | Cropping System | Zone Condition Profile | Submitted date
IF intercrop: show percentage breakdown visual bar below PRDP label
IF rotation: show Season 1 crop + months + Season 2 crop + months

ZONE PHOTOS (bg-white border border-gray-200 rounded-xl p-5, if photos exist):
Header "Submitted Photos" text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3
Grid grid-cols-3 gap-2:
Each photo: 90px height rounded-lg object-cover border border-gray-200 cursor-pointer hover:opacity-90
Click: opens Dialog with full-size image + file name + upload date

RULE ENGINE RESULTS (bg-white border border-gray-200 rounded-xl p-5):
Header "Zone Condition Profile" text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3
Profile badge: bg-sky-50 text-sky-700 text-sm font-medium px-3 py-1.5 rounded-lg inline-block
Retrieved data row: Soil pH | Drainage | Temperature | Sunlight — each with icon and value

ACTION BUTTONS (mt-2 space-y-3):
1. "Approve Zone" — full width, bg-brand-500 hover:bg-brand-600 text-white, CheckCircle 16px icon left
   Click: calls verifyZone mutation with action approve → success toast "Zone approved. Farmer has been notified." → returns to /dashboard
2. "Request Correction" — full width, border border-red-300 bg-red-50 text-red-600 hover:bg-red-100, AlertCircle 16px icon left
   Click: opens Dialog with:
   - Title: "Request Correction" text-lg font-semibold text-gray-800
   - Label: "Correction Notes" text-sm font-medium text-gray-700
   - Textarea min-h-[96px] placeholder "Describe what needs to be corrected or resubmitted..."
   - Footer: Cancel outline button + "Send Correction Request" red primary button
   Submit: calls verifyZone with action reject + notes → toast "Correction request sent. Farmer has been notified."

---

### PAGE: Admin Dashboard (/dashboard for admin role) — Phase 5

Page header title: "System Overview"

STATS GRID ROW 1 (grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4):
1. Total Users — Users icon bg-sky-50 text-sky-600
2. Total Farms — MapPin icon bg-brand-50 text-brand-600
3. Verified Zones — CheckCircle icon bg-brand-50 text-brand-600
4. Pending Verifications — Clock icon bg-amber-50 text-amber-600

STATS GRID ROW 2 (grid grid-cols-3 gap-4 mb-8):
5. Total Farmers — stat card
6. Total Officers — stat card
7. Total Zones — stat card

ROLE DISTRIBUTION (bg-white border border-gray-200 rounded-xl p-6 mb-6):
Title "Platform User Distribution" text-base font-semibold text-gray-800 mb-4
Recharts PieChart: Farmers = brand-500, Officers = sky-500, Admins = gray-400
Legend below: flex gap-6 justify-center text-xs text-gray-600

RECENT REGISTRATIONS (bg-white border border-gray-200 rounded-xl p-6):
Title "Recent Registrations" text-base font-semibold text-gray-800 mb-4
Last 5 users, each row (flex items-center gap-3 py-2.5 border-b border-gray-100 last:border-0):
- Avatar 36px initials circle
- Name text-sm font-medium text-gray-800 + Email text-xs text-gray-400
- Role badge right
- "X days ago" text-xs text-gray-400 ml-auto

---

### PAGE: Manage Users (/admin/users) — Phase 5

Page header title: "Manage Users"

TOOLBAR (flex justify-between items-center mb-5):
- Search input w-72 rounded-lg with Search icon — filters by name or email client-side
- "Export Users" outline button with Download icon (Phase 5 export tool)

USERS TABLE:
Columns: Name + Email | Role | Municipality | Farms | Registered | Change Role
- Name cell: avatar 32px initials + name text-sm font-medium + email text-xs text-gray-400 below
- Role cell: role badge colored by role spec
- Farms cell: number text-sm text-gray-700
- Registered cell: date text-sm text-gray-500
- Change Role cell: select dropdown (Farmer / Extension Officer / Admin) + "Update" small outline button
  On update: calls updateRole mutation → success toast "User role updated."

---

### PAGE: Platform Analytics (/admin/analytics) — Phase 5

Page header title: "Platform Analytics"

SUMMARY CARDS (grid grid-cols-3 gap-4 mb-8):
- Total Platform Revenue: Banknote icon bg-brand-50 text-brand-600, value ₱X,XXX,XXX.XX
- Total Platform Expenses: TrendingDown icon bg-red-50 text-red-500, value ₱X,XXX.XX
- Net Platform Value: TrendingUp icon bg-sky-50 text-sky-600, value ₱X,XXX,XXX.XX

REVENUE CHART (bg-white border border-gray-200 rounded-xl p-6 mb-6):
Title "Monthly Revenue" text-base font-semibold text-gray-800 mb-4
Recharts BarChart with monthly revenue data
Bar fill: brand-500
Grid lines: gray-100
Y-axis: ₱ formatted values
Tooltip: ₱X,XXX.XX format

ZONE PERFORMANCE REPORTS (bg-white border border-gray-200 rounded-xl p-6):
Title "Zone Performance" text-base font-semibold text-gray-800 mb-4
Table: Farm | Zone | LER Score | Verification Status | Total Yield | Total Revenue

---

### PAGE: System Health (/admin/system) — Phase 5

Page header title: "System Health"

ACTIVITY LOGS (bg-white border border-gray-200 rounded-xl p-6 mb-6):
Title "Activity Logs" text-base font-semibold text-gray-800 mb-4
Table: Timestamp | User | Action | Details
Filter by user and action type

EXPORT TOOLS (bg-white border border-gray-200 rounded-xl p-6):
Title "Data Export" text-base font-semibold text-gray-800 mb-4
Three export buttons:
- "Export Farmers CSV" outline button with Download icon
- "Export Farms CSV" outline button with Download icon
- "Export Analytics CSV" outline button with Download icon

---

### PAGE: Crop Library (/crops) — Phase 3

Page header title: "Crop Library"
Subtitle: "13 high-value vegetables with biophysical requirements and companion planting data" text-sm text-gray-400

SEARCH (mb-6): input w-80 rounded-lg with Search icon — filters cards by name client-side

CROPS GRID (grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4):
Each crop card (bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-card-md hover:border-brand-200 transition-all cursor-pointer):
- Top image area: if imageUrl → img w-full h-28 object-cover, else bg-brand-50 h-28 flex-center Sprout 36px text-brand-200
- Body (p-4):
  - Crop name: text-base font-semibold text-gray-800
  - Season badge: immediately below name
  - Stats (mt-3 grid grid-cols-2 gap-x-3 gap-y-2):
    Each stat row: icon 14px text-gray-400 + text text-xs text-gray-600
    - Droplets + "XXX–XXX mm" (water need range)
    - Sun + "X hrs/day" (sunlight hours)
    - Clock + "XX days" (maturation days)
    - FlaskConical + "pH X.X–X.X"
  - Description: text-xs text-gray-500 mt-3 leading-relaxed line-clamp-2

Clicking a crop card opens Detail Dialog:
- Full crop name, full description, all biophysical parameters
- "Compatible Pairs" section listing companion pairs from the database with their LER values and compatibility ratings

---

### PAGE: Companion Planting Guide (/companion-planting) — Phase 3

Page header title: "Companion Planting Guide"
Subtitle: "Compatibility matrix for the 13 vegetables. Based on 60+ peer-reviewed companion planting pairs." text-sm text-gray-400

MATRIX TABLE:
- Header row: empty cell + one column per crop name (13 columns), text-xs font-medium text-gray-500 text-center
- Each data row: crop name first cell + 13 cells showing compatibility
- Cell colors: brand-100 bg brand-700 text "E" for Excellent | sky-100 bg sky-700 "G" for Good | red-100 bg red-700 "P" for Poor | gray-100 bg gray-400 text "—" for no data
- Each cell is 48px x 48px text-xs font-semibold flex-center rounded-md cursor-pointer hover:ring-2 hover:ring-brand-300

LEGEND (below matrix flex gap-6 mt-4):
- brand-100 bg brand-700 text "E" rounded + "Excellent — highly compatible, significant yield benefit"
- sky-100 bg "G" + "Good — compatible with moderate benefit"
- red-100 bg "P" + "Poor — incompatible, avoid planting together"

DETAIL PANEL (slides in right or Dialog when cell is clicked):
- "Crop A + Crop B" as title
- Compatibility badge
- LER value: "Simulated LER: X.XX" bg-brand-50 text-brand-700 font-semibold px-3 py-2 rounded-lg inline-block
- "LER above 1.0 means intercropping outperforms monoculture" text-xs text-gray-400
- Notes: text-sm text-gray-600 leading-relaxed
- Row ratio recommendation from Vijayakumar et al. 2025 data

---

### PAGE: Community Forum (/community) — Phase 11

Page header title: "Community Forum"
Subtitle: "Connect with fellow farmers and Extension Officers" text-sm text-gray-400

TOOLBAR (flex justify-between items-center mb-5):
- Category filter tabs (flex gap-2 overflow-x-auto):
  "All" | "Pest Control" | "Harvest" | "General" | "Market" | "Weather"
  Active: bg-brand-500 text-white rounded-full px-4 py-1.5 text-sm font-medium
  Inactive: bg-gray-100 text-gray-600 rounded-full px-4 py-1.5 text-sm hover:bg-gray-200
- "+ New Post" primary button with Plus icon

POST FEED (space-y-4):
Post card (bg-white border border-gray-200 rounded-xl p-5 hover:shadow-card transition-all):
- Top row (flex items-center gap-2.5 flex-wrap):
  - Avatar 34px initials circle bg-brand-100 text-brand-700 text-sm font-medium rounded-full
  - Author name text-sm font-semibold text-gray-800
  - IF author role is extension_officer: "Verified Expert" badge (bg-brand-500 text-white text-xs px-2 py-0.5 rounded-full flex items-center gap-1 CheckCircle 10px icon)
  - Category badge right: earth-100 text-earth-700 rounded-full px-2 py-0.5 text-xs
  - Time ago text-xs text-gray-400 ml-auto
- Title (mt-3): text-base font-semibold text-gray-800
- Content preview (mt-1): text-sm text-gray-600 line-clamp-3 leading-relaxed
- Footer row (mt-3 flex items-center gap-4):
  - MessageSquare 14px text-gray-400 + comment count text-xs text-gray-400
  - "View Discussion" text-xs text-brand-600 font-medium ml-auto hover:text-brand-700

NEW POST DIALOG:
- Title "New Community Post" text-lg font-semibold text-gray-800
- Title field input
- Category select (All options: Pest Control, Harvest, General, Market, Weather)
- Content textarea min-h-[120px]
- Optional photo: same upload area style as zone form
- "Post to Community" primary button
- Cancel outline button

POST DISCUSSION VIEW (clicking "View Discussion"):
- Opens Dialog or new view showing full post + all comments
- Each comment: avatar + author name + Verified Expert badge if officer + content + time
- Comment input at bottom: textarea + "Post Comment" button

---

### PAGE: Research and Data (/research) — Phase 6

Page header title: "Research & Data"
Subtitle: "Scientific data sources and literature behind MapTanim's recommendations" text-sm text-gray-400

LITERATURE SOURCES SECTION:
Title "Scientific Foundation" text-xl font-semibold text-gray-800 mb-4
Cards listing each cited study from the document:
Each card (bg-white border border-gray-200 rounded-xl p-5 mb-3):
- Citation text-sm font-medium text-gray-800
- Description text-sm text-gray-500 mt-1
- DOI or journal badge text-xs text-sky-600 bg-sky-50 px-2 py-0.5 rounded mt-2

Studies to show:
1. Martin-Guay et al. (2018) — Science of the Total Environment — 226 intercropping experiments, mean LER 1.30
2. Vijayakumar et al. (2025) — Agriculture 4.0 adoption review — sorghum-soybean LER 1.31
3. Ardanov et al. (2023) — Spice and aromatic plants as companion crops in vegetable cultivation
4. Choruma et al. (2024) — Journal of Agriculture and Food Research — digital agriculture in Sub-Saharan Africa
5. Muñoz et al. (2025) — Frontiers in Plant Science — WebGIS decision support for precision agriculture
6. Goodchild (1990) — Spatial decision support systems foundational account
7. Altieri (1987) — Agroecology: The Scientific Basis of Alternative Agriculture
8. FAO PrAEctiCe Project (2022–2026)

API DATA SOURCES SECTION:
Title "Environmental Data Sources" text-xl font-semibold text-gray-800 mt-8 mb-4
Three cards:
1. SoilGrids (ISRIC) — soil type, pH, drainage class — link to https://soilgrids.org
2. OpenWeatherMap — temperature, rainfall, humidity — link to https://openweathermap.org
3. NASA POWER — average daily sunlight hours — link to https://power.larc.nasa.gov

---

### PAGE: Layout Builder (/layout-builder) — Phase 8

Page header title: "Strategic Layout Builder"
Subtitle: "Design your field layout with drag-and-drop zones" text-sm text-gray-400

FARM SELECTOR: Select dropdown at top — choose which farm to design layout for

GRID AREA (bg-white border border-gray-200 rounded-xl p-6):
Drag-and-drop grid 12 x 8 cells, each 44px x 44px border border-gray-100
Cell assignment: drag crop from sidebar to assign it to cells
- Crop A cells: bg-brand-200 text-brand-800 text-xs font-medium flex-center
- Crop B cells: bg-sky-200 text-sky-800 text-xs font-medium flex-center
- Empty cells: bg-gray-50

PRODUCTIVITY HEATMAP TOGGLE (above grid):
Toggle switch: "Show Productivity Heatmap" text-sm text-gray-600
When on: overlay gradient on cells — brand-900 for highest expected yield, brand-50 for lowest

TEMPLATES (flex gap-2 mb-4):
"Standard" | "Rotation" | "Drought-Tolerant" | "Wet Season" — outline buttons that pre-fill grid layout

SIDE PANEL (w-48 flex-shrink-0):
"Crops" label text-xs uppercase tracking-wide text-gray-500 mb-2
Crop A item: draggable, bg-brand-100 text-brand-700 rounded-lg px-3 py-2 text-sm font-medium
Crop B item: draggable, bg-sky-100 text-sky-700 rounded-lg px-3 py-2 text-sm font-medium

"Save Layout" primary button below grid

---

### PAGE: Collaboration Workspace (/admin/collaboration) — Phase 7

Page header title: "Collaboration Workspace"
Subtitle: "Expert and farmer collaboration tools" text-sm text-gray-400

WORKSPACE GRID (grid grid-cols-1 md:grid-cols-2 gap-6):
Left: Farmer directory with messaging — list of farmers, click to open message thread
Right: Message thread panel — messages with timestamps, input at bottom
Coming Soon overlay on both panels: bg-white/80 backdrop-blur-sm rounded-xl flex-center text-gray-500 "Phase 7 — Coming Soon"

---

## SECTION 5 — PHASES 6 THROUGH 15 — COMING SOON UI

For Phases 6 through 15, the navigation items exist in the sidebar and the pages load. But the page content shows a "Coming Soon" layout. This is important because the document defines all 15 phases as part of MapTanim's complete scope.

COMING SOON PAGE TEMPLATE:
Page header: Phase name as title
Center content (py-20 text-center max-w-lg mx-auto):
- Large phase icon (64px text-gray-200)
- Phase name: text-2xl font-bold text-gray-700 mt-4
- Phase number: "Phase X" bg-gray-100 text-gray-500 text-xs font-medium px-3 py-1 rounded-full inline-block mt-2
- Description from scope: text-sm text-gray-500 mt-4 leading-relaxed (exact text from document)
- Status badge: "In Development" bg-amber-100 text-amber-700 text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1 inline-flex mt-5, Clock icon 12px

Apply this template to:
Phase 6 (/research): Research and Data Collection — icon: FlaskConical — "Scientific research and data collection supporting MapTanim's agroecological database."
Phase 7 (/admin/collaboration): Expert and Farmer Collaboration Workspace — icon: Users2 — "A shared workspace for direct communication between farmers and agricultural experts."
Phase 8 (/layout-builder): Strategic Farm Layout Management — icon: LayoutTemplate — "Drag-and-drop grid with productivity heatmaps for designing optimal crop layouts."
Phase 9 (/land-explorer): Land Exploration and Soil Visualization — icon: Globe — "Advanced visualization of soil composition, elevation, and terrain overlays."
Phase 10 (/farm-operations): Farm Operations Management — icon: Briefcase — "Worker management, scheduling, and operational task tracking."
Phase 11 (/community): Community and Knowledge Sharing — icon: MessageSquare — "Community forum for farmer-to-farmer and farmer-to-expert knowledge exchange."
Phase 12 (/reports): Reports and Documentation Generation — icon: FileText — "Automated generation of farm reports and official documentation."
Phase 13 (/settings): Multi-language and Accessibility — icon: Globe2 — "Full Filipino and English language support with accessibility features."
Phase 14 (/team): Real-time Team Collaboration — icon: Users — "Live shared workspaces for farm teams to collaborate in real time."
Phase 15 (/ecosystem): Unified Farming Ecosystem Dashboard — icon: LayoutDashboard — "A single integrated dashboard bringing all 15 phases into one unified view."

Note: Phases 1–5 are fully functional. Phase 6 (Research) and Phase 8 (Layout Builder) have partial implementations as described above. Phases 7 and 9–15 show the Coming Soon template.

---

## SECTION 6 — FILE UPDATE ORDER AND INSTRUCTIONS

Antigravity must update files in this exact order. Open one file, update it, confirm it matches this document, then move to the next.

ORDER 1: client/index.html — Add Inter font link in head. Do not change anything else.

ORDER 2: client/src/index.css — Replace content with full global CSS from Section 2.3. Keep Tailwind import at top.

ORDER 3: tailwind.config.ts — Add brand colors, earth colors, boxShadow tokens, Inter font family from Section 2.1. Add tailwindcss-animate to plugins if missing.

ORDER 4: client/src/components/DashboardLayout.tsx — Update sidebar visual styling (background, nav items, logo, user profile, section labels, mobile hamburger) and header (search, bell, avatar) to match Section 2.4 SIDEBAR and HEADER specs. Do not touch routing, auth checks, or role protection logic.

ORDER 5: client/src/components/NotificationBell.tsx — Update visual styling to match Section 2.4 NOTIFICATION BELL DROPDOWN spec. Do not touch tRPC queries or notification logic.

ORDER 6: client/src/pages/Landing.tsx — Full visual redesign to match Section 4 Landing Page spec exactly. This file has no backend logic so the entire visual can be rebuilt.

ORDER 7: client/src/pages/Login.tsx — Update visual styling to match Section 4 Login Page spec. Do not touch auth mutations or redirect logic.

ORDER 8: client/src/pages/Register.tsx — Update visual styling to match Section 4 Register Page spec. Do not touch auth mutations. Ensure municipality dropdown has all municipalities listed in Section 4.

ORDER 9: client/src/pages/dashboards/FarmerDashboard.tsx — Update visual styling to match Section 4 Farmer Dashboard spec. Do not touch tRPC queries. Add skeleton loaders and empty state as specified.

ORDER 10: client/src/pages/farmer/FarmNew.tsx — Update the three-step farm creation flow visual to match Section 4 Farm Setup spec exactly. Do not touch Leaflet draw logic, turf.area() calculation, GeoJSON handling, or tRPC mutations.

ORDER 11: client/src/components/FarmControlCenter.tsx — Update all six tab visuals to match Section 4 Farm Control Center spec. Do not touch tRPC queries or mutation logic. Ensure all empty states and skeleton loaders are present.

ORDER 12: client/src/pages/farmer/Monitoring.tsx — Update visual to match Section 4 Monitoring Hub spec. Do not touch data logic.

ORDER 13: client/src/pages/farmer/PlantingPlans.tsx — Update visual to match Section 4 Planting Plans spec including LER display, drag-and-drop grid, plan health score bar, and templates. Do not touch calculation logic.

ORDER 14: client/src/pages/dashboards/OfficerDashboard.tsx — Update visual to match Section 4 Officer Dashboard spec. Do not touch tRPC queries.

ORDER 15: client/src/pages/officer/VerifyZone.tsx — Update visual to match Section 4 Zone Verification spec. Do not touch approve/reject mutation logic.

ORDER 16: client/src/pages/dashboards/AdminDashboard.tsx — Update visual to match Section 4 Admin Dashboard spec.

ORDER 17: client/src/pages/admin/ManageUsers.tsx — Update visual to match Section 4 Manage Users spec.

ORDER 18: client/src/pages/admin/Analytics.tsx — Update visual to match Section 4 Platform Analytics spec.

ORDER 19: client/src/pages/shared/CropLibrary.tsx — Update visual to match Section 4 Crop Library spec.

ORDER 20: client/src/pages/shared/CompanionPlanting.tsx — Update visual to match Section 4 Companion Planting Guide spec.

ORDER 21: client/src/pages/shared/Community.tsx — Update visual to match Section 4 Community Forum spec.

ORDER 22: Create client/src/pages/shared/Research.tsx if it does not exist — implement Section 4 Research and Data page.

ORDER 23: Create client/src/pages/farmer/LayoutBuilder.tsx if it does not exist — implement Section 4 Layout Builder page for Phase 8.

ORDER 24: Create client/src/pages/admin/SystemHealth.tsx if it does not exist — implement Section 4 System Health page.

ORDER 25: Create client/src/pages/admin/Collaboration.tsx if it does not exist — implement Section 4 Collaboration Workspace (Phase 7 Coming Soon).

ORDER 26: App.tsx — Ensure all routes listed in Section 3 are registered. Ensure role protection is applied correctly per the Role Access Matrix below.

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
| /dashboard (officer)     | ❌     | ✅                | ❌    |
| /verify/:id              | ❌     | ✅                | ✅    |
| /dashboard (admin)       | ❌     | ❌                | ✅    |
| /admin/users             | ❌     | ❌                | ✅    |
| /admin/analytics         | ❌     | ❌                | ✅    |
| /admin/system            | ❌     | ❌                | ✅    |
| /admin/collaboration     | ❌     | ❌                | ✅    |
| /crops                   | ✅     | ✅                | ✅    |
| /companion-planting      | ✅     | ✅                | ✅    |
| /community               | ✅     | ✅                | ❌    |
| /research                | ✅     | ✅                | ❌    |

---

## SECTION 8 — ABSOLUTE RULES FOR ANTIGRAVITY

1. Update files in the exact order listed in Section 6. Do not skip any file. Do not jump ahead.
2. After updating each file, read it back and confirm it matches the spec before moving to the next.
3. Do not add any feature, page, component, or database table not described in this document.
4. Do not remove any feature, page, or component that is described in this document.
5. All tRPC query and mutation logic stays exactly as it currently works. Only visual and layout code changes.
6. All color references must use the token names from Section 2.1 or the exact hex values. Never use generic Tailwind green-500 for brand colors.
7. Every monetary value displays with ₱ symbol and comma separators formatted as ₱X,XXX.XX.
8. Every area value displays with 2 decimal places and "ha" suffix formatted as X.XX ha.
9. Every LER value displays with the label "Simulated LER (based on published data)" below it. Never show LER as a real measured field value.
10. Every page that fetches data must show skeleton loaders while loading and an empty state when no data exists.
11. Every form submission must show a success toast (brand-500 left border) on success or error toast (red-500 left border) on failure.
12. Mobile responsiveness: sidebar hidden below lg breakpoint (hamburger trigger), stats grid 2 columns mobile 4 desktop, zone form = bottom sheet on mobile.
13. The nine zone condition profiles appear exactly as: Dry-Sunny-Loam, Dry-Sunny-Clay, Dry-Sunny-Sandy, Dry-Shaded-Loam, Wet-Sunny-Loam, Wet-Sunny-Clay, Wet-Shaded-Loam, Wet-Shaded-Clay, Moderate-Mixed-Loam.
14. The thirteen crops are exactly: Tomato, Eggplant, Pepper, Cabbage, Onion, Carrot, Beans, Lettuce, Cucumber, Okra, Corn, Squash, Kangkong. No others.
15. The system does not use IoT sensors, machine learning, AI inference, or real-time hardware. The rule engine uses if-then logic based on biophysical parameter comparisons. Never describe it as AI.
16. Phases 6–15 show the Coming Soon template from Section 5 — they are not hidden, they are accessible and display their phase description.
17. The PWA manifest and service worker registration must remain intact. Do not remove PWA configuration.
18. PRDP label format for intercrop is exactly: "Crop1_Crop2 (60-40)" — underscore between crops, percentages in parentheses.
19. PRDP label format for rotation crop is exactly: "Crop1-Crop2" — hyphen between crops.
20. Admin accounts cannot be created from the public /register page. Admin role is assigned only by existing admins from /admin/users.