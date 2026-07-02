import { useEffect, useRef, useState } from 'react'

// Tracks the active slide and scrolls to a given slide without assuming a fixed
// slide width — slides may be full-width (mobile) or partial-width with a gap
// (desktop), so positions are measured from the DOM instead of computed.
export const useCarousel = (itemCount: number) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const [activeIndex, setActiveIndex] = useState(0)

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        const updateActiveIndex = () => {
            const slides = Array.from(container.children)
            if (slides.length === 0) return

            // At the end of the track the last slide may not reach the start edge
            // (partial-width slides), so treat "scrolled to end" as the last slide.
            const maxScroll = container.scrollWidth - container.clientWidth
            if (maxScroll > 0 && maxScroll - container.scrollLeft <= 1) {
                setActiveIndex(slides.length - 1)
                return
            }

            const containerLeft = container.getBoundingClientRect().left
            let closestIndex = 0
            let closestDistance = Infinity

            slides.forEach((slide, index) => {
                if (!(slide instanceof HTMLElement)) return
                const distance = Math.abs(slide.getBoundingClientRect().left - containerLeft)
                if (distance < closestDistance) {
                    closestDistance = distance
                    closestIndex = index
                }
            })

            setActiveIndex(closestIndex)
        }

        updateActiveIndex()
        container.addEventListener('scroll', updateActiveIndex, { passive: true })
        window.addEventListener('resize', updateActiveIndex)
        return () => {
            container.removeEventListener('scroll', updateActiveIndex)
            window.removeEventListener('resize', updateActiveIndex)
        }
    }, [itemCount])

    const scrollToIndex = (index: number) => {
        const container = containerRef.current
        if (!container) return

        const slide = container.children[index]
        if (!(slide instanceof HTMLElement)) return

        const delta = slide.getBoundingClientRect().left - container.getBoundingClientRect().left
        container.scrollTo({ left: container.scrollLeft + delta, behavior: 'smooth' })
    }

    return { containerRef, activeIndex, scrollToIndex }
}
