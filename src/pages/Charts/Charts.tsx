import { Tabs } from "@/components/ui/Tabs";
import { useState } from "react";
import { CardRarityChart } from "./CardRarityChart";

export const Charts = () => {
  const [selectedTab, setSelectedTab] = useState("card-rarity");

  return (
    <Tabs
      activationMode="manual"
      className="size-full flex flex-col items-center gap-8"
      defaultValue={selectedTab}
      onValueChange={setSelectedTab}
    >
      <Tabs.List className="grid grid-cols-3 w-full">
        <Tabs.Trigger value="card-rarity">Card rarity</Tabs.Trigger>
      </Tabs.List>
      {selectedTab === "card-rarity" && <CardRarityChart />}
    </Tabs>
  );
};
