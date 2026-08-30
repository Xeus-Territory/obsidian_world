import path from "path"
import { visit, EXIT } from "unist-util-visit"
import readingTime from "reading-time"
import { FullSlug, joinSegments, pathToRoot, resolveRelative, slugifyFilePath } from "../util/path"
import { FilePath } from "../util/path"
import { QuartzPluginData } from "../plugins/vfile"
import { Date, getDate } from "./Date"
import { QuartzComponent, QuartzComponentProps } from "./types"
import { byDateAndAlphabetical } from "./PageList"
import style from "./styles/pageCards.scss"

const MAX_TAGS = 3

// the Description transformer escapes its output, and JSX escapes again on
// render, so entities would surface literally ("&quot;") inside a card
function unescapeHTML(s: string): string {
  return s
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&#039;", "'")
    .replaceAll("&amp;", "&")
}

// stable per-title hue so pages without an image still get a deliberate-looking
// cover that stays the same across builds
function hueFromString(s: string): number {
  let hash = 0
  for (let i = 0; i < s.length; i++) {
    hash = (hash * 31 + s.charCodeAt(i)) % 360
  }
  return hash
}

// image paths in htmlAst are already rewritten relative to the page they came
// from, so rebase them to the content root before re-relativising to the
// page currently being rendered
function thumbnailFromRoot(page: QuartzPluginData): string | undefined {
  const explicit = page.frontmatter?.thumbnail ?? page.frontmatter?.image ?? page.frontmatter?.cover
  if (typeof explicit === "string" && explicit.length > 0) {
    if (explicit.startsWith("http://") || explicit.startsWith("https://")) return explicit
    const ext = path.extname(explicit)
    return (slugifyFilePath(explicit as FilePath, true) + ext) as string
  }

  const tree = page.htmlAst
  if (!tree) return undefined

  let found: string | undefined
  visit(tree, "element", (node: any) => {
    if (node.tagName !== "img") return
    const src = node.properties?.src
    if (typeof src !== "string" || src.length === 0) return
    found = src
    return EXIT
  })

  if (!found) return undefined
  if (found.startsWith("http://") || found.startsWith("https://")) return found

  const dir = path.posix.dirname(page.slug!)
  return path.posix.normalize(path.posix.join(dir, found))
}

type Props = {
  limit?: number
} & QuartzComponentProps

export const PageCards: QuartzComponent = ({ cfg, fileData, allFiles, limit }: Props) => {
  let list = allFiles.sort(byDateAndAlphabetical(cfg))
  if (limit) {
    list = list.slice(0, limit)
  }

  return (
    <div class="page-card-grid">
      {list.map((page) => {
        const title = page.frontmatter?.title ?? "Untitled"
        const tags = page.frontmatter?.tags ?? []
        const href = resolveRelative(fileData.slug!, page.slug!)

        const rawDesc = page.description?.trim()
        const desc = rawDesc ? unescapeHTML(rawDesc) : undefined

        const fromRoot = thumbnailFromRoot(page)
        const thumb =
          fromRoot && (fromRoot.startsWith("http://") || fromRoot.startsWith("https://"))
            ? fromRoot
            : fromRoot
              ? joinSegments(pathToRoot(fileData.slug!), fromRoot)
              : undefined

        const minutes = page.text ? Math.ceil(readingTime(page.text).minutes) : undefined
        const hue = hueFromString(title)

        return (
          <div class="page-card">
            <div class="page-card-thumb">
              {thumb ? (
                <img src={thumb} alt="" loading="lazy" decoding="async" />
              ) : (
                <span
                  class="page-card-fallback"
                  style={`background: linear-gradient(135deg, hsl(${hue} 45% 55%), hsl(${(hue + 40) % 360} 45% 38%))`}
                  aria-hidden="true"
                >
                  {title.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <div class="page-card-body">
              <p class="page-card-meta">
                {page.dates && <Date date={getDate(cfg, page)!} locale={cfg.locale} />}
                {page.dates && minutes ? <span class="page-card-dot">·</span> : null}
                {minutes ? <span>{minutes} min read</span> : null}
              </p>
              <h3 class="page-card-title">
                <a href={href} class="internal">
                  {title}
                </a>
              </h3>
              {desc && <p class="page-card-desc">{desc}</p>}
              {tags.length > 0 && (
                <ul class="page-card-tags">
                  {tags.slice(0, MAX_TAGS).map((tag) => (
                    <li>
                      <a
                        class="internal tag-link"
                        href={resolveRelative(fileData.slug!, `tags/${tag}` as FullSlug)}
                      >
                        #{tag}
                      </a>
                    </li>
                  ))}
                  {tags.length > MAX_TAGS && (
                    <li class="page-card-tag-more">+{tags.length - MAX_TAGS}</li>
                  )}
                </ul>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

PageCards.css = style
