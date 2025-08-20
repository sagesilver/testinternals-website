import { writeFile } from 'fs/promises'
import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { getAllBlogPosts } from '../src/utils/blogUtils.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = resolve(__filename, '..')

// Configure your site URL via env; fallback is local dev URL
const SITE_URL = (process.env.SITE_URL || 'http://localhost:5173').replace(/\/$/, '')

function toXmlUrl({ loc, lastmod, changefreq, priority }) {
	const parts = [
		`<loc>${loc}</loc>`,
		lastmod ? `<lastmod>${lastmod}</lastmod>` : '',
		changefreq ? `<changefreq>${changefreq}</changefreq>` : '',
		priority != null ? `<priority>${priority}</priority>` : ''
	].filter(Boolean)
	return `<url>${parts.join('')}</url>`
}

async function generate() {
	const staticPaths = [
		{ path: '/', changefreq: 'daily', priority: 1.0 },
		{ path: '/blog', changefreq: 'weekly', priority: 0.8 }
	]

	const posts = getAllBlogPosts()
	const postUrls = posts.map((post) => {
		const lastmodDate = post?.frontmatter?.formattedDate instanceof Date
			? post.frontmatter.formattedDate
			: (post?.frontmatter?.date ? new Date(post.frontmatter.date) : null)
		const lastmod = lastmodDate ? lastmodDate.toISOString().split('T')[0] : undefined
		return {
			loc: `${SITE_URL}/blog/${post.slug}`,
			lastmod,
			changefreq: 'monthly',
			priority: 0.7
		}
	})

	const staticUrls = staticPaths.map((s) => ({
		loc: `${SITE_URL}${s.path}`,
		lastmod: undefined,
		changefreq: s.changefreq,
		priority: s.priority
	}))

	const urlsXml = [...staticUrls, ...postUrls].map(toXmlUrl).join('')

	const xml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
		`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
		urlsXml +
		`</urlset>`

	const outPath = resolve(__dirname, '..', 'public', 'sitemap.xml')
	await writeFile(outPath, xml, 'utf8')
	// eslint-disable-next-line no-console
	console.log(`Sitemap written to ${outPath}`)
}

generate().catch((err) => {
	// eslint-disable-next-line no-console
	console.error('Failed to generate sitemap:', err)
	process.exitCode = 1
})


