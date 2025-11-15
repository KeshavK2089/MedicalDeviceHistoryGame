# Design Guidelines: Medical Device Journey Game

## Design Approach

**Selected Approach:** Reference-Based with Gaming/Sci-Fi UI Inspiration

Drawing from futuristic interfaces found in:
- **Cyberpunk 2077/Halo** UI systems (HUD elements, tech overlays)
- **Notion/Linear** (clean card layouts, smooth interactions)
- **Firewatch/Journey** (narrative-driven visual storytelling)
- **Apple Vision OS** (depth, layering, translucent surfaces)

This creates an immersive "time-traveling lab interface" that balances game aesthetics with educational clarity.

---

## Core Design Principles

1. **Technological Depth:** Layered surfaces with translucent effects create dimension
2. **Narrative Focus:** Every screen tells a story through visual hierarchy
3. **Futuristic Precision:** Sharp geometric elements contrasted with organic glows
4. **Progressive Discovery:** Visual rewards for advancement through eras

---

## Typography System

**Primary Font:** 'Space Grotesk' (Google Fonts) - futuristic, technical, highly readable
**Secondary Font:** 'Inter' (Google Fonts) - clean UI text

**Hierarchy:**
- Era Titles/Headers: 3xl to 5xl, font-bold, tracking-tight
- Section Headers: xl to 2xl, font-semibold
- Device Card Titles: lg to xl, font-medium
- Body Text: base, font-normal, leading-relaxed
- UI Labels/Metadata: sm to xs, font-medium, uppercase, tracking-wide

---

## Layout System

**Spacing Units:** Tailwind scale of 4, 6, 8, 12, 16, 20, 24 for consistency

**Container Strategy:**
- Full-width immersive sections: `w-full`
- Content containers: `max-w-7xl mx-auto px-6 lg:px-8`
- Readable text: `max-w-3xl`
- Card grids: `max-w-6xl`

