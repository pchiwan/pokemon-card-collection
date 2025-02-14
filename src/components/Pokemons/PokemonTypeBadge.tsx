import { cva, VariantProps } from "class-variance-authority";
import { Badge } from "@/components/ui/Badge";

const badgeVariant = cva(undefined, {
  variants: {
    type: {
      water: "bg-blue-500",
      lightning: "bg-teal-400",
      colorless: "bg-white text-black border-zinc-700",
      grass: "bg-green-700",
      fire: "bg-red-600",
      psychic: "bg-orange-300 text-black",
      metal: "bg-slate-600",
      fairy: "bg-violet-500",
      darkness: "bg-gray-950",
      fighting: "bg-yellow-400 text-black",
      dragon: "bg-emerald-500",
    },
  },
});

export type PokemonType = NonNullable<
  VariantProps<typeof badgeVariant>["type"]
>;
interface PokemonTypeBadgeProps {
  type: PokemonType;
}

export const PokemonTypeBadge = ({
  children,
  type,
}: React.PropsWithChildren<PokemonTypeBadgeProps>) => {
  return <Badge className={badgeVariant({ type })}>{children}</Badge>;
};
