
/**
 * Componente de rodapé da aplicação
 */

"use client";

import { motion } from "framer-motion";
import { APP_METADATA, APP_TEXTS } from "@/constants";
import { Separator } from "@/components/ui/separator";

/**
 * Componente de rodapé com informações da empresa
 */
export function Footer() {
  return (
    <motion.footer 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="mt-auto border-t bg-gradient-to-r from-background to-muted/20"
    >
      <div className="container mx-auto p-6">
        <Separator className="mb-6" />
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <p className="text-sm text-muted-foreground">
              © {APP_METADATA.year} {APP_METADATA.company}. {APP_TEXTS.allRightsReserved}
            </p>
            <p className="text-sm text-muted-foreground">
              {APP_TEXTS.developedBy}
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex items-center gap-4"
          >
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>Sistema Online</span>
            </div>
            
            <div className="text-xs text-muted-foreground">
              v1.0.0
            </div>
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
}
