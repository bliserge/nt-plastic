import 'server-only'

import {
  categories as fallbackCategories,
  capacityStats as fallbackCapacityStats,
  equipment as fallbackEquipment,
  featuredProducts as fallbackFeaturedProducts,
  leadership as fallbackLeadership,
  manufacturingSteps as fallbackManufacturingSteps,
  milestones as fallbackMilestones,
  mission as fallbackMission,
  nav as fallbackNav,
  products as fallbackProducts,
  qualityChecks as fallbackQualityChecks,
  site as fallbackSite,
  solutions as fallbackSolutions,
  stats as fallbackStats,
  sustainabilityInitiatives as fallbackSustainabilityInitiatives,
  sustainabilityMetrics as fallbackSustainabilityMetrics,
  values as fallbackValues,
  vision as fallbackVision,
  type Category,
  type Product,
  type Solution,
} from '@/lib/content'

type ContentfulEntry = { fields?: Record<string, unknown> }
type ContentfulAsset = { sys: { id: string }; fields?: Record<string, unknown> }

const apiUrl = process.env.CONTENTFUL_SPACE_ID && process.env.CONTENTFUL_ENVIRONMENT
  ? `https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/${process.env.CONTENTFUL_ENVIRONMENT}/entries`
  : null

function field<T>(entry: ContentfulEntry, name: string, fallback: T): T {
  return (entry.fields?.[name] as T | undefined) ?? fallback
}

function assetUrl(value: unknown, fallback = ''): string {
  if (typeof value === 'string') return value
  if (value && typeof value === 'object') {
    const fields = (value as { fields?: { file?: { url?: string } } }).fields
    const url = fields?.file?.url
    if (url) return url.startsWith('//') ? `https:${url}` : url
  }
  return fallback
}

function assetList(value: unknown, fallback: string[] = []): string[] {
  if (!Array.isArray(value)) return fallback
  return value.map((item) => assetUrl(item)).filter(Boolean)
}

function resolveLinks(value: unknown, assets: Map<string, ContentfulAsset>): unknown {
  if (Array.isArray(value)) return value.map((item) => resolveLinks(item, assets))
  if (!value || typeof value !== 'object') return value

  const object = value as { sys?: { id?: string; linkType?: string } } & Record<string, unknown>
  if (object.sys?.linkType === 'Asset' && object.sys.id) return assets.get(object.sys.id) ?? value
  return Object.fromEntries(Object.entries(object).map(([key, item]) => [key, resolveLinks(item, assets)]))
}

