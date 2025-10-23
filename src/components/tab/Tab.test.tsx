import { TabsProvider } from "@/contexts/tabContext";
import { fireEvent, render, screen } from "@testing-library/react";
import { Tab } from "./Tab";
import { TabList } from "./TabList";
import { TabPanel } from "./TabPanel";

function renderTabs() {
  return render(
    <TabsProvider defaultValue="one">
      <TabList>
        <Tab value="one">One</Tab>
        <Tab value="two">Two</Tab>
      </TabList>
      <TabPanel value="one">Panel One</TabPanel>
      <TabPanel value="two">Panel Two</TabPanel>
    </TabsProvider>,
  );
}

describe("Tabs components", () => {
  it("selects tabs and displays their panels", () => {
    renderTabs();

    const tablist = screen.getByRole("tablist");
    expect(tablist).toBeInTheDocument();

    const tabOne = screen.getByRole("tab", { name: "One" });
    const tabTwo = screen.getByRole("tab", { name: "Two" });

    expect(tabOne).toHaveAttribute("aria-selected", "true");
    expect(tabTwo).toHaveAttribute("aria-selected", "false");
    expect(screen.getByText("Panel One")).toBeInTheDocument();
    expect(screen.queryByText("Panel Two")).not.toBeInTheDocument();

    fireEvent.click(tabTwo);

    expect(tabTwo).toHaveAttribute("aria-selected", "true");
    expect(tabOne).toHaveAttribute("aria-selected", "false");
    expect(screen.getByText("Panel Two")).toBeInTheDocument();
    expect(screen.queryByText("Panel One")).not.toBeInTheDocument();
  });
});
