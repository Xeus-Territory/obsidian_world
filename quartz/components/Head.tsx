import { i18n } from "../i18n"
import { FullSlug, joinSegments, pathToRoot, simplifySlug } from "../util/path"
import { JSResourceToScriptElement } from "../util/resources"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

// profiles that belong to the same person as this site — emitted as schema.org
// `sameAs` so search engines resolve them all to a single entity.
// keep in sync with the footer links in quartz.layout.ts
const socialProfiles = [
  "https://github.com/Xeus-Territory",
  "https://www.linkedin.com/in/xeusnguyen/",
  "https://medium.com/@XeusNguyen",
  "https://twitter.com/XeusNguyen",
  "https://www.youtube.com/@xeusnguyen",
  "https://hackmd.io/@xeusnguyen",
  "https://viblo.asia/u/Xeus-Territory",
  "https://spiderum.com/nguoi-dung/Xeus0810",
]

const person = {
  name: "Xeus Nguyen",
  jobTitle: "DevOps Engineer",
  description:
    "DevOps / MLOps / DevSecOps engineer and tech blogger from Vietnam, maintainer of W'xOps.",
}

export default (() => {
  const Head: QuartzComponent = ({ cfg, fileData, externalResources }: QuartzComponentProps) => {
    const title = fileData.frontmatter?.title ?? i18n(cfg.locale).propertyDefaults.title
    const description =
      fileData.description?.trim() ?? i18n(cfg.locale).propertyDefaults.description
    const { css, js } = externalResources

    const url = new URL(`https://${cfg.baseUrl ?? "example.com"}`)
    const path = url.pathname as FullSlug
    const baseDir = fileData.slug === "404" ? path : pathToRoot(fileData.slug!)

    const iconPath = joinSegments(baseDir, "static/icon.png")
    const ogImagePath = `https://${cfg.baseUrl}/static/og-image.png`

    // the 404 page is served for every unknown path, so it must never be
    // canonicalised or indexed
    const isNotFound = fileData.slug === "404"
    const isHomePage = fileData.slug === "index"
    const slug = simplifySlug(fileData.slug!)
    const canonicalUrl = `https://${cfg.baseUrl}/${slug === "/" ? "" : slug}`

    // a page title alone ("Policy", "DNS") carries no branding in a SERP,
    // so every non-home page gets the site name appended
    const documentTitle = isHomePage || !cfg.pageTitle ? title : `${title} · ${cfg.pageTitle}`

    const structuredData = isHomePage
      ? {
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Person",
              "@id": `https://${cfg.baseUrl}/#person`,
              name: person.name,
              url: `https://${cfg.baseUrl}/`,
              image: ogImagePath,
              jobTitle: person.jobTitle,
              description: person.description,
              sameAs: socialProfiles,
            },
            {
              "@type": "WebSite",
              "@id": `https://${cfg.baseUrl}/#website`,
              name: person.name,
              alternateName: cfg.pageTitle,
              url: `https://${cfg.baseUrl}/`,
              inLanguage: cfg.locale,
              publisher: { "@id": `https://${cfg.baseUrl}/#person` },
            },
          ],
        }
      : {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: title,
          description,
          url: canonicalUrl,
          image: ogImagePath,
          inLanguage: cfg.locale,
          datePublished: fileData.dates?.created?.toISOString(),
          dateModified: fileData.dates?.modified?.toISOString(),
          author: {
            "@type": "Person",
            name: person.name,
            url: `https://${cfg.baseUrl}/`,
            sameAs: socialProfiles,
          },
        }

    return (
      <head>
        <title>{documentTitle}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {isNotFound ? (
          <meta name="robots" content="noindex, follow" />
        ) : (
          <link rel="canonical" href={canonicalUrl} />
        )}
        <meta property="og:type" content={isHomePage ? "profile" : "article"} />
        <meta property="og:site_name" content={cfg.pageTitle} />
        <meta property="og:locale" content={cfg.locale.replace("-", "_")} />
        {!isNotFound && <meta property="og:url" content={canonicalUrl} />}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        {cfg.baseUrl && <meta property="og:image" content={ogImagePath} />}
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="675" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        {cfg.baseUrl && <meta name="twitter:image" content={ogImagePath} />}
        <meta name="author" content={person.name} />
        <link rel="icon" href={iconPath} />
        <meta name="description" content={description} />
        <meta name="generator" content="Quartz" />
        {!isNotFound && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          />
        )}
        {cfg.theme.cdnCaching && (
          <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
          </>
        )}
        {css.map((href) => (
          <link key={href} href={href} rel="stylesheet" type="text/css" spa-preserve />
        ))}
        {js
          .filter((resource) => resource.loadTime === "beforeDOMReady")
          .map((res) => JSResourceToScriptElement(res, true))}
      </head>
    )
  }

  return Head
}) satisfies QuartzComponentConstructor
