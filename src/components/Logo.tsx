import logoImage from "@/assets/logo-bioenergies.png";

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
}

const Logo = ({ className = "", showText = true, size = "md" }: LogoProps) => {
  const sizeClasses = {
    sm: "h-10 w-10",
    md: "h-16 w-16",
    lg: "h-24 w-24",
    xl: "h-32 w-32",
  };

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
    xl: "text-4xl",
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img
        src={logoImage}
        alt="BIOENERGIES CONGO Logo"
        className={`${sizeClasses[size]} object-contain`}
      />
      {showText && (
        <div className="flex flex-col">
          <div className={`font-heading font-bold ${textSizeClasses[size]}`}>
            <span className="text-primary">BIOENERGIES</span>{" "}
            <span className="text-secondary">CONGO</span>
          </div>
          <span className="text-accent text-xs font-semibold tracking-wide">
            All To Save Area / Tout Pour Sauver l'Environnement
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
