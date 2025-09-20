/**
 * Página principal do catálogo de aplicações
 */

import PageClient from "./page-client";
import { AppService } from "@/services/app-service";
import { App } from "@/types";

/**
 * Serviço de aplicações (instância singleton)
 */
const appService = new AppService();

/**
 * Carrega todas as aplicações disponíveis
 */
async function getApps(): Promise<App[]> {
  return await appService.getAllApps();
}

/**
 * Componente da página principal
 */
export default async function Home() {
  const apps = await getApps();

  return <PageClient apps={apps} />;
}