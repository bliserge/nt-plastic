import { readFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import {
  categories,
  capacityStats,
  equipment,
  leadership,
  manufacturingSteps,
  milestones,
  nav,
  products,
  qualityChecks,
  site,
  solutions,
  stats,
  sustainabilityInitiatives,
  sustainabilityMetrics,
  values,
} from '../lib/content'

const space = required('CONTENTFUL_SPACE_ID')
const environment = process.env.CONTENTFUL_ENVIRONMENT ?? 'master'
const token = required('CONTENTFUL_MANAGEMENT_TOKEN')
const locale = process.env.CONTENTFUL_LOCALE ?? 'en-US'
const managementBase = `https://api.contentful.com/spaces/${space}/environments/${environment}`
const uploadBase = 'https://upload.contentful.com'
const headers = {
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/vnd.contentful.management.v1+json',
}
const assetCache = new Map<string, string>()

function required(name: string) {
  const value = process.env[name]
  if (!value) throw new Error(`Missing ${name}. Add it to .env.local before importing.`)
  return value
}

function localized(fields: Record<string, unknown>) {
  return Object.fromEntries(Object.entries(fields).map(([key, value]) => [key, { [locale]: value }]))
}

function stableId(prefix: string, value: string) {
  const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  return `${prefix}-${slug}`.slice(0, 64)
}

async function api<T>(url: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(url, { ...init, headers: { ...headers, ...(init.headers ?? {}) } })
  if (!response.ok) throw new Error(`${init.method ?? 'GET'} ${url} failed: ${response.status} ${await response.text()}`)
  const body = await response.text()
  return body.trim() ? (JSON.parse(body) as T) : (undefined as T)
}

async function publish(kind: 'entries' | 'assets', id: string, version: number) {
  await api(`${managementBase}/${kind}/${id}/published`, {
    method: 'PUT',
    headers: { 'X-Contentful-Version': String(version) },
  })
}

async function uploadAsset(source: string, title: string) {
  if (!source.startsWith('/images/')) return undefined
  const cached = assetCache.get(source)
  if (cached) return cached

  const filename = path.basename(source)
  const assetId = stableId('asset', filename)
  try {
    const existing = await api<{ sys: { id: string } }>(`${managementBase}/assets/${assetId}`)
    assetCache.set(source, existing.sys.id)
    return existing.sys.id
  } catch {
    // The asset does not exist yet.
  }
  const file = await readFile(path.join(process.cwd(), 'public', source.slice(1)))
  const upload = await api<{ sys: { id: string } }>(`${uploadBase}/spaces/${space}/uploads`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/octet-stream' },
    body: file,
  })
  const asset = await api<{ sys: { id: string; version: number } }>(`${managementBase}/assets/${assetId}`, {
    method: 'PUT',
    body: JSON.stringify({ fields: {
      title: { [locale]: title },
      file: { [locale]: { fileName: filename, contentType: 'image/*', uploadFrom: { sys: { type: 'Link', linkType: 'Upload', id: upload.sys.id } } } },
    } }),
  })
  await api(`${managementBase}/assets/${asset.sys.id}/files/${locale}/process`, { method: 'PUT' })
  const processed = await api<{ sys: { version: number } }>(`${managementBase}/assets/${asset.sys.id}`)
  await publish('assets', asset.sys.id, processed.sys.version)
  assetCache.set(source, asset.sys.id)
  return asset.sys.id
}

async function entry(contentType: string, id: string, fields: Record<string, unknown>) {
  let version = 0
  let exists = false
  try {
    const existing = await api<{ sys: { version: number } }>(`${managementBase}/entries/${id}`)
    version = existing.sys.version
    exists = true
  } catch {
    // A missing entry is created by the PUT below.
  }
  const saved = await api<{ sys: { id: string; version: number } }>(`${managementBase}/entries/${id}`, {
    method: 'PUT',
    headers: {
      'X-Contentful-Content-Type': contentType,
      ...(exists ? { 'X-Contentful-Version': String(version) } : {}),
    },
    body: JSON.stringify({ fields: localized(fields) }),
  })
  await publish('entries', saved.sys.id, saved.sys.version)
}

async function main() {
  console.log(`Importing lib/content.ts into ${space}/${environment} (${locale})`)

  for (const category of categories) {
    await entry('category', stableId('category', category.slug), { ...category, image: { sys: { type: 'Link', linkType: 'Asset', id: await uploadAsset(category.image, category.name) } } })
  }
  for (const product of products) {
    const image = await uploadAsset(product.image, product.name)
    const gallery = await Promise.all((product.gallery ?? []).map((item) => uploadAsset(item, product.name)))
    await entry('product', stableId('product', product.slug), {
      ...product,
      overview: product.overview,
      image: image ? { sys: { type: 'Link', linkType: 'Asset', id: image } } : undefined,
      gallery: gallery.filter(Boolean).map((id) => ({ sys: { type: 'Link', linkType: 'Asset', id } })),
    })
  }
  for (const solution of solutions) {
    const image = await uploadAsset(solution.image, solution.name)
    await entry('solution', stableId('solution', solution.slug), { ...solution, image: image ? { sys: { type: 'Link', linkType: 'Asset', id: image } } : undefined })
  }
  await entry('siteSettings', 'site-settings', { name: site.name, shortName: site.shortName, tagline: site.tagline, description: site.description, contact: site.contact, social: site.social })
  for (const item of nav) await entry('navigationItem', stableId('nav', item.href), item)
  for (const item of stats) await entry('companyStat', stableId('stat', item.label), { ...item, value: String(item.value) })
  for (const item of manufacturingSteps) await entry('manufacturingStep', stableId('step', item.no), item)
  for (const item of equipment) await entry('equipment', stableId('equipment', item.name), item)
  for (const value of qualityChecks) await entry('qualityCheck', stableId('check', value), { value })
  for (const item of capacityStats) await entry('capacityStat', stableId('capacity', item.label), { ...item, value: String(item.value) })
  for (const item of milestones) await entry('milestone', stableId('milestone', item.year), item)
  for (const item of values) await entry('companyValue', stableId('value', item.title), item)
  for (const item of leadership) await entry('leadershipProfile', stableId('leader', item.name), item)
  for (const item of sustainabilityInitiatives) await entry('sustainabilityInitiative', stableId('initiative', item.title), item)
  for (const item of sustainabilityMetrics) await entry('sustainabilityMetric', stableId('metric', item.label), { ...item, value: String(item.value) })

  console.log('Contentful import completed.')
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exitCode = 1
})
