import { Vazirmatn } from "next/font/google";

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  weight: ["400", "800", "900"],
  display: "swap",
});

export default function KhodaHast({
  size = "md",
  subtitle = "",
  animated = true,
  className = "",
}) {
  const sizeClasses = {
    sm: { main: "text-2xl md:text-3xl", sub: "text-xs md:text-sm" },
    md: { main: "text-4xl md:text-6xl", sub: "text-sm md:text-base" },
    lg: { main: "text-6xl md:text-8xl", sub: "text-base md:text-lg" },
    xl: { main: "text-7xl md:text-9xl", sub: "text-lg md:text-xl" },
  };

  const currentSize = sizeClasses[size] || sizeClasses.md;

  return (
    <div
      className={`group relative inline-flex flex-col items-center justify-center ${vazirmatn.className} ${className}`}
    >
      {/* تنظیمات کی‌فریم انیمیشن درخشش درخواستی */}
      <style>{`
        @keyframes textShine {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-text-shine {
          background-size: 200% auto;
          animation: textShine 5s ease-in-out infinite;
        }
     `}</style>

      {/* ۱. هاله نور پس‌زمینه با افکت پالس (Pulse) */}
      <div
        aria-hidden="true"
        className={`absolute -inset-4 bg-linear-to-r from-amber-500/30 via-yellow-400/25 to-amber-600/30 blur-2xl rounded-full pointer-events-none transition-all duration-700 ${
          animated
            ? "animate-pulse opacity-80"
            : "opacity-70 group-hover:opacity-100"
        }`}
      />

      {/* ۲. متن اصلی با افکت حرکت نور (Shine) */}
      <span
        className={`relative font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-300 via-yellow-500 to-amber-200 select-none transition-transform duration-500 group-hover:scale-105 ${
          animated ? "animate-text-shine" : ""
        } ${currentSize.main}`}
        style={{
          filter:
            "drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.6)) drop-shadow(0px 8px 20px rgba(245, 158, 11, 0.4))",
        }}
      >
        خدا هست
      </span>

      {/* ۳. زیرمتن (Subtitle) با تناسب سایز متغیر */}
      {subtitle && (
        <span
          className={`relative mt-2 font-medium tracking-widest text-amber-200/90 drop-shadow-sm select-none ${currentSize.sub}`}
        >
          {subtitle}
        </span>
      )}
    </div>
  );
}
