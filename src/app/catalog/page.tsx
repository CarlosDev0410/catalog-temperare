/**
 * Página client-side do catálogo com funcionalidades interativas
 */

"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AppsList } from "@/components/apps/apps-list";
import { AppService } from "@/services/app-service";
import { App } from "@/types";
import { APP_TEXTS } from "@/constants";

/**
 * Componente da página do catálogo com busca
 */
export default function CatalogPage() {
  const [apps, setApps] = useState<App[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  /**
   * Carrega as aplicações
   */
  useEffect(() => {
    const loadApps = async () => {
      try {
        setLoading(true);
        const appService = new AppService();
        const appsData = await appService.getAllApps();
        setApps(appsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao carregar aplicações");
      } finally {
        setLoading(false);
      }
    };

    loadApps();
  }, []);

  /**
   * Manipula mudanças na busca
   */
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  /**
   * Manipula a ação de busca
   */
  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow p-8">
          <h1 className="mb-8 text-4xl font-bold text-center">
            {APP_TEXTS.catalogTitle}
          </h1>
          <div className="text-center py-8">
            <p className="text-muted-foreground">Carregando aplicações...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow p-8">
          <h1 className="mb-8 text-4xl font-bold text-center">
            {APP_TEXTS.catalogTitle}
          </h1>
          <div className="text-center py-8">
            <p className="text-destructive">Erro: {error}</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header 
        onSearchChange={handleSearchChange}
        onSearch={handleSearch}
        searchValue={searchTerm}
      />
      <main className="flex-grow p-8">
        <h1 className="mb-8 text-4xl font-bold text-center">
          {APP_TEXTS.catalogTitle}
        </h1>
        <AppsList 
          apps={apps} 
          onSearchChange={handleSearchChange}
        />
      </main>
      <Footer />
    </div>
  );
}
