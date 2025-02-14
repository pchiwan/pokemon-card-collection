import React from "react";

import { HeaderCell } from "../ui/HeaderCell";
import { type Trainer } from "@/lib/parseData";

interface TrainerGridProps {
  isSortedAscending: boolean;
  trainers: Trainer[];
  onSort: (key: keyof Trainer) => void;
  sortingKey: keyof Trainer;
}

export const TrainerGrid = ({
  isSortedAscending,
  onSort,
  trainers,
  sortingKey,
}: TrainerGridProps) => {
  return (
    <div className="grid grid-cols-4 gap-2 py-1 px-2 w-full">
      <hr className="col-span-4" />
      <div>
        <HeaderCell
          isSorting={sortingKey === "id"}
          isSortedAscending={isSortedAscending}
          onClick={() => onSort("id")}
        >
          ID
        </HeaderCell>
      </div>
      <div>
        <HeaderCell
          isSorting={sortingKey === "name"}
          isSortedAscending={isSortedAscending}
          onClick={() => onSort("name")}
        >
          Name
        </HeaderCell>
      </div>
      <div>
        <HeaderCell canSort={false}>Image</HeaderCell>
      </div>
      <div>
        <HeaderCell
          isSorting={sortingKey === "rarity"}
          isSortedAscending={isSortedAscending}
          onClick={() => onSort("rarity")}
        >
          Rarity
        </HeaderCell>
      </div>
      <hr className="col-span-4" />
      {trainers.map((energy) => (
        <React.Fragment key={energy.id}>
          <div className="px-4">{energy.id}</div>
          <div className="px-4">{energy.name}</div>
          <div className="px-4">
            <img
              className="w-[140px]"
              alt={energy.name}
              src={energy.images.small}
            />
          </div>
          <div className="px-4">{energy.rarity}</div>
          <hr className="col-span-4" />
        </React.Fragment>
      ))}
    </div>
  );
};
