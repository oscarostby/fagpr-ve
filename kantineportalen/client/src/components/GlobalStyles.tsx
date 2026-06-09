import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: "Inter";
    src: url("/fonts/InterVariable.woff2") format("woff2");
    font-weight: 100 900;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: "Inter";
    src: url("/fonts/InterVariable-Italic.woff2") format("woff2");
    font-weight: 100 900;
    font-style: italic;
    font-display: swap;
  }

  :root {
    --radius: 0.75rem;
    --background: oklch(0.985 0.01 240);
    --foreground: oklch(0.18 0.03 255);
    --card: oklch(1 0 0);
    --card-foreground: oklch(0.18 0.03 255);
    --popover: oklch(1 0 0);
    --popover-foreground: oklch(0.18 0.03 255);
    --primary: oklch(0.45 0.17 255);
    --primary-foreground: oklch(0.98 0.01 240);
    --secondary: oklch(0.94 0.02 245);
    --secondary-foreground: oklch(0.24 0.04 255);
    --muted: oklch(0.94 0.02 245);
    --muted-foreground: oklch(0.52 0.04 255);
    --accent: oklch(0.92 0.04 210);
    --accent-foreground: oklch(0.24 0.04 255);
    --destructive: oklch(0.58 0.22 25);
    --border: oklch(0.88 0.03 245);
    --input: oklch(0.88 0.03 245);
    --ring: oklch(0.45 0.17 255);
  }

  * {
    box-sizing: border-box;
    border-color: var(--border);
  }

  html {
    font-size: 16px;
  }

  body {
    margin: 0;
    min-width: 320px;
    min-height: 100vh;
    background: #f5f5f3;
    color: var(--foreground);
    font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    line-height: 1.5;
  }

  #root {
    min-height: 100vh;
  }

  :where(a, button, input, textarea, select):focus-visible {
    outline: 3px solid #2c8335;
    outline-offset: 3px;
  }

  :where(button, input, textarea, select) {
    font: inherit;
  }

  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      scroll-behavior: auto !important;
      transition-duration: 0.01ms !important;
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
    }
  }
`
