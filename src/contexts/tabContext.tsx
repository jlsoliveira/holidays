"use client";

import React, { createContext, useMemo, useState } from "react";

export type TabsContextValue = {
  value: string;
  setValue: (v: string) => void;
};

export const TabContext = createContext<TabsContextValue | null>(null);

interface TabsProviderProps {
  defaultValue: string;
  children: React.ReactNode;
  className?: string;
}
export function TabsProvider({ defaultValue, children, className }: TabsProviderProps) {
  const [value, setValue] = useState(defaultValue);

  const contextValue = useMemo(
    () => ({
      value,
      setValue,
    }),
    [value],
  );

  return (
    <TabContext.Provider value={contextValue}>
      <div className={className}>{children}</div>
    </TabContext.Provider>
  );
}
