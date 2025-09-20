/**
 * Componente de ícone de busca
 */

import React from "react";

/**
 * Props do componente SearchIcon
 */
type SearchIconProps = React.SVGProps<SVGSVGElement>;

/**
 * Componente de ícone de busca reutilizável
 */
export function SearchIcon(props: SearchIconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
