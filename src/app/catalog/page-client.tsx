/**
 * Componente client-side da página de catálogo
 */

"use client";

import { App } from "@/types";
import { AppsList } from "@/components/apps/apps-list";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

/**
 * Props do componente CatalogPageClient
 */
interface CatalogPageClientProps {
  apps: App[];
}

/**
 * Componente client-side da página de catálogo
 */
export default function CatalogPageClient({ apps }: CatalogPageClientProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">Nosso Catálogo</h1>
        <AppsList 
          apps={apps} 
          loading={{ isLoading: false }} // Data is pre-fetched
        />
      </main>
      <Footer />
    </div>
  );
}
