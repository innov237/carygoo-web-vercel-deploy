import * as React from "react";
import { cn } from "@/lib/utils"; // fonction utilitaire pour concaténer les classes Tailwind

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Card: React.FC<CardProps> = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        "rounded-2xl border bg-white/90 text-gray-900 shadow-lg dark:bg-gray-800 dark:text-gray-100",
        className
      )}
      {...props}
    />
  );
};

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardContent: React.FC<CardContentProps> = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        "p-4 pt-2 flex flex-col gap-2", // padding et espacement entre les éléments
        className
      )}
      {...props}
    />
  );
};
