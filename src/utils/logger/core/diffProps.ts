export type PropChange = {
  from: unknown;
  to: unknown;
};

export function getChangedProps(
  previous: Record<string, unknown>,
  current: Record<string, unknown>,
): Record<string, PropChange> {
  const changed: Record<string, PropChange> = {};

  for (const key of Object.keys(current)) {
    if (previous[key] !== current[key]) {
      changed[key] = {
        from: previous[key],
        to: current[key],
      };
    }
  }

  return changed;
}

export function formatRenderLogMessage(
  componentName: string,
  renderCount: number,
): string {
  return `[RENDER] ${componentName} | Номер рендера: ${renderCount}`;
}

export function formatMountMessage(
  componentName: string,
): string {
  return `[MOUNT] ${componentName} смонтирован`;
}
