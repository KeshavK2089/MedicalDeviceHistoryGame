# Chronicles of the Bioengineer (Version 2.0)

## Project Overview

An immersive, personalized web-based journey through the evolution of medical device technology. Created by Keshav Kotteswaran (M.S. Bioengineering, Northeastern University), this interactive educational experience guides users through five eras of medical innovation, informed by real-world experience in pharmaceutical development, quality assurance testing, and healthcare IT systems.

## Project Type

Static website built with React + Vite, deployable to GitHub Pages

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Routing**: Wouter (lightweight client-side routing)
- **Styling**: Tailwind CSS with shadcn/ui components
- **Animations**: CSS keyframes and Tailwind animations
- **State Management**: React hooks + localStorage
- **Build Tool**: Vite
- **Deployment Target**: GitHub Pages (static export)

## Architecture

### Data Model (`shared/schema.ts`)
- **Eras**: 5 thematic periods (Foundations, Implantables, Imaging & Robotics, Wearables, AI & Future)
- **Devices**: 3 devices per era with detailed information (problem, engineering, ethics)
- **Missions**: Interactive challenges (sequencing puzzles, parameter sliders, choice scenarios)
- **Progress**: localStorage-based progression tracking with era unlocking

### Pages
- **Landing** (`/`): Animated portal intro with journey CTA
- **Timeline** (`/timeline`): Hub showing all eras with lock/unlock states
- **Era View** (`/era/:slug`): Individual era with devices, mission, and ethical question
- **Lab Sandbox** (`/lab`): Experimental tech component mixer
- **About** (`/about`): Project information and credits

### Key Components
- **DeviceCard**: Expandable device cards with interactions (sliders, toggles, comparisons)
- **Ethical Visuals**: Interactive visual diagrams for ethical reflections (5 unique components per era)
  - **FoundationsVisual**: Radiation risk gauge with animated meter
  - **ImplantablesVisual**: Body diagram with device size/battery life trade-offs
  - **ImagingRoboticsVisual**: Cost-benefit matrix visualization
  - **WearablesVisual**: Privacy vs savings data flow diagram
  - **AIFutureVisual**: Neural network transparency visualization
- **SequencingPuzzle**: Drag-and-drop ordering game
- **ParameterSlider**: Interactive value adjustment with safe zones
- **ProgressTracker**: Visual progress bar across all pages

### State Management
- **useProgress Hook**: Centralized localStorage management
  - Tracks completed eras
  - Stores ethical choices
  - Manages era unlocking logic
  - Calculates completion percentage
  - Persists between sessions

## Features

### Progressive Unlocking System
- Eras unlock sequentially after completing previous ones
- First era (Foundations) starts unlocked
- Completion requires finishing mission and making ethical choice

### Interactive Game Mechanics
1. **Sequencing Puzzle**: Arrange device development steps in correct order
2. **Parameter Slider**: Adjust medical device parameters to safe zones
3. **Choice Scenarios**: Make decisions with branching outcomes

### Visual Design
- **Theme**: Dark mode futuristic interface with cyber-medical aesthetics
- **Colors**: Cyan, purple, and teal accent gradients
- **Typography**: Space Grotesk (headers) and Inter (body)
- **Animations**: Portal spin, glow pulse, typewriter effects, fade-in, slide-up
- **Responsive**: Mobile-first design with tablet and desktop breakpoints

## Development Notes

### Design System
- Custom animations defined in `tailwind.config.ts`
- Color scheme uses HSL variables for dark mode
- Component library: shadcn/ui with custom styling
- Spacing: Consistent 4/6/8/12px scale

### No Backend Required
- All logic runs client-side
- No API endpoints needed
- localStorage handles persistence
- Static build outputs to `/dist`

### GitHub Pages Deployment
- Custom Vite config: `vite.config.gh-pages.ts` with base path `/MedicalDeviceHistoryGame/`
- Build command: `npx vite build --config vite.config.gh-pages.ts`
- Output directory: `dist/`
- Automated deployment via GitHub Actions workflow (`.github/workflows/deploy.yml`)
- `.nojekyll` file included for proper asset loading
- Repository: `MedicalDeviceHistoryGame`
- Live URL: `https://USERNAME.github.io/MedicalDeviceHistoryGame/`
- See `QUICK_DEPLOY_README.md` for 5-minute deployment guide

