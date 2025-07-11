import { cn } from "@/lib/utils";

interface LoadingProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "spinner" | "dots" | "pulse";
}

export function Loading({ 
  className, 
  size = "md", 
  variant = "spinner" 
}: LoadingProps) {
  const sizeClasses = {
    sm: "size-4",
    md: "size-6", 
    lg: "size-8"
  };

  if (variant === "dots") {
    return (
      <div className={cn("flex space-x-1", className)}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={cn(
              "bg-current rounded-full animate-pulse",
              sizeClasses[size]
            )}
            style={{
              animationDelay: `${i * 0.2}s`,
              animationDuration: "1.4s"
            }}
          />
        ))}
      </div>
    );
  }

  if (variant === "pulse") {
    return (
      <div className={cn(
        "bg-current rounded animate-pulse",
        sizeClasses[size],
        className
      )} />
    );
  }

  return (
    <div className={cn(
      "animate-spin rounded-full border-2 border-current border-t-transparent",
      sizeClasses[size],
      className
    )} />
  );
} 