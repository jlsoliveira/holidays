"use client";

import type { HolidayType } from "@/types/holiday";
import styles from "./Badge.module.css";

const labelByType: Record<HolidayType, string> = {
  national: "Nacional",
  state: "Estadual",
  municipal: "Municipal",
  optional: "Opcional",
};

const Badge = ({ type }: { type: HolidayType }) => {
  const label = labelByType[type] ?? labelByType.national;
  const cls = `${styles.default} ${styles[type] ?? styles.national}`;

  return (
    <span className={cls} aria-label={`Tipo: ${label}`}>
      {label}
    </span>
  );
};

export default Badge;
