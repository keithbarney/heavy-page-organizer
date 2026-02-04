# Heavy Page Organizer

Figma plugin that organizes components on a page with configurable spacing.

## What it does

1. Run the plugin on any Figma page
2. Set horizontal and vertical spacing values
3. Click Apply

Main components are arranged alphabetically in columns. Sub-components (prefixed with `.`) are stacked below their parent. Sections are placed to the right of all components.

## Features

- Alphabetical column layout for main components
- Sub-components grouped under their parent by name (`.Button/Icon` goes under `Button`)
- Sections placed after all component columns
- Column width adapts to the widest element in the column
- Orphaned sub-components get their own column
- Spacing values persist between sessions
- Keyboard shortcut: Enter to apply

## Install

Search for **Heavy Page Organizer** in the Figma Community, or import the `manifest.json` for local development.

## Development

```bash
npm install
npm run dev        # Watch mode
npm run build      # Production build
npm run typecheck   # Type checking
```

## Tech Stack

- TypeScript
- esbuild (bundler)
- Figma Plugin API

## Files

| File | Purpose |
|------|---------|
| `code.ts` | Plugin logic |
| `ui.html` | UI panel |
| `manifest.json` | Plugin config |

## Support

[heavy.lemonsqueezy.com](https://heavy.lemonsqueezy.com)
