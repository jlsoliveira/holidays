import { fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import SearchBar from "./SearchBar";

function SearchBarHarness({
  onChange,
  onSearch,
  placeholder,
}: {
  onChange: (value: string) => void;
  onSearch: (value: string) => void;
  placeholder?: string;
}) {
  const [value, setValue] = useState("");

  return (
    <SearchBar
      value={value}
      onChange={(next) => {
        setValue(next);
        onChange(next);
      }}
      onSearch={onSearch}
      placeholder={placeholder}
    />
  );
}

describe("SearchBar", () => {
  it("updates value and triggers callbacks while typing", () => {
    const handleChange = jest.fn();
    const handleSearch = jest.fn();

    render(<SearchBarHarness onChange={handleChange} onSearch={handleSearch} />);

    const input = screen.getByRole("searchbox");
    fireEvent.change(input, { target: { value: "Carnaval" } });

    expect(handleChange).toHaveBeenLastCalledWith("Carnaval");
    expect(handleSearch).toHaveBeenLastCalledWith("Carnaval");
  });

  it("executes search when pressing enter", () => {
    const handleChange = jest.fn();
    const handleSearch = jest.fn();

    render(<SearchBarHarness onChange={handleChange} onSearch={handleSearch} />);

    const input = screen.getByRole("searchbox");
    fireEvent.change(input, { target: { value: "Pascoa" } });
    fireEvent.keyDown(input, { key: "Enter" });

    expect(handleSearch).toHaveBeenCalledWith("Pascoa");
  });

  it("executes search when clicking the button", () => {
    const handleChange = jest.fn();
    const handleSearch = jest.fn();

    render(<SearchBarHarness onChange={handleChange} onSearch={handleSearch} />);

    const input = screen.getByRole("searchbox");
    fireEvent.change(input, { target: { value: "Natal" } });

    fireEvent.click(screen.getByRole("button", { name: /pesquisar/i }));

    expect(handleSearch).toHaveBeenCalledWith("Natal");
  });
});
