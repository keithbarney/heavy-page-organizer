# Changelog

All notable changes to Heavy Page Organizer are documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [1.0.0] — 2026-02-18

Initial release.

### Added

- **Alphabetical column layout** — main components sorted A-Z into columns with configurable spacing
- **Sub-component grouping** — dot-prefixed components (`.Button/Icon`) placed below their parent
- **Longest-match parent resolution** — `.ButtonGroup/Item` goes under `ButtonGroup`, not `Button`
- **Section placement** — sections arranged to the right of all component columns
- **Orphan column** — sub-components with no matching parent get their own column with a notification
- **Column-width awareness** — next column offset based on widest element in each column
- **Persistent spacing** — horizontal and vertical spacing saved between sessions via client storage
- **Select & zoom** — all organized elements selected and viewport zoomed to fit after layout
- **Keyboard shortcut** — Enter to apply
- **Dark UI** — Heavy Suite Spacegray / Base16 Ocean theme
- Support and feedback links
