import React from 'react';
import { Link } from 'react-router-dom'; // Assuming react-router-dom for navigation

interface ThemedNavigationIconProps {
  icon: React.ReactNode; // SVG or image for the icon (e.g., Anywhere Door)
  label?: string;
  href: string; // Navigation path
  isActive?: boolean;
  onClick?: () => void;
}

const ThemedNavigationIcon: React.FC<ThemedNavigationIconProps> = ({
  icon,
  label,
  href,
  isActive,
  onClick,
}) => {
  console.log("Rendering ThemedNavigationIcon for:", label || href);

  // Base classes for the icon container
  // Active state could use a yellow accent, for example
  const baseClasses = "flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 ease-in-out";
  const activeClasses = isActive ? "bg-yellow-400 text-blue-700 scale-110" : "text-white hover:bg-blue-500 hover:scale-105";
  
  // Placeholder for "Anywhere Door" style: pinkish hue
  const doorStyle = "w-12 h-16 md:w-16 md:h-20 bg-pink-400 border-2 border-pink-600 rounded-t-full flex items-center justify-center";

  return (
    <li className="list-none">
      <Link to={href} onClick={onClick} className={`${baseClasses} ${activeClasses}`}>
        <div className={`${doorStyle} group-hover:animate-pulse`}> {/* Simple hover animation */}
          {icon}
        </div>
        {label && <span className={`mt-1 text-xs md:text-sm font-medium ${isActive ? 'text-blue-700' : 'text-white'}`}>{label}</span>}
      </Link>
    </li>
  );
};

export default ThemedNavigationIcon;