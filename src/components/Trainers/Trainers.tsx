import { TrainerGrid } from "./TrainerGrid";
import { useSortingAndFiltering } from "../../hooks/useSortingAndFiltering";
import { type Trainer } from "@/lib/parseData";
import { Input } from "../ui/Input";

export const Trainers = ({ trainerList }: { trainerList: Trainer[] }) => {
  const {
    handleSearchQueryChange,
    handleSort,
    isSortedAscending,
    searchQuery,
    sortingKey,
    values,
  } = useSortingAndFiltering({
    entries: trainerList,
    initialSortingKey: "name",
    searchKeys: ["name"],
  });

  return (
    <div className="w-full flex flex-col items-center gap-6">
      <Input
        className="w-[500px]"
        onChange={handleSearchQueryChange}
        placeholder="Search for a Trainer"
        type="text"
        value={searchQuery}
      />
      <TrainerGrid
        isSortedAscending={isSortedAscending}
        onSort={handleSort}
        trainers={values}
        sortingKey={sortingKey}
      />
    </div>
  );
};
