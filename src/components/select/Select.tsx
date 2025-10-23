"use client";

import React from "react";
import styles from "./Select.module.css";

export type SelectOption = {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
};

export type SelectProps = {
  label?: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  variant?: "outline" | "primary";
};

const Select = ({ label, options, value, onChange, variant }: SelectProps) => {
  const selectClassName = [
    styles.select,
    variant === "primary" ? styles.primary : variant === "outline" ? styles.outline : undefined,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={styles.container}>
      {label ? <span className={styles.label}>{label}</span> : null}
      <div className={styles.selectWrapper}>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label={label}
          className={selectClassName}
        >
          {options.map((opt) => (
            <option key={String(opt.value)} value={String(opt.value)} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Select;
