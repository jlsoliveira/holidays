import { fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import Select from "./Select";

const OPTIONS = [
  { value: "a", label: "Option A" },
  { value: "b", label: "Option B" },
  { value: "c", label: "Option C", disabled: true },
];

function SelectHarness({ onChange }: { onChange: (value: string) => void }) {
  const [value, setValue] = useState("a");

  return (
    <Select
      label="Options"
      options={OPTIONS}
      value={value}
      onChange={(next) => {
        setValue(next);
        onChange(next);
      }}
    />
  );
}

describe("Select", () => {
  it("renders options with label", () => {
    const onChange = jest.fn();
    render(<SelectHarness onChange={onChange} />);

    expect(screen.getByText("Options")).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Option A" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Option C" })).toBeDisabled();
  });

  it("dispatches change events", () => {
    const onChange = jest.fn();
    render(<SelectHarness onChange={onChange} />);

    fireEvent.change(screen.getByRole("combobox"), { target: { value: "b" } });

    expect(onChange).toHaveBeenLastCalledWith("b");
  });
});
