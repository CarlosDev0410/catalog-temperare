/**
 * Componente de lista de aplicações
 */

"use client";

import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { App, SearchResults, LoadingState } from "@/types";
import { AppsGrid } from "@/components/apps/apps-grid";
import { AppsLoading } from "@/components/loading/apps-loading";
import { Badge } from "@/components/ui/badge";

/**
 * Props do componente AppsList
 */
interface AppsListProps {
  apps: App[];
  searchResults?: SearchResults | null;
  loading?: LoadingState;
  className?: string;
}

/**
 * Componente que gerencia a lista de aplicações
 */
export function AppsList({ 
  apps, 
  searchResults, 
  loading = { isLoading: false }, 
  className 
}: AppsListProps) {
  /**
   * Determina quais aplicações exibir
   */
  const displayApps = useMemo(() => {
    if (searchResults) {
      return searchResults.apps;
    }
    return apps;
  }, [apps, searchResults]);

  /**
   * Determina se está fazendo busca
   */
  const isSearching = useMemo(() => {
    return searchResults !== null;
  }, [searchResults]);

  /**
   * Renderiza estado de loading
   */
  if (loading.isLoading) {
    return (
      <div className={className}>
        <AppsLoading />
      </div>
    );
  }

  /**
   * Renderiza estado de erro
   */
  if (loading.error) {
    return (
      <div className={className}>
        <div className="text-center py-16">
          <div className="max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 mx-auto bg-destructive/10 rounded-full flex items-center justify-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-destructive"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-destructive">Erro ao carregar aplicações</h3>
            <p className="text-muted-foreground">
              {loading.error}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Resultados da busca */}
      <AnimatePresence mode="wait">
        {isSearching && searchResults && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-6 flex items-center justify-center gap-4"
          >
            <Badge variant="outline" className="text-sm">
              {searchResults.total} resultado{searchResults.total !== 1 ? 's' : ''} para &quot;{searchResults.query}&quot;
            </Badge>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid de aplicações */}
      <AnimatePresence mode="wait">
        {displayApps.length > 0 ? (
          <motion.div
            key="apps-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <AppsGrid apps={displayApps} />
          </motion.div>
        ) : isSearching ? (
          <motion.div
            key="no-results"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="text-center py-16"
          >
            <div className="max-w-md mx-auto space-y-4">
              <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-muted-foreground"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold">Nenhuma aplicação encontrada</h3>
              <p className="text-muted-foreground">
                Não encontramos aplicações que correspondam à sua busca.
                Tente usar termos diferentes ou mais gerais.
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="empty-state"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="text-center py-16"
          >
            <div className="max-w-md mx-auto space-y-4">
              <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-muted-foreground"
                >
                  <rect width="7" height="7" x="3" y="3" rx="1" />
                  <rect width="7" height="7" x="14" y="3" rx="1" />
                  <rect width="7" height="7" x="14" y="14" rx="1" />
                  <rect width="7" height="7" x="3" y="14" rx="1" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold">Nenhuma aplicação disponível</h3>
              <p className="text-muted-foreground">
                Não há aplicações para exibir no momento. Volte mais tarde para ver novidades.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
