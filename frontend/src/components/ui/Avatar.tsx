export function Avatar({ name, size = "sm" }: { name: string; size?: "sm" | "md" }) {
  const initials = name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
  const sizeClass = size === "sm" ? "w-6 h-6 text-[10px]" : "w-8 h-8 text-xs";
  return (
    <div className={`${sizeClass} rounded-full bg-purple-600 text-white flex items-center justify-center font-semibold flex-shrink-0`}>
      {initials}
    </div>
  );
}