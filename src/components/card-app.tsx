
/**
 * Componente de card para exibir aplicações
 */

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { App } from "@/types";
import { APP_TEXTS } from "@/constants";

/**
 * Props do componente CardApp
 */
interface CardAppProps extends App {
  className?: string;
  index?: number;
}

/**
 * Componente de card que exibe informações de uma aplicação
 */
export function CardApp({ 
  title, 
  description, 
  imageUrl, 
  appUrl, 
  className,
  index = 0
}: CardAppProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  /**
   * Manipula o carregamento da imagem
   */
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: "easeOut"
      }}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.2 }
      }}
      className={className}
    >
      <Card className="group w-[320px] overflow-hidden border border-border bg-card shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/20">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <CardTitle className="text-lg font-semibold leading-tight group-hover:text-primary transition-colors">
              {title}
            </CardTitle>
            <Badge variant="secondary" className="ml-2 text-xs">
              App
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="pb-4">
          <div className="relative overflow-hidden rounded-lg">
            <div className="aspect-video w-full bg-muted">
              <Image
                src={imageUrl}
                alt={title}
                fill
                className={`object-cover transition-all duration-300 ${
                  imageLoaded 
                    ? "scale-100 opacity-100" 
                    : "scale-110 opacity-0"
                }`}
                onLoad={handleImageLoad}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              {!imageLoaded && (
                <div className="absolute inset-0 bg-muted animate-pulse" />
              )}
            </div>
          </div>
        </CardContent>
        
        <CardDescription className="px-6 pb-4 text-sm leading-relaxed">
          {description}
        </CardDescription>
        
        <CardFooter className="pt-0">
          <Button 
            asChild 
            className="w-full"
          >
            <a 
              href={appUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2"
            >
              <span>{APP_TEXTS.accessApp}</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform group-hover:translate-x-1"
              >
                <path d="M7 17L17 7" />
                <path d="M7 7h10v10" />
              </svg>
            </a>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
