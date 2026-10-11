// English name / subtitle / description for every portfolio system, keyed by the
// slug the admin panel publishes.
//
// Why this exists: the admin panel stores one (Arabic) description per project,
// and the English pages used to let that Arabic text override the English
// fallback, so /en/portfolio showed Arabic paragraphs. English is now taken
// from here, and everything else (logo, video, order, published) still comes
// from the admin manifest.
//
// Every statement below was checked against that system's source code, the same
// facts the Arabic descriptions in the admin panel are built from. Nothing here
// is a claim about a feature the system does not have.

export const EN_TEXT = {
  kishk: {
    name: "Ahmed Kishk Institution",
    subtitle: "Curtains & Fabrics Manufacturing, Installation and Online Sales System",
    desc: "A complete system for Ahmed Kishk's fabrics and curtains business, where each order moves through seven ordered stages: field measurements, pricing and contract, fabric cutting, the workshop, accessories, delivery, then installation. It includes an online sales channel with a separate screen for shipments and mandatory shipping details, branch-specific prices protected by passwords, and staff attendance, payroll and advances.",
  },
  mazaya: {
    name: "Mazaya Furniture",
    subtitle: "Furniture Factory & Showroom System",
    desc: "A system for Mazaya's furniture factory that costs every order on its own: boards, accessories, installation, internal and external transport and the factory commission, with each material priced at the time of use. Every worker's daily log is recorded against the order, including travel days, and a weekly settlement calculates the net pay after bonuses, deductions and advances. It supports sub-orders and add-ons, with separate wallets for boards and for the factory.",
  },
  elnazlawy: {
    name: "Elnazlawy Showroom",
    subtitle: "Electrical Appliances & Lighting System",
    desc: "A system for Elnazlawy's electrical appliances showroom with a full cheque register: incoming cheques from customers and outgoing cheques to suppliers, a status for each (under collection, cleared, bounced, cancelled), and entry of up to 15 cheques for a supplier in a single step. Clearing an outgoing cheque moves the treasury and deducts from the supplier's balance automatically. It also includes a rep route by weekday and separate stock for each vehicle.",
  },
  rtx: {
    name: "RTX Trade & Manufacturing",
    subtitle: "Manufacturing & Production Stages System",
    desc: "A manufacturing management system for RTX that links three stages in one flow: materials, then production, then sales, tracking each order as it moves between them. It issues factory account statements and prints invoices and statements ready for delivery.",
  },
  elhoot: {
    name: "El Hoot Electrical Tools",
    subtitle: "Wholesale & Distribution System",
    desc: "A system for El Hoot built around the sales rep's day: a route of customers by weekday with each customer's balance and WhatsApp number, stock recorded per vehicle, and transfers between warehouses. It includes the cheque register and collection drawers, and tracks changes in purchase prices with every invoice.",
  },
  maspero: {
    name: "Maspero Digital Services",
    subtitle: "Point of Sale & Digital Services System",
    desc: "A system for Maspero's digital-services branches that controls custody: sales do not open until the employee receives the e-wallets, machines and cash drawer at their actual balance, and sign-out is blocked until handover to a colleague. It includes a point of sale with held invoices, a log of wallet top-ups, print-service pricing, and shift reports.",
  },
  elnesr: {
    name: "El Nesr Distribution",
    subtitle: "Distribution Fleet & Rep Management System",
    desc: "A system for El Nesr that runs a fleet of sales reps: a route and separate stock for each rep, the cheque register and collection drawers, staff affairs and partner accounts, with transfers between warehouses and vehicles and a printed stock count for each vehicle.",
  },
  roknalanaqa: {
    name: "Rokn Alanaqa",
    subtitle: "Retail Shops & Upholstery Workshop System",
    desc: "A system for Rokn Alanaqa: clothing shops plus a curtain and upholstery workshop. Each workshop order keeps a record of every status change, who made it and when. Every customer and supplier has a detailed movement statement, and the system covers stock counts and the monthly payout of partners' profits.",
  },
  binqasim: {
    name: "Bin Qasim Import & Export",
    subtitle: "Import & Supply Chain System",
    desc: "A system for Bin Qasim's import and export business: each shipment is recorded by container, country of origin, volume in cubic metres, freight cost in US dollars and tax rate, alongside currency exchange rates. It runs the transport fleet with an odometer log, oil-change alerts and maintenance records, and tracks customers' instalments and cheques and staff payroll.",
  },
  opengym: {
    name: "OpenGym",
    subtitle: "Gym & Fitness Club Management Platform",
    desc: "A gym-management system: every member has a unique barcode and the gym has one fixed barcode printed at its entrance, so members check in by scanning it from their phone, and each has a personal account showing their subscription. It works as a phone app (PWA) with no app store needed.",
  },
  riyadalquran: {
    name: "Riyad Al-Quran Association",
    subtitle: "Charity & Nursery Management System",
    desc: "A system for the Riyad Al-Quran Association: registering cases by type (medical, orphans, low-income) and nursery booking, with a separate login portal for the administration, teachers and parents, plus student grades and teacher assessment.",
  },
  vos: {
    name: "Volunteer Operating System",
    subtitle: "Volunteer Management System",
    desc: "A volunteer-management system: join applications and interviews, convoys with a required and a confirmed headcount for each, attendance and evaluation, and a ledger of points, rewards and QR-coded certificates that anyone can verify on a public page. It also has a leaderboard, and follows up lapsed volunteers to learn why they left and bring them back.",
  },
  sash: {
    name: "SASH",
    subtitle: "Local Brands Retail & POS System",
    desc: "A system for SASH: three stores hosting about 65 local brands. Each brand has its own portal (sign-up and login, its items, sales, discounts, returns, and the stock it sends to the stores), with its dues and withdrawals calculated for it. Stocktake is done per brand with a barcode scanner and is not approved until the differences are reviewed, and the tills run on keyboard and barcode with no sidebar.",
  },
  almotawakel: {
    name: "Al-Motawakel Establishment",
    subtitle: "Trade & Distribution System",
    desc: "A system for Al-Motawakel's trade and distribution business: a route and separate stock for each rep, the cheque register and collection drawers, staff affairs and partner accounts, with transfers between warehouses and vehicles.",
  },
  farida: {
    name: "Farida Kishk Fabrics",
    subtitle: "Fabric Trade & Online Shipping System",
    desc: "A system for Farida Kishk's fabrics: sales invoices and an online channel with a separate tab for shipments and mandatory shipping details, supplier cheques, purchases and returns, and branch-specific prices protected by passwords.",
  },
};

/** Applies the English text over a manifest project, leaving media and order alone. */
export function withEnglishText(project) {
  const t = EN_TEXT[project.slug];
  return t ? { ...project, name: t.name, subtitle: t.subtitle, desc: t.desc } : project;
}
