# Anthropic Design System

## Quick Start for New Developers

Welcome to the Anthropic Design System! As a new front-end developer, this section will help you quickly get started implementing our design language across our products.

### Setup Checklist

1. **Install Dependencies**

   ```bash
   npm install @anthropic/design-system
   ```

2. **Configure Tailwind**

   - Import our preset in your `tailwind.config.js`:

   ```javascript
   module.exports = {
     presets: [require('@anthropic/design-system/tailwind')],
     // Your project-specific configurations...
   };
   ```

3. **Import Theme CSS**

   ```javascript
   import '@anthropic/design-system/themes.css';
   ```

4. **Apply Theme Context**
   ```jsx
   // Root component
   const App = () => <div data-theme="claude">{/* Your application content */}</div>;
   ```

### Key Resources

- **Component Library**: [Internal Storybook](https://design-system.anthropic.com)
- **Design Files**: [Figma Library](https://figma.com/anthropic/design-system)
- **Code Repository**: [GitHub Repository](https://github.com/anthropic/design-system)
- **Slack Channel**: [#design-system-support](https://anthropic.slack.com/channels/design-system-support)

## Introduction

The Anthropic Design System is a comprehensive guide that ensures a consistent look and feel across all Anthropic products, including Claude.ai, our documentation, blogs, and API console. This guide serves as the single source of truth for our design language, helping new and existing front-end developers understand and implement our visual identity consistently.

Our design system embodies our core brand values:

- **Clarity**: Making complex AI interactions intuitive and accessible
- **Innovation**: Pushing boundaries while maintaining usability
- **Trust**: Creating reliable, professional experiences
- **Humanity**: Offering a playful yet professional tone

**[Product Comparison Visual]**
_A side-by-side comparison showing the consistent design language across Claude.ai interface, documentation site, and API console - all sharing the same typography, color scheme, and component styles with a clean, light aesthetic and the distinctive sunburst icon appearing throughout._

## Design Principles

### 1. User-Centered Design

Place the user's needs at the center of every design decision. Components should be intuitive, accessible, and reduce cognitive load.

### 2. Consistency With Flexibility

Maintain consistent patterns across products while allowing for contextual adaptation.

### 3. Progressive Disclosure

Present information and options at the appropriate time to avoid overwhelming users.

### 4. Responsive Feedback

Create meaningful interactions that provide immediate, clear feedback.

### 5. Emotional Design

Design components that evoke positive emotional responses and reinforce brand values.

## Brand Identity

### Core Brand Elements

Anthropic's visual identity is built around a few key elements that should be consistently applied across all products and platforms:

#### Claude Sunburst Icon

The sunburst icon represents Claude and appears in various contexts:

- Used as a greeting element ("⊹ Back at it, Dan")
- Appears in the Claude logo and profile imagery
- Functions as a visual anchor in product interfaces

#### Profile Silhouette

The silhouette of a human head with the sunburst inside represents Claude's intelligence and is a key brand identifier seen on the marketing site.

#### Colors

Our primary brand color is a warm terracotta/coral (#E07A5F or similar) that appears in:

- The Claude icon background
- Key accent elements across products
- Call-to-action highlights

#### Brand Voice

Our interfaces employ a warm, personable tone with greetings like:

- "Back at it, Dan"
- "Good afternoon, Dan"
- Text that feels helpful and conversational without being overly casual

### Typography

#### Primary Fonts

- **Styrene**: Used for UI elements, navigation, and general content
  - Weights: Regular, Medium
  - Sizes: 12px (xs), 14px (sm), 16px (base), 18px (lg)
  - Used in chat interface, navigation, and buttons
- **Tiempos**: Used for certain headers and branded elements
  - Weights: Regular, Medium
  - Used primarily for longer-form content and documentation
- **Copernicus**: Used for primary headers
  - Weights: Regular, Medium, Bold
  - Used for primary marketing messages and major section headers

#### Typography Guidelines

- Maintain a clear hierarchy with consistent heading levels
- Use appropriate line height (generally 1.5 for body text)
- Ensure adequate contrast for readability
- Use `font-styrene` Tailwind class for UI elements
- Use sentence case for most UI text (not title case)

#### Typography Implementation

From our Tailwind configuration, we define our font families as:

```javascript
fontFamily: {
  // Serif fonts
  copernicus: [
    "var(--font-copernicus)",
    "ui-serif",
    "Georgia",
    "Cambria",
    '"Times New Roman"',
    "Times",
    "serif",
  ],
  tiempos: ["var(--font-tiempos)", "serif"],
  // Sans-serif fonts
  styrene: ["var(--font-styrene)", "sans-serif"],
  // Accessibility fonts
  dyslexia: ["var(--font-dyslexia)", "serif"],
}
```

### Color Palette

#### Brand Colors

- **Terracotta/Coral**: `#E07A5F` - Primary brand color used for the Claude icon background and key accent elements
- **Cream/Off-white**: `#F8F7F4` - Primary background color seen across marketing and documentation sites
- **Dark Tone**: `#2D2A26` - Used for primary text and the Anthropic logo

#### Color Usage Examples

Here are specific examples showing correct color usage across different components:

| UI Element                | Correct Color Usage          | Example Class                                                         |
| ------------------------- | ---------------------------- | --------------------------------------------------------------------- |
| Primary Button            | Terracotta/Coral (`#E07A5F`) | `bg-claude-main-000 text-white`                                       |
| Secondary Button          | Transparent with Border      | `bg-transparent border border-claude-border-300 text-claude-text-300` |
| Interactive Elements      | Primary Blue (`#3B82F6`)     | `text-claude-secondary-000`                                           |
| Navigation Link (default) | Secondary Text (`#4B5563`)   | `text-claude-text-300`                                                |
| Navigation Link (active)  | Primary Text (`#2D2D2D`)     | `text-claude-text-100`                                                |
| Error Message             | Error Red (`#EF4444`)        | `text-claude-danger-100`                                              |
| Background (main)         | White (`#FFFFFF`)            | `bg-claude-bg-000`                                                    |
| Background (sidebar)      | Cream (`#F2F0EB`)            | `bg-claude-bg-100`                                                    |
| Dividers/Borders          | Border Gray (`#E5E7EB`)      | `border-claude-border-300`                                            |

**✅ Do:**

```jsx
// Correct color usage for brand-primary button
<button className="bg-claude-main-000 hover:bg-claude-main-200 text-white rounded-md px-4 py-2">
  Primary Action
</button>

// Correct color usage for interactive elements
<a className="text-claude-secondary-000 hover:text-claude-secondary-200 underline">
  Learn more
</a>
```

**❌ Don't:**

```jsx
// Incorrect with hardcoded colors
<button className="rounded-md bg-[#E07A5F] px-4 py-2 text-white hover:bg-[#F4A261]">
  Primary Action
</button>
```

#### Primary UI Colors

- **Primary Blue**: `#3B82F6` (`accent-main-000` in Tailwind) - Used for primary actions, links, and emphasis
- **Secondary Blue**: `#60A5FA` (`accent-main-200` in Tailwind) - Used for hover states and secondary elements
- **Accent Blue**: `#00A8E8` - Used for certain CTAs like the send button

#### Neutral Colors

- **Background**: `#F2F0EB` (`bg-sidebar` in Tailwind) - Main surface color for the sidebar and secondary panels
- **White**: `#FFFFFF` (`bg-white` in Tailwind) - Primary background for content areas
- **Light Gray**: `#F9F9F9` (`bg-100` in Tailwind) - Secondary background
- **Border Gray**: `#E5E7EB` (`border-300` in Tailwind) - Used for subtle separators

#### Text Colors

- **Primary Text**: `#2D2D2D` (`text-200` in Tailwind) - Primary text color
- **Secondary Text**: `#4B5563` (`text-300` in Tailwind) - Secondary, less emphasized text
- **Tertiary Text**: `#6B7280` (`text-gray-500` in Tailwind) - For supporting text elements

#### Semantic Colors

- **Success**: `#10B981` - Positive actions and confirmation
- **Warning**: `#F59E0B` - Cautionary elements
- **Error**: `#EF4444` - Error states and destructive actions
- **Info**: `#3B82F6` - Informational elements

#### Color Application Guidelines

- Use the terracotta/coral color sparingly for maximum impact
- Maintain the clean, light aesthetic with generous whitespace
- Apply text colors consistently based on hierarchy
- Ensure all adjacent colors maintain sufficient contrast
- Use the primary blue for interactive elements to provide visual consistency with the chat interface

#### CSS Variables System

We use HSL color variables for flexibility:

```css
:root {
  --bg-000: 0 0% 100%; /* White */
  --bg-100: 220 14% 96%; /* Light Gray */
  --bg-200: 220 13% 91%; /* Lighter Gray */
  --bg-300: 216 12% 84%; /* Light Gray for hover states */
  --bg-400: 217 10% 78%; /* Medium Gray for active states */

  --text-100: 0 0% 100%; /* White text */
  --text-200: 220 9% 15%; /* Near-black for primary text */
  --text-300: 220 9% 35%; /* Dark gray for secondary text */

  --accent-main-000: 210 100% 45%; /* Primary blue */
  --accent-main-200: 210 100% 40%; /* Darker blue for hover states */

  --always-black: 0 0% 0%; /* Pure black, used sparingly */
}
```

#### Theme Variations

Our products support two distinct themes:

1. **Claude Theme** - Used for the main Claude.ai consumer product

   - Light mode has a warm, cream background with terracotta/coral accent colors
   - Dark mode has deep gray backgrounds with adjusted accent colors for visibility

2. **Console Theme** - Used for the developer console and administrative interfaces
   - Primarily dark-themed with a professional, focused aesthetic
   - Terracotta/coral accent is preserved but with adjusted secondary colors

Both themes are implemented using CSS variables with a consistent structure, making it easy to apply either theme to any component.

**Light Mode Claude Theme (Excerpt):**

```css
[data-theme='claude'],
[data-theme='claude'][data-mode='light'] {
  --accent-brand: 15 63.1% 59.6%;
  --accent-main-000: 15 55.6% 52.4%;
  --accent-main-100: 15 55.6% 52.4%;
  --accent-main-200: 15 63.1% 59.6%;
  /* More values... */
}
```

**Dark Mode Claude Theme (Excerpt):**

```css
[data-theme='claude'][data-mode='dark'] {
  --accent-brand: 15 63.1% 59.6%;
  --accent-main-000: 15 55.6% 52.4%;
  --accent-main-100: 15 63.1% 59.6%;
  --accent-main-200: 15 63.1% 59.6%;
  /* More values... */
}
```

**Console Theme (Excerpt):**

```css
[data-theme='console'],
[data-theme='console'][data-mode='dark'] {
  --accent-brand: 15 63.1% 59.6%;
  --accent-main-000: 18 50.4% 47.5%;
  --accent-main-100: 18 56.8% 43.5%;
  --accent-main-200: 19 58.3% 40.4%;
  /* More values... */
}
```

#### Color Usage in Tailwind

Our Tailwind configuration provides semantic color classes for both Claude and Console themes:

```javascript
colors: {
  // Claude.ai Theme Colors
  claude: {
    // Primary brand accent colors
    main: {
      "000": "hsl(var(--accent-main-000))",
      "100": "hsl(var(--accent-main-100))",
      "200": "hsl(var(--accent-main-200))",
      "900": "hsl(var(--accent-main-900))",
    },
    // Premium/Pro tier accent colors
    pro: {
      "000": "hsl(var(--accent-pro-000))",
      "100": "hsl(var(--accent-pro-100))",
      "200": "hsl(var(--accent-pro-200))",
      "900": "hsl(var(--accent-pro-900))",
    },
    // Additional color groups...
  },

  // Console Theme Colors
  console: {
    // Similar structure to claude theme...
  }
}
```

Usage examples:

- `bg-claude-bg-100` - Light gray background in Claude theme
- `text-claude-text-300` - Secondary text color in Claude theme
- `border-console-border-200` - Border color in Console theme
- `bg-claude-danger-000` - Error background in Claude theme

### Spacing

We use a consistent spacing system based on a 4px grid:

- **xs**: 4px
- **sm**: 8px
- **md**: 12px
- **base**: 16px
- **lg**: 24px
- **xl**: 32px
- **2xl**: 48px
- **3xl**: 64px

In Tailwind classes, these are often expressed as:

- `p-2` = 8px padding
- `m-4` = 16px margin
- `gap-3` = 12px gap

Our Tailwind config extends the default spacing with additional values:

```javascript
spacing: {
  "3.5": "0.875rem",
},
space: {
  "1rem": "1rem",
  "0rem": "0rem",
},
```

### Border Radius

- **sm**: 4px
- **md**: 8px (`rounded-md`)
- **lg**: 12px (`rounded-lg`)
- **xl**: 16px
- **2xl**: 24px (`rounded-2xl`)
- **full**: 9999px (for circular elements)

### Shadows

- **sm**: `0 1px 2px 0 rgba(0, 0, 0, 0.05)`
- **md**: `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)`
- **lg**: `0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)`
- **sidebar**: `inset -4px 0px 6px -4px hsla(0, 0%, 0%, 0.04)`

Our Tailwind config extends shadows with additional options:

```javascript
shadow: {
  diffused: "0 4px 24px var(--tw-shadow-color)",
  "0_2px_8px_0_hsl(var(--accent-secondary-200)/16%)":
    "0 2px 8px 0 hsl(var(--accent-secondary-200)/16%)",
},
boxShadowColor: {
  "accent-secondary-200": "hsl(var(--accent-secondary-200) / 0.1)",
  "always-black": "hsl(var(--always-black) / 0.05)",
},
```

### Animations

We use carefully crafted animations to enhance user experience without being distracting:

- **Default Transition**: `transition duration-300 ease-[cubic-bezier(0.165,0.85,0.45,1)]`
- **Quick Transition**: `transition duration-150 ease-in-out`
- **Button Press**: `active:scale-95` or `active:scale-[0.985]` for subtle feedback
- **Hover Transitions**: Smooth color changes with `transition-colors`

Our Tailwind config defines several keyframes and animations:

```javascript
keyframes: {
  shimmertext: {
    "0%": { "background-position": "100% 0" },
    "100%": { "background-position": "0 0" },
  },
  pulse: {
    "50%": { opacity: ".5" },
  },
  fade: {
    "0%": { opacity: "0" },
    "100%": { opacity: "1" },
  },
  "slide-down": {
    "0%": { height: "0" },
    "100%": { height: "var(--radix-accordion-content-height)" },
  },
  // Additional keyframes...
},
animation: {
  // Basic animations
  fade: "fade 125ms ease-out reverse forwards",
  pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
  spin: "spin 1s linear infinite",

  // Complex animations with specific timing and easing
  "fade_125ms_ease-out_reverse_forwards":
    "fade 125ms ease-out reverse forwards",
  "fade_200ms_ease-in_forwards": "fade .2s ease-in forwards",
  // Additional animations...
},
```

## Components

### Component Selection Guide

When building interfaces, use this guide to select the appropriate component:

| If you need to...         | Use this component                  | Not this                                    |
| ------------------------- | ----------------------------------- | ------------------------------------------- |
| Create a primary action   | `Button` with `variant="primary"`   | Custom styled divs or links                 |
| Create a secondary action | `Button` with `variant="secondary"` | Inconsistently styled buttons               |
| Show a list of options    | `Dropdown` or `Menu`                | Custom positioned absolute divs             |
| Display form fields       | `Input`, `Select`, `Checkbox`, etc. | Native HTML elements without styling        |
| Show tabbed content       | `Tabs` component                    | Custom tab implementations                  |
| Display a modal           | `Dialog` component                  | Custom positioned overlays                  |
| Show a notification       | `Toast` component                   | Custom alert implementations                |
| Create a page layout      | `Layout` component                  | Direct use of flex/grid without consistency |

### Component Decision Tree

```
User interaction needed?
├── Yes, primary action → Primary Button
├── Yes, secondary action → Secondary Button or Link
├── Yes, destructive action → Danger Button
├── Yes, multiple choice → Dropdown or Radio Group
└── No, display only
    ├── Short text content → Text component with appropriate variant
    ├── Structured content → Card component
    ├── Tabular data → Table component
    ├── Visual data → Chart component
    └── Status information → Badge or Tag component
```

### Real-World Component Examples

Below are examples of key components as they appear in our products, with implementation details.

**[Claude.ai Chat Interface Visual]**
\*Description: The Claude.ai chat interface showing the main conversation screen with:

- A light off-white background
- The sunburst icon next to "Back at it, Dan" greeting at the top
- The input area at the bottom with a plus button, text field, and coral send button
- A model selector showing "Claude 3.7 Sonnet"
- A quota usage meter showing a blue progress bar at 2.5%
- The interface uses Styrene font throughout and maintains generous whitespace\*

**[Documentation/Marketing Site Visual]**
\*Description: The Anthropic documentation site featuring:

- The same cream/off-white background (#F8F7F4)
- "Build with Claude" headline in large Tiempos font
- Clearly defined content sections with ample spacing
- Interactive elements (buttons, links) in the primary blue color
- The Anthropic logo in the top left
- A search box with subtle border and placeholder text
- A grid of feature cards with icons and concise descriptions
- All text using the Styrene font family except for headlines\*

### Navigation Elements

#### Sidebar

The sidebar is the primary navigation hub that provides access to different sections of the application.

- **Visual Characteristics**:
  - Background color: `#F2F0EB` (`bg-sidebar` in Tailwind)
  - Width: `18rem` (288px) (`w-[18rem]` in Tailwind)
  - Border-right: `0.5px solid #E5E7EB` (`border-r-[0.5px] border-border-300` in Tailwind)
  - Box-shadow: `inset -4px 0px 6px -4px hsla(0, 0%, 0%, 0.04)` (`shadow-sidebar` in Tailwind config)
  - Contains projects, chats, and user profile sections
  - Includes a "New chat" button at the top

#### Navigation Links

- **Default State**:
  - Text color: `#4B5563` (`text-text-300` in Tailwind)
  - Padding: `0.75rem 1rem` (`py-3 px-4` in Tailwind)
  - Border-radius: `0.5rem` (`rounded-lg` in Tailwind)
- **Hover State**:
  - Background color: `#E5E7EB` (`hover:bg-bg-300` in Tailwind)
  - Text color: `#111827` (`hover:text-text-100` in Tailwind)
- **Active State**:
  - Background color: `#CBD5E0` (`aria-pressed:bg-bg-400` in Tailwind)
  - Text color: `#111827` (`aria-pressed:text-text-100` in Tailwind)
  - Font weight: Medium (`font-medium` in Tailwind)

### Buttons

#### Primary Button

Used for primary actions like "New Chat" or "Submit".

- **Default State**:
  - Background: `#3B82F6`
  - Text color: White
  - Padding: `8px 16px`
  - Border-radius: `8px`
- **Hover State**:
  - Background: `#60A5FA` (lighter blue)
- **Active State**:
  - Transform: `scale(0.95)`
- **Disabled State**:
  - Opacity: `0.5`
  - Pointer-events: `none`

#### Secondary Button

Used for secondary actions.

- **Default State**:
  - Background: Transparent
  - Border: `1px solid #E5E7EB`
  - Text color: `#4B5563`
- **Hover State**:
  - Background: `#F9FAFB` (very light gray)
- **Active State**:
  - Transform: `scale(0.95)`

#### Icon Button

Used for actions like send, settings, etc.

- **Default State**:
  - Size: `32px` (h-8 w-8)
  - Border-radius: `8px` (rounded-md)
  - Background: Varies by context
- **Hover & Active States**:
  - Similar to primary/secondary buttons
  - Transform: `scale(0.95)` on active

### Input Elements

#### ChatInput

The primary text input area for messaging Claude.

- **Visual Characteristics**:
  - Font: Styrene
  - Font size: 14px
  - Border-radius: 12px
  - Background: White
  - Padding: 12px 16px
  - Box-shadow: `0 1px 3px rgba(0, 0, 0, 0.1)`

#### Form Inputs

Used for settings and other form elements.

- **Default State**:
  - Border: `1px solid #E5E7EB`
  - Border-radius: `8px`
  - Padding: `8px 12px`
- **Focus State**:
  - Border-color: `#3B82F6`
  - Box-shadow: `0 0 0 3px rgba(59, 130, 246, 0.2)`

### Message Display

#### ChatMessage

Displays individual messages in the conversation.

- **User Message**:

  - Background: Light blue/gray
  - Alignment: Right
  - Border-radius: 12px
  - Padding: 12px 16px
  - Max-width: 80%

- **Claude Message**:
  - Background: White
  - Alignment: Left
  - Border-radius: 12px
  - Padding: 12px 16px
  - Max-width: 80%
- **Timestamp**:
  - Font size: 12px
  - Color: `#6B7280`
  - Visibility: Appears on hover

### Dropdown Menus

#### ProjectMenuDropdown

Context menu for project-specific actions.

- **Container**:

  - Position: Absolute
  - Background: White
  - Border-radius: 8px
  - Box-shadow: `0 2px 8px rgba(0, 0, 0, 0.1)`
  - Z-index: 10

- **Menu Items**:
  - Display: Flex, align-items: center
  - Padding: 8px 12px
  - Color: `#6B7280` (text-300)
- **Hover State**:
  - Background: `#F3F4F6` (bg-300)
  - Color: `#111827` (text-100)

## Responsive Design

### Breakpoints

Use Tailwind's responsive prefixes for consistent breakpoints:

- **sm**: 640px (`sm:` prefix)
- **md**: 768px (`md:` prefix)
- **lg**: 1024px (`lg:` prefix)
- **xl**: 1280px (`xl:` prefix)
- **2xl**: 1536px (`2xl:` prefix)

Our Tailwind config extends these with additional custom breakpoints:

```javascript
screens: {
  // Standard breakpoints
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",

  // Custom min-width queries
  "min-[350px]": { min: "350px" },
  "min-[500px]": { min: "500px" },
  "min-[1000px]": { min: "1000px" },

  // Custom max-width queries
  "max-sm": { max: "640px" },
},
```

### Mobile Adaptations

From the screenshots, we can observe several consistent patterns for responsive design:

#### Small Screens (< 640px)

- Full-width containers with reduced padding (`px-4 sm:px-6`)
- Stacked layouts instead of side-by-side elements
- Simplified navigation with critical paths only
- Tailwind classes: `w-full sm:w-auto`, `flex-col sm:flex-row`

#### Medium Screens (640px - 1024px)

- Condensed sidebar with icons only or hidden behind hamburger menu
- Centered content with constrained maximum widths
- Larger touch targets for form elements
- Tailwind classes: `hidden md:block`, `md:max-w-3xl`, `md:mx-auto`

#### Large Screens (> 1024px)

- Multi-column layouts with sidebar visible
- Expanded horizontal spacing between elements
- Content comfortably fits without horizontal scrolling
- Tailwind classes: `lg:grid lg:grid-cols-12`, `lg:gap-8`, `lg:w-[18rem]`

### Component-Specific Adaptations

#### Chat Interface

- On mobile, input area takes full width with reduced padding
- Message bubbles extend closer to edges on mobile
- Model selector may simplify or collapse on smaller screens
- Tailwind implementation: `w-full lg:w-4/5 max-w-full lg:max-w-3xl mx-auto px-4 sm:px-6 lg:px-8`

#### Documentation Pages

- On mobile, single column layout with stacked navigation
- On larger screens, sidebar navigation remains visible
- Search expands to full width on mobile
- Content width is constrained to maintain readability
- Tailwind implementation: `grid grid-cols-1 lg:grid-cols-[250px_1fr] xl:grid-cols-[300px_1fr]`

## Accessibility Guidelines

### Contrast Ratios

- Text elements must maintain a minimum contrast ratio of 4.5:1
- Large text (18px or 14px bold) must maintain a minimum contrast ratio of 3:1
- UI components and graphical objects must maintain a minimum contrast ratio of 3:1

### Focus States

All interactive elements must have a visible focus state for keyboard navigation:

- Focus ring color: `#3B82F6`
- Focus ring width: 2-3px
- Focus ring offset: 2px

### Semantic HTML

Use appropriate semantic HTML elements:

- `<button>` for clickable actions
- `<a>` for navigation links
- Proper heading hierarchy (`<h1>` through `<h6>`)
- ARIA attributes when necessary

### Keyboard Navigation

- All interactive elements must be keyboard accessible
- Tab order should follow a logical flow
- Custom components should implement appropriate keyboard handlers

## Voice & Tone Guidelines

Anthropic's products maintain a consistent voice across all interfaces that balances friendliness with professionalism.

### Voice Principles

- **Conversational & Direct**: Use short, simple sentences with minimal technical jargon
- **Warm & Approachable**: Use first-person perspective ("I'm here to help") and express genuine-feeling curiosity
- **Subtly Playful**: Incorporate light wordplay and personality without overwhelming the user
- **Collaborative**: Emphasize "we" and "together" language, positioning Claude as a helpful assistant

### UI Text Guidelines

- **Greetings**: Simple, friendly phrases like "Back at it!" or "Hey there" (time-aware when possible)
- **Buttons & CTAs**: Clear, direct text like "Try this" or "Learn more" (avoid complex phrasing)
- **Instructions**: Short, helpful guidance like "What would you like to make today?"
- **Error Messages**: Sympathetic but solution-focused, avoiding technical details when possible
- **Placeholders**: Simple suggestions like "Message Claude..." or "What's on your mind?"

### Examples from Our Products

| Context             | Example                                                                                 | Why It Works                             |
| ------------------- | --------------------------------------------------------------------------------------- | ---------------------------------------- |
| Chat greeting       | "Back at it!"                                                                           | Short, friendly, encourages continuation |
| Button              | "Let's create"                                                                          | Direct, simple, collaborative            |
| Section heading     | "⊹ Creative Space"                                                                      | Uses sunburst icon, clear purpose        |
| Feature description | "Count on me. A simple yet satisfying way to keep track of numbers that matter to you." | Subtle wordplay, user-benefit focused    |

### Do's and Don'ts

#### Do's

- Start with a simple, direct greeting
- Use the sunburst icon (⊹) at the beginning of sections
- Keep sentences short and conversational
- Ask genuine-feeling questions
- Use light wordplay and subtle humor
- Focus on collaboration ("we" language)
- Include brief moments of personality
- Vary greetings based on context

#### Don'ts

- Use corporate jargon or buzzwords
- Write long, complex sentences
- Sound overly technical or robotic
- Use excessive exclamation points
- Be overly enthusiastic or quirky
- Include lengthy explanations
- Use aggressive calls-to-action
- Sound impersonal or distant

### Example Transformations

**Corporate Language:**
"Welcome to our integrated solution ecosystem designed to maximize productivity vectors across your digital transformation journey."

**Claude Style:**
"⊹ Hey there. What would you like to create today? I'm here to help with whatever you're working on."

**Corporate Language:**
"Leverage our state-of-the-art temporal monitoring framework for optimal chronological awareness outcomes."

**Claude Style:**
"⊹ Time Tracker. Every second counts. A clean, intuitive timer for when you need to measure the moments."

**Corporate Language:**
"Access our comprehensive knowledge capital repository featuring actionable insights and paradigm-shifting methodologies."

**Claude Style:**
"⊹ Helpful Hints. Learn simple ways to make our conversations more productive, with tips for clear communication and better results."

## Code Conventions

### CSS Class Naming

We use a combination of Tailwind utility classes and custom semantic classes:

- Custom component classes follow BEM-like naming: `.component-name__element--modifier`
- Use Tailwind's utility classes for most styling needs
- Extract common patterns to component classes using Tailwind's `@apply` directive
- Use `className` props in React components with consistent ordering (layout → typography → colors → states)

```jsx
// Example of good class organization
<button className="font-styrene bg-accent-main-000 hover:bg-accent-main-200 inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white active:scale-95">
  Get Started
</button>
```

### Icon System

- We use a standard set of icons (primarily from Lucide)
- Icons should be properly sized (usually 16px (`w-4`), 20px (`w-5`), or 24px (`w-6`))
- Icons should include appropriate aria-labels when used standalone
- Use the following format for icon components:

```jsx
import { Icon } from 'lucide-react';

<Icon
  size={20}
  className="text-text-300"
  aria-hidden={hasLabel}
  aria-label={!hasLabel ? 'Descriptive label' : undefined}
/>;
```

### JavaScript Component Structure

- React components follow functional component pattern with hooks
- Maintain clear separation of concerns
- Props should have appropriate default values and type checking
- Use Radix UI primitives for complex interactive components like dropdowns and modals

```jsx
// Example component structure
import React from 'react';
import { Button } from './Button';
import { Icon } from 'lucide-react';

interface MyComponentProps {
  label: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

export const MyComponent: React.FC<MyComponentProps> = ({
  label,
  onClick,
  variant = 'primary',
}) => {
  // Component logic here

  return (
    <Button
      onClick={onClick}
      variant={variant}
    >
      <Icon className="mr-2" />
      {label}
    </Button>
  );
}
```

## Integration Guidelines for Third-Party Tools

When integrating external libraries and tools into Anthropic products, maintain brand consistency while leveraging their functionality.

### Radix UI Integration

We use Radix UI for many complex interactive components. When implementing Radix components:

- Apply Anthropic color system using Tailwind classes
- Maintain our border-radius standards (usually `rounded-md` or `rounded-lg`)
- Use our animation timings and easing curves
- Ensure components respect our focus state styles
- Implement with TypeScript for type safety

Example of a styled Radix dropdown:

```jsx
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

export const ProjectMenu = () => (
  <DropdownMenu.Root>
    <DropdownMenu.Trigger className="text-text-300 hover:bg-bg-300 hover:text-text-100 inline-flex h-8 w-8 items-center justify-center rounded-md bg-transparent">
      <DotsHorizontalIcon />
    </DropdownMenu.Trigger>
    <DropdownMenu.Content className="z-10 rounded-md bg-white p-1 shadow-md">
      <DropdownMenu.Item className="text-text-300 hover:bg-bg-300 hover:text-text-100 flex items-center rounded-md px-3 py-2 text-sm">
        Edit Project
      </DropdownMenu.Item>
      {/* Additional items */}
    </DropdownMenu.Content>
  </DropdownMenu.Root>
);
```

### MDX for Documentation

For documentation and blog content:

- Apply our typography scale and font family
- Use our color system for syntax highlighting
- Maintain consistent spacing between elements
- Include our navigation and layout components

### Third-Party Visualization Libraries

When using chart libraries, maps, or other visualization tools:

- Customize colors to match our palette
- Apply consistent typography
- Ensure appropriate contrast ratios
- Use our animation timings when applicable

## Implementation Resources

### Tailwind Configuration

Our custom Tailwind configuration extends the default with our brand colors and design tokens. The full configuration is available in `claude-ai.tailwind.config.js`, which is the source of truth for our design implementation.

Key sections include:

- Color definitions using HSL variables
- Typography system with custom fonts
- Spacing and sizing system
- Animation and transition definitions
- Component-specific styles
- Responsive breakpoints

### Component Library Access

We maintain a React component library that implements these design principles. New components should be built from and extend these existing components.

- **Repository**: github.com/anthropic/design-system (internal access only)
- **Storybook**: design-system.anthropic.com (internal access only)
- **NPM Package**: @anthropic/design-system (internal registry)

### Design Assets

- Figma library: [Internal link to Figma]
- Icon set: Available in the design system package
- Font files: Available in the design system package

## Workflow & Contribution Guidelines

### Development Workflow

When building new features or components, follow this workflow to ensure design consistency:

1. **Check Existing Components First**
   Before creating new UI elements, check the component library to see if a suitable component already exists.

2. **Extend, Don't Duplicate**
   If you need a variant of an existing component, extend it rather than creating a new one.

3. **Design Review**
   For new components, request design review in the #design-review Slack channel before implementation.

4. **Code Review Checklist**
   - Ensures proper use of design tokens (no hardcoded colors/values)
   - Follows responsive design patterns
   - Maintains accessibility standards
   - Uses consistent naming conventions
   - Includes proper documentation

### Contributing to the Design System

We welcome contributions to improve our design system! Here's how:

1. **Proposing Changes**

   - For minor changes: Open a PR with your proposed changes
   - For larger changes: Start a discussion in the #design-system Slack channel

2. **Component Contribution Requirements**

   - Clear documentation with usage examples
   - Storybook stories demonstrating various states
   - Accessibility compliance
   - Responsive behavior handling
   - Unit tests

3. **Documentation Standards**
   - Include purpose and use cases
   - Show proper implementation examples
   - Document props and variations
   - Provide accessibility guidelines
   - Include responsive behavior notes

### Testing Guidelines

When implementing design system components, ensure you test for:

1. **Theme Compatibility**

   - Test in both Claude and Console themes
   - Verify light and dark mode appearances

2. **Responsive Behavior**

   - Test at all standard breakpoints
   - Verify touch target sizes on mobile

3. **Accessibility**
   - Test keyboard navigation
   - Verify screen reader compatibility
   - Check contrast ratios
   - Test with browser zoom

## Theme Implementation

### Applying Themes

Use the `data-theme` and `data-mode` attributes to apply themes to your components:

```html
<!-- Claude Light Theme (default) -->
<div data-theme="claude">
  <!-- Content -->
</div>

<!-- Claude Dark Theme -->
<div data-theme="claude" data-mode="dark">
  <!-- Content -->
</div>

<!-- Console Theme (primarily dark) -->
<div data-theme="console">
  <!-- Content -->
</div>
```

### Syntax Highlighting Theme

For code blocks and syntax highlighting, we use a custom theme defined in `themes-claude-and-console.css`:

```css
.hljs {
  display: block;
  overflow-x: auto;
  padding: 0.5em;
  color: #abb2bf;
  background: #282c34;
}
.hljs-comment,
.hljs-quote {
  color: #5c6370;
  font-style: italic;
}
/* Additional syntax highlighting styles... */
```

## Product-Specific Implementation Guidelines

Each Anthropic product has unique considerations while still adhering to our overall design system. This section highlights specific guidelines for each product.

### Claude.ai Chat Interface

The Claude.ai consumer product has the following specific guidelines:

1. **Conversation UI**

   - Messages should use the `ChatMessage` component with appropriate user/assistant styling
   - Always include the sunburst icon (⊹) before Claude's greeting messages
   - Use the Claude theme (light or dark based on user preference)

2. **Input Areas**

   - Always use the `ChatInput` component for message composition
   - Include appropriate placeholder text: "Message Claude..." or similar
   - Always show the coral send button

3. **Navigation**

   - Sidebar should use the cream background color (`#F2F0EB`)
   - Navigation items should use standard hover/active states

4. **Code Implementation Example**
   ```jsx
   // Claude chat interface
   const ChatInterface = () => (
     <div className="flex h-screen" data-theme="claude">
       <Sidebar className="bg-claude-bg-100 border-claude-border-300 w-[18rem] border-r">
         {/* Sidebar content */}
       </Sidebar>
       <main className="flex flex-1 flex-col">
         <ChatHeader />
         <ChatMessages className="flex-1 overflow-y-auto p-4" />
         <ChatInput
           className="border-claude-border-300 border-t p-4"
           placeholder="Message Claude..."
         />
       </main>
     </div>
   );
   ```

### Documentation/Blog

For documentation and blog pages:

1. **Typography**

   - Use Copernicus for major headings (H1)
   - Use Tiempos for subheadings (H2, H3)
   - Use Styrene for body text

2. **Layout**

   - Maintain generous whitespace (min 16px, preferably 24px+ between sections)
   - Use a maximum content width of 720px for optimal readability
   - Include a visible sidebar with section navigation

3. **Code Blocks**

   - Use the Claude syntax highlighting theme
   - Apply proper language tags
   - Include copy button in upper right corner

4. **Responsive Considerations**
   - Hide sidebar on mobile, show hamburger menu
   - Maintain readable font sizes (min 16px for body text)

### API Console

The developer console follows these specific guidelines:

1. **Theme Application**

   - Always use the Console theme (`data-theme="console"`)
   - Console theme is primarily dark, with a professional, focused aesthetic

2. **Layout**

   - Use a fixed header with main navigation
   - Implement a collapsible sidebar for secondary navigation
   - Use card-based layouts for API key management and usage metrics

3. **Form Elements**

   - Use consistent styling for all input fields
   - Include clear validation messages
   - Provide helpful tooltips for technical fields

4. **Implementation Example**
   ```jsx
   // Console interface
   const ConsoleInterface = () => (
     <div className="min-h-screen" data-theme="console">
       <Header className="border-console-border-300 bg-console-bg-100 border-b" />
       <div className="flex">
         <Sidebar className="border-console-border-300 w-64 border-r" />
         <main className="flex-1 p-6">
           <Card className="bg-console-bg-200 rounded-lg p-4">{/* Card content */}</Card>
         </main>
       </div>
     </div>
   );
   ```

## Common Implementation Patterns

Here are some common UI patterns and how to implement them correctly:

### Form Implementation

```jsx
// Correct form implementation
const ExampleForm = () => (
  <form className="space-y-6">
    <div>
      <label
        htmlFor="name"
        className="font-styrene text-claude-text-200 mb-2 block text-sm font-medium"
      >
        Name
      </label>
      <input
        id="name"
        type="text"
        className="border-claude-border-300 focus:ring-claude-secondary-000 focus:border-claude-secondary-000 font-styrene text-claude-text-100 w-full rounded-lg border px-3 py-2 focus:ring-2"
        placeholder="Enter your name"
      />
    </div>

    <div>
      <label
        htmlFor="email"
        className="font-styrene text-claude-text-200 mb-2 block text-sm font-medium"
      >
        Email
      </label>
      <input
        id="email"
        type="email"
        className="border-claude-border-300 focus:ring-claude-secondary-000 focus:border-claude-secondary-000 font-styrene text-claude-text-100 w-full rounded-lg border px-3 py-2 focus:ring-2"
        placeholder="you@example.com"
      />
    </div>

    <div>
      <Button
        variant="primary"
        className="bg-claude-main-000 hover:bg-claude-main-200 font-styrene text-white active:scale-95"
      >
        Submit
      </Button>
    </div>
  </form>
);
```

### Card Pattern

```jsx
// Correct card implementation
const ExampleCard = ({ title, children }) => (
  <div className="bg-claude-bg-000 border-claude-border-300 overflow-hidden rounded-lg border shadow-sm">
    <div className="border-claude-border-300 border-b px-4 py-3">
      <h3 className="font-styrene text-claude-text-100 font-medium">{title}</h3>
    </div>
    <div className="p-4">{children}</div>
  </div>
);
```

### Navigation Bar Pattern

```jsx
// Correct navigation implementation
const ExampleNavBar = () => (
  <nav className="bg-claude-bg-100 border-claude-border-300 border-b">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex h-16 justify-between">
        <div className="flex items-center">
          <Logo className="h-8 w-8" />
          <div className="hidden md:ml-6 md:flex md:space-x-8">
            <NavLink
              href="/dashboard"
              className="font-styrene text-claude-text-300 hover:text-claude-text-100 hover:bg-claude-bg-300 rounded-lg px-3 py-2 text-sm"
            >
              Dashboard
            </NavLink>
            <NavLink
              href="/projects"
              className="font-styrene text-claude-text-300 hover:text-claude-text-100 hover:bg-claude-bg-300 rounded-lg px-3 py-2 text-sm"
            >
              Projects
            </NavLink>
            <NavLink
              href="/settings"
              className="font-styrene text-claude-text-300 hover:text-claude-text-100 hover:bg-claude-bg-300 rounded-lg px-3 py-2 text-sm"
            >
              Settings
            </NavLink>
          </div>
        </div>
        <MobileMenuButton className="bg-claude-bg-300 text-claude-text-300 inline-flex h-8 w-8 items-center justify-center rounded-lg md:hidden" />
      </div>
    </div>
  </nav>
);
```

## Troubleshooting Common Issues

### Theme Not Applying Correctly

**Problem**: Components don't use the correct theme colors.
**Solution**:

- Ensure you've set the `data-theme` attribute on a parent element
- Check that you're using the theme-specific color classes (e.g., `text-claude-text-200` not just `text-gray-800`)
- Verify CSS imports are correct and not being overridden

### Inconsistent Component Styling

**Problem**: Components look different across pages or don't match the design.
**Solution**:

- Use the pre-built components from our component library instead of building from scratch
- Follow the class naming order convention (layout → typography → colors → states)
- Check spacing using the defined spacing scale

### Responsive Layout Issues

**Problem**: Layout breaks at certain screen sizes.
**Solution**:

- Use the defined breakpoints (`sm`, `md`, `lg`, `xl`) consistently
- Test at all breakpoints during development
- Prefer flex and grid layouts with relative units over fixed widths
- Use the responsive dev tools in the browser to test different screen sizes

## Version History

- v1.3 - Added Product-Specific Guidelines and Troubleshooting - April 2025
- v1.2 - Added Integration Guidelines and Voice & Tone - April 2025
- v1.1 - Tailwind Implementation Enhancement - April 2025
- v1.0 - Initial Design System release - April 2025
