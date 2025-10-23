"use client";

import { SelectOption } from "@/components/select/Select";
import type { Holiday, HolidayType } from "@/types/holiday";
import { formatDateBR } from "@/util/format-date-br";
import { useMemo } from "react";

export type TypeFilterValue = "all" | HolidayType;
export type DateFilterValue = "all" | string;

type FilterSelectOption<T extends string> = Omit<SelectOption, "value"> & { value: T };

type HolidaysByTypeMap = Record<HolidayType, Holiday[]>;
type HolidaysByDateMap = Record<string, Holiday[]>;

const HOLIDAY_TYPE_LABELS: Record<HolidayType, string> = {
  national: "Nacional",
  state: "Estadual",
  municipal: "Municipal",
  optional: "Opcional",
};

const HOLIDAY_TYPE_ORDER: HolidayType[] = ["national", "state", "municipal", "optional"];

export const TYPE_FILTER_VALUES: TypeFilterValue[] = ["all", ...HOLIDAY_TYPE_ORDER];

export function isTypeFilterValue(value: string): value is TypeFilterValue {
  return (TYPE_FILTER_VALUES as string[]).includes(value);
}

export function useHolidaysByType(data: Holiday[]): HolidaysByTypeMap {
  return useMemo(
    () =>
      data.reduce<HolidaysByTypeMap>(
        (groups, holiday) => {
          groups[holiday.type].push(holiday);
          return groups;
        },
        {
          national: [],
          state: [],
          municipal: [],
          optional: [],
        },
      ),
    [data],
  );
}

export function useHolidaysByDate(data: Holiday[]): HolidaysByDateMap {
  return useMemo(
    () =>
      data.reduce<HolidaysByDateMap>((acc, holiday) => {
        if (!acc[holiday.date]) {
          acc[holiday.date] = [];
        }
        acc[holiday.date].push(holiday);
        return acc;
      }, {}),
    [data],
  );
}

export function useHolidaySelectOptions(data: Holiday[]) {
  const holidaysByType = useHolidaysByType(data);
  const holidaysByDate = useHolidaysByDate(data);

  const typeOptions = useMemo<FilterSelectOption<TypeFilterValue>[]>(() => {
    const options: FilterSelectOption<TypeFilterValue>[] = [{ value: "all", label: "Tipos" }];

    HOLIDAY_TYPE_ORDER.forEach((type) => {
      if (holidaysByType[type]?.length) {
        options.push({
          value: type,
          label: HOLIDAY_TYPE_LABELS[type],
        });
      }
    });

    return options;
  }, [holidaysByType]);

  const dateOptions = useMemo<FilterSelectOption<DateFilterValue>[]>(() => {
    const uniqueDates = Object.keys(holidaysByDate).sort();

    return [
      { value: "all", label: "Data do feriado" },
      ...uniqueDates.map((date) => ({
        value: date,
        label: formatDateBR(date),
      })),
    ];
  }, [holidaysByDate]);

  return {
    typeOptions,
    dateOptions,
    holidaysByType,
    holidaysByDate,
  };
}
