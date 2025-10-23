import Badge from "@/components/badge/Badge";
import { render, screen } from "@testing-library/react";

describe("Badge", () => {
  it.each([
    ["national", "Nacional"],
    ["state", "Estadual"],
    ["municipal", "Municipal"],
    ["optional", "Opcional"],
  ] as const)("renders the %s label", (type, label) => {
    render(<Badge type={type} />);

    const badge = screen.getByText(label);
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveAccessibleName(`Tipo: ${label}`);
  });

  it("falls back to the national label when type is unknown", () => {
    render(<Badge type={"unknown" as never} />);

    const badge = screen.getByText("Nacional");
    expect(badge).toBeInTheDocument();
  });
});
