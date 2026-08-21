// -----------------------------------------------------------------------------
// SAMPLE CONTENT — placeholder copy for NT Plastic Industries Ltd.
// Everything here stands in for content that would eventually come from a CMS
// (Contentful). Values marked as sample statistics are illustrative only and
// should be replaced with verified company figures before launch.
// -----------------------------------------------------------------------------

export const site = {
  name: 'NT Plastic Industries Ltd',
  shortName: 'NT Plastic',
  tagline: 'Manufacturing of Plastic Products',
  description:
    'A modern manufacturing company delivering durable plastic solutions for homes, businesses, infrastructure and industry.',
  contact: {
    phone: '+250 788 000 000',
    phoneAlt: '+250 722 000 000',
    email: 'info@ntplastic.com',
    sales: 'sales@ntplastic.com',
    whatsapp: '+250 788 000 000',
    address: 'Special Economic Zone, Kigali, Rwanda',
    hours: 'Mon – Fri: 08:00 – 18:00 · Sat: 08:00 – 13:00',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Special%20Economic%20Zone%2C%20Kigali%2C%20Rwanda',
  },
  social: [
    { label: 'LinkedIn', href: '#' },
    { label: 'Instagram', href: '#' },
    { label: 'Facebook', href: '#' },
    { label: 'X', href: '#' },
  ],
}

