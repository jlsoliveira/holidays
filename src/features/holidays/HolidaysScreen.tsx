"use client";

import type { TableColumn } from "@/components";
import { Badge, SearchBar, Select, Table } from "@/components";
import { useHolidayContext } from "@/contexts/holidayContext";
import { Holiday } from "@/types/holiday";
import { formatDateBR } from "@/util/format-date-br";
import { useMemo } from "react";

export const HolidaysScreen = () => {
  const {
    filteredHolidays,
    resultsCount,
    sortOrder,
    sortOptions,
    searchTerm,
    setSearchTerm,
    typeOptions,
    typeFilter,
    onTypeFilterChange,
    dateOptions,
    dateFilter,
    onDateFilterChange,
    onSortOrderChange,
  } = useHolidayContext();

  const columns = useMemo<TableColumn<Holiday>[]>(
    () => [
      {
        id: "name",
        header: "Nome",
        accessor: "name",
      },
      {
        id: "date",
        header: "Data",
        render: (row) => formatDateBR(row.date),
      },
      {
        id: "type",
        header: "Tipo",
        render: (row) => <Badge type={row.type} />,
      },
    ],
    [],
  );

  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_auto] gap-4 items-center">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          onSearch={setSearchTerm}
          placeholder="Busque por nome"
        />

        <div className="flex flex-wrap gap-4 items-center">
          <div className="justify-self-start lg:justify-self-end text-xs text-gray-500">
            {resultsCount} registros
          </div>
          <Select
            options={sortOptions}
            value={sortOrder}
            onChange={onSortOrderChange}
            variant="outline"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-4 items-center">
        <Select options={typeOptions} value={typeFilter} onChange={onTypeFilterChange} />

        <Select
          options={dateOptions}
          value={dateFilter}
          onChange={onDateFilterChange}
          variant="primary"
        />
      </div>

      <Table
        columns={columns}
        data={filteredHolidays}
        emptyMessage="Nenhum resultado encontrado"
        getRowKey={(row) => `${row.date}-${row.name}`}
      />
    </div>
  );
};

export default HolidaysScreen;
