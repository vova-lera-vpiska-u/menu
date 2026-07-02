export const BREAKPOINTS = {
    tablet: 640,
    desktop: 1024,
    wide: 1440,
}

// Desktop container width: never wider than the viewport, capped for readability.
export const CONTAINER_WIDTH = 'min(1200px, 92vw)'

export const media = {
    tablet: `@media (min-width: ${BREAKPOINTS.tablet}px)`,
    desktop: `@media (min-width: ${BREAKPOINTS.desktop}px)`,
    wide: `@media (min-width: ${BREAKPOINTS.wide}px)`,
    hover: '@media (hover: hover) and (pointer: fine)',
}
