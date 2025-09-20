/**
 * Página de catálogo de aplicações (Server Component)
 */

import { AppService } from "@/services/app-service";
import CatalogPageClient from "./page-client";
import { App } from "@/types";

/**
 * Carrega todas as aplicações disponíveis
 */
async function getApps(): Promise<App[]> {
  const appService = new AppService();
  return await appService.getAllApps();
}

/**
 * Componente server-side da página de catálogo
 */
export default async function CatalogPage() {
  const apps = await getApps();

  return <CatalogPageClient apps={apps} />;
}