## Content (V2.0 - Personalized with Real-World Experience)

### Era 1: Foundations (1800s-1920s)
- Stethoscope, X-Ray, Thermometer, Blood Pressure Cuff
- Mission: Device development sequencing
- Ethics: Radiation safety vs. diagnostic benefit

### Era 2: Implantables (1960s-1980s)
- Pacemaker, Hip Replacement, Cochlear Implant, ICD
- Mission: Pacemaker rate optimization slider
- Ethics: Battery life vs. device size trade-offs

### Era 3: Imaging & Robotics (1980s-2000s)
- MRI, Surgical Robot, Endoscope, CT Scanner, **Pharmaceutical Analytical Testing (HPLC/UPLC - Acorda Therapeutics)**, **Epic EHR System**
- Mission: Surgical precision vs. cost choice
- Ethics: Expensive imaging vs. resource allocation
- **Real-world insights**: 
  - HPLC (1966-1967 invention), UPLC (2004), Acorda pharmaceutical development with GMP/GDP protocols
  - Epic Systems founded by Judy Faulkner in 1979, grew from Madison basement to 325+ million patient records
  - Epic Hyperspace EHR workflow optimization (300+ decisions, 18 IT analysts, 26 clinical leaders)

### Era 4: Wearables (2000s-2020s)
- CGM, **Insulet Omnipod® Insulin Pump**, Smart Inhaler, Fitness Tracker
- Mission: Insulin dosing slider
- Ethics: Data privacy vs. insurance benefits
- **Real-world insight**: Insulet Corporation QA testing for 50+ Omnipod specifications, device-to-cloud integration testing, root cause analysis

### Era 5: AI & Future (Today)
- **AI Diagnostic Assistant**, Closed-Loop Artificial Pancreas, **PDGFR-Enhanced Cell Therapy (NIH Wound Healing Research)**
- Mission: AI transparency vs. accuracy choice
- Ethics: Cloud processing vs. local privacy
- **Real-world insight**: Northeastern NIH 3T3 fibroblast modification for 25% improved wound healing
- **Note**: Only real, deployed technologies included - no speculative devices

## User Journey

1. **Landing**: Immersive portal introduction
2. **Timeline**: View all eras, unlock progression
3. **Era Exploration**: Learn devices, complete mission, answer ethics
4. **Lab Sandbox**: Mix components for fictional devices
5. **Completion**: Track progress, revisit eras

## Accessibility

- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus states on all controls
- High contrast text (WCAG AA compliant)
- Responsive touch targets (min 44px)

## Achievement System (Completed)

### Features
- 9 total achievements across 3 categories:
  - **Completion**: First Steps, Halfway There, Master Chronicler
  - **Speed**: Perfect Sequencer, Quick Learner
  - **Ethics**: Safety First, Innovation Advocate, Balanced Thinker, Explorer

### Implementation
- localStorage persistence with `unlockedAchievements` array
- Mission attempt tracking per era
- Era completion timing for speed achievements
- Dedicated `/achievements` page with unlocked/locked sections
- Trophy button in Timeline header
- Achievement badge components with category-specific colors
- Automatic unlock checking via useProgress hook

## Future Enhancements

- Shareable progress cards
- Device history timeline visualization
- Additional eras (Regulatory, Personalized Medicine)
- Audio ambience per era
- More detailed device interactions
- Multi-language support

## Project Status

✅ All 5 eras implemented with devices and missions
✅ Progressive unlocking system with localStorage
✅ Three distinct interactive mechanics (sequencing, sliders, choices)
✅ Achievement system with 9 badges and localStorage tracking
✅ Responsive design (mobile, tablet, desktop)
✅ Futuristic dark mode theme with animations
✅ Lab sandbox for component mixing
✅ Comprehensive content (educational + ethical)
✅ GitHub Pages deployment configured and tested
✅ Automated CI/CD via GitHub Actions

**Ready for deployment to GitHub Pages!**

## Deployment Files
- `.github/workflows/deploy.yml` - Automated deployment workflow
- `vite.config.gh-pages.ts` - Production build configuration
- `client/public/.nojekyll` - GitHub Pages compatibility
- `QUICK_DEPLOY_README.md` - 5-minute deployment guide
- `GITHUB_DEPLOYMENT_GUIDE.md` - Detailed deployment instructions
