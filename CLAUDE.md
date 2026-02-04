# Heavy Page Organizer

Figma plugin that organizes components on a page with configurable spacing.

**Important:** When working on this project, reference the official Figma Plugin documentation for API details, best practices, and capabilities: https://www.figma.com/plugin-docs/

## Files

| File | Purpose |
|------|---------|
| `code.ts` | Main plugin logic |
| `ui.html` | UI panel with spacing inputs |
| `manifest.json` | Plugin configuration |
| `package.json` | Build scripts |

## Build

```bash
npm install      # Install dependencies
npm run dev      # Watch mode (esbuild)
npm run build    # Production build (minified)
npm run typecheck # Type checking
```

## Build Target

esbuild uses `--target=es6` because Figma's plugin sandbox doesn't support ES2020+ syntax (e.g., `??`, `?.`). Write modern TypeScript freely — esbuild transpiles it down automatically.

## How It Works

1. Run the plugin on any Figma page
2. Set horizontal and vertical spacing values
3. Click Apply
4. Main components are arranged in columns (sorted alphabetically)
5. Sub-components (prefixed with `.`) are stacked below their parent
6. Sections are placed to the right of all components
