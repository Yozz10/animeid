# Design Guidelines - ANIMEID (Anime Streaming Platform)

## Design Approach
**Reference-Based Approach** drawing inspiration from modern streaming platforms (Netflix, Crunchyroll, Disney+) combined with anime-specific aesthetics. This is an experience-focused, visual-rich application where engagement and immersion are paramount.

## Core Design Principles
- **Immersive Visual Experience**: Let anime artwork take center stage
- **Dark-First Design**: Optimal viewing environment for video content
- **Vibrant Accent System**: Energetic colors reflecting anime culture
- **Smooth Navigation**: Effortless browsing across thousands of titles
- **Content Density**: Rich information presentation without clutter

## Color Palette

**Dark Mode (Primary)**
- Background Base: 12 8% 8% (deep charcoal)
- Surface: 12 8% 12% (elevated cards)
- Surface Elevated: 12 8% 16% (hover states, modals)

**Brand Colors**
- Primary: 280 85% 65% (vibrant purple - anime culture association)
- Secondary: 340 82% 58% (energetic pink - accent for CTAs)
- Success: 142 76% 45% (status indicators)

**Text Colors**
- Primary Text: 0 0% 98%
- Secondary Text: 0 0% 70%
- Muted Text: 0 0% 50%

## Typography

**Font Stack**
- Primary: 'Inter' (body text, UI elements)
- Display: 'Outfit' (headings, anime titles)

**Scale**
- Hero Titles: text-5xl to text-7xl, font-bold
- Section Headers: text-3xl, font-semibold
- Anime Titles: text-xl, font-medium
- Body Text: text-base
- Metadata: text-sm, text-muted

## Layout System

**Spacing Primitives**: Use Tailwind units of 2, 4, 6, 8, 12, 16, 20, 24
- Component padding: p-4 to p-8
- Section gaps: gap-6 to gap-12
- Container spacing: py-12 to py-20

**Grid Systems**
- Anime Cards: grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6
- Episode Lists: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Container: max-w-7xl mx-auto px-4

## Component Library

### Navigation
- Fixed header with blur backdrop (backdrop-blur-xl bg-background/80)
- Logo on left, search center, user actions right
- Mobile: Hamburger menu with slide-out drawer

### Hero Section
- Full-width banner (h-[500px] to h-[600px]) featuring currently trending anime
- Large backdrop image with gradient overlay (from transparent to background)
- Anime title, synopsis preview (2-3 lines), genre badges, rating
- Dual CTAs: "Watch Now" (primary button) and "More Info" (outline button with backdrop-blur)

### Anime Cards
- Aspect ratio 2:3 for portrait posters
- Hover effect: scale-105, elevated shadow, border glow in primary color
- Title overlay on bottom with gradient fade
- Episode count badge, rating indicator
- Genre tags (max 2 visible)

### Video Player Controls
- Custom controls matching dark theme
- Timeline with thumbnail preview on hover
- Episode selector integrated in player
- Next episode auto-play countdown
- Settings for quality, subtitles, playback speed

### Detail Page
- Hero banner: anime backdrop (h-[400px]) with gradient overlay
- Content split: Poster left (sticky), info right
- Episode grid with thumbnail, title, duration, air date
- Character carousel with circular avatars
- Related anime recommendations

### Search & Filters
- Real-time search with dropdown suggestions
- Genre chips (multi-select, primary color on active)
- Sort options: Popular, Latest, A-Z, Rating
- Advanced filters: Year, Studio, Status (Ongoing/Completed)

### Category Sections
- Horizontal scrollable carousels
- Section headers with "View All" link
- Categories: Continue Watching, Trending, New Releases, Top Rated, Genres

## Images

**Hero Section**: 
- Large backdrop image (1920x800px minimum) from featured anime with cinematic composition
- Apply dark gradient overlay (from-transparent via-background/50 to-background)

**Anime Posters**:
- Vertical format (600x900px recommended)
- High-quality official artwork
- Consistent aspect ratios across entire catalog

**Episode Thumbnails**:
- 16:9 landscape format (480x270px)
- Scene captures from episodes

**Character Images**:
- Square format for carousel (400x400px)
- Circular crop with border in primary color

**Backdrop Images**:
- Wide cinematic shots for detail pages
- Apply subtle blur and dark overlay for text readability

## Interactions

**Hover States**:
- Cards: Subtle scale, shadow elevation, border glow
- Buttons: Brightness increase, no background changes needed
- Navigation links: Underline animation

**Loading States**:
- Skeleton screens matching card layouts
- Shimmer animation in muted colors
- Smooth transitions when content loads

**Animations**:
- Minimize use - only for meaningful transitions
- Card entrance: Stagger fade-in on scroll
- Page transitions: Smooth cross-fade
- Video player: Smooth control appearance/hide

## Responsive Behavior

**Mobile (< 768px)**:
- Single column card grid
- Simplified hero (h-[300px])
- Bottom navigation bar for key actions
- Collapsible filters

**Tablet (768px - 1024px)**:
- 3-4 column grids
- Condensed episode information
- Side drawer for filters

**Desktop (> 1024px)**:
- Full feature set
- 5-6 column grids
- Persistent sidebar for filters
- Hover interactions enabled

## Special Considerations

- **Video Player Priority**: Ensure player takes full focus when active, minimal distractions
- **Episode Management**: Clear visual distinction between watched/unwatched episodes
- **Progress Tracking**: Visual indicators (progress bars) on cards for partially watched content
- **Accessibility**: Subtitle controls easily accessible, keyboard navigation for video player
- **Performance**: Lazy load images, infinite scroll for catalogs, optimize poster sizes

This design creates an immersive anime streaming experience that celebrates the vibrant visual culture of anime while maintaining usability and performance.