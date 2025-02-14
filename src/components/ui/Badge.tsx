import React from "react";

import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {}

function Badge({ className, ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex text-white items-center rounded-full border border-zinc-200 px-2.5 py-0.5 text-xs font-semibold",
        className
      )}
      {...props}
    />
  );
}

export { Badge };
