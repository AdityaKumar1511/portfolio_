import type { MetadataRoute } from 'next'
import meta from '@/data/meta.json'
import { caseStudies } from '@/data/caseStudiesData'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = meta.seo.url.replace(/\/$/, '')
  const lastModified = new Date()

  return [
    {
      url: `${base}/`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...Object.keys(caseStudies).map((slug) => ({
      url: `${base}/projects/${slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}
