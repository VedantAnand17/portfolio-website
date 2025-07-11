import { MetadataRoute } from 'next'
import { DATA } from '@/data/resume'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/admin/'],
    },
    sitemap: `${DATA.url}/sitemap.xml`,
  }
} 