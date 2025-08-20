import { writeFile, readFile } from 'fs/promises'
import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { getAllBlogPosts } from '../src/utils/blogUtils.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = resolve(__filename, '..')

// Resolve site URL from (in order): SITE_URL env, package.json siteUrl/homepage, Vercel URL, then localhost
async function resolveSiteUrl() {
	const explicit = process.env.SITE_URL
	if (explicit) return String(explicit).trim().replace(/\/$/, '')

	try {
		const pkgPath = resolve(__dirname, '..', 'package.json')
		const pkgRaw = await readFile(pkgPath, 'utf8')
		const pkg = JSON.parse(pkgRaw)
		const declared = pkg.siteUrl || pkg.homepage
		if (declared) return String(declared).trim().replace(/\/$/, '')
	} catch {
		// ignore
	}

	if (process.env.VERCEL_URL) {
		const url = process.env.VERCEL_URL.startsWith('http')
			? process.env.VERCEL_URL
			: `https://${process.env.VERCEL_URL}`
		return String(url).trim().replace(/\/$/, '')
	}

	return 'http://localhost:5173'
}

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
	const SITE_URL = (await resolveSiteUrl()).trim().replace(/\/$/, '')
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


