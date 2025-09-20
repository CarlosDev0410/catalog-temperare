/**
 * Componente de loading para aplicações
 */

import { Skeleton } from "@/components/ui/skeleton";

/**
 * Componente de skeleton para um card de aplicação
 */
function AppCardSkeleton() {
  return (
    <div className="w-[300px] rounded-xl border bg-card p-6 shadow-sm">
      <div className="space-y-4">
        {/* Título */}
        <Skeleton className="h-6 w-3/4" />
        
        {/* Imagem */}
        <Skeleton className="h-48 w-full rounded-md" />
        
        {/* Descrição */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        
        {/* Botão */}
        <Skeleton className="h-9 w-full" />
      </div>
    </div>
  );
}

/**
 * Componente de loading para grid de aplicações
 */
export function AppsLoading() {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <AppCardSkeleton key={index} />
      ))}
    </div>
  );
}
