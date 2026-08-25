/**
 * Joins class names conditionally, skipping falsy values.
 * Usage: cn("base", isActive && "active", error ? "border-red" : "border-line")
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
