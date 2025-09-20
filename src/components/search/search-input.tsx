'use client';

import { useState, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "@/components/icons/search-icon";
import { APP_TEXTS } from "@/constants";

/**
 * Props do componente SearchInput
 */
interface SearchInputProps {
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (searchTerm: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

/**
 * Componente de input de busca otimizado
 */
export function SearchInput({ 
  value, 
  onChange, 
  onSearch,
  placeholder = APP_TEXTS.searchPlaceholder,
  className,
  disabled = false
}: SearchInputProps) {
  const [internalValue, setInternalValue] = useState(value || "");

  /**
   * Sincroniza valor interno com prop externa
   */
  useEffect(() => {
    setInternalValue(value || "");
  }, [value]);

  /**
   * Manipula mudanças no input
   */
  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInternalValue(newValue);
    onChange?.(newValue);
  }, [onChange]);

  /**
   * Executa a busca
   */
  const executeSearch = useCallback(() => {
    if (internalValue.trim() && onSearch) {
      onSearch(internalValue.trim());
    }
  }, [internalValue, onSearch]);

  /**
   * Manipula a tecla Enter no input
   */
  const handleKeyPress = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      executeSearch();
    }
  }, [executeSearch]);

  /**
   * Limpa o input
   */
  const handleClear = useCallback(() => {
    setInternalValue("");
    onChange?.("");
  }, [onChange]);

  return (
    <div className={`relative ${className || ""}`}>
      <Input
        type="search"
        placeholder={placeholder}
        value={internalValue}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        disabled={disabled}
        className="pl-10 pr-10"
      />
      
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <SearchIcon className="h-5 w-5 text-muted-foreground" />
      </div>
    </div>
  );
}
