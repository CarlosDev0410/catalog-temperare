/**
 * Componente client-side da página principal
 */

"use client";

import { useState, useCallback } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AppsList } from "@/components/apps/apps-list";
import { App } from "@/types";
import { APP_TEXTS, APP_METADATA } from "@/constants";

/**
 * Props do componente PageClient
 */
interface PageClientProps {
  apps: App[];
}

/**
 * Componente client-side da página principal
 */
export default function PageClient({ apps }: PageClientProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<App[] | null>(null);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Manipula mudanças na busca
   */
  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
    setError(null);
  }, []);

  /**
   * Executa a busca
   */
  const handleSearch = useCallback(async (searchValue: string) => {
    if (!searchValue.trim()) {
      setSearchResults(null);
      setIsSearching(false);
      return;
    }

    try {
      setIsSearching(true);
      setError(null);
      
      const response = await fetch(`/api/apps/search?query=${encodeURIComponent(searchValue.trim())}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Falha ao buscar aplicações");
      }
      
      const results = await response.json();
      setSearchResults(results.apps);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao buscar aplicações");
      setSearchResults(null);
    } finally {
      setIsSearching(false);
    }
  }, []);

  /**
   * Determina quais aplicações exibir
   */
  const displayApps = searchResults || apps;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header 
        onSearchChange={handleSearchChange}
        onSearch={handleSearch}
        searchValue={searchTerm}
      />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-12 px-4">
          <div className="container mx-auto text-center">
            <div className="max-w-xl mx-auto space-y-4">
              <h1 className="text-3xl md:text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                {APP_TEXTS.catalogTitle}
              </h1>
              <p className="text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed">
                Descubra nossa coleção de aplicações inovadoras desenvolvidas pela {APP_METADATA.company}
              </p>
              <div className="flex items-center justify-center gap-4 pt-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span>{apps.length} aplicações disponíveis</span>
                </div>
                <div className="w-1 h-1 bg-muted-foreground rounded-full" />
                <div className="text-sm text-muted-foreground">
                  Atualizado recentemente
                </div>
              </div>
            </div>
          </div>
          
          {/* Background decoration */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
          </div>
        </section>

        {/* Apps Section */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <AppsList 
              apps={displayApps}
              loading={{
                isLoading: isSearching,
                error: error || undefined
              }}
            />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}