# Contentful setup

The site reads published entries from the Contentful Delivery API. If the environment variables are missing, or an individual content type has no entries, the original values in `lib/content.ts` are used automatically.

## Environment variables

Copy `.env.example` to `.env.local` and fill in:

- `CONTENTFUL_SPACE_ID`: the Contentful space ID
- `CONTENTFUL_ENVIRONMENT`: normally `master`
- `CONTENTFUL_ACCESS_TOKEN`: a Content Delivery API token

The token is server-only and must not use a `NEXT_PUBLIC_` prefix.

## Content models

Create these Contentful content types with the listed field IDs. Field IDs are important because the adapter uses them directly.

| Content type ID | Required fields |
| --- | --- |
| `siteSettings` | `name`, `shortName`, `tagline` (short text), `description` (long text), `contact` (JSON), `social` (JSON) |
| `navigationItem` | `label`, `href` (short text) |
| `category` | `slug`, `name`, `short` (short text), `description` (long text), `image` (media), `count` (number) |
| `product` | `slug`, `name`, `category` (short text), `categoryName`, `short` (short text), `overview` (long text), `keySpec`, `image` (media), `featured` (boolean), `gallery` (media list), `specs` (JSON), `features` (JSON), `applications` (short text list) |
| `solution` | `slug`, `name`, `tagline` (short text), `problem` (long text), `solution` (long text), `benefits` (short text list), `categories` (short text list), `image` (media) |
| `companyStat` | `value` (short text or number), `suffix`, `label` |
| `manufacturingStep` | `no`, `title`, `description` (long text) |
| `equipment` | `name`, `function` (long text), `capability` (long text) |
| `qualityCheck` | `value` |
| `capacityStat` | `value` (short text or number), `suffix`, `label` |
| `milestone` | `year`, `title`, `description` (long text) |
| `companyValue` | `title`, `description` (long text) |
| `leadershipProfile` | `name`, `position`, `bio` (long text) |
| `sustainabilityInitiative` | `title`, `description` (long text) |
| `sustainabilityMetric` | `value` (short text or number), `suffix`, `label` |

For `qualityCheck`, the generic fallback mapper expects the field object to contain the string value used by the page. If you use a `value` field, publish entries as `{ "value": "Raw material inspection" }` and update the page mapping if needed.

## Publishing workflow

1. Create the content types and fields.
2. Import or manually enter the current values from `lib/content.ts`.
3. Upload product and category images as Contentful media assets.
4. Publish entries and assets.
5. Add the environment variables to the local environment and deployment provider.

Content is cached for five minutes with Incremental Static Regeneration. A newly published value will normally appear within that window, or after a new deployment.

## Automatic import

The repository includes a repeatable importer at `scripts/import-contentful.ts`. Add the Management API token to `.env.local` as `CONTENTFUL_MANAGEMENT_TOKEN`, then run:

```bash
pnpm contentful:import
```

Use a Contentful Personal Access Token with access to manage entries and assets in this space. The Delivery API token is read-only and cannot be used for importing. The importer uses stable IDs such as `product-5000l-water-tank`, so rerunning it updates the same entries instead of creating duplicates. It also uploads local files from `public/images` and publishes the assets before publishing entries.
