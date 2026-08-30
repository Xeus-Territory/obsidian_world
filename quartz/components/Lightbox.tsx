// @ts-ignore: not a module, see Darkmode.tsx for why
import lightboxScript from "./scripts/lightbox.inline"
import styles from "./styles/lightbox.scss"
import { QuartzComponent, QuartzComponentConstructor } from "./types"

// renders the (hidden) overlay markup on every page; lightbox.inline.ts wires
// up the article images to it after the DOM loads
const Lightbox: QuartzComponent = () => {
  return (
    <div
      id="lightbox"
      class="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      aria-hidden="true"
    >
      <div class="lightbox-toolbar">
        <span class="lightbox-counter"></span>
        <button
          class="lightbox-zoom"
          type="button"
          aria-label="Toggle actual size"
          aria-pressed="false"
          title="Toggle actual size"
        >
          <svg
            aria-hidden="true"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            <line x1="11" y1="8" x2="11" y2="14"></line>
            <line x1="8" y1="11" x2="14" y2="11"></line>
          </svg>
        </button>
        <a
          class="lightbox-open-original"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open image in a new tab"
          title="Open image in a new tab"
        >
          <svg
            aria-hidden="true"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </a>
        <button
          class="lightbox-close"
          type="button"
          aria-label="Close image viewer"
          title="Close (Esc)"
        >
          <svg
            aria-hidden="true"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      <div class="lightbox-stage">
        <button
          class="lightbox-prev"
          type="button"
          aria-label="Previous image"
          title="Previous (←)"
        >
          <svg
            aria-hidden="true"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <img class="lightbox-image" alt="" />
        <button class="lightbox-next" type="button" aria-label="Next image" title="Next (→)">
          <svg
            aria-hidden="true"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
      <p class="lightbox-caption"></p>
    </div>
  )
}

Lightbox.afterDOMLoaded = lightboxScript
Lightbox.css = styles

export default (() => Lightbox) satisfies QuartzComponentConstructor
