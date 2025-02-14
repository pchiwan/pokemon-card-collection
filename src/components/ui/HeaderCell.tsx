import { Button } from "@/components/ui/Button";
import { ArrowDownAZ, ArrowDownZA } from "lucide-react";
import { cn } from "@/lib/utils";

interface WithSorting {
  canSort?: boolean;
  isSorting?: boolean;
  isSortedAscending?: boolean;
  onClick?: () => void;
}

export const HeaderCell = ({
  canSort = true,
  children,
  isSortedAscending = false,
  isSorting = false,
  onClick,
}: React.PropsWithChildren<WithSorting>) => {
  if (!canSort) {
    return (
      <div className="flex items-center">
        <span className="py-2 px-4 text-base font-medium">{children}</span>
      </div>
    );
  }

  return (
    <Button
      className={cn("group w-full flex justify-between", {
        "bg-blue-50 hover:bg-blue-100": isSorting,
      })}
      onClick={onClick}
      variant="ghost"
    >
      <span className="text-base">{children}</span>
      <ArrowDownAZ
        className={cn("hidden", {
          block: isSorting && isSortedAscending,
          "group-hover:block group-hover:text-gray-400": !isSorting,
        })}
      />
      <ArrowDownZA
        className={cn("hidden", {
          block: isSorting && !isSortedAscending,
        })}
      />
    </Button>
  );
};
