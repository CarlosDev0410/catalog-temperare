/**
 * Hook customizado para gerenciar dados das aplicações
 */

import { useState, useEffect, useCallback } from "react";
import { App, SearchFilters, SearchResults, LoadingState } from "@/types";
import { AppService, IAppService } from "@/services/app-service";

/**
 * Interface para o retorno do hook
 */
interface UseAppsReturn {
  apps: App[];
  loading: LoadingState;
  searchResults: SearchResults | null;
  searchApps: (filters: SearchFilters) => Promise<void>;
  refetch: () => Promise<void>;
  clearSearch: () => void;
}

/**
 * Hook para gerenciar estado das aplicações
 * @param appService - Serviço de aplicações (injeção de dependência)
 */
export function useApps(appService: IAppService): UseAppsReturn {
  const [apps, setApps] = useState<App[]>([]);
  const [loading, setLoading] = useState<LoadingState>({ isLoading: true });
  const [searchResults, setSearchResults] = useState<SearchResults | null>(null);

  /**
   * Carrega as aplicações do serviço
   */
  const loadApps = useCallback(async (): Promise<void> => {
    try {
      setLoading({ isLoading: true });
      const appsData = await appService.getAllApps();
      setApps(appsData);
      setLoading({ isLoading: false });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro ao carregar aplicações";
      setLoading({ isLoading: false, error: errorMessage });
      console.error('Erro ao carregar aplicações:', err);
    }
  }, [appService]);

  /**
   * Busca aplicações com filtros
   */
  const searchApps = useCallback(async (filters: SearchFilters): Promise<void> => {
    try {
      setLoading({ isLoading: true });
      const results = await appService.searchApps(filters);
      setSearchResults(results);
      setLoading({ isLoading: false });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro ao buscar aplicações";
      setLoading({ isLoading: false, error: errorMessage });
      console.error('Erro ao buscar aplicações:', err);
    }
  }, [appService]);

  /**
   * Recarrega as aplicações
   */
  const refetch = useCallback(async (): Promise<void> => {
    await loadApps();
  }, [loadApps]);

  /**
   * Limpa os resultados de busca
   */
  const clearSearch = useCallback((): void => {
    setSearchResults(null);
  }, []);

  useEffect(() => {
    loadApps();
  }, [loadApps]);

  return { 
    apps, 
    loading, 
    searchResults, 
    searchApps, 
    refetch, 
    clearSearch 
  };
}
