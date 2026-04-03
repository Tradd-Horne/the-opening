# The Opening — Design System

## Inspiration
Design language adapted from [oxman.com](https://oxman.com) — a monochrome, type-driven, scroll-animated aesthetic.

## Palette
| Token            | Value     | Usage                        |
|------------------|-----------|------------------------------|
| `--color-black`  | `#000000` | Body background, primary     |
| `--color-white`  | `#ffffff` | Text, borders, footer bg     |
| `--color-grey`   | `#d9d9d9` | Secondary text               |
| `--color-grey-dark` | `#1a1a1a` | Image placeholder bg      |
| `--color-grey-mid`  | `#888888` | Input borders, muted text |

No accent colours. Pure monochrome throughout.

## Typography
**Font:** Inter (Google Fonts) — weights 100, 200, 300, 400, 500
Closest free alternative to Neue Haas Grotesk Display used on oxman.com.

### Scale
| Class             | Size     | Weight | Line-height | Notes                          |
|-------------------|----------|--------|-------------|--------------------------------|
| `.display-h`      | 14vw     | 100    | 0.8         | Hero headings, capped at 16rem |
| `.display-h-small`| 9.5vw    | 100    | 1.05        | Section headings               |
| `.h-xlarge`       | 4.5rem   | 200    | 1.1         | Manifesto / statement text     |
| `.txt-xlarge`     | 4rem     | 200    | —           | Large body text                |
| `.txt-large`      | 1.4em    | 500    | —           | Emphasis text                  |
| `.txt-small`      | 1.25em   | 500    | —           | Small emphasis                 |

All headings: uppercase, letter-spacing -0.01em.

## Spacing Tokens
| Token              | Value     | Usage                  |
|--------------------|-----------|------------------------|
| `--spacing-gutter` | `0.75rem` | Base horizontal gutter |
| `--spacing-section`| `6.25rem` | Vertical section pads  |
| `--spacing-xl`     | `12.5rem` | Large section pads     |

## Layout
- Flexbox only (no CSS Grid)
- Section borders: 2px white lines at top of feature blocks
- Footer is inverted: white background, black text

## Animation Patterns (GSAP)
1. **SplitText character reveal** — `.split-text` elements split into chars, fade in from `autoAlpha: 0` on scroll (scrub-linked)
2. **Parallax images** — `.parallax-img` elements translate Y at different scroll speeds via ScrollTrigger
3. **Header hide/show** — slides up when scrolling down, reappears on scroll up
4. **Pillar border draw** — `scaleX(0)` to `scaleX(1)` on scroll entry
5. **Custom cursor** — follows mouse with 0.3s lag, `mix-blend-mode: exclusion`, scales up on hover over interactive elements
6. **Link underlines** — CSS `scaleX` transform with directional `transform-origin` switch

## CDN Dependencies
- GSAP 3.13.0 (gsap.min.js)
- ScrollTrigger 3.13.0
- SplitText 3.13.0

## Responsive Breakpoints
- 1600px — spacing adjustments
- 1280px — typography scale-down, display cap
- 992px — section spacing reduction, single-column work cards
- 768px — hamburger menu activates, type scale adjusts
- 479px — mobile-first compact layout

## Accessibility
- `prefers-reduced-motion: reduce` disables all animations, hides custom cursor
- ARIA attributes on hamburger menu and mobile overlay
- Screen-reader-only labels on form inputs
- Semantic HTML throughout (header, nav, main, footer, article)
