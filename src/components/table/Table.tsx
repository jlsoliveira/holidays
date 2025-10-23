import { ReactNode } from "react";
import styles from "./Table.module.css";

export type TableColumn<T> = {
  id?: string;
  header: ReactNode;
  accessor?: keyof T;
  render?: (row: T, index: number) => ReactNode;
  headerClassName?: string;
  cellClassName?: string;
};

type TableProps<T> = {
  columns: TableColumn<T>[];
  data: T[];
  emptyMessage?: ReactNode;
  getRowKey?: (row: T, index: number) => string | number;
  containerClassName?: string;
  tableClassName?: string;
  rowClassName?: (row: T, index: number) => string | undefined;
};

const Table = <T,>({
  columns,
  data,
  emptyMessage = "No records found",
  getRowKey,
  containerClassName,
  tableClassName,
  rowClassName,
}: TableProps<T>) => {
  const resolveRowKey = (row: T, index: number) => {
    if (getRowKey) {
      return getRowKey(row, index);
    }

    if (typeof row === "object" && row !== null && "id" in row) {
      const id = (row as { id?: string | number }).id;
      if (id !== undefined) {
        return id;
      }
    }

    return index;
  };

  const containerClasses = [styles.container, containerClassName].filter(Boolean).join(" ");
  const tableClasses = [styles.table, tableClassName].filter(Boolean).join(" ");

  return (
    <div className={containerClasses}>
      <table className={tableClasses}>
        <thead>
          <tr className={styles.headerRow}>
            {columns.map(({ id, header, headerClassName }, columnIndex) => (
              <th
                key={id ?? columnIndex}
                className={[styles.headerCell, headerClassName].filter(Boolean).join(" ")}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className={styles.emptyCell}>
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={resolveRowKey(row, rowIndex)}
                className={[styles.row, rowClassName?.(row, rowIndex)].filter(Boolean).join(" ")}
              >
                {columns.map(({ id, accessor, render, cellClassName }, columnIndex) => {
                  const content = render
                    ? render(row, rowIndex)
                    : accessor
                      ? (row as Record<string, ReactNode>)[accessor as string]
                      : null;

                  return (
                    <td
                      key={id ?? columnIndex}
                      className={[styles.cell, cellClassName].filter(Boolean).join(" ")}
                    >
                      {content}
                    </td>
                  );
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
