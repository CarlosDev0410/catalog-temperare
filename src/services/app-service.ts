/**
 * Serviço responsável por gerenciar dados das aplicações
 */

import fs from "fs/promises";
import path from "path";
import { App, DatabaseData, SearchFilters, SearchResults } from "@/types";
import { DATABASE_PATH } from "@/constants";

/**
 * Interface para o serviço de aplicações
 */
export interface IAppService {
  getAllApps(): Promise<App[]>;
  searchApps(filters: SearchFilters): Promise<SearchResults>;
  getAppById(id: string): Promise<App | null>;
  getAppsByCategory(category: string): Promise<App[]>;
}

/**
 * Implementação do serviço de aplicações
 */
export class AppService implements IAppService {
  private cache: App[] | null = null;
  private lastFetch: number = 0;
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

  /**
   * Lê o arquivo de dados do sistema de arquivos
   */
  private async readDatabaseFile(): Promise<string> {
    const filePath = path.join(process.cwd(), DATABASE_PATH);
    return await fs.readFile(filePath, "utf-8");
  }

  /**
   * Faz o parse dos dados JSON
   */
  private parseDatabaseData(fileContent: string): DatabaseData {
    return JSON.parse(fileContent);
  }

  /**
   * Adiciona IDs únicos para as aplicações se não existirem
   */
  private addIdsToApps(apps: App[]): App[] {
    return apps.map((app, index) => ({
      ...app,
      id: app.id || `app-${index + 1}`,
      createdAt: app.createdAt || new Date().toISOString(),
      updatedAt: app.updatedAt || new Date().toISOString(),
    }));
  }

  /**
   * Carrega aplicações com cache
   */
  private async loadApps(): Promise<App[]> {
    const now = Date.now();
    
    if (this.cache && (now - this.lastFetch) < this.CACHE_DURATION) {
      return this.cache;
    }

    try {
      const fileContent = await this.readDatabaseFile();
      const data = this.parseDatabaseData(fileContent);
      const apps = this.addIdsToApps(data.apps);
      
      this.cache = apps;
      this.lastFetch = now;
      
      return apps;
    } catch (error) {
      console.error('Erro ao carregar aplicações:', error);
      throw new Error('Falha ao carregar dados das aplicações');
    }
  }

  /**
   * Retorna todas as aplicações disponíveis
   */
  async getAllApps(): Promise<App[]> {
    return await this.loadApps();
  }

  /**
   * Busca aplicações com filtros
   */
  async searchApps(filters: SearchFilters): Promise<SearchResults> {
    const apps = await this.loadApps();
    const { query, category, tags } = filters;
    
    let filteredApps = apps;

    // Filtro por query
    if (query.trim()) {
      const searchTerm = query.toLowerCase().trim();
      filteredApps = filteredApps.filter(app => 
        app.title.toLowerCase().includes(searchTerm) ||
        app.description.toLowerCase().includes(searchTerm) ||
        app.tags?.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }

    // Filtro por categoria
    if (category) {
      filteredApps = filteredApps.filter(app => app.category === category);
    }

    // Filtro por tags
    if (tags && tags.length > 0) {
      filteredApps = filteredApps.filter(app => 
        app.tags?.some(tag => tags.includes(tag))
      );
    }

    return {
      apps: filteredApps,
      total: filteredApps.length,
      query: query.trim()
    };
  }

  /**
   * Busca aplicação por ID
   */
  async getAppById(id: string): Promise<App | null> {
    const apps = await this.loadApps();
    return apps.find(app => app.id === id) || null;
  }

  /**
   * Busca aplicações por categoria
   */
  async getAppsByCategory(category: string): Promise<App[]> {
    const apps = await this.loadApps();
    return apps.filter(app => app.category === category);
  }
}
