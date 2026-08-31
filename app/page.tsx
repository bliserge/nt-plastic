import { Hero } from '@/components/home/hero'
import { ProductShowcase } from '@/components/home/product-showcase'
import {
  ManufacturingStatement,
  ProductUniverse,
  ManufacturingScale,
  Numbers,
  WhyNtPlastic,
  InsideNtPlastic,
  SolutionsPreview,
  SustainabilityPreview,
  FeaturedProducts,
} from '@/components/home/sections'
import { QuoteCta } from '@/components/quote-cta'
import { getContent } from '@/lib/cms'

export default async function HomePage() {
  const content = await getContent()
  return (
    <>
      <Hero />
      <ManufacturingStatement />
      <ProductUniverse categories={content.categories} />
      <ProductShowcase categories={content.categories} />
      <ManufacturingScale manufacturingSteps={content.manufacturingSteps} />
      <Numbers stats={content.stats} />
      <WhyNtPlastic />
      <InsideNtPlastic />
      <SolutionsPreview solutions={content.solutions} />
      <SustainabilityPreview />
      <FeaturedProducts featuredProducts={content.featuredProducts} />
      <QuoteCta />
    </>
  )
}
