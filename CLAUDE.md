# Heavy Page Organizer

Figma plugin that organizes components on a page with configurable spacing.

**Important:** When working on this project, reference the official Figma Plugin documentation for API details, best practices, and capabilities: https://www.figma.com/plugin-docs/

## Files

| File | Purpose |
|------|---------|
| `code.ts` | Main plugin logic |
| `ui.src.html` | UI source (edit this, not `ui.html`) |
| `heavy-theme.css` | Shared dark theme (Heavy Tabs / Spacegray) |
| `build-ui.js` | Inlines CSS into `ui.src.html` to produce `ui.html` |
| `ui.html` | **Build artifact** — generated from `ui.src.html` + `heavy-theme.css` |
| `manifest.json` | Plugin configuration |
| `package.json` | Build scripts |

## Build

```bash
npm install        # Install dependencies
npm run build      # Production build (UI + code)
npm run build:ui   # Build ui.html only
npm run build:code # Build code.js only
npm run dev        # Build UI + watch mode for code
npm run typecheck  # Type checking
```

**Note:** `/commit-push-pr` auto-runs `npm run build` + `npm run typecheck` before staging. No need to build manually before committing.

## Build Target

esbuild uses `--target=es6` because Figma's plugin sandbox doesn't support ES2020+ syntax (e.g., `??`, `?.`). Write modern TypeScript freely — esbuild transpiles it down automatically.

## UI Build System

- `ui.src.html` is the source file — edit this for UI changes
- `heavy-theme.css` contains the shared dark theme (Spacegray / Base16 Ocean)
- `build-ui.js` replaces the `<!-- HEAVY_THEME -->` marker in `ui.src.html` with the inlined CSS
- `ui.html` is the build output referenced by `manifest.json` — do not edit directly
- Plugin-specific CSS overrides go in a `<style>` block after the marker in `ui.src.html`

## How It Works

1. Run the plugin on any Figma page
2. Set horizontal and vertical spacing values
3. Click Apply
4. Main components are arranged in columns (sorted alphabetically)
5. Sub-components (prefixed with `.`) are stacked below their parent
6. Sections are placed to the right of all components
