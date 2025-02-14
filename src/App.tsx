import { useState } from "react";
import { Tabs } from "@/components/ui/Tabs";
import { Energies } from "./components/Energies/Energies";
import { Pokemons } from "./components/Pokemons/Pokemons";
import { Trainers } from "./components/Trainers/Trainers";

import { energyEntries, pokemonEntries, trainerEntries } from "@/lib/parseData";

export const App = () => {
  const [selectedTab, setSelectedTab] = useState("pokemons");

  return (
    <main className="flex flex-col items-center gap-8 py-16 max-w-[1280px] mx-auto">
      <h1 className="text-4xl font-bold">Ash's Pokémon Card Collection</h1>
      <Tabs
        activationMode="manual"
        className="w-full flex flex-col items-center gap-8"
        defaultValue={selectedTab}
        onValueChange={setSelectedTab}
      >
        <Tabs.List className="grid grid-cols-3 w-[800px]">
          <Tabs.Trigger value="pokemons">Pokémons</Tabs.Trigger>
          <Tabs.Trigger value="energies">Energies</Tabs.Trigger>
          <Tabs.Trigger value="trainers">Trainers</Tabs.Trigger>
        </Tabs.List>
        {selectedTab === "pokemons" && (
          <Pokemons pokemonList={pokemonEntries} />
        )}
        {selectedTab === "energies" && <Energies energyList={energyEntries} />}
        {selectedTab === "trainers" && (
          <Trainers trainerList={trainerEntries} />
        )}
      </Tabs>
    </main>
  );
};
