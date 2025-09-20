/**
 * Componente de grid para exibir aplicações
 */

"use client";

import { motion } from "framer-motion";
import { App } from "@/types";
import { CardApp } from "@/components/card-app";


/**
 * Props do componente AppsGrid
 */
interface AppsGridProps {
  apps: App[];
  className?: string;
}

/**
 * Variantes de animação para o container
 */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

/**
 * Componente que renderiza um grid de aplicações
 */
export function AppsGrid({ apps, className }: AppsGridProps) {
  /**
   * Renderiza uma aplicação individual
   */
  const renderApp = (app: App, index: number) => (
    <CardApp 
      key={`${app.title}-${index}`} 
      {...app} 
      index={index}
    />
  );

  return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center ${className || ""}`}
      >
        
          {apps.map(renderApp)}
        
      </motion.div>
  );
}
