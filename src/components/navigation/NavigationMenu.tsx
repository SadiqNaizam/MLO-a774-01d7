import React from 'react';

interface NavigationMenuProps {
  children: React.ReactNode; // Expects ThemedNavigationIcon components or other links
  className?: string;
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({ children, className }) => {
  console.log("Rendering NavigationMenu");
  // Example: Doraemon-themed colors - blue background, white text, yellow accents
  return (
    <nav className={`bg-blue-600 p-4 shadow-md ${className || ''}`}>
      <ul className="flex items-center justify-around space-x-2 md:space-x-4">
        {children}
      </ul>
    </nav>
  );
};

export default NavigationMenu;