/**
 * Componente de skeleton para estados de carregamento
 */

import { cn } from "@/lib/utils";

/**
 * Props do componente Skeleton
 */
type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * Componente de skeleton para loading states
 */
function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-muted",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };


