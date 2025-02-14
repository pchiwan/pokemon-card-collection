import { PokemonGrid } from "./PokemonGrid";
import { useSortingAndFiltering } from "@/hooks/useSortingAndFiltering";
import { type Pokemon } from "@/lib/parseData";
import { Input } from "@/components/ui/Input";

export const Pokemons = ({ pokemonList }: { pokemonList: Pokemon[] }) => {
  const {
    handleSearchQueryChange,
    handleSort,
    isSortedAscending,
    searchQuery,
    sortingKey,
    values,
  } = useSortingAndFiltering({
    entries: pokemonList,
    initialSortingKey: "name",
    searchKeys: ["name", "types", "attacks.name"],
  });

  return (
    <div className="w-full flex flex-col items-center gap-6">
      <Input
        className="w-[500px]"
        onChange={handleSearchQueryChange}
        placeholder="Search for a Pokémon..."
        type="text"
        value={searchQuery}
      />
      <PokemonGrid
        isSortedAscending={isSortedAscending}
        onSort={handleSort}
        pokemons={values}
        sortingKey={sortingKey}
      />
    </div>
  );
};
