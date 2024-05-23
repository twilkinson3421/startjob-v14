"use client";

import { interfaceConfig } from "@config/interface";
import { Tooltip } from "@ui-core/tooltip";

export const InterfaceProvider = ({ children }: GTypes.Basic.ReactNode) => {
  return (
    <Tooltip.Provider delayDuration={interfaceConfig.transitionDuration * 2}>
      {children}
    </Tooltip.Provider>
  );
};
