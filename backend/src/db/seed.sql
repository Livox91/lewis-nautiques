-- Lewis Nautiques Seed Data
-- Run after schema.sql

INSERT INTO boats (name, series, slug, tagline, description, length_ft, top_speed_kts, horsepower, range_nm, engine_config, category, badge_label, image_url, gallery_urls, specs, featured)
VALUES
(
  'LN-42 Stealth',
  'Stealth Series',
  'ln-42-stealth',
  'Designed for those who prioritize velocity and absolute discretion.',
  'The LN-42 Stealth is the pinnacle of performance engineering. A specialized stepped hull and triple 450R power units deliver unmatched speed, while its matte Midnight Navy finish and blacked-out hardware maintain an air of quiet menace. Every surface has been designed to reduce drag and maximize presence.',
  42.0, 74, 1350, 420,
  'Triple Mercury 450R Verado',
  'stealth',
  'Stealth Series',
  'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=1200&q=80',
  ARRAY[
    'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=1200&q=80',
    'https://images.unsplash.com/photo-1548438294-1ad5d5f4f063?w=1200&q=80',
    'https://images.unsplash.com/photo-1533760881669-80db4d7b341d?w=1200&q=80'
  ],
  '{
    "Length Overall": "42'\'' 3\"  (12.88m)",
    "Beam": "10'\'' 2\" (3.09m)",
    "Draft": "2'\'' 5\" (0.73m)",
    "Dry Weight": "9,200 lbs (4,173 kg)",
    "Fuel Capacity": "320 gal (1,211 L)",
    "Passenger Capacity": "12",
    "Hull Material": "Advanced Fiberglass Composite",
    "Navigation": "Garmin GPSMAP 8624"
  }'::jsonb,
  true
),
(
  'LN-37 Shadow',
  'Performance Series',
  'ln-37-shadow',
  'Master the islands with unrivaled agility and integrated AI navigation.',
  'The LN-37 Shadow balances raw performance with intelligent seamanship. Dual 450HP powerplants push this vessel to 58 knots, while the integrated AI navigation suite ensures flawless routing. Titanium Silver accents and a sport-touring cockpit make every passage an event.',
  37.0, 58, 900, 380,
  'Dual Yamaha F450 XTO Offshore',
  'performance',
  'Performance',
  'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=1200&q=80',
  ARRAY[
    'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=1200&q=80',
    'https://images.unsplash.com/photo-1621361365424-06f0e1eb5c49?w=1200&q=80',
    'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=80'
  ],
  '{
    "Length Overall": "37'\'' 1\" (11.30m)",
    "Beam": "9'\'' 6\" (2.89m)",
    "Draft": "2'\'' 2\" (0.66m)",
    "Dry Weight": "7,800 lbs (3,538 kg)",
    "Fuel Capacity": "280 gal (1,060 L)",
    "Passenger Capacity": "10",
    "Hull Material": "Kevlar-Reinforced Composite",
    "Navigation": "Simrad NSX 3012"
  }'::jsonb,
  true
),
(
  'LN-50 Heritage',
  'Heritage Line',
  'ln-50-heritage',
  'The ultimate expression of Lewis Nautiques DNA. Expansive deck space meets brutal high-sea capability.',
  'Our flagship Heritage model is a statement of enduring excellence. Teak wood accents and cream leather interiors pay homage to classic nautical craft, while Quad 350HP performance ensures the LN-50 commands any ocean. This is the vessel for those who have arrived.',
  50.25, 52, 1400, 520,
  'Quad Mercury Verado 350hp',
  'heritage',
  'Heritage',
  'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=1200&q=80',
  ARRAY[
    'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=1200&q=80',
    'https://images.unsplash.com/photo-1548438294-1ad5d5f4f063?w=1200&q=80',
    'https://images.unsplash.com/photo-1565618754566-7d5d0d0e5c48?w=1200&q=80'
  ],
  '{
    "Length Overall": "50'\'' 4\" (15.34m)",
    "Beam": "13'\'' 9\" (4.19m)",
    "Draft": "3'\'' 1\" (0.93m)",
    "Dry Weight": "18,500 lbs (8,392 kg)",
    "Fuel Capacity": "580 gal (2,196 L)",
    "Passenger Capacity": "16",
    "Hull Material": "Premium Fibreglass with Teak Accents",
    "Navigation": "Garmin Glass Helm 7618"
  }'::jsonb,
  true
),
(
  'Bespoke One',
  'Private Commission',
  'bespoke-one',
  'Your ocean. Your vision. Fully realized by our naval architects.',
  'The Bespoke One is not a catalogue item — it is a private commission. Work directly with our team of naval architects and master craftsmen to define every curve, every material, and every system aboard. From hull geometry to onboard entertainment, no compromise exists in this programme.',
  0.0, 65, 1600, 500,
  'Owner Specified Configuration',
  'custom',
  'Custom',
  'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=80',
  ARRAY[
    'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=80',
    'https://images.unsplash.com/photo-1621361365424-06f0e1eb5c49?w=1200&q=80'
  ],
  '{
    "Hull": "Bespoke Naval Architecture",
    "Power": "Owner Specified (up to 2,000 HP)",
    "Top Speed": "65+ KTS",
    "Range": "Custom Build",
    "Interior": "Fully Bespoke",
    "Build Time": "12-18 months",
    "Warranty": "5-Year Comprehensive",
    "Support": "Dedicated Client Liaison"
  }'::jsonb,
  true
)
ON CONFLICT (slug) DO NOTHING;