export const nav = [
  { label: 'Products', href: '/products' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Manufacturing', href: '/manufacturing' },
  { label: 'About Us', href: '/about' },
  { label: 'Sustainability', href: '/sustainability' },
]

// -- Company statistics (SAMPLE — replace with verified figures) --------------
export const stats = [
  { value: 120, suffix: '+', label: 'Products' },
  { value: 18, suffix: '+', label: 'Years of Experience' },
  { value: 450, suffix: '+', label: 'Employees' },
  { value: 60000, suffix: 't', label: 'Annual Production Capacity' },
  { value: 8, suffix: '', label: 'Markets Served' },
]

// -- Product categories -------------------------------------------------------
export type Category = {
  slug: string
  name: string
  short: string
  description: string
  image: string
  count: number
}

export const categories: Category[] = [
  {
    slug: 'water-tanks',
    name: 'Water Storage',
    short: 'Water tanks and related storage solutions.',
    description:
      'Durable, UV-stabilised water storage tanks engineered for households, farms, commercial buildings and large-scale infrastructure. Built to hold clean water safely for years in demanding climates.',
    image: '/images/product-water-tank.png',
    count: 24,
  },
  {
    slug: 'pipes-fittings',
    name: 'Pipes & Fittings',
    short: 'Piping and connection systems.',
    description:
      'Reliable piping and connection systems for water distribution, drainage, irrigation and construction. Manufactured to consistent tolerances for dependable, leak-free performance.',
    image: '/images/product-pipes.png',
    count: 38,
  },
  {
    slug: 'bottles-packaging',
    name: 'Bottles & Packaging',
    short: 'Plastic bottles, containers and packaging products.',
    description:
      'Plastic bottles, jars, closures and packaging containers for beverages, food, personal care and industrial goods — produced to protect products through transport and shelf life.',
    image: '/images/product-bottles.png',
    count: 31,
  },
  {
    slug: 'household',
    name: 'Household Products',
    short: 'Products designed for everyday use.',
    description:
      'Everyday plastic products designed for real homes — storage, kitchen, cleaning and general-purpose items built for strength, safety and long service life.',
    image: '/images/product-household.png',
    count: 19,
  },
  {
    slug: 'industrial',
    name: 'Industrial Products',
    short: 'Plastic products and components for specialised applications.',
    description:
      'Specialised plastic components, crates, pallets and custom-moulded parts engineered for industrial and commercial operations where durability and precision matter.',
    image: '/images/product-industrial.png',
    count: 12,
  },
]

// -- Products -----------------------------------------------------------------
export type Product = {
  slug: string
  name: string
  category: string // category slug
  categoryName: string
  short: string
  overview: string
  keySpec: string
  image: string
  featured?: boolean
  gallery?: string[]
  specs: { label: string; value: string }[]
  features: { title: string; description: string }[]
  applications: string[]
}

export const products: Product[] = [
  {
    slug: '5000l-water-tank',
    name: '5,000 L Water Tank',
    category: 'water-tanks',
    categoryName: 'Water Storage',
    short: 'High-capacity vertical water storage tank for homes and small institutions.',
    overview:
      'The 5,000 L Water Tank is a robust vertical storage solution designed for reliable water storage in residential, agricultural and light-commercial settings. Manufactured from food-grade, UV-stabilised polyethylene, it keeps stored water clean and protected from sunlight, algae growth and temperature extremes.',
    keySpec: '5,000 L capacity',
    image: '/images/product-water-tank.png',
    featured: true,
    gallery: ['/images/product-water-tank.png', '/images/factory-floor.png', '/images/quality-control.png'],
    specs: [
      { label: 'Capacity', value: '5,000 L' },
      { label: 'Diameter', value: '1,900 mm' },
      { label: 'Height', value: '2,050 mm' },
      { label: 'Material', value: 'Food-grade UV-stabilised PE' },
      { label: 'Weight', value: '88 kg' },
      { label: 'Colour', value: 'NT Blue / Black' },
      { label: 'Warranty', value: '10 years' },
      { label: 'Product code', value: 'WT-5000-V' },
    ],
    features: [
      { title: 'UV resistance', description: 'Stabilised against sun exposure for long outdoor service life.' },
      { title: 'Food-grade material', description: 'Safe for storing clean drinking water.' },
      { title: 'Seamless construction', description: 'Single moulded body eliminates joints and leak points.' },
      { title: 'Easy installation', description: 'Lightweight relative to capacity with a wide inlet and outlet.' },
    ],
    applications: ['Residential', 'Agriculture', 'Commercial', 'Construction'],
  },
  {
    slug: '10000l-water-tank',
    name: '10,000 L Water Tank',
    category: 'water-tanks',
    categoryName: 'Water Storage',
    short: 'Large-capacity storage tank for institutions, farms and commercial sites.',
    overview:
      'A large-capacity vertical tank built for high-demand water storage across institutions, agriculture and commercial facilities. Engineered walls maintain structural integrity even when full, and the UV-stabilised material resists degradation in harsh outdoor conditions.',
    keySpec: '10,000 L capacity',
    image: '/images/product-water-tank.png',
    featured: true,
    gallery: ['/images/product-water-tank.png', '/images/factory-floor.png', '/images/warehouse.png'],
    specs: [
      { label: 'Capacity', value: '10,000 L' },
      { label: 'Diameter', value: '2,400 mm' },
      { label: 'Height', value: '2,450 mm' },
      { label: 'Material', value: 'Food-grade UV-stabilised PE' },
      { label: 'Weight', value: '150 kg' },
      { label: 'Colour', value: 'NT Blue / Black' },
      { label: 'Warranty', value: '10 years' },
      { label: 'Product code', value: 'WT-10000-V' },
    ],
    features: [
      { title: 'High capacity', description: 'Stores large volumes for continuous supply.' },
      { title: 'Reinforced walls', description: 'Engineered thickness for structural stability when full.' },
      { title: 'UV resistance', description: 'Protected against long-term sun exposure.' },
      { title: 'Low maintenance', description: 'Smooth interior resists sediment build-up.' },
    ],
    applications: ['Commercial', 'Agriculture', 'Construction', 'Industrial'],
  },
  {
    slug: 'hdpe-pipe-110mm',
    name: 'HDPE Pipe 110 mm',
    category: 'pipes-fittings',
    categoryName: 'Pipes & Fittings',
    short: 'High-density polyethylene pipe for pressurised water distribution.',
    overview:
      'The HDPE Pipe 110 mm is manufactured for pressurised water distribution, irrigation and infrastructure projects. Its flexibility and corrosion resistance make it suitable for demanding buried and above-ground installations.',
    keySpec: '110 mm · PN10',
    image: '/images/product-pipes.png',
    featured: true,
    gallery: ['/images/product-pipes.png', '/images/factory-floor.png', '/images/warehouse.png'],
    specs: [
      { label: 'Nominal diameter', value: '110 mm' },
      { label: 'Pressure rating', value: 'PN10' },
      { label: 'Material', value: 'HDPE PE100' },
      { label: 'Standard length', value: '6 m / coils' },
      { label: 'Colour', value: 'Black with blue stripe' },
      { label: 'Application', value: 'Water distribution' },
      { label: 'Product code', value: 'PP-HDPE-110' },
    ],
    features: [
      { title: 'Corrosion resistant', description: 'Will not rust or scale over its service life.' },
      { title: 'Flexible', description: 'Handles ground movement without cracking.' },
      { title: 'Leak-free joints', description: 'Compatible with fusion and compression fittings.' },
      { title: 'Long service life', description: 'Designed for decades of reliable use.' },
    ],
    applications: ['Construction', 'Agriculture', 'Commercial', 'Industrial'],
  },
  {
    slug: 'pvc-pipe-fittings',
    name: 'PVC Fittings Set',
    category: 'pipes-fittings',
    categoryName: 'Pipes & Fittings',
    short: 'Complete range of connection fittings for plumbing systems.',
    overview:
      'A comprehensive set of PVC connection fittings — elbows, tees, couplers and reducers — manufactured to consistent tolerances for dependable, leak-free plumbing and drainage systems.',
    keySpec: 'Full connection range',
    image: '/images/product-pipes.png',
    gallery: ['/images/product-pipes.png', '/images/quality-control.png', '/images/factory-floor.png'],
    specs: [
      { label: 'Sizes', value: '20 – 110 mm' },
      { label: 'Material', value: 'uPVC' },
      { label: 'Types', value: 'Elbow, Tee, Coupler, Reducer' },
      { label: 'Application', value: 'Plumbing & drainage' },
      { label: 'Product code', value: 'PP-PVC-FIT' },
    ],
    features: [
      { title: 'Precise tolerances', description: 'Consistent dimensions for secure fits.' },
      { title: 'Chemical resistant', description: 'Suitable for a wide range of fluids.' },
      { title: 'Easy assembly', description: 'Solvent-weld and push-fit compatible.' },
    ],
    applications: ['Residential', 'Construction', 'Commercial'],
  },
  {
    slug: '1l-pet-bottle',
    name: '1 L PET Bottle',
    category: 'bottles-packaging',
    categoryName: 'Bottles & Packaging',
    short: 'Clear beverage bottle for water and soft drinks.',
    overview:
      'A clear, food-grade PET bottle designed for water and beverage packaging. Lightweight yet strong, it protects contents through filling, transport and shelf life while presenting products clearly.',
    keySpec: '1 L · food-grade PET',
    image: '/images/product-bottles.png',
    featured: true,
    gallery: ['/images/product-bottles.png', '/images/warehouse.png', '/images/factory-floor.png'],
    specs: [
      { label: 'Volume', value: '1,000 ml' },
      { label: 'Material', value: 'Food-grade PET' },
      { label: 'Neck finish', value: 'PCO 1810' },
      { label: 'Weight', value: '24 g' },
      { label: 'Colour', value: 'Clear' },
      { label: 'Product code', value: 'BP-PET-1000' },
    ],
    features: [
      { title: 'Food-grade', description: 'Safe for beverages and drinking water.' },
      { title: 'Lightweight', description: 'Reduces transport weight and cost.' },
      { title: 'Crystal clear', description: 'Showcases product contents.' },
    ],
    applications: ['Commercial', 'Industrial'],
  },
  {
    slug: '20l-jerrycan',
    name: '20 L Jerry Can',
    category: 'bottles-packaging',
    categoryName: 'Bottles & Packaging',
    short: 'Heavy-duty container for liquids and bulk storage.',
    overview:
      'A rugged 20 L jerry can for storing and transporting water, oils and industrial liquids. The reinforced handle and secure closure make it dependable for repeated field use.',
    keySpec: '20 L · HDPE',
    image: '/images/product-bottles.png',
    gallery: ['/images/product-bottles.png', '/images/warehouse.png', '/images/quality-control.png'],
    specs: [
      { label: 'Volume', value: '20 L' },
      { label: 'Material', value: 'HDPE' },
      { label: 'Closure', value: '55 mm screw cap' },
      { label: 'Colour', value: 'White / Yellow' },
      { label: 'Product code', value: 'BP-JC-20' },
    ],
    features: [
      { title: 'Impact resistant', description: 'Withstands rough handling and transport.' },
      { title: 'Secure closure', description: 'Leak-resistant screw cap.' },
      { title: 'Ergonomic handle', description: 'Comfortable to carry when full.' },
    ],
    applications: ['Agriculture', 'Commercial', 'Industrial', 'Residential'],
  },
  {
    slug: 'storage-container-50l',
    name: '50 L Storage Container',
    category: 'household',
    categoryName: 'Household Products',
    short: 'Stackable multi-purpose storage container with lid.',
    overview:
      'A durable 50 L household storage container with a secure-fitting lid. Ideal for organising homes, storing dry goods and general-purpose use, with a stackable design that saves space.',
    keySpec: '50 L · with lid',
    image: '/images/product-household.png',
    featured: true,
    gallery: ['/images/product-household.png', '/images/warehouse.png', '/images/factory-floor.png'],
    specs: [
      { label: 'Capacity', value: '50 L' },
      { label: 'Material', value: 'Polypropylene' },
      { label: 'Features', value: 'Stackable, lidded' },
      { label: 'Colour', value: 'Assorted' },
      { label: 'Product code', value: 'HH-CT-50' },
    ],
    features: [
      { title: 'Stackable', description: 'Saves space when stored or transported.' },
      { title: 'Secure lid', description: 'Keeps contents dust-free.' },
      { title: 'Durable', description: 'Resists cracking in daily use.' },
    ],
    applications: ['Residential', 'Commercial'],
  },
  {
    slug: 'industrial-crate',
    name: 'Industrial Stacking Crate',
    category: 'industrial',
    categoryName: 'Industrial Products',
    short: 'Heavy-duty crate for logistics and material handling.',
    overview:
      'A heavy-duty stacking crate engineered for industrial logistics, agriculture and distribution. Reinforced walls and interlocking design support repeated stacking under load.',
    keySpec: 'Reinforced · stackable',
    image: '/images/product-industrial.png',
    featured: true,
    gallery: ['/images/product-industrial.png', '/images/warehouse.png', '/images/factory-floor.png'],
    specs: [
      { label: 'External size', value: '600 × 400 × 300 mm' },
      { label: 'Material', value: 'High-impact PP' },
      { label: 'Load rating', value: 'Up to 25 kg' },
      { label: 'Features', value: 'Ventilated, stackable' },
      { label: 'Product code', value: 'IN-CR-6040' },
    ],
    features: [
      { title: 'Load bearing', description: 'Supports stacking under working loads.' },
      { title: 'Interlocking', description: 'Stable stacks that resist toppling.' },
      { title: 'Ventilated', description: 'Airflow for produce and goods.' },
    ],
    applications: ['Industrial', 'Agriculture', 'Commercial'],
  },
]

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug)
}
export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug)
}
export function productsByCategory(slug: string) {
  return products.filter((p) => p.category === slug)
}
export function relatedProducts(product: Product) {
  return products.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 3)
}
export const featuredProducts = products.filter((p) => p.featured)

