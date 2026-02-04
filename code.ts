// Heavy Page Organizer — Figma Plugin
// Organizes components on a page: main components in columns, sub-components below, sections to the right

figma.showUI(__html__, { width: 400, height: 400 });

// Load previous spacing values from client storage
async function loadSpacingValues() {
  try {
    const [storedHorizontal, storedVertical] = await Promise.all([
      figma.clientStorage.getAsync("horizontalSpacing"),
      figma.clientStorage.getAsync("verticalSpacing")
    ]);
    const horizontalSpacing = storedHorizontal ?? 500;
    const verticalSpacing = storedVertical ?? 500;
    figma.ui.postMessage({ type: "load-spacing", horizontalSpacing, verticalSpacing });
  } catch (error) {
    console.error("Error loading spacing values:", error);
  }
}

loadSpacingValues();

// Listen for messages from the UI
figma.ui.onmessage = async (msg) => {
  if (msg?.type === "organize-frames") {
    const verticalSpacing = parseFloat(msg?.verticalSpacing) || 0;
    const horizontalSpacing = parseFloat(msg?.horizontalSpacing) || 0;

    // Save values asynchronously
    try {
      await Promise.all([
        figma.clientStorage.setAsync("horizontalSpacing", horizontalSpacing),
        figma.clientStorage.setAsync("verticalSpacing", verticalSpacing)
      ]);
    } catch (error) {
      console.error("Error saving spacing values:", error);
    }

    organizeFrames(verticalSpacing, horizontalSpacing);
  }

  if (msg?.type === "close") {
    figma.closePlugin();
  }

  if (msg?.type === "open-url" && msg?.url) {
    figma.openExternal(msg.url);
  }
};

// Function to organize Figma elements
function organizeFrames(verticalSpacing: number, horizontalSpacing: number) {
  const mainComponents: (ComponentNode | ComponentSetNode)[] = [];
  const subComponents: (ComponentNode | ComponentSetNode)[] = [];
  const sections: SectionNode[] = [];

  // Identify main components, sub-components, and sections
  for (const node of figma.currentPage.children) {
    if (node.type === "COMPONENT" || node.type === "COMPONENT_SET") {
      if (node.name.startsWith(".")) {
        subComponents.push(node);
      } else {
        mainComponents.push(node);
      }
    }

    if (node.type === "SECTION") {
      sections.push(node);
    }
  }

  if (mainComponents.length === 0) {
    figma.notify("No main components found on this page.", { error: true });
    return;
  }

  const allSelected: SceneNode[] = [];
  const placedSubs = new Set<BaseNode>();
  let xOffset = 0;

  const sortedMain = mainComponents.sort((a, b) => a.name.localeCompare(b.name));

  for (const mainComponent of sortedMain) {
    mainComponent.x = xOffset;
    mainComponent.y = 0;
    allSelected.push(mainComponent);

    let yOffset = mainComponent.height + verticalSpacing;

    // Find related sub-components (those starting with ".MainComponentName")
    const parentName = mainComponent.name.trim();
    const relatedSubs = subComponents
      .filter((sub) => {
        const subName = sub.name.trim();
        return subName === `.${parentName}` ||
               subName.startsWith(`.${parentName}/`) ||
               subName.startsWith(`.${parentName}.`);
      })
      .sort((a, b) => a.name.localeCompare(b.name));

    for (const subComponent of relatedSubs) {
      subComponent.x = xOffset;
      subComponent.y = yOffset;
      yOffset += subComponent.height + verticalSpacing;
      allSelected.push(subComponent);
      placedSubs.add(subComponent);
    }

    const columnWidth = Math.max(mainComponent.width, ...relatedSubs.map(s => s.width));
    xOffset += columnWidth + horizontalSpacing;
  }

  // Place orphaned sub-components (no matching parent) in their own column
  const orphanedSubs = subComponents
    .filter((sub) => !placedSubs.has(sub))
    .sort((a, b) => a.name.localeCompare(b.name));

  if (orphanedSubs.length > 0) {
    let yOffset = 0;
    for (const sub of orphanedSubs) {
      sub.x = xOffset;
      sub.y = yOffset;
      yOffset += sub.height + verticalSpacing;
      allSelected.push(sub);
    }
    const orphanColumnWidth = Math.max(...orphanedSubs.map(s => s.width));
    xOffset += orphanColumnWidth + horizontalSpacing;
  }

  // Place sections to the right
  let sectionYOffset = 0;
  const sortedSections = sections.sort((a, b) => a.name.localeCompare(b.name));

  for (const section of sortedSections) {
    section.x = xOffset;
    section.y = sectionYOffset;
    sectionYOffset += section.height + verticalSpacing;
    allSelected.push(section);
  }

  // Select and zoom to organized elements
  figma.currentPage.selection = allSelected;
  figma.viewport.scrollAndZoomIntoView(allSelected);

  const orphanCount = orphanedSubs.length;
  const message = orphanCount > 0
    ? `Organized! (${orphanCount} sub-component${orphanCount === 1 ? '' : 's'} had no matching parent)`
    : "Main, sub-components, and sections arranged!";
  figma.notify(message);
  figma.closePlugin();
}
