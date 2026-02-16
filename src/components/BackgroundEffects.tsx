export const BackgroundEffects = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[1]" aria-hidden="true">
      {/* Grain texture overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
          opacity: 0.06,
          mixBlendMode: "soft-light",
        }}
      />

      {/* Abstract blur shape - top left */}
      <div
        className="absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(200,200,220,0.35), transparent 65%)",
          filter: "blur(80px)",
        }}
      />

      {/* Abstract blur shape - bottom right */}
      <div
        className="absolute -bottom-32 -right-32 w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(200,200,220,0.28), transparent 65%)",
          filter: "blur(100px)",
        }}
      />

      {/* Abstract blur shape - center right */}
      <div
        className="absolute top-1/3 -right-10 w-[400px] h-[400px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(200,200,220,0.2), transparent 65%)",
          filter: "blur(70px)",
        }}
      />
    </div>
  );
};
