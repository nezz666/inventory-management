import * as React from "react";
import { cn } from "@/lib/utils"; // helper biar bisa merge className (optional)

export function Card({ className, ...props }) {
  return (
    <div
      className={cn(
        "rounded-2xl border bg-white/10 dark:bg-gray-800/50 shadow-md backdrop-blur-lg p-4",
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }) {
  return (
    <div className={cn("mb-4 border-b pb-2", className)} {...props} />
  );
}

export function CardContent({ className, ...props }) {
  return <div className={cn("space-y-4", className)} {...props} />;
}
