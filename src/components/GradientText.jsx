export default function GradientText({
  children,
  className = "",
  colors = ["#ffaa40", "#9c40ff", "#ffaa40"],
  animationSpeed = 8,
  showBorder = false,
}) {
  const gradientStyle = {
    background: `linear-gradient(to right, ${colors.join(", ")})`,
    animationDuration: `${animationSpeed}s`,
    backgroundSize: "300% 100%",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    color: "transparent",
    display: "inline",
    padding: "0 2px", // Add small padding to prevent clipping
  };

  return (
    <span
      className={`animate-gradient ${className}`}
      style={gradientStyle}
    >
      {children}
    </span>
  );
} 