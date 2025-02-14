import ashCollectionJson from "../../ash_collection.json";

type CollectionEntry = (typeof ashCollectionJson)[0];

const uniqueEntries = ashCollectionJson.reduce<CollectionEntry[]>(
  (acc, entry) => {
    return !acc.find(({ id }) => id === entry.id) ? [...acc, entry] : acc;
  },
  []
);

const categorisedEntries = uniqueEntries.reduce<{
  [key: string]: CollectionEntry[];
}>((acc, entry) => {
  return {
    ...acc,
    [entry.supertype]: [...(acc[entry.supertype] ?? []), entry],
  };
}, {});

export const pokemonEntries = categorisedEntries["Pokémon"];
export const energyEntries = categorisedEntries["Energy"];
export const trainerEntries = categorisedEntries["Trainer"];

export type Pokemon = (typeof pokemonEntries)[0];
export type Energy = (typeof energyEntries)[0];
export type Trainer = (typeof trainerEntries)[0];
