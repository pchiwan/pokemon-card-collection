import { EnergyGrid } from "./EnergyGrid";
import { useSortingAndFiltering } from "@/hooks/useSortingAndFiltering";
import { type Energy } from "@/lib/parseData";
import { Input } from "@/components/ui/Input";

export const Energies = ({ energyList }: { energyList: Energy[] }) => {
  const {
    handleSearchQueryChange,
    handleSort,
    isSortedAscending,
    searchQuery,
    sortingKey,
    values,
  } = useSortingAndFiltering({
    entries: energyList,
    initialSortingKey: "name",
    searchKeys: ["name"],
  });

  return (
    <div className="w-full flex flex-col items-center gap-6">
      <Input
        className="w-[500px]"
        onChange={handleSearchQueryChange}
        placeholder="Search for an Energy"
        type="text"
        value={searchQuery}
      />
      <EnergyGrid
        isSortedAscending={isSortedAscending}
        onSort={handleSort}
        energies={values}
        sortingKey={sortingKey}
      />
    </div>
  );
};
