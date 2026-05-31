import { useEffect, useRef, useState } from 'react'

export const useCarousel = (itemCount: number) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const [activeIndex, setActiveIndex] = useState(0)

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        const handleScroll = () => {
            const slideWidth = container.clientWidth
            if (!slideWidth) return
            setActiveIndex(Math.round(container.scrollLeft / slideWidth))
        }

        container.addEventListener('scroll', handleScroll, { passive: true })
        return () => container.removeEventListener('scroll', handleScroll)
    }, [itemCount])

    const scrollToIndex = (index: number) => {
        const container = containerRef.current
        if (!container) return
        container.scrollTo({ left: container.clientWidth * index, behavior: 'smooth' })
    }

    return { containerRef, activeIndex, scrollToIndex }
}
