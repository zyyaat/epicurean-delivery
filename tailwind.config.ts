import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
    darkMode: "class",
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
        extend: {
                colors: {
                        // Epicurean Brand Colors - Vibrant Red & White
                        'on-error-container': '#93000a',
                        'primary-fixed': '#ffdad8',
                        'surface-tint': '#bf0029',
                        'surface-container': '#efeded',
                        'tertiary-container': '#727474',
                        'primary-container': '#e31837',
                        'error': '#ba1a1a',
                        'on-error': '#ffffff',
                        'surface-variant': '#e3e2e2',
                        'on-background': '#1b1c1c',
                        'background': '#fbf9f9',
                        'on-secondary': '#ffffff',
                        'surface-dim': '#dbdad9',
                        'primary': '#b90027',
                        'error-container': '#ffdad6',
                        'surface-container-highest': '#e3e2e2',
                        'tertiary': '#5a5b5c',
                        'on-primary-fixed': '#410007',
                        'surface-container-low': '#f5f3f3',
                        'on-primary': '#ffffff',
                        'secondary-fixed-dim': '#c8c6c5',
                        'inverse-primary': '#ffb3b1',
                        'secondary-container': '#e2dfde',
                        'inverse-surface': '#303031',
                        'on-tertiary-fixed-variant': '#454747',
                        'surface-container-high': '#e9e8e7',
                        'on-tertiary-container': '#fbfbfb',
                        'on-primary-container': '#fffaf9',
                        'on-primary-fixed-variant': '#92001d',
                        'on-surface': '#1b1c1c',
                        'surface-container-lowest': '#ffffff',
                        'surface': '#fbf9f9',
                        'on-tertiary': '#ffffff',
                        'outline-variant': '#e6bdbb',
                        'tertiary-fixed-dim': '#c6c6c7',
                        'outline': '#916e6d',
                        'secondary-fixed': '#e5e2e1',
                        'on-surface-variant': '#5d3f3e',
                        'surface-bright': '#fbf9f9',
                        'tertiary-fixed': '#e2e2e2',
                        'on-secondary-fixed-variant': '#474746',
                        'secondary': '#5f5e5e',
                        'inverse-on-surface': '#f2f0f0',
                        'primary-fixed-dim': '#ffb3b1',
                        'on-tertiary-fixed': '#1a1c1c',
                        'on-secondary-fixed': '#1c1b1b',
                        'on-secondary-container': '#636262',
                        
                        // Shadcn/ui compatibility
                        foreground: 'var(--foreground)',
                        background: 'var(--background)',
                        card: {
                                DEFAULT: 'var(--card)',
                                foreground: 'var(--card-foreground)'
                        },
                        popover: {
                                DEFAULT: 'var(--popover)',
                                foreground: 'var(--popover-foreground)'
                        },
                        primary: {
                                DEFAULT: 'var(--primary)',
                                foreground: 'var(--primary-foreground)'
                        },
                        secondary: {
                                DEFAULT: 'var(--secondary)',
                                foreground: 'var(--secondary-foreground)'
                        },
                        muted: {
                                DEFAULT: 'var(--muted)',
                                foreground: 'var(--muted-foreground)'
                        },
                        accent: {
                                DEFAULT: 'var(--accent)',
                                foreground: 'var(--accent-foreground)'
                        },
                        destructive: {
                                DEFAULT: 'var(--destructive)',
                                foreground: 'var(--destructive-foreground)'
                        },
                        border: 'var(--border)',
                        input: 'var(--input)',
                        ring: 'var(--ring)',
                },
                borderRadius: {
                        DEFAULT: "0.25rem",
                        lg: "0.5rem",
                        xl: "0.75rem",
                        full: "9999px"
                },
                spacing: {
                        'margin-mobile': '16px',
                        'margin-desktop': '64px',
                        'xl': '32px',
                        'unit': '4px',
                        'sm': '8px',
                        'lg': '24px',
                        'gutter': '16px',
                        'md': '16px',
                        'xs': '4px'
                },
                fontFamily: {
                        'display-lg': ['Inter', 'sans-serif'],
                        'headline-lg-mobile': ['Inter', 'sans-serif'],
                        'body-md': ['Inter', 'sans-serif'],
                        'label-md': ['Inter', 'sans-serif'],
                        'headline-md': ['Inter', 'sans-serif'],
                        'headline-lg': ['Inter', 'sans-serif'],
                        'body-lg': ['Inter', 'sans-serif'],
                        'title-lg': ['Inter', 'sans-serif'],
                        sans: ['Inter', 'system-ui', 'sans-serif'],
                },
                fontSize: {
                        'display-lg': ['48px', { lineHeight: '56px', letterSpacing: '-0.02em', fontWeight: '800' }],
                        'headline-lg-mobile': ['28px', { lineHeight: '36px', letterSpacing: '-0.01em', fontWeight: '700' }],
                        'body-md': ['14px', { lineHeight: '20px', fontWeight: '400' }],
                        'label-md': ['12px', { lineHeight: '16px', letterSpacing: '0.05em', fontWeight: '600' }],
                        'headline-md': ['24px', { lineHeight: '32px', fontWeight: '700' }],
                        'headline-lg': ['32px', { lineHeight: '40px', letterSpacing: '-0.01em', fontWeight: '700' }],
                        'body-lg': ['16px', { lineHeight: '24px', fontWeight: '400' }],
                        'title-lg': ['20px', { lineHeight: '28px', fontWeight: '600' }]
                },
                boxShadow: {
                        'card': '0 4px 20px 0 rgba(0,0,0,0.03)',
                        'card-hover': '0 8px 30px 0 rgba(0,0,0,0.08)',
                        'search': '0 4px 20px 0 rgba(0,0,0,0.05)',
                        'nav': '0 -4px 20px 0 rgba(0,0,0,0.05)',
                        'floating': '0 -8px 30px 0 rgba(0,0,0,0.08)',
                },
                keyframes: {
                        'pulse-dot': {
                                '0%, 100%': { opacity: '1' },
                                '50%': { opacity: '0.5' },
                        },
                        'slide-up': {
                                '0%': { transform: 'translateY(10px)', opacity: '0' },
                                '100%': { transform: 'translateY(0)', opacity: '1' },
                        },
                        'scale-in': {
                                '0%': { transform: 'scale(0.95)', opacity: '0' },
                                '100%': { transform: 'scale(1)', opacity: '1' },
                        }
                },
                animation: {
                        'pulse-dot': 'pulse-dot 2s ease-in-out infinite',
                        'slide-up': 'slide-up 0.3s ease-out',
                        'scale-in': 'scale-in 0.2s ease-out',
                }
        }
  },
  plugins: [tailwindcssAnimate],
};
export default config;
