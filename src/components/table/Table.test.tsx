import { render, screen } from "@testing-library/react";
import Table, { type TableColumn } from "./Table";
import styles from "./Table.module.css";

type Row = {
  id: string;
  name: string;
  date: string;
};

const columns: TableColumn<Row>[] = [
  { id: "name", header: "Name", accessor: "name" },
  { id: "date", header: "Date", accessor: "date" },
  { id: "status", header: "Status", render: () => "Observed" },
];

describe("Table", () => {
  it("renders data rows and custom classes", () => {
    const data: Row[] = [
      { id: "1", name: "New Year", date: "2024-01-01" },
      { id: "2", name: "Carnival", date: "2024-02-13" },
    ];

    render(
      <Table
        columns={columns}
        data={data}
        containerClassName="custom-container"
        tableClassName="custom-table"
        rowClassName={() => "highlight"}
      />,
    );

    const container = screen.getByRole("table").closest("div");
    expect(container).toHaveClass(styles.container);
    expect(container).toHaveClass("custom-container");

    const table = screen.getByRole("table");
    expect(table).toHaveClass(styles.table);
    expect(table).toHaveClass("custom-table");

    expect(screen.getByRole("columnheader", { name: "Name" })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: "Status" })).toBeInTheDocument();

    expect(screen.getByText("New Year")).toBeInTheDocument();
    expect(screen.getAllByText("Observed")).toHaveLength(2);

    const firstRow = screen.getByText("New Year").closest("tr");
    expect(firstRow).toHaveClass(styles.row);
    expect(firstRow).toHaveClass("highlight");
  });

  it("shows an empty state when there is no data", () => {
    render(<Table columns={columns} data={[]} emptyMessage="Nothing here" />);

    expect(screen.getByText("Nothing here")).toBeInTheDocument();
  });
});
