const svgExpand =
  '<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>'

// images small enough to be icons or inline badges are not worth a lightbox
const MIN_LIGHTBOX_SIZE = 100

type LightboxState = {
  images: HTMLImageElement[]
  index: number
  lastFocused: HTMLElement | null
}

const state: LightboxState = { images: [], index: -1, lastFocused: null }

function els() {
  const overlay = document.getElementById("lightbox") as HTMLDivElement | null
  if (!overlay) return null
  return {
    overlay,
    img: overlay.querySelector(".lightbox-image") as HTMLImageElement,
    caption: overlay.querySelector(".lightbox-caption") as HTMLParagraphElement,
    counter: overlay.querySelector(".lightbox-counter") as HTMLSpanElement,
    openOriginal: overlay.querySelector(".lightbox-open-original") as HTMLAnchorElement,
    zoom: overlay.querySelector(".lightbox-zoom") as HTMLButtonElement,
    prev: overlay.querySelector(".lightbox-prev") as HTMLButtonElement,
    next: overlay.querySelector(".lightbox-next") as HTMLButtonElement,
    close: overlay.querySelector(".lightbox-close") as HTMLButtonElement,
  }
}

function show(index: number) {
  const e = els()
  if (!e || index < 0 || index >= state.images.length) return
  const source = state.images[index]
  state.index = index

  e.img.classList.remove("is-zoomed")
  e.zoom.setAttribute("aria-pressed", "false")
  e.img.src = source.currentSrc || source.src
  e.img.alt = source.alt || ""
  e.openOriginal.href = source.currentSrc || source.src

  // `![[img|center|800]]` leaves layout hints in alt, which are not captions
  const layoutHint = /^(center|left|right|\d+(x\d+)?)$/i
  const alt = source.alt?.trim() ?? ""
  const caption = layoutHint.test(alt) ? "" : alt
  e.caption.textContent = caption
  e.caption.style.display = caption ? "" : "none"

  const many = state.images.length > 1
  e.counter.textContent = many ? `${index + 1} / ${state.images.length}` : ""
  e.prev.style.display = many ? "" : "none"
  e.next.style.display = many ? "" : "none"
}

function open(index: number) {
  const e = els()
  if (!e) return
  state.lastFocused = document.activeElement as HTMLElement
  show(index)
  e.overlay.classList.add("is-open")
  e.overlay.removeAttribute("aria-hidden")
  // lock background scroll while the overlay owns the viewport
  document.body.style.overflow = "hidden"
  e.close.focus()
}

function close() {
  const e = els()
  if (!e || !e.overlay.classList.contains("is-open")) return
  e.overlay.classList.remove("is-open")
  e.overlay.setAttribute("aria-hidden", "true")
  e.img.removeAttribute("src")
  document.body.style.overflow = ""
  state.lastFocused?.focus()
  state.lastFocused = null
  state.index = -1
}

function step(delta: number) {
  if (state.images.length < 2) return
  show((state.index + delta + state.images.length) % state.images.length)
}

function isOpen() {
  return !!document.getElementById("lightbox")?.classList.contains("is-open")
}

document.addEventListener("nav", () => {
  const e = els()
  if (!e) return

  // a nav re-renders the article, so any overlay left open refers to gone images
  close()

  const candidates = Array.from(
    document.querySelectorAll<HTMLImageElement>("article img, .popover-hint > img"),
  ).filter((img) => {
    if (img.closest("a")) return false // already a link, don't hijack the click
    if (img.classList.contains("no-lightbox")) return false
    if (img.closest(".lightbox")) return false
    return true
  })

  state.images = candidates
  state.index = -1

  candidates.forEach((img, i) => {
    // measure what the reader actually sees: an SVG can have a tiny intrinsic
    // size (Arch_Amazon-EKS-Cloud_64.svg) while being embedded at 400px
    const tooSmall = () => {
      const w = img.clientWidth || img.naturalWidth
      const h = img.clientHeight || img.naturalHeight
      return w > 0 && w < MIN_LIGHTBOX_SIZE && h < MIN_LIGHTBOX_SIZE
    }

    if (!img.loading) img.loading = "lazy"
    img.decoding = "async"

    const wrapper = document.createElement("span")
    wrapper.className = "lightbox-figure"
    img.replaceWith(wrapper)
    wrapper.appendChild(img)

    const button = document.createElement("button")
    button.className = "lightbox-trigger"
    button.type = "button"
    button.innerHTML = svgExpand
    button.ariaLabel = "Maximize image"
    button.title = "Maximize image"
    wrapper.appendChild(button)

    const onOpen = (ev: Event) => {
      if (tooSmall()) return
      ev.preventDefault()
      open(i)
    }

    // dimensions are only known once the image loads, so drop the affordance
    // from icon-sized images at that point rather than at bind time
    const onLoad = () => {
      if (tooSmall()) {
        button.style.display = "none"
        img.style.cursor = "default"
      }
    }
    if (img.complete) onLoad()
    img.addEventListener("load", onLoad)

    img.addEventListener("click", onOpen)
    button.addEventListener("click", onOpen)
    window.addCleanup(() => {
      img.removeEventListener("load", onLoad)
      img.removeEventListener("click", onOpen)
      button.removeEventListener("click", onOpen)
    })
  })

  const onOverlayClick = (ev: MouseEvent) => {
    const target = ev.target as HTMLElement
    // clicking the dimmed backdrop (but not the image or controls) closes
    if (target.classList.contains("lightbox") || target.classList.contains("lightbox-stage")) {
      close()
    }
  }
  const onClose = () => close()
  const onPrev = () => step(-1)
  const onNext = () => step(1)
  const onZoom = () => {
    const zoomed = e.img.classList.toggle("is-zoomed")
    e.zoom.setAttribute("aria-pressed", String(zoomed))
  }
  const onKeydown = (ev: KeyboardEvent) => {
    if (!isOpen()) return
    if (ev.key === "Escape") close()
    else if (ev.key === "ArrowLeft") step(-1)
    else if (ev.key === "ArrowRight") step(1)
  }

  e.overlay.addEventListener("click", onOverlayClick)
  e.close.addEventListener("click", onClose)
  e.prev.addEventListener("click", onPrev)
  e.next.addEventListener("click", onNext)
  e.zoom.addEventListener("click", onZoom)
  document.addEventListener("keydown", onKeydown)

  window.addCleanup(() => {
    e.overlay.removeEventListener("click", onOverlayClick)
    e.close.removeEventListener("click", onClose)
    e.prev.removeEventListener("click", onPrev)
    e.next.removeEventListener("click", onNext)
    e.zoom.removeEventListener("click", onZoom)
    document.removeEventListener("keydown", onKeydown)
  })
})
