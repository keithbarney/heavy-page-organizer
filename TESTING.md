# Heavy Page Organizer — User Stories

## Core: Organize Layout

### US-1: Organize main components into columns
**As a** designer with multiple components on a page,
**I want to** run the plugin and apply spacing,
**So that** all main components are arranged alphabetically in columns.

**Given** a page with main components (Button, Card, Input)
**When** I set spacing to 500/500 and click Apply
**Then** components are arranged left-to-right alphabetically (Button, Card, Input) at y=0 with 500px horizontal gaps

---

### US-2: Stack sub-components below their parent
**As a** designer using dot-prefixed sub-components,
**I want** sub-components to appear below their parent,
**So that** related components are visually grouped.

**Given** main component "Button" and sub-components ".Button/Icon", ".Button/Loading"
**When** I run the plugin
**Then** sub-components appear stacked below "Button" in alphabetical order with vertical spacing

---

### US-3: Sub-component matching uses exact parent name
**As a** designer with similarly-named components,
**I want** sub-components to match only their exact parent,
**So that** ".ButtonGroup/Item" is not placed under "Button".

**Given** main components "Button" and "ButtonGroup", sub-component ".ButtonGroup/Item"
**When** I run the plugin
**Then** ".ButtonGroup/Item" appears only under "ButtonGroup", not "Button"

---

### US-4: Place sections to the right of all components
**As a** designer using sections for documentation,
**I want** sections placed after all component columns,
**So that** documentation doesn't interfere with component layout.

**Given** a page with components and sections
**When** I run the plugin
**Then** sections appear to the right of the last component column, stacked vertically

---

### US-5: Column width accounts for widest element
**As a** designer with sub-components wider than their parent,
**I want** columns to not overlap,
**So that** the layout is clean regardless of sub-component sizes.

**Given** a main component (200px wide) with a sub-component (400px wide)
**When** I run the plugin
**Then** the next column starts 400px + horizontal spacing to the right

---

### US-6: Handle orphaned sub-components
**As a** designer with sub-components that have no matching parent,
**I want** orphaned sub-components to still be placed,
**So that** nothing is left behind on the canvas.

**Given** a sub-component ".OldComponent/Variant" with no matching main component
**When** I run the plugin
**Then** it is placed in its own column before sections, and a notification mentions the orphan count

---

## Core: Spacing Persistence

### US-7: Save and restore spacing values
**As a** returning user,
**I want** my last-used spacing values to be remembered,
**So that** I don't have to re-enter them each time.

**Given** I previously ran the plugin with spacing 300/200
**When** I reopen the plugin
**Then** the inputs show 300 and 200

---

### US-8: Zero spacing is preserved
**As a** designer who wants components flush against each other,
**I want** a spacing value of 0 to be saved and restored,
**So that** it doesn't revert to the default 500.

**Given** I set both spacing values to 0 and apply
**When** I reopen the plugin
**Then** the inputs show 0, not 500

---

## Edge Cases

### US-9: Empty page shows error
**As a** user who accidentally runs the plugin on an empty page,
**I want** a clear error message,
**So that** I know nothing was organized.

**Given** a page with no main components
**When** I run the plugin
**Then** an error notification appears: "No main components found on this page."

---

### US-10: Select and zoom after organizing
**As a** designer,
**I want** the viewport to zoom to the organized layout,
**So that** I can immediately see the result.

**Given** a page with components
**When** I run the plugin
**Then** all organized elements are selected and the viewport zooms to fit them
