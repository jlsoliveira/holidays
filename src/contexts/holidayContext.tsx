"use client";

import type { ReactNode } from "react";
import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { SelectOption } from "@/components/select/Select";
import {
  isTypeFilterValue,
  useHolidaySelectOptions,
  type DateFilterValue,
  type TypeFilterValue,
} from "@/hooks/useHolidayFilters";
import type { Holiday } from "@/types/holiday";

type SortOrder = "asc" | "desc";

type HolidayContextValue = {
  holidays: Holiday[];
  filteredHolidays: Holiday[];
  resultsCount: number;
  typeFilter: TypeFilterValue;
  dateFilter: DateFilterValue;
  sortOrder: SortOrder;
  searchTerm: string;
  typeOptions: SelectOption[];
  dateOptions: SelectOption[];
  sortOptions: SelectOption[];
  setSearchTerm: (value: string) => void;
  onTypeFilterChange: (value: string) => void;
  onDateFilterChange: (value: string) => void;
  onSortOrderChange: (value: string) => void;
};

type HolidayProviderProps = {
  initialData: Holiday[];
  children: ReactNode;
};

const SORT_OPTIONS: SelectOption[] = [
  { value: "asc", label: "crescente" },
  { value: "desc", label: "descrescente" },
];

const SORT_COMPARATORS: Record<SortOrder, (a: Holiday, b: Holiday) => number> = {
  asc: (a, b) => a.date.localeCompare(b.date),
  desc: (a, b) => b.date.localeCompare(a.date),
};

const SORT_ORDERS: SortOrder[] = ["asc", "desc"];

const HolidayContext = createContext<HolidayContextValue | undefined>(undefined);

function isHolidayType(value: TypeFilterValue): value is Holiday["type"] {
  return value !== "all";
}

function isSortOrder(value: string): value is SortOrder {
  return (SORT_ORDERS as string[]).includes(value);
}

type FilterParams = {
  holidays: Holiday[];
  typeFilter: TypeFilterValue;
  dateFilter: DateFilterValue;
  searchTerm: string;
  sortOrder: SortOrder;
  holidaysByType: Record<Holiday["type"], Holiday[]>;
};

function filterHolidays({
  holidays,
  typeFilter,
  dateFilter,
  searchTerm,
  sortOrder,
  holidaysByType,
}: FilterParams) {
  const normalizedSearch = searchTerm.trim().toLowerCase();

  const byType = isHolidayType(typeFilter) ? (holidaysByType[typeFilter] ?? []) : holidays;

  const byDate =
    dateFilter === "all" ? byType : byType.filter((holiday) => holiday.date === dateFilter);

  const searched =
    normalizedSearch.length > 0
      ? byDate.filter((holiday) => holiday.name.toLowerCase().includes(normalizedSearch))
      : byDate;

  return [...searched].sort(SORT_COMPARATORS[sortOrder]);
}

export const HolidayProvider = ({ initialData, children }: HolidayProviderProps) => {
  const { typeOptions, dateOptions, holidaysByType } = useHolidaySelectOptions(initialData);

  const [typeFilter, setTypeFilter] = useState<TypeFilterValue>("all");
  const [dateFilter, setDateFilter] = useState<DateFilterValue>("all");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredHolidays = useMemo(
    () =>
      filterHolidays({
        holidays: initialData,
        typeFilter,
        dateFilter,
        searchTerm,
        sortOrder,
        holidaysByType,
      }),
    [initialData, typeFilter, dateFilter, searchTerm, sortOrder, holidaysByType],
  );

  const handleTypeFilterChange = useCallback((value: string) => {
    if (isTypeFilterValue(value)) {
      setTypeFilter(value);
    }
  }, []);

  const handleDateFilterChange = useCallback((value: string) => {
    setDateFilter(value === "all" ? "all" : value);
  }, []);

  const handleSortOrderChange = useCallback((value: string) => {
    if (isSortOrder(value)) {
      setSortOrder(value);
    }
  }, []);

  const value = useMemo(
    () => ({
      holidays: initialData,
      filteredHolidays,
      resultsCount: filteredHolidays.length,
      typeFilter,
      dateFilter,
      sortOrder,
      searchTerm,
      typeOptions,
      dateOptions,
      sortOptions: SORT_OPTIONS,
      setSearchTerm,
      onTypeFilterChange: handleTypeFilterChange,
      onDateFilterChange: handleDateFilterChange,
      onSortOrderChange: handleSortOrderChange,
    }),
    [
      initialData,
      filteredHolidays,
      typeFilter,
      dateFilter,
      sortOrder,
      searchTerm,
      typeOptions,
      dateOptions,
      handleTypeFilterChange,
      handleDateFilterChange,
      handleSortOrderChange,
      setSearchTerm,
    ],
  );

  return <HolidayContext.Provider value={value}>{children}</HolidayContext.Provider>;
};

export const useHolidayContext = () => {
  const context = useContext(HolidayContext);

  if (!context) {
    throw new Error("useHolidayContext must be used within a HolidayProvider");
  }

  return context;
};