async function entries(contentType: string): Promise<ContentfulEntry[]> {
  if (!apiUrl || !process.env.CONTENTFUL_ACCESS_TOKEN) return []

  const url = new URL(apiUrl)
  url.searchParams.set('content_type', contentType)
  url.searchParams.set('include', '2')
  url.searchParams.set('limit', '1000')

  try {
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}` },
      next: { revalidate: 300 },
    })
    if (!response.ok) return []
    const data = (await response.json()) as { items?: ContentfulEntry[]; includes?: { Asset?: ContentfulAsset[] } }
    const assets = new Map((data.includes?.Asset ?? []).map((asset) => [asset.sys.id, asset]))
    return (data.items ?? []).map((item) => ({
      ...item,
      fields: resolveLinks(item.fields ?? {}, assets) as Record<string, unknown>,
    }))
  } catch {
    return []
  }
}

async function collection<T>(contentType: string, fallback: T[]): Promise<T[]> {
  const items = await entries(contentType)
  if (!items.length) return fallback
  return items.map((entry) => entry.fields as T)
}

async function qualityCheckCollection(): Promise<string[]> {
  const items = await entries('qualityCheck')
  return items.length ? items.map((entry) => field(entry, 'value', '')).filter(Boolean) : fallbackQualityChecks
}

function bySlug<T extends { slug: string }>(items: T[], slug: string) {
  return items.find((item) => item.slug === slug)
}

export async function getCategories(): Promise<Category[]> {
  const items = await entries('category')
  if (!items.length) return fallbackCategories
  return items.map((entry) => ({
    slug: field(entry, 'slug', ''),
    name: field(entry, 'name', ''),
    short: field(entry, 'short', ''),
    description: field(entry, 'description', ''),
    image: assetUrl(field(entry, 'image', ''), '/placeholder.svg'),
    count: field(entry, 'count', 0),
  })).filter((item) => item.slug && item.name)
}

export async function getProducts(categories = fallbackCategories): Promise<Product[]> {
  const items = await entries('product')
  if (!items.length) return fallbackProducts
  return items.map((entry) => {
    const category = field(entry, 'category', '')
    const categorySlug = typeof category === 'string' ? category : field(category as ContentfulEntry, 'slug', '')
    const categoryRecord = bySlug(categories, categorySlug)
    return {
      slug: field(entry, 'slug', ''),
      name: field(entry, 'name', ''),
      category: categorySlug,
      categoryName: field(entry, 'categoryName', categoryRecord?.name ?? ''),
      short: field(entry, 'short', ''),
      overview: field(entry, 'overview', ''),
      keySpec: field(entry, 'keySpec', ''),
      image: assetUrl(field(entry, 'image', ''), '/placeholder.svg'),
      featured: field(entry, 'featured', false),
      gallery: assetList(field(entry, 'gallery', [])),
      specs: field(entry, 'specs', []),
      features: field(entry, 'features', []),
      applications: field(entry, 'applications', []),
    }
  }).filter((item) => item.slug && item.name)
}

export async function getSolutions(): Promise<Solution[]> {
  const items = await entries('solution')
  if (!items.length) return fallbackSolutions
  return items.map((entry) => ({
    slug: field(entry, 'slug', ''),
    name: field(entry, 'name', ''),
    tagline: field(entry, 'tagline', ''),
    problem: field(entry, 'problem', ''),
    solution: field(entry, 'solution', ''),
    benefits: field(entry, 'benefits', []),
    categories: field(entry, 'categories', []),
    image: assetUrl(field(entry, 'image', ''), '/placeholder.svg'),
  })).filter((item) => item.slug && item.name)
}

export async function getSite() {
  const items = await entries('siteSettings')
  if (!items.length) return fallbackSite
  const entry = items[0]
  return {
    ...fallbackSite,
    name: field(entry, 'name', fallbackSite.name),
    shortName: field(entry, 'shortName', fallbackSite.shortName),
    tagline: field(entry, 'tagline', fallbackSite.tagline),
    description: field(entry, 'description', fallbackSite.description),
    contact: { ...fallbackSite.contact, ...field(entry, 'contact', {}) },
    social: field(entry, 'social', fallbackSite.social),
  }
}

export async function getNav() {
  const items = await entries('navigationItem')
  return items.length
    ? items.map((entry) => ({ label: field(entry, 'label', ''), href: field(entry, 'href', '') })).filter((item) => item.label && item.href)
    : fallbackNav
}

export async function getContent() {
  const [site, nav, categories, solutions, stats, manufacturingSteps, equipment, qualityChecks, capacityStats, milestones, values, leadership, sustainabilityInitiatives, sustainabilityMetrics] = await Promise.all([
    getSite(),
    getNav(),
    getCategories(),
    getSolutions(),
    collection('companyStat', fallbackStats),
    collection('manufacturingStep', fallbackManufacturingSteps),
    collection('equipment', fallbackEquipment),
    qualityCheckCollection(),
    collection('capacityStat', fallbackCapacityStats),
    collection('milestone', fallbackMilestones),
    collection('companyValue', fallbackValues),
    collection('leadershipProfile', fallbackLeadership),
    collection('sustainabilityInitiative', fallbackSustainabilityInitiatives),
    collection('sustainabilityMetric', fallbackSustainabilityMetrics),
  ])
  const products = await getProducts(categories)
  const numeric = <T extends { value: number | string }>(items: T[]) =>
    items.map((item) => ({ ...item, value: Number(item.value) }))
  return {
    site, nav, categories, products, solutions,
    featuredProducts: products.filter((product) => product.featured),
    stats: numeric(stats),
    manufacturingSteps,
    equipment,
    qualityChecks,
    capacityStats: numeric(capacityStats),
    milestones,
    values,
    leadership,
    mission: fallbackMission,
    vision: fallbackVision,
    sustainabilityInitiatives,
    sustainabilityMetrics: numeric(sustainabilityMetrics),
  }
}
