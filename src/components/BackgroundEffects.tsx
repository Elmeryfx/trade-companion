export const BackgroundEffects = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
      {/* Grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      {/* Abstract blur shape - top left */}
      <div
        className="absolute -top-32 -left-32 w-[400px] h-[400px] rounded-full opacity-[0.15] blur-[100px]"
        style={{ background: "var(--base-gradient, linear-gradient(90deg, #00D4FF, #020024))" }}
      />

      {/* Abstract blur shape - bottom right */}
      <div
        className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full opacity-[0.12] blur-[120px]"
        style={{ background: "var(--base-gradient, linear-gradient(90deg, #00D4FF, #020024))" }}
      />

      {/* Abstract blur shape - center right */}
      <div
        className="absolute top-1/3 -right-20 w-[300px] h-[300px] rounded-full opacity-[0.10] blur-[80px]"
        style={{ background: "var(--base-gradient, linear-gradient(90deg, #00D4FF, #020024))" }}
      />
    </div>
  );
};
