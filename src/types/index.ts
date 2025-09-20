/**
 * Tipos de dados da aplicação
 */

/**
 * Interface que representa uma aplicação no catálogo
 */
export interface App {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  appUrl: string;
  category?: string;
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Interface para dados do banco de dados
 */
export interface DatabaseData {
  apps: App[];
}

/**
 * Interface para filtros de busca
 */
export interface SearchFilters {
  query: string;
  category?: string;
  tags?: string[];
}

/**
 * Interface para estado de loading
 */
export interface LoadingState {
  isLoading: boolean;
  error?: string;
}

/**
 * Interface para resultados de busca
 */
export interface SearchResults {
  apps: App[];
  total: number;
  query: string;
}
