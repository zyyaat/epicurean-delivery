---
name: Vibrant Culinary
colors:
  surface: '#fbf9f9'
  surface-dim: '#dbdad9'
  surface-bright: '#fbf9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f3'
  surface-container: '#efeded'
  surface-container-high: '#e9e8e7'
  surface-container-highest: '#e3e2e2'
  on-surface: '#1b1c1c'
  on-surface-variant: '#5d3f3e'
  inverse-surface: '#303031'
  inverse-on-surface: '#f2f0f0'
  outline: '#916e6d'
  outline-variant: '#e6bdbb'
  surface-tint: '#bf0029'
  primary: '#b90027'
  on-primary: '#ffffff'
  primary-container: '#e31837'
  on-primary-container: '#fffaf9'
  inverse-primary: '#ffb3b1'
  secondary: '#5f5e5e'
  on-secondary: '#ffffff'
  secondary-container: '#e2dfde'
  on-secondary-container: '#636262'
  tertiary: '#5a5b5c'
  on-tertiary: '#ffffff'
  tertiary-container: '#727474'
  on-tertiary-container: '#fbfbfb'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad8'
  primary-fixed-dim: '#ffb3b1'
  on-primary-fixed: '#410007'
  on-primary-fixed-variant: '#92001d'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1c1b1b'
  on-secondary-fixed-variant: '#474746'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c7'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#454747'
  background: '#fbf9f9'
  on-background: '#1b1c1c'
  surface-variant: '#e3e2e2'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  title-lg:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  gutter: 16px
  margin-mobile: 16px
  margin-desktop: 64px
---

## Brand & Style

The design system is centered on high-energy epicurean experiences. It targets a modern, urban demographic that values speed, reliability, and the visual appeal of food. The brand personality is energetic, appetizing, and premium.

The aesthetic follows a **Modern Minimalist** direction with **Tactile** highlights. By utilizing a "content-first" approach, the interface recedes to allow high-fidelity food photography to become the primary interface element. The emotional response should be one of hunger-inducing excitement paired with the confidence of a professional, high-end service. Heavy whitespace and a refined grid ensure the vibrant primary color feels like a deliberate accent rather than an overwhelming force.

## Colors

The palette is led by **Vibrant Red**, a high-chroma hue designed to stimulate appetite and signal urgency. This is balanced by a sophisticated "Noir" secondary and a tiered grayscale.

- **Primary (Vibrant Red):** Used for key actions, brand moments, and critical status updates.
- **Secondary (Obsidian):** Reserved for primary text and high-contrast UI elements like bottom navigation or dark-mode headers.
- **Tertiary (Cloud):** A soft off-white used for page backgrounds to reduce eye strain compared to pure #FFFFFF.
- **Neutral (Slate):** Used for secondary text, borders, and inactive states.

Surface colors should prioritize a "Layered White" approach, using subtle grays to define container boundaries rather than heavy lines.

## Typography

This design system utilizes **Inter** exclusively to maintain a highly functional, systematic, and neutral tone that complements the expressive photography. 

- **Headlines:** Use tight letter-spacing and bold weights to create a sense of authority and modernity.
- **Body Text:** Standard weight with generous line height for maximum legibility during quick scrolling.
- **Labels:** Used for category tags, delivery times, and metadata; these use a slightly heavier weight and increased tracking for clarity at small sizes.
- **Mobile Scaling:** Headlines scale down by roughly 15% on mobile devices to ensure titles do not wrap awkwardly.

## Layout & Spacing

The layout follows a **Fluid Grid** model based on an 8px spacing rhythm. 

- **Mobile:** A 4-column grid with 16px side margins. Elements typically span the full width or 2 columns for smaller card layouts.
- **Desktop:** A 12-column centered grid with a maximum content width of 1280px. 
- **Consistency:** All vertical spacing between distinct sections should use `xl` (32px), while internal component spacing (like text to image inside a card) uses `sm` or `md`.

The "Airy" feel of this design system is achieved by strictly adhering to the `lg` (24px) padding inside all primary containers and cards.

## Elevation & Depth

Visual hierarchy is established through **Ambient Shadows** and **Tonal Layering**. 

1. **Base Level (Level 0):** The page background, using the Tertiary Cloud color.
2. **Card Level (Level 1):** Pure white surfaces with a very soft, diffused shadow (Offset: 0, 4px; Blur: 20px; Color: 0,0,0, 0.05). This makes cards appear to float slightly above the background.
3. **Floating Level (Level 2):** Applied to floating action buttons (FABs) and sticky navigation bars. These use a more pronounced shadow (Blur: 30px, Opacity: 0.12) to indicate they are the highest point in the Z-axis.

Avoid inner shadows or heavy borders. Depth should feel natural and light.

## Shapes

The shape language is defined by **large, friendly radii**. 

- **Standard Radius:** 8px (0.5rem) for small components like checkboxes and input fields.
- **Container Radius:** 16px (1rem) for restaurant cards, modal sheets, and food category items.
- **Extreme Radius:** 24px (1.5rem) for main promotional banners and "Order Now" buttons to create a soft, approachable feel.
- **Circular:** Applied to user avatars and specific status indicators.

## Components

- **Buttons:** Primary buttons are Solid Vibrant Red with white text, utilizing `rounded-xl` corners. Ghost buttons use a 1px Obsidian border for secondary actions.
- **Cards:** Restaurant cards feature a full-bleed image top-half with a 16:9 aspect ratio. The bottom half contains typography with 16px internal padding. Shadows are only visible on the bottom and sides.
- **Chips:** Used for cuisine types (e.g., "Sushi", "Burgers"). These should have a light gray background (#EEEEEE) and 100px border-radius (pill-shaped).
- **Input Fields:** Minimalist style with a 1px border (#E0E0E0) that transitions to Vibrant Red on focus.
- **Navigation Bars:** The mobile bottom nav uses a white background with a subtle top-border blur. Icons are Obsidian when active, and Slate when inactive.
- **Status Indicators:** Use "Live" pulse animations for order tracking. The "Delivered" state utilizes a success green, but all other operational states (Preparing, On the Way) utilize the brand's primary Red or neutrals.