import { pool } from './db.js';

const FORCE = process.argv.includes('--force');

const SEED = [
  { brand:"Rolls-Royce",   model:"Cullinan",                 year:2023, price:750000, mileage:3500,  color:"Black",                 engine:"6.75L Twin-Turbo V12",      power:"563 hp",          transmission:"8-speed auto",      top_speed:"250 km/h", accel:"5.2s",  status:"active",   featured:true,  badge:"Hot New",  emoji:"⚫", description:"The world's most extraordinary SUV. The Cullinan combines all-terrain capability with Rolls-Royce's signature 'magic carpet ride' — the ultimate statement of luxury for the modern explorer." },
  { brand:"Mercedes-Benz", model:"GLS 600 Maybach",          year:2023, price:385000, mileage:8200,  color:"Obsidian Black",        engine:"4.0L V8 Biturbo + EQ Boost", power:"550 hp",          transmission:"9-speed auto",      top_speed:"250 km/h", accel:"4.9s",  status:"active",   featured:true,  badge:"Featured", emoji:"⚫", description:"The pinnacle of Maybach craftsmanship in SUV form. Hand-finished interior, executive rear seating with massage and reclining function — first-class travel on every road." },
  { brand:"Toyota",        model:"Land Cruiser GR Sport",    year:2022, price:190000, mileage:14500, color:"Pearl White",           engine:"3.5L Twin-Turbo V6",        power:"409 hp",          transmission:"10-speed auto",     top_speed:"210 km/h", accel:"6.7s",  status:"active",   featured:true,  badge:"Hot New",  emoji:"⚪", description:"The GR Sport brings rally-bred DNA to the legendary Land Cruiser 300. Reinforced chassis, sport-tuned suspension, and aggressive styling — the most capable Land Cruiser ever built." },
  { brand:"Toyota",        model:"Alphard Hybrid Executive", year:2023, price:115000, mileage:5200,  color:"Pearl White",           engine:"2.5L Hybrid",                power:"247 hp combined", transmission:"e-CVT",             top_speed:"180 km/h", accel:"8.3s",  status:"active",   featured:true,  badge:"New",      emoji:"⚪", description:"Cambodia's most coveted executive MPV. Captain's chairs, ottoman footrests, panoramic moonroof, and Toyota's seamless hybrid powertrain — luxury seven-seater perfection." },
  { brand:"Toyota",        model:"Land Cruiser VXR",         year:2023, price:180000, mileage:6800,  color:"Black",                 engine:"3.5L Twin-Turbo V6",        power:"409 hp",          transmission:"10-speed auto",     top_speed:"210 km/h", accel:"6.9s",  status:"active",   featured:false, badge:"New",      emoji:"⚫", description:"The flagship Land Cruiser 300 in VXR specification. Full leather, rear entertainment, JBL premium audio, and Toyota's bulletproof reliability — the SUV that goes anywhere." },
  { brand:"Lexus",         model:"LX 600 Ultra Luxury",      year:2023, price:245000, mileage:4100,  color:"Silver",                engine:"3.4L Twin-Turbo V6",        power:"409 hp",          transmission:"10-speed auto",     top_speed:"210 km/h", accel:"6.9s",  status:"active",   featured:false, badge:"New",      emoji:"⚪", description:"Lexus's flagship SUV in Ultra Luxury trim. Four-seat configuration with rear executive lounge, semi-aniline leather, and 25-speaker Mark Levinson audio." },
  { brand:"Bentley",       model:"Bentayga Azure V8",        year:2023, price:450000, mileage:1800,  color:"British Racing Green",  engine:"4.0L Twin-Turbo V8",        power:"542 hp",          transmission:"8-speed auto",      top_speed:"290 km/h", accel:"4.5s",  status:"active",   featured:false, badge:"Hot New",  emoji:"🟢", description:"The wellbeing-focused Bentayga Azure. Hand-stitched leather, diamond-quilted seats with massage, and an interior crafted over 130 hours by Crewe's master artisans." },
  { brand:"Land Rover",    model:"Range Rover Autobiography",year:2023, price:295000, mileage:7400,  color:"Santorini Black",       engine:"4.4L Twin-Turbo V8",        power:"523 hp",          transmission:"8-speed auto",      top_speed:"250 km/h", accel:"4.4s",  status:"reserved", featured:false, badge:"Reserved", emoji:"⚫", description:"The fifth-generation Range Rover in flagship Autobiography trim. Executive rear seating, refrigerated centre console, and the unrivalled blend of off-road capability with limousine refinement." },
  { brand:"Porsche",       model:"Cayenne Turbo GT",         year:2023, price:225000, mileage:9800,  color:"Arctic Grey",           engine:"4.0L Twin-Turbo V8",        power:"650 hp",          transmission:"8-speed Tiptronic", top_speed:"300 km/h", accel:"3.3s",  status:"active",   featured:false, badge:"",         emoji:"⚪", description:"The fastest SUV around the Nürburgring. Carbon-fibre roof, race-tuned chassis, and a 4.0L twin-turbo V8 delivering 650 hp — a sports car in SUV clothing." },
  { brand:"Toyota",        model:"Granvia Premium 6-Seat",   year:2023, price:135000, mileage:3300,  color:"Pearl White",           engine:"2.8L Turbo Diesel",          power:"174 hp",          transmission:"6-speed auto",      top_speed:"175 km/h", accel:"10.5s", status:"active",   featured:false, badge:"New",      emoji:"⚪", description:"The Granvia Premium in six-seat configuration. Captain's chairs throughout, generous luggage capacity, and Toyota's renowned reliability — the choice for executives and families alike." },
];

async function run() {
  const { rows } = await pool.query('SELECT COUNT(*)::int AS count FROM cars');
  if (rows[0].count > 0 && !FORCE) {
    console.log(`cars table already has ${rows[0].count} rows. Re-run with --force to wipe and reseed.`);
    await pool.end();
    return;
  }

  if (FORCE) {
    console.log('Truncating cars table...');
    await pool.query('TRUNCATE cars RESTART IDENTITY CASCADE');
  }

  console.log(`Inserting ${SEED.length} cars...`);
  for (const c of SEED) {
    await pool.query(
      `INSERT INTO cars (brand, model, year, price, mileage, color, engine, power, transmission, top_speed, accel, status, featured, badge, emoji, description)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)`,
      [c.brand, c.model, c.year, c.price, c.mileage, c.color, c.engine, c.power, c.transmission, c.top_speed, c.accel, c.status, c.featured, c.badge || null, c.emoji, c.description]
    );
  }
  console.log('Seed complete.');
  await pool.end();
}

run().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
