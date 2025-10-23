export type HolidayType = "national" | "state" | "municipal" | "optional";

export interface Holiday {
  date: string;
  name: string;
  type: HolidayType;
}
