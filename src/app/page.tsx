import { Tab, TabList, TabPanel } from "@/components/tab";
import { HolidayProvider } from "@/contexts/holidayContext";
import { TabsProvider } from "@/contexts/tabContext";
import HolidaysScreen from "@/features/holidays/HolidaysScreen";
import { getHolidays } from "@/services/holidays";

export default async function Page() {
  const holidays = await getHolidays();

  return (
    <main className="container mx-auto">
      <h1 className="text-base tracking-[.15em] text-gray-500 mb-2">MEUS FERIADOS</h1>

      <HolidayProvider initialData={holidays}>
        <TabsProvider defaultValue="holidays">
          <TabList>
            <Tab value="a">Tela A</Tab>
            <Tab value="b">Tela B</Tab>
            <Tab value="c">Tela C</Tab>
            <Tab value="holidays">Feriados</Tab>
          </TabList>

          <div className="pt-4">
            <TabPanel value="a">
              <p>Tela A</p>
            </TabPanel>
            <TabPanel value="b">
              <p>Tela b</p>
            </TabPanel>
            <TabPanel value="c">
              <p>Tela c</p>
            </TabPanel>
            <TabPanel value="holidays">
              <HolidaysScreen />
            </TabPanel>
          </div>
        </TabsProvider>
      </HolidayProvider>
    </main>
  );
}
