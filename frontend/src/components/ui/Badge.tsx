import { cn } from "@/lib/utils";

export function Badge({ children, variant = "default" }: {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning";
}) {
  return (
    <span className={cn(
      "inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium",
      variant === "default" && "bg-gray-100 text-gray-600",
      variant === "success" && "bg-green-100 text-green-700",
      variant === "warning" && "bg-yellow-100 text-yellow-700",
    )}>
      {children}
    </span>
  );
}