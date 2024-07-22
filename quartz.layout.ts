import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import { SimpleSlug } from "./quartz/util/path"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/Xeus-Territory",
      "Spiderum": "https://spiderum.com/nguoi-dung/Xeus0810",
      "HackMD": "https://hackmd.io/@xeusnguyen",
      "Viblo": "https://viblo.asia/u/Xeus-Territory",
      "Medium": "https://medium.com/@XeusNguyen",
      "Youtube": "https://www.youtube.com/@xeusnguyen",
      "Twitter": "https://twitter.com/XeusNguyen"
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(
      Component.Explorer({
        mapFn: (node) => {
          if (node.depth > 0)
            {
              if (node.file) {
                if (node.displayName.length > 16)  {
                  node.displayName = "📄 " + node.displayName.substring(0, 15) + "..."
                }
                else {
                  node.displayName = "📄 " + node.displayName
                }
              }
              else {
                node.displayName = "📁 " + node.displayName
              }
            }
        }
      })
    ),
    Component.DesktopOnly(
      Component.RecentNotes({
        limit: 2,
        linkToMore: "/tags" as SimpleSlug,
      })
    )
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.Explorer()),
  ],
  right: [],
}