// -- Solutions ----------------------------------------------------------------
export type Solution = {
  slug: string
  name: string
  tagline: string
  problem: string
  solution: string
  benefits: string[]
  categories: string[] // related category slugs
  image: string
}

export const solutions: Solution[] = [
  {
    slug: 'water-sanitation',
    name: 'Water & Sanitation',
    tagline: 'Storage and water distribution solutions.',
    problem:
      'Reliable access to clean water depends on storage and distribution systems that can withstand climate, pressure and years of continuous use.',
    solution:
      'We manufacture UV-stabilised storage tanks and pressure-rated piping that keep water clean from source to tap — engineered for households, institutions and municipal-scale infrastructure.',
    benefits: ['Clean, protected storage', 'Leak-free distribution', 'Long service life', 'Scalable capacity'],
    categories: ['water-tanks', 'pipes-fittings'],
    image: '/images/solutions-hero.png',
  },
  {
    slug: 'construction',
    name: 'Construction',
    tagline: 'Products for construction and infrastructure projects.',
    problem:
      'Construction projects need dependable materials delivered on schedule and built to perform for the life of the structure.',
    solution:
      'From piping and fittings to storage tanks, our products meet the durability and consistency that contractors and engineers rely on across residential, commercial and infrastructure builds.',
    benefits: ['Consistent quality', 'Reliable supply', 'Engineer-ready specs', 'Bulk availability'],
    categories: ['pipes-fittings', 'water-tanks'],
    image: '/images/warehouse.png',
  },
  {
    slug: 'agriculture',
    name: 'Agriculture',
    tagline: 'Solutions for water management and agricultural applications.',
    problem:
      'Farms depend on efficient water storage, irrigation and durable containers that survive daily field conditions.',
    solution:
      'Our tanks, piping and containers support irrigation, water harvesting and produce handling — helping agricultural operations manage water and materials efficiently.',
    benefits: ['Water harvesting & storage', 'Irrigation-ready piping', 'Rugged field containers', 'Cost efficiency'],
    categories: ['water-tanks', 'pipes-fittings', 'bottles-packaging'],
    image: '/images/solutions-hero.png',
  },
  {
    slug: 'residential',
    name: 'Residential',
    tagline: 'Products for homes and everyday use.',
    problem:
      'Homes need practical, safe and long-lasting products for water, storage and daily living.',
    solution:
      'We manufacture household water tanks, storage and everyday products designed around real home needs — durable, safe and dependable.',
    benefits: ['Safe materials', 'Everyday durability', 'Practical design', 'Trusted quality'],
    categories: ['water-tanks', 'household'],
    image: '/images/product-household.png',
  },
  {
    slug: 'commercial',
    name: 'Commercial',
    tagline: 'Solutions for businesses, institutions and commercial facilities.',
    problem:
      'Businesses and institutions require dependable supply, consistent quality and products that support continuous operations.',
    solution:
      'From packaging to water storage and material handling, we supply commercial operations with products engineered for reliability and scale.',
    benefits: ['Volume supply', 'Consistent quality', 'Operational reliability', 'Partnership support'],
    categories: ['bottles-packaging', 'water-tanks', 'industrial'],
    image: '/images/warehouse.png',
  },
  {
    slug: 'industrial',
    name: 'Industrial',
    tagline: 'Specialised products for industrial environments.',
    problem:
      'Industrial operations need precise, durable components and containers that perform under demanding, repetitive conditions.',
    solution:
      'We manufacture crates, containers and custom-moulded components engineered to industrial tolerances and built to endure continuous use.',
    benefits: ['Engineered tolerances', 'Heavy-duty durability', 'Custom manufacturing', 'Reliable output'],
    categories: ['industrial', 'bottles-packaging'],
    image: '/images/product-industrial.png',
  },
]

