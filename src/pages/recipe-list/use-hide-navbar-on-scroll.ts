import { useEffect, useRef, useState } from 'react'

// Ignore scroll movements smaller than this to avoid flickering on tiny jitters.
const SCROLL_THRESHOLD = 8
// Always keep the navbar visible while near the top of the page.
const TOP_OFFSET = 80

export const useHideNavbarOnScroll = () => {
    const [visible, setVisible] = useState(true)
    const lastScrollYRef = useRef(0)
    const tickingRef = useRef(false)

    useEffect(() => {
        const update = () => {
            const currentScrollY = window.scrollY
            const delta = currentScrollY - lastScrollYRef.current

            if (currentScrollY <= TOP_OFFSET) {
                setVisible(true)
            } else if (Math.abs(delta) > SCROLL_THRESHOLD) {
                // show when scrolling up, hide when scrolling down
                setVisible(delta < 0)
            }

            lastScrollYRef.current = currentScrollY
            tickingRef.current = false
        }

        const handleScroll = () => {
            // coalesce bursts of scroll events into one evaluation per frame
            if (tickingRef.current) return
            tickingRef.current = true
            window.requestAnimationFrame(update)
        }

        lastScrollYRef.current = window.scrollY
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return visible
}
