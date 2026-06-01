import { useEffect, useRef } from 'react';

import {
  formatMountMessage,
  formatRenderLogMessage,
  getChangedProps,
} from './core/diffProps';
import { appLog } from './core/logSink';

export function useLogRender(
  componentName: string,
  propsToTrack: Record<string, unknown>,
): void {
  const renderCount = useRef(0);
  const previousProps = useRef(propsToTrack);

  renderCount.current += 1;

  useEffect(() => {
    const changedProps = getChangedProps(
      previousProps.current,
      propsToTrack,
    );

    if (__DEV__) {
      const logMessage = formatRenderLogMessage(
        componentName,
        renderCount.current,
      );
      const changedKeys = Object.keys(changedProps);

      if (changedKeys.length > 0) {
        appLog(
          'devOnly',
          `${logMessage} | Изменения:`,
          changedProps,
        );
      } else if (renderCount.current === 1) {
        appLog(
          'devOnly',
          formatMountMessage(componentName),
        );
      }
    }

    previousProps.current = propsToTrack;
  });
}