export function getSolution(slug: string) {
  return solutions.find((s) => s.slug === slug)
}

// -- Manufacturing ------------------------------------------------------------
export const manufacturingSteps = [
  {
    no: '01',
    title: 'Materials',
    description: 'Raw polymer resin is sourced and inspected to consistent quality standards before entering production.',
  },
  {
    no: '02',
    title: 'Processing',
    description: 'Materials are prepared, blended and colour-matched to the exact specification of each product.',
  },
  {
    no: '03',
    title: 'Moulding / Extrusion',
    description: 'Products are formed through precision injection moulding, blow moulding and extrusion lines.',
  },
  {
    no: '04',
    title: 'Quality Control',
    description: 'Dimensional checks and product testing verify that every batch meets our quality requirements.',
  },
  {
    no: '05',
    title: 'Finishing',
    description: 'Products are trimmed, finished and prepared, ready for labelling and final inspection.',
  },
  {
    no: '06',
    title: 'Packaging',
    description: 'Finished goods are packaged to protect them through storage, transport and delivery.',
  },
  {
    no: '07',
    title: 'Distribution',
    description: 'Products are stored and dispatched through our distribution network to markets across the region.',
  },
]

export const equipment = [
  {
    name: 'Injection Moulding Lines',
    function: 'Forms precision components and household products.',
    capability: 'High-volume, repeatable output with tight tolerances.',
  },
  {
    name: 'Blow Moulding Machines',
    function: 'Produces bottles, jerry cans and hollow containers.',
    capability: 'Consistent wall thickness and container strength.',
  },
  {
    name: 'Extrusion Lines',
    function: 'Manufactures piping in a range of diameters.',
    capability: 'Continuous production with dimensional consistency.',
  },
  {
    name: 'Rotational Moulding',
    function: 'Forms large seamless water storage tanks.',
    capability: 'Single-piece tanks with uniform, durable walls.',
  },
]