**Grid Patterns:**
- Device cards: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`
- Era timeline: Horizontal scroll or vertical stack depending on screen
- Lab sandbox: `grid-cols-2 lg:grid-cols-4` for building blocks

---

## Component Library

### Landing Screen
- **Hero Portal:** Full-viewport centered composition (min-h-screen)
  - Animated concentric rings or pulsing energy field effect
  - Central glowing "time engine" graphic (CSS gradient + blur effects)
  - Layered depth with foreground elements
  - Title: Large, centered, gradient text effect
  - CTA buttons: Large, primary (solid) + secondary (outline with backdrop blur)

### Hub/Timeline Interface
- **Layout:** Horizontal scrollable timeline OR vertical "neural spine" visualization
- **Era Nodes:** 
  - Circular or hexagonal containers (w-24 h-24 to w-32 h-32)
  - Locked state: Grayscale, reduced opacity, lock icon overlay
  - Unlocked: Full color with subtle pulse animation
  - Completed: Checkmark badge, enhanced glow effect
- **Connection Lines:** SVG paths or CSS borders connecting nodes
- **Progress Indicator:** Top bar showing completion percentage with gradient fill

### Era Level Screen
- **Intro Section:** 
  - Full-width banner with subtle animated background (particles or grid)
  - Typewriter-style text animation for narrative
  - Height: `min-h-[50vh]` with centered content
  
- **Device Card Grid:**
  - Cards: Translucent dark background with border glow
  - Padding: p-6
  - Border radius: rounded-xl
  - Hover: Subtle lift (translate-y-[-4px]) + increased glow
  - Expanded state: Modal overlay OR accordion expansion within card
  
- **Mission Section:**
  - Dedicated container with distinct visual treatment
  - Bordered panel with accent glow
  - Interactive elements centered within

### Interactive Device Cards
**Card Structure:**
- Icon/category badge (top-left corner)
- Device name (prominent header)
- Short tagline (muted text)
- Expand trigger (arrow icon or "Learn More" text)

**Expanded View:**
- Full-screen overlay with backdrop blur OR
- Accordion expansion with smooth height transition
- Content sections: Problem, Engineering, Ethics (with dividers)
- Interactive elements embedded (sliders, toggles, diagrams)
- Close button (top-right, accessible)

### Game Mechanic Components

**Choice Scenarios:**
- Question prompt in bordered panel
- 2-3 choice buttons as large touch targets (min-h-16)
- Outcome reveal: Smooth transition showing result text + visual indicator

**Sequencing Puzzle:**
- Draggable cards/blocks with clear grab indicators
- Drop zones with dashed borders
- Success/error states with color-coded feedback
- Reset button always visible

**Parameter Sliders:**
- Large touch-friendly slider track (h-2 or h-3)
- Prominent thumb control
- Real-time feedback display (numeric + visual gauge)
- Safe/danger zones indicated with gradient backgrounds

### Navigation
- **Global Nav:** Fixed header (if needed) OR floating "Back to Hub" button
- **Breadcrumb:** Current era indicator always visible
- **Footer:** Minimal, sticky bottom bar with About/Credits links

---

## Visual Design Elements

### Surface Treatment
- **Primary surfaces:** `bg-gray-900/95` with `backdrop-blur-md`
- **Secondary panels:** `bg-gray-800/80` with `border border-gray-700`
- **Interactive cards:** Translucent with subtle border glow on hover

### Depth & Layering
- Use CSS `box-shadow` with colored glows (cyan/teal/purple at 20% opacity)
- Layering: `z-10, z-20, z-30` for modal overlays and floating elements
- Subtle drop shadows: `shadow-xl shadow-cyan-500/10`

### Borders & Dividers
- Border widths: `border` or `border-2` for emphasis
- Accent borders: `border-cyan-500/30` or similar with era-specific accent
- Dividers: `border-t border-gray-700` with optional glow

### Icons
**Library:** Heroicons (via CDN)
- Navigation: `heroicons/20/solid` for UI controls
- Device categories: `heroicons/24/outline` for visual distinction
- Status indicators: Check, lock, arrow icons

---

## Animations & Motion

### Micro-interactions (CSS only)
- Button hover: `transition-all duration-200 hover:scale-105`
- Card hover: `transition-transform duration-300 hover:translate-y-[-4px]`
- Link underlines: Animated width transitions

### Page Transitions
- Fade in on load: `animate-fade-in` (custom keyframe, 0.5s)
- Slide-up for sections: `animate-slide-up` (custom keyframe, 0.6s with stagger)

### Narrative Elements
- Typewriter effect: CSS animation with `steps()` or JS-based character reveal
- Progress bar fills: CSS width transition (1s duration)
- Glow pulse: Subtle keyframe animation on active elements (2s loop)

**Motion Principle:** Purposeful and smooth, never janky. All animations < 1s except ambient effects.

---

## Responsive Strategy

**Breakpoints:**
- Mobile: Base styles (< 768px)
- Tablet: `md:` prefix (768px+)
- Desktop: `lg:` prefix (1024px+)

**Adaptations:**
- Timeline: Vertical on mobile, horizontal scroll on tablet+
- Device grids: Single column mobile, 2-col tablet, 3-col desktop
- Text sizes: Scale down by one step on mobile
- Spacing: Reduce padding/margins by 25-50% on mobile
- Hero portal: Reduce height to 80vh on mobile

---

## Accessibility Features

- Semantic HTML5: `<nav>`, `<main>`, `<section>`, `<article>`
- ARIA labels on all custom interactive elements
- Focus states: Visible outline with accent color (`focus:ring-2 ring-cyan-500`)
- Keyboard navigation: Tab order logical, skip links where needed
- Contrast: All text meets WCAG AA standards (4.5:1 minimum)
- Motion: Respect `prefers-reduced-motion` for animations

---

## Images

**Hero Section:**
- Large background: Abstract tech visualization (circuit boards, neural networks, medical imaging fusion)
- Placement: Full viewport background with overlay gradient
- Treatment: Subtle blur + overlay to ensure text readability

**Device Cards:**
- Small icon-style illustrations or actual device photos
- Placement: Top of each card or left-aligned in expanded view
- Size: 64px to 128px square
- Style: Consistent illustration style OR high-quality product photography with transparent backgrounds

**Era Backgrounds:**
- Subtle textured or gradient backgrounds specific to each era
- Placement: Section backgrounds with low opacity
- Examples: Vintage medical illustration textures for Foundations, digital grid for AI era

---

## Special Screens

### Lab/Sandbox
- 4-column grid of "building blocks" (sensors, actuators, algorithms, etc.)
- Drag-and-drop OR click-to-combine interface
- Generated device display: Large centered card with animated reveal
- Visual: More playful, experimental aesthetic than main journey

### About/Credits
- Single-column centered layout (`max-w-2xl`)
- Clean typography hierarchy
- Minimal decoration, focus on readability
- Footer links to GitHub repo

---

This design system creates a cohesive, immersive experience that feels like stepping into a futuristic medical research facility while maintaining usability and accessibility throughout the journey.