import { Link } from "react-router-dom";

type LogoProps = {
  className?: string;
  imageClassName?: string;
  to?: string;
  alt?: string;
};

/**
 * Reusable Brand Logo component using nav-logo.png
 */
export default function Logo({
  className = "",
  imageClassName = "h-7 sm:h-8 w-auto object-contain",
  to = "/",
  alt = "EX-Creative",
}: LogoProps) {
  const logoContent = (
    <div className={`inline-flex items-center gap-2 transition-opacity hover:opacity-90 ${className}`}>
      <img
        src="/nav-logo.png"
        alt={alt}
        className={imageClassName}
        loading="eager"
      />
    </div>
  );

  if (to) {
    return (
      <Link to={to} data-cursor="hover" className="inline-block">
        {logoContent}
      </Link>
    );
  }

  return logoContent;
}
