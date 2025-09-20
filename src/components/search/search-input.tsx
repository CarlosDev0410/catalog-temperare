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

      {internalValue && (
        <button
          onClick={handleClear}
          disabled={disabled}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
          aria-label="Limpar busca"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6L6 18" />
            <path d="M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}
