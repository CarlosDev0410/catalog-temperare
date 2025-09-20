
/**
 * Componente de cabeçalho da aplicação
 */

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SearchInput } from "@/components/search/search-input";
import { Badge } from "@/components/ui/badge";

/**
 * Props do componente Header
 */
interface HeaderProps {
  onSearchChange?: (value: string) => void;
  onSearch?: (searchTerm: string) => void;
  searchValue?: string;
}

/**
 * Componente de cabeçalho com logo e busca
 */
export function Header({ onSearchChange, onSearch, searchValue }: HeaderProps) {
  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container mx-auto flex items-center justify-center gap-6 p-4">
        <motion.div 
          className="flex items-center gap-4"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="relative">
            <Image 
              src="/Logo.png" 
              alt="TemperareLabs Logo" 
              width={150} 
              height={50}
              className="transition-all duration-300 hover:brightness-110"
            />
            <Badge 
              variant="secondary" 
              className="absolute -top-2 -right-2 text-xs animate-pulse"
            >
              v1.0
            </Badge>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-1 max-w-md"
        >
          <SearchInput 
            value={searchValue}
            onChange={onSearchChange}
            onSearch={onSearch}
            className="w-full max-w-md"
          />
        </motion.div>
      </div>
    </motion.header>
  );
}

