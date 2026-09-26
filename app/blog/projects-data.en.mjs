// English counterpart of projects-data.mjs. Same real systems, same figures
// shown on the live dashboard previews — translated, not re-invented.
export const PROJECTS_EN = {
  mazaya: {
    name: "Mazaya",
    badge: "Furniture Factory & Showroom System",
    industry: "Furniture manufacturing & retail",
    pills: ["100% cloud", "Real-time reports", "Granular permissions", "28 operational screens"],
    kpis: [
      { label: "Showroom sales", val: "EGP 145,000", trend: "+18%" },
      { label: "Production orders", val: "34 active orders", trend: "In progress" },
      { label: "Inventory movements", val: "1,280 units", trend: "In stock" },
    ],
    activities: [
      "Sales invoice #4092 from the Dokki showroom — auto-approved",
      "Production order #891 for the bedroom line — in progress",
      "Raw-material issue slip #142 from the timber store — completed",
    ],
    challenge:
      "A furniture factory running two parallel operations: production on the factory floor and sales across several showrooms. Before Openappo there was a gap between what was manufactured and what was sold — showrooms only knew the factory's real stock through a phone call, and per-unit cost was calculated manually after an order finished, not before.",
    solution:
      "One unified system with 28 operational screens links production to the showrooms in real time: a production order draws raw materials from stock, calculates their cost, and moves the finished piece into the showroom's balance automatically the moment it's done — no manual counting, no paper reports.",
  },
  keshk: {
    name: "Keshk",
    badge: "Household Goods Trade & Distribution System",
    industry: "Wholesale trade & distribution",
    pills: ["100% cloud", "Wholesale & distribution", "Sales-rep management", "9 operational screens"],
    kpis: [
      { label: "Wholesale invoices", val: "EGP 82,500", trend: "+14%" },
      { label: "Rep collections", val: "EGP 64,000", trend: "Live" },
      { label: "Warehouse SKUs", val: "4,150 items", trend: "Active count" },
    ],
    activities: [
      "Wholesale invoice #218 for a Zagazig customer — settled",
      "Rep route #4, Mansoura area — out for delivery",
      "Branch cash-drawer reconciliation #12 — approved",
    ],
    challenge:
      "Wholesale household-goods trading means thousands of SKUs and customers spread across several governorates, with reps who take stock on their own account and return to collect payment. Follow-up relied on notebooks and phone calls, and any delay settling a rep's stock meant money sitting unexplained.",
    solution:
      "A 9-screen system built around distribution: every rep has a route and a stock float tied to their ID, and every collection posts to the branch cash drawer in real time. Management sees each route's performance and every customer's balance from a single screen instead of piecing numbers together.",
  },
  elnazlawy: {
    name: "El Nazlawy",
    badge: "Electrical Appliances & Lighting System",
    industry: "Retail & wholesale electrical appliances",
    pills: ["100% cloud", "Rep routes", "Cheque tracking", "Precise barcode inventory"],
    kpis: [
      { label: "Showroom sales", val: "EGP 96,400", trend: "+12%" },
      { label: "Cheques due", val: "18 cheques", trend: "Under collection" },
      { label: "Warehouse balance", val: "890 units", trend: "In stock" },
    ],
    activities: [
      "Retail appliance invoice #512 — completed",
      "Collected cheque batch #88 — collected",
      "Goods-receipt note #31 from a supplier — approved",
    ],
    challenge:
      "An electrical-appliance and lighting showroom selling both retail and wholesale, partly on deferred cheques. Without a central system, tracking every cheque's due date and matching it to its invoice was manual and error-prone, and counting stock by eye took days.",
    solution:
      "A system with precise serial-level barcode inventory, plus a dedicated screen that follows every cheque from receipt to collection or bounce. Management now knows exactly which cheques are due today and how many units remain in any warehouse in one glance.",
  },
  elhoot: {
    name: "El Hoot",
    badge: "Wholesale Trade & Distribution System",
    industry: "Wholesale trade & distribution",
    pills: ["100% cloud", "Wholesale trade", "Debt aging & credit", "Cash-drawer collections"],
    kpis: [
      { label: "Wholesale sales", val: "EGP 215,000", trend: "+22%" },
      { label: "Today's collections", val: "EGP 140,000", trend: "Complete" },
      { label: "Debt aging", val: "98.2% on schedule", trend: "Excellent" },
    ],
    activities: [
      "Wholesale issue slip #1084, channel sector — approved",
      "Customer #67 debt settlement — paid",
      "Cable & switch stock received — in warehouse",
    ],
    challenge:
      "Wholesale trade runs on credit: customers take stock and pay in instalments. Without a clear debt-aging view, the company would only discover a customer falling behind far too late, and cash collected at branch drawers was reconciled manually at day's end.",
    solution:
      "A system that ages every customer's debt automatically (30/60/90 days) and flags sales before a customer exceeds their credit limit, with live cash-drawer collections that show management the real balance at any moment — no waiting for day-end close.",
  },
  elnesr: {
    name: "El Nesr",
    badge: "Distribution Fleet & Sales-Rep Management System",
    industry: "Distribution & HR",
    pills: ["100% cloud", "HR management", "Distribution routes", "Mobile stock per rep"],
    kpis: [
      { label: "Fleet sales", val: "EGP 132,000", trend: "+16%" },
      { label: "Active reps", val: "16 routes", trend: "In service" },
      { label: "Stock-float reconciliation", val: "100%", trend: "Matched" },
    ],
    activities: [
      "Rep #7 stock reconciliation, Tanta route — approved",
      "Tax invoice #3319 issued — completed",
      "Warehouse transfer to delivery van #3 — moved",
    ],
    challenge:
      "A distribution company with a vehicle fleet and a large rep team, each van carrying its own mobile stock. Tracking who's holding what, and reconciling it at day's end, took hours of manual review.",
    solution:
      "Every delivery van is treated as its own mini-warehouse tied to its rep, with an HR screen managing float and payroll, and automatic end-of-day reconciliation per route — pushing float-matching accuracy to 100% without manual counting.",
  },
  rtx: {
    name: "RTX",
    badge: "Manufacturing & Production-Stage Management System",
    industry: "Manufacturing",
    pills: ["100% cloud", "3 production stages", "Production-order tracking", "Raw-material costing"],
    kpis: [
      { label: "Raw materials received", val: "48 tons", trend: "In stock" },
      { label: "Active work orders", val: "12 production lines", trend: "Running" },
      { label: "Finished goods ready", val: "2,400 units", trend: "Ready" },
    ],
    activities: [
      "Incoming raw material — receipt #94 — inspected",
      "Production stage #B12 completed — ready for sale",
      "Finished-goods shipment to distributor — delivered",
    ],
    challenge:
      "A factory where a product passes through 3 sequential production stages, each consuming materials and labor at a different cost. The final product's real cost used to be estimated after delivery, not during production, which made pricing an order accurately difficult.",
    solution:
      "A system that tracks production orders stage by stage, calculating material and labor cost at each stage and rolling it into the product automatically — so the real, precise cost appears the moment the last stage finishes, not days later.",
  },
  maspero: {
    name: "Maspero",
    badge: "Point of Sale & Digital Services System",
    industry: "Point of sale & digital services",
    pills: ["100% cloud", "POS", "Wallet & shift management", "Multi-branch oversight"],
    kpis: [
      { label: "Top-up & wallet transactions", val: "3,450 transactions", trend: "+29%" },
      { label: "Shift handovers", val: "6 branches", trend: "Balanced precisely" },
      { label: "Staff commissions", val: "Real-time", trend: "Automatic" },
    ],
    activities: [
      "Shift handover, Maadi branch #2 — balanced",
      "E-wallet top-up #8902 — successful",
      "Internal support ticket for a printer — resolved",
    ],
    challenge:
      "A branch network offering digital services (e-wallet top-ups, bill payments, collections) at high, real-time transaction volume. Shift handovers between staff caused small discrepancies that were hard to trace, and each employee's commission was tallied manually at month end.",
    solution:
      "A POS system that ties every top-up or collection to a specific employee and shift the moment it happens, closing each shift with an automatically matched balance, and calculating commissions automatically — saving days of manual reconciliation every month.",
  },
  roknalanaqa: {
    name: "Rokn Al Anaqa",
    badge: "Retail Shops & Furnishing Workshop System",
    industry: "Retail & tailoring workshops",
    pills: ["100% cloud", "Shop & workshop management", "Partner profit accounting", "Fabric & tailoring tracking"],
    kpis: [
      { label: "Shop sales", val: "EGP 68,000", trend: "+11%" },
      { label: "Workshop orders", val: "22 tailoring & installs", trend: "In progress" },
      { label: "Partner profits", val: "Auto-calculated", trend: "Periodic" },
    ],
    activities: [
      "Curtain & furnishing order #114 — being installed",
      "Clothing sale invoice, Nozha branch — completed",
      "Quarterly partner profit distribution — approved",
    ],
    challenge:
      "A mixed business of retail shops and a furnishing-tailoring workshop, jointly owned by several partners. The biggest challenge was costing fabric and labor accurately for every tailoring order, and splitting profits between partners transparently without disputes.",
    solution:
      "A system that keeps each shop's activity separate while rolling the results into one unified partner-profit account, with a dedicated workshop screen tracking fabric consumed on every order and its cost through to delivery.",
  },
  binqasim: {
    name: "Bin Qasim",
    badge: "Import & Supply Chain System",
    industry: "Import & supply chain",
    pills: ["100% cloud", "Shipment cost allocation", "Transport fleet", "Item-level profitability"],
    kpis: [
      { label: "Import shipments", val: "6 containers", trend: "At port/warehouse" },
      { label: "Item costing", val: "Precisely allocated", trend: "Automatic" },
      { label: "Transport fleet", val: "8 trucks", trend: "Active" },
    ],
    activities: [
      "Import shipment #C-802 unloaded — in warehouse",
      "Customs & freight expenses allocated — calculated",
      "Outbound goods-transport order — en route",
    ],
    challenge:
      "An import company receiving container shipments holding dozens of mixed items, each shipment carrying customs, freight and handling costs. Allocating those costs correctly across every item used to run through separate, error-prone spreadsheets.",
    solution:
      "A system that automatically allocates a shipment's total cost (customs + freight + fees) across every item inside it by weight or value, revealing each item's real cost and profitability from the moment it hits the warehouse, alongside live in-house fleet tracking.",
  },
  opengym: {
    name: "OpenGym",
    badge: "Gym & Sports Club Management Platform",
    industry: "Gyms & sports clubs",
    pills: ["100% cloud", "Member subscription portal", "Offline-capable PWA", "Trainer & payment management"],
    kpis: [
      { label: "Active members", val: "1,240 subscribers", trend: "+15%" },
      { label: "Renewal rate", val: "88%", trend: "High" },
      { label: "Today's fingerprint check-ins", val: "310 members", trend: "Instant" },
    ],
    activities: [
      "VIP package renewal for a member — paid",
      "Member check-in via barcode/fingerprint — accepted",
      "Personal-training commission payout — approved",
    ],
    challenge:
      "A gym with thousands of members on different plans (monthly, private PT, family), where front-desk staff need to confirm any subscription's status instantly at the door — even on a slow connection, without holding up the line.",
    solution:
      "A PWA that keeps working even on a weak connection, verifies subscription validity by fingerprint or barcode in a second, and calculates every private trainer's commission automatically from their actual sessions — the faster front-desk experience lifted the renewal rate.",
  },
  riyadalquran: {
    name: "Riyad Al Quran",
    badge: "Charity & Nursery Management System",
    industry: "Charity & non-profit",
    pills: ["100% cloud", "Case triage & classification", "Guardian portal", "Spending & donation reports"],
    kpis: [
      { label: "Families supported", val: "850 families", trend: "Ongoing care" },
      { label: "Orphan sponsorships", val: "100% covered", trend: "Consistent" },
      { label: "Nursery children", val: "145 children", trend: "Daily follow-up" },
    ],
    activities: [
      "Emergency medical aid disbursed #H-301 — paid out",
      "Nursery follow-up report logged for a guardian — sent",
      "Monthly sponsorship statement approved — approved",
    ],
    challenge:
      "A charity running hundreds of humanitarian cases, orphan sponsorships and a nursery at the same time. Transparency in spending was the biggest challenge — every pound had to be documented and tied to a specific case, while guardians wanted reassurance about their children without calling every day.",
    solution:
      "A system that triages cases and documents every disbursement tied to one, with a dedicated guardian portal to follow their children's nursery progress in real time, plus spending and donation reports ready for internal and external review.",
  },
  vos: {
    name: "VOS",
    badge: "Volunteer & Team Management System",
    industry: "Volunteer management",
    pills: ["100% cloud", "Digital certificate issuance", "Full audit trail per action", "Leaderboards & teams"],
    kpis: [
      { label: "Total volunteers", val: "4,800 volunteers", trend: "+24%" },
      { label: "Documented volunteer hours", val: "32,000 hours", trend: "Logged" },
      { label: "Digital certificates", val: "1,650 certificates", trend: "QR-verified" },
    ],
    activities: [
      "QR-verified volunteer certificate issued — issued",
      "Medical convoy #42 participation approved — approved",
      "Leaderboard of top volunteers updated — updated",
    ],
    challenge:
      "A platform managing thousands of volunteers across scattered field convoys and events. Reliably proving each person's volunteer hours was hard, and certificates were designed and handed out manually one by one — a lot of effort for a slow result.",
    solution:
      "A system that logs every volunteer activity in a full audit trail tied to its owner, and issues a QR-verifiable digital certificate the moment an activity is complete, with a leaderboard that keeps teams motivated to participate more.",
  },
};

export const PROJECT_ORDER_EN = Object.keys(PROJECTS_EN);
