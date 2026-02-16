# Styling Guide: flins.tech Clone

## Design System Overview
- **Theme**: Dark mode premium (near-black background: #0a0a0f)
- **Vibe**: Developer tools, CLI aesthetic, modern glassmorphism
- **Animation**: Subtle, purposeful, never distracting

## Color Palette

### Primary Backgrounds
- `--bg-primary`: #0a0a0f (main background)
- `--bg-secondary`: #12121a (cards, sections)
- `--bg-tertiary`: #1a1a25 (hover states)

### Accent Gradients (Aurora/Mesh)
- Primary gradient: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
- Secondary: `linear-gradient(135deg, #f093fb 0%, #f5576c 100%)`
- Tertiary: `linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)`

### Text Colors
- `--text-primary`: #ffffff
- `--text-secondary`: #a0a0b0
- `--text-muted`: #606070
- `--text-accent`: #667eea (links, highlights)

### Border & Glass
- `--border-subtle`: rgba(255, 255, 255, 0.1)
- `--glass-bg`: rgba(255, 255, 255, 0.05)
- `--glass-blur`: 20px

## Typography

### Font Families
- **Headings**: Inter, system-ui, sans-serif (weight: 600-700)
- **Body**: Inter, system-ui, sans-serif (weight: 400-500)
- **Code/CLI**: 'SF Mono', Monaco, 'Cascadia Code', monospace
- **Size scale**: 14px base, scale 1.25

### Type Scale
- Hero: 4rem (64px) - Bold
- H1: 3rem (48px) - Bold
- H2: 2rem (32px) - Semibold
- H3: 1.5rem (24px) - Semibold
- Body: 1rem (16px) - Regular
- Small: 0.875rem (14px) - Regular
- Code: 0.875rem (14px) - Monospace

## Components

### Glass Cards
```css
.glass-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 24px;
  transition: all 0.3s ease;
}

.glass-card:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}