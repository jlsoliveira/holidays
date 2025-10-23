"use client";

import { TabContext } from "@/contexts/tabContext";
import { useContext } from "react";

export function useTabs() {
  const ctx = useContext(TabContext);
  if (!ctx) {
    throw new Error("useTabs must be used inside <TabsProvider>.");
  }
  return ctx;
}
