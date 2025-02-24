import React from "react";

import { HeaderCell } from "@/components/ui/HeaderCell";
import { type Pokemon } from "@/lib/parseData";
import { PokemonTypeBadge, type PokemonType } from "./PokemonTypeBadge";

interface PokemonGridProps {
  isSortedAscending: boolean;
  pokemons: Pokemon[];
  onSort: (key: keyof Pokemon) => void;
  sortingKey: keyof Pokemon;
}

const PokemonTypeBadges = ({ types }: { types: string[] }) => {
  if (!types.length) {
    return null;
  }

  return (
    <div className="flex gap-1">
      {types.map((type) => (
        <PokemonTypeBadge key={type} type={type.toLowerCase() as PokemonType}>
          {type}
        </PokemonTypeBadge>
      ))}
    </div>
  );
};

export const PokemonGrid = ({
  isSortedAscending,
  onSort,
  pokemons,
  sortingKey,
}: PokemonGridProps) => {
  return (
    <div className="grid grid-cols-8 gap-2 py-1 px-2 w-full">
      <hr className="col-span-8" />
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
          isSorting={sortingKey === "hp"}
          isSortedAscending={isSortedAscending}
          onClick={() => onSort("hp")}
        >
          HP
        </HeaderCell>
      </div>
      <div>
        <HeaderCell
          isSorting={sortingKey === "weaknesses"}
          isSortedAscending={isSortedAscending}
          onClick={() => onSort("weaknesses")}
        >
          Weaknesses
        </HeaderCell>
      </div>
      <div>
        <HeaderCell
          isSorting={sortingKey === "resistances"}
          isSortedAscending={isSortedAscending}
          onClick={() => onSort("resistances")}
        >
          Resistances
        </HeaderCell>
      </div>
      <div>
        <HeaderCell
          isSorting={sortingKey === "types"}
          isSortedAscending={isSortedAscending}
          onClick={() => onSort("types")}
        >
          Types
        </HeaderCell>
      </div>
      <div>
        <HeaderCell canSort={false}>Evolves To / From</HeaderCell>
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
      <hr className="col-span-8" />
      {pokemons.map((pokemon) => (
        <React.Fragment key={pokemon.id}>
          <div className="px-4">{pokemon.name}</div>
          <div className="px-4">
            <img
              className="w-[140px]"
              alt={pokemon.name}
              src={pokemon.images.small}
            />
          </div>
          <div className="px-4">{pokemon.hp}</div>
          <div className="px-4">
            {pokemon.weaknesses?.map((weakness, index) => (
              <p key={index}>
                {weakness.type} {weakness.value}
              </p>
            ))}
          </div>
          <div className="px-4">
            {pokemon.resistances?.map((resistance, index) => (
              <p key={index}>
                {resistance.type} {resistance.value}
              </p>
            ))}
          </div>
          <div className="px-4">
            <PokemonTypeBadges types={pokemon.types ?? []} />
          </div>
          <div className="px-4 break-words">
            {`${pokemon.evolvesTo ?? "-"} / ${pokemon.evolvesFrom ?? "-"}`}
          </div>
          <div className="px-4">{pokemon.rarity}</div>
          <hr className="col-span-8" />
        </React.Fragment>
      ))}
    </div>
  );
};