export const qualityChecks = [
  'Raw material inspection',
  'Production monitoring',
  'Dimensional checks',
  'Product testing',
  'Final inspection',
  'Packaging checks',
]

export const capacityStats = [
  { value: 60000, suffix: 't', label: 'Annual production capacity' },
  { value: 4, suffix: '', label: 'Manufacturing facilities' },
  { value: 20, suffix: '+', label: 'Production lines' },
  { value: 5, suffix: '', label: 'Product categories' },
]

// -- About --------------------------------------------------------------------
export const milestones = [
  { year: '2006', title: 'Founded', description: 'NT Plastic Industries is established with a focus on essential plastic products.' },
  { year: '2010', title: 'Early Manufacturing', description: 'First dedicated production lines begin operating at scale.' },
  { year: '2014', title: 'Expansion', description: 'Facility expansion increases capacity and product range.' },
  { year: '2017', title: 'New Product Categories', description: 'Water storage and piping solutions are added to the portfolio.' },
  { year: '2020', title: 'Manufacturing Growth', description: 'Investment in modern moulding and extrusion technology.' },
  { year: '2023', title: 'Regional Expansion', description: 'Distribution reaches new markets across the region.' },
  { year: 'Today', title: 'The Future', description: 'Continued investment in capability, sustainability and innovation.' },
]

