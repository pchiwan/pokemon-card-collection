import { useState } from "react";
import { Tabs } from "@/components/ui/Tabs";
import { Energies } from "./Energies/Energies";
import { Pokemons } from "./Pokemons/Pokemons";
import { Trainers } from "./Trainers/Trainers";

import { energyEntries, pokemonEntries, trainerEntries } from "@/lib/parseData";

export const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState("pokemons");

  return (
    <Tabs
      activationMode="manual"
      className="w-full flex flex-col items-center gap-8"
      defaultValue={selectedTab}
      onValueChange={setSelectedTab}
    >
      <Tabs.List className="grid grid-cols-3 w-full">
        <Tabs.Trigger value="pokemons">Pokémons</Tabs.Trigger>
        <Tabs.Trigger value="energies">Energies</Tabs.Trigger>
        <Tabs.Trigger value="trainers">Trainers</Tabs.Trigger>
      </Tabs.List>
      {selectedTab === "pokemons" && <Pokemons pokemonList={pokemonEntries} />}
      {selectedTab === "energies" && <Energies energyList={energyEntries} />}
      {selectedTab === "trainers" && <Trainers trainerList={trainerEntries} />}
    </Tabs>
  );
};
