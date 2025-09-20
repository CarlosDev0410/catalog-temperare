/**
 * Constantes da aplicação
 */

/**
 * Caminho para o arquivo de dados
 */
export const DATABASE_PATH = 'src/lib/db.json';

/**
 * Configurações de metadados da aplicação
 */
export const APP_METADATA = {
  title: "Catálogo de Aplicações - TemperareLabs",
  description: "Catálogo de aplicações desenvolvidas pela TemperareLabs",
  company: "TemperareLabs",
  year: "2024"
} as const;

/**
 * Textos da aplicação (será substituído por i18n futuramente)
 */
export const APP_TEXTS = {
  searchPlaceholder: "Pesquisar aplicações...",
  catalogTitle: "Catálogo de Aplicações",
  accessApp: "Acessar Aplicação",
  allRightsReserved: "Todos os direitos reservados.",
  developedBy: "Desenvolvido por TemperareLabs."
} as const;
