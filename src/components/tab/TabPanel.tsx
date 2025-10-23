"use client";
import { useTabs } from "@/hooks/useTabs";
import type { ReactNode } from "react";

interface TabPanelProps {
  value: string;
  children: ReactNode;
  className?: string;
  keepMounted?: boolean;
}

export const TabPanel = ({ value, children, className, keepMounted = false }: TabPanelProps) => {
  const { value: active } = useTabs();
  const selected = active === value;

  return (
    <div
      id={`panel-${value}`}
      role="tabpanel"
      aria-labelledby={`tab-${value}`}
      hidden={!selected}
      className={className}
    >
      {keepMounted ? children : selected ? children : null}
    </div>
  );
};