export const values = [
  { title: 'Quality', description: 'Products manufactured to consistent, dependable standards.' },
  { title: 'Integrity', description: 'Honest relationships with customers, partners and communities.' },
  { title: 'Innovation', description: 'Continuous improvement in products and processes.' },
  { title: 'Customer Focus', description: 'Solutions designed around real customer needs.' },
  { title: 'Responsibility', description: 'Manufacturing with care for people and the environment.' },
  { title: 'Excellence', description: 'A commitment to doing every task to a high standard.' },
]

export const leadership = [
  { name: 'Leadership Name', position: 'Chief Executive Officer', bio: 'Company-provided biography for the executive leading NT Plastic Industries.' },
  { name: 'Leadership Name', position: 'Head of Manufacturing', bio: 'Company-provided biography for the executive overseeing production and operations.' },
  { name: 'Leadership Name', position: 'Head of Commercial', bio: 'Company-provided biography for the executive leading sales and partnerships.' },
]

export const mission =
  'To manufacture durable, reliable plastic products and solutions that improve everyday life and support the growth of the communities and industries we serve.'
export const vision =
  'To be the most trusted plastic manufacturing company in the region — recognised for quality, innovation and responsible manufacturing.'

// -- Sustainability -----------------------------------------------------------
export const sustainabilityInitiatives = [
  { title: 'Waste Reduction', description: 'Reducing production waste through process optimisation and material recovery.' },
  { title: 'Resource Efficiency', description: 'Using raw materials efficiently to minimise consumption per product.' },
  { title: 'Energy Usage', description: 'Improving energy efficiency across manufacturing operations.' },
  { title: 'Recycling', description: 'Recovering and reprocessing suitable plastic material back into production.' },
  { title: 'Product Longevity', description: 'Building products that last longer, so they are replaced less often.' },
  { title: 'Responsible Manufacturing', description: 'Operating with care for our people, communities and environment.' },
]

// SAMPLE metrics — replace with verified figures.
export const sustainabilityMetrics = [
  { value: 1200, suffix: 't', label: 'Material recovered annually' },
  { value: 30, suffix: '%', label: 'Production waste reduction' },
  { value: 22, suffix: '%', label: 'Energy efficiency improvement' },
]
