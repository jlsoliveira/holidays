"use client";

import { useTabs } from "@/hooks/useTabs";
import React from "react";
import styles from "./Tab.module.css";

interface TabProps {
  value: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
}

export const Tab = ({ value, children, className, activeClassName }: TabProps) => {
  const { value: active, setValue } = useTabs();
  const selected = active === value;

  const buttonClassName = [
    styles.tab,
    selected ? styles.active : styles.inactive,
    className,
    selected ? activeClassName : undefined,
  ]
    .filter(Boolean)
    .join(" ");

  const handleClick = () => {
    setValue(value);
  };

  return (
    <button
      id={`tab-${value}`}
      role="tab"
      aria-selected={selected}
      aria-controls={`panel-${value}`}
      tabIndex={selected ? 0 : -1}
      onClick={handleClick}
      className={buttonClassName}
      data-active={selected ? "" : undefined}
    >
      {children}
    </button>
  );
};
