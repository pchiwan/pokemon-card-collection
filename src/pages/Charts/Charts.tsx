import { Tabs } from "@/components/ui/Tabs";
import { useState } from "react";
import { CardRarityChart } from "./CardRarityChart";
import { PokemonTypeVsHPChart } from "./PokemonTypeVsHPChart";

export const Charts = () => {
  const [selectedTab, setSelectedTab] = useState("card-rarity");

  return (
    <Tabs
      activationMode="manual"
      className="size-full flex flex-col items-center gap-8"
      defaultValue={selectedTab}
      onValueChange={setSelectedTab}
    >
      <Tabs.List className="grid grid-cols-2 w-full">
        <Tabs.Trigger value="card-rarity">Card rarity</Tabs.Trigger>
        <Tabs.Trigger value="pokemon-type-hp">
          Pokémon Type VS Average HP
        </Tabs.Trigger>
      </Tabs.List>
      {selectedTab === "card-rarity" && <CardRarityChart />}
      {selectedTab === "pokemon-type-hp" && <PokemonTypeVsHPChart />}
    </Tabs>
  );
};
