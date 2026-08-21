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

export default function HomePage() {
  return (
    <>
      <Hero />
      <ManufacturingStatement />
      <ProductUniverse />
      <ProductShowcase />
      <ManufacturingScale />
      <Numbers />
      <WhyNtPlastic />
      <InsideNtPlastic />
      <SolutionsPreview />
      <SustainabilityPreview />
      <FeaturedProducts />
      <QuoteCta />
    </>
  )
}
