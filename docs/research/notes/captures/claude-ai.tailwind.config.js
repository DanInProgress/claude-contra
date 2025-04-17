/**
 * Anthropic Claude.ai Tailwind CSS Configuration
 *
 * This configuration defines the design system used across Claude.ai
 * and related Anthropic products. It includes theme configurations for
 * both the Claude conversational interface and the Console administrative
 * interface.
 *
 * The design system is built using CSS variables to support theming
 * (light/dark mode) while maintaining consistent color relationships.
 */

// Import any required plugins
const defaultTheme = require('tailwindcss/defaultTheme');
const lineClamp = require('@tailwindcss/line-clamp');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx,vue}', './index.html'],

  theme: {
    extend: {
      /**
       * Color System
       *
       * Our color system is built using HSL variables to enable theming.
       * Each product (Claude, Console) shares the same variable structure
       * but may have different values assigned in CSS.
       *
       * Usage examples:
       * - bg-claude-main-100
       * - text-console-text-200
       */
      colors: {
        // Claude.ai Theme Colors
        claude: {
          // Primary brand accent colors
          main: {
            '000': 'hsl(var(--accent-main-000))',
            100: 'hsl(var(--accent-main-100))',
            200: 'hsl(var(--accent-main-200))',
            900: 'hsl(var(--accent-main-900))',
          },
          // Premium/Pro tier accent colors
          pro: {
            '000': 'hsl(var(--accent-pro-000))',
            100: 'hsl(var(--accent-pro-100))',
            200: 'hsl(var(--accent-pro-200))',
            900: 'hsl(var(--accent-pro-900))',
          },
          // Secondary accent colors
          secondary: {
            '000': 'hsl(var(--accent-secondary-000))',
            100: 'hsl(var(--accent-secondary-100))',
            200: 'hsl(var(--accent-secondary-200))',
            900: 'hsl(var(--accent-secondary-900))',
          },
          // Background colors - from lightest to darkest
          bg: {
            '000': 'hsl(var(--bg-000))',
            100: 'hsl(var(--bg-100))',
            200: 'hsl(var(--bg-200))',
            300: 'hsl(var(--bg-300))',
            400: 'hsl(var(--bg-400))',
            500: 'hsl(var(--bg-500))',
          },
          // Border colors - from lightest to darkest
          border: {
            100: 'hsl(var(--border-100))',
            200: 'hsl(var(--border-200))',
            300: 'hsl(var(--border-300))',
            400: 'hsl(var(--border-400))',
          },
          // Error/danger colors
          danger: {
            '000': 'hsl(var(--danger-000))',
            100: 'hsl(var(--danger-100))',
            200: 'hsl(var(--danger-200))',
            900: 'hsl(var(--danger-900))',
          },
          // Text on color backgrounds
          oncolor: {
            100: 'hsl(var(--oncolor-100))',
            200: 'hsl(var(--oncolor-200))',
            300: 'hsl(var(--oncolor-300))',
          },
          // Text colors - from lightest to darkest
          text: {
            '000': 'hsl(var(--text-000))',
            100: 'hsl(var(--text-100))',
            200: 'hsl(var(--text-200))',
            300: 'hsl(var(--text-300))',
            400: 'hsl(var(--text-400))',
            500: 'hsl(var(--text-500))',
          },
          // Theme-independent colors
          white: 'hsl(var(--always-white))',
          black: 'hsl(var(--always-black))',
        },

        // Console Theme Colors (administrative interface)
        // Follows the same structure as Claude theme for consistency
        console: {
          main: {
            '000': 'hsl(var(--accent-main-000))',
            100: 'hsl(var(--accent-main-100))',
            200: 'hsl(var(--accent-main-200))',
            900: 'hsl(var(--accent-main-900))',
          },
          pro: {
            '000': 'hsl(var(--accent-pro-000))',
            100: 'hsl(var(--accent-pro-100))',
            200: 'hsl(var(--accent-pro-200))',
            900: 'hsl(var(--accent-pro-900))',
          },
          secondary: {
            '000': 'hsl(var(--accent-secondary-000))',
            100: 'hsl(var(--accent-secondary-100))',
            200: 'hsl(var(--accent-secondary-200))',
            900: 'hsl(var(--accent-secondary-900))',
          },
          bg: {
            '000': 'hsl(var(--bg-000))',
            100: 'hsl(var(--bg-100))',
            200: 'hsl(var(--bg-200))',
            300: 'hsl(var(--bg-300))',
            400: 'hsl(var(--bg-400))',
            500: 'hsl(var(--bg-500))',
          },
          border: {
            100: 'hsl(var(--border-100))',
            200: 'hsl(var(--border-200))',
            300: 'hsl(var(--border-300))',
            400: 'hsl(var(--border-400))',
          },
          danger: {
            '000': 'hsl(var(--danger-000))',
            100: 'hsl(var(--danger-100))',
            200: 'hsl(var(--danger-200))',
            900: 'hsl(var(--danger-900))',
          },
          oncolor: {
            100: 'hsl(var(--oncolor-100))',
            200: 'hsl(var(--oncolor-200))',
            300: 'hsl(var(--oncolor-300))',
          },
          text: {
            '000': 'hsl(var(--text-000))',
            100: 'hsl(var(--text-100))',
            200: 'hsl(var(--text-200))',
            300: 'hsl(var(--text-300))',
            400: 'hsl(var(--text-400))',
            500: 'hsl(var(--text-500))',
          },
        },

        // Utility color values
        outline: {
          hsl: 'hsl(var(--accent-secondary-900))',
        },
      },

      /**
       * Typography System
       *
       * Our typography system includes custom font families and size/line-height pairings.
       * Fonts are loaded via next/font or a similar system and exposed as CSS variables.
       */
      fontFamily: {
        // Serif fonts
        copernicus: [
          'var(--font-copernicus)',
          'ui-serif',
          'Georgia',
          'Cambria',
          '"Times New Roman"',
          'Times',
          'serif',
        ],
        tiempos: ['var(--font-tiempos)', 'serif'],
        // Sans-serif fonts
        styrene: ['var(--font-styrene)', 'sans-serif'],
        // Accessibility fonts
        dyslexia: ['var(--font-dyslexia)', 'serif'],
      },
      fontSize: {
        '1.5rem': ['1.5rem', '2rem'],
        '0rem': ['0rem', '0rem'],
      },
      fontStyle: {
        italic: 'italic',
      },
      letterSpacing: {
        tighter: '-.03em',
      },

      /**
       * Layout & Spacing System
       */
      container: {
        center: true,
      },
      spacing: {
        3.5: '0.875rem',
      },
      space: {
        '1rem': '1rem',
        '0rem': '0rem',
      },
      inset: {
        '-px': '-1px',
      },
      width: {
        '1/6': '16.666667%',
        '18px': '18px',
      },
      maxWidth: {
        20: '5rem',
        none: 'none',
      },
      height: {
        '2/3': '66.666667%',
      },
      maxHeight: {
        0: '0',
        28: '7rem',
      },
      minHeight: {
        0: '0',
        12: '3rem',
      },
      size: {
        '0.25rem': '.25rem',
        '0.5rem': '.5rem',
        '1rem': '1rem',
      },

      /**
       * Grid & Flexbox System
       */
      gridTemplateColumns: {
        'max-content auto': 'max-content auto',
        '20px 1fr': '20px 1fr',
        'minmax(0, 1fr) auto': 'minmax(0, 1fr) auto',
        'repeat(auto-fill, minmax(120px, 1fr))': 'repeat(auto-fill, minmax(120px, 1fr))',
      },
      gridTemplateRows: {
        '1fr auto': '1fr auto',
        'auto 1fr': 'auto 1fr',
      },
      colSpan: {
        10: 'span 10 / span 10',
      },
      rowEnd: {
        2: '2',
      },
      flexShrink: {
        0: 0,
        1: 1,
        2: 2,
        4: 4,
      },
      flexGrow: {
        1: 1,
        3: 3,
      },
      flexWrap: {
        flexWrap: 'wrap',
        nowrap: 'nowrap',
      },
      order: {
        1: '1',
      },
      placeItems: {
        center: 'center',
      },
      justifyItems: {
        center: 'center',
        stretch: 'stretch',
      },
      alignSelf: {
        center: 'center',
      },

      /**
       * Animation System
       *
       * Defines keyframes and animation utilities for consistent motion design
       */
      keyframes: {
        shimmertext: {
          '0%': { 'background-position': '100% 0' },
          '100%': { 'background-position': '0 0' },
        },
        pulse: {
          '50%': { opacity: '.5' },
        },
        fade: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-down': {
          '0%': { height: '0' },
          '100%': { height: 'var(--radix-accordion-content-height)' },
        },
        'slide-up': {
          '0%': { height: 'var(--radix-accordion-content-height)' },
          '100%': { height: '0' },
        },
        'translate-x': {
          to: { transform: 'translateX(100%)' },
        },
        zoom: {
          '0%': { transform: 'scale(.95)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        // Basic animations
        fade: 'fade 125ms ease-out reverse forwards',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        spin: 'spin 1s linear infinite',

        // Complex animations with specific timing and easing
        'fade_125ms_ease-out_reverse_forwards': 'fade 125ms ease-out reverse forwards',
        'fade_200ms_ease-in_forwards': 'fade .2s ease-in forwards',
        'fade_250ms_ease-in_forwards': 'fade .25s ease-in forwards',
        'shimmertext_1.5s_infinite': 'shimmertext 1.5s infinite',
        'slide-down_300ms_ease-out': 'slide-down .3s ease-out',
        'slide-up_300ms_ease-out': 'slide-up .3s ease-out',
        'translate-x_100ms_ease-out': 'translate-x .1s ease-out',
        'translate-x_200ms_cubic-bezier(0.16, 1, 0.3, 1)_forwards':
          'translate-x .2s cubic-bezier(.16,1,.3,1) forwards',
        'zoom_125ms_ease-out_reverse_forwards': 'zoom 125ms ease-out reverse forwards',
        'zoom_250ms_ease-in_forwards': 'zoom .25s ease-in forwards',
      },

      /**
       * Visual Effects System
       */
      translate: {
        0: '0px',
        0.5: '0.125rem',
        1: '0.25rem',
        2: '0.5rem',
        '1/4': '25%',
        '-0.05em': '-0.05em',
        '-0.5px': '-0.5px',
      },
      extendTranslate: {
        px: '1px',
      },
      rotate: {
        12: '12deg',
        '0.1rad': '0.1rad',
        '0deg': '0deg',
      },
      scale: {
        50: '.5',
        0.975: '0.975',
        1: '1',
      },
      skew: {
        180: '180deg',
        2: '3deg',
      },
      blur: {
        '2px': 'blur(2px)',
        '8px': 'blur(8px)',
      },
      backdropBlur: {
        0: 'blur(0px)',
      },

      /**
       * Border System
       */
      borderWidth: {
        '1px': '1px',
      },
      ringColor: {
        DEFAULT: 'hsl(var(--accent-secondary-100)/1)',
        'border-200': 'hsl(var(--border-200)/0.30)',
      },

      /**
       * Shadow System
       */
      shadow: {
        diffused: '0 4px 24px var(--tw-shadow-color)',
        '0_2px_8px_0_hsl(var(--accent-secondary-200)/16%)':
          '0 2px 8px 0 hsl(var(--accent-secondary-200)/16%)',
      },
      boxShadow: {
        DEFAULT:
          'var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)',
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      },
      boxShadowColor: {
        'accent-secondary-200': 'hsl(var(--accent-secondary-200) / 0.1)',
        'always-black': 'hsl(var(--always-black) / 0.05)',
      },

      /**
       * UI Enhancement Utilities
       */
      extendOpacity: {
        95: '0.95',
      },
      scrollPaddingBottom: {
        '1.5rem': '1.5rem',
      },
      verticalAlign: {
        top: 'top',
        middle: 'middle',
      },
      appearance: {
        none: 'none',
      },
      overflow: {
        auto: 'auto',
      },
      backgroundSize: {
        '400%': '400%',
      },
      backgroundAttachment: {
        fixed: 'fixed',
      },
      backgroundClip: {
        text: 'text',
      },
      backgroundRepeat: {
        none: 'none',
      },
      objectFit: {
        contain: 'contain',
        cover: 'cover',
      },
      objectPosition: {
        top: 'top',
      },
      resize: {
        none: 'none',
        resize: 'both',
      },
      touchAction: {
        none: 'none',
      },
      willChange: {
        transform: 'transform',
      },
      break: {
        words: 'break',
      },
      lineClamp: {
        2: '2',
      },
      zIndex: {
        1: '1',
      },

      /**
       * Responsive Design System
       *
       * Includes both traditional breakpoints and custom min/max width queries
       */
      screens: {
        // Standard breakpoints
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',

        // Custom min-width queries
        'min-[350px]': { min: '350px' },
        'min-[500px]': { min: '500px' },
        'min-[1000px]': { min: '1000px' },

        // Custom max-width queries
        'max-sm': { max: '640px' },
      },
    },
  },

  /**
   * Plugin Configuration
   */
  plugins: [
    // Official Tailwind plugins
    lineClamp,

    // Custom plugin for accessibility features
    // require('./tailwind/plugins/accessibility'),

    // Custom plugin for Claude-specific utilities
    // require('./tailwind/plugins/claude-utilities'),
  ],

  /**
   * Core Plugin Configuration
   *
   * Enable/disable specific Tailwind core plugins as needed
   */
  corePlugins: {
    // All core plugins are enabled by default
  },

  /**
   * Variant Configuration
   *
   * Control which variants (hover, focus, etc.) are generated
   */
  variants: {
    // Extended variants configuration can be added here
  },
};
