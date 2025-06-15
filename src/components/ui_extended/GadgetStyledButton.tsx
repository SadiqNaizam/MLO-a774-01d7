import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button'; // Base shadcn button
import { Bell } from 'lucide-react'; // For the bell icon
import { cn } from '@/lib/utils';

interface GadgetStyledButtonProps extends ButtonProps {
  icon?: React.ReactNode;
  themeColor?: 'doraemon-blue' | 'doraemon-red' | 'doraemon-yellow'; // Thematic colors
}

const GadgetStyledButton: React.FC<GadgetStyledButtonProps> = ({
  children,
  className,
  variant,
  icon,
  themeColor = 'doraemon-blue',
  ...props
}) => {
  console.log("Rendering GadgetStyledButton with children:", children);

  // Example Doraemon Bell styling: red button with yellow "bell" part or icon
  // This is a simplified version. True bell shape might require SVG/custom CSS.
  
  let themeClasses = '';
  switch (themeColor) {
    case 'doraemon-red':
      themeClasses = 'bg-red-500 hover:bg-red-600 text-white';
      break;
    case 'doraemon-yellow':
      themeClasses = 'bg-yellow-400 hover:bg-yellow-500 text-blue-700';
      break;
    case 'doraemon-blue':
    default:
      themeClasses = 'bg-blue-500 hover:bg-blue-600 text-white';
      break;
  }

  if (variant === 'link' || variant === 'ghost' || variant === 'outline' || variant === 'secondary') {
    // Don't apply background theme colors if it's not a solid button variant
    themeClasses = '';
  }
  
  // Bell specific styling might be added if variant is 'bell'
  const isBellVariant = variant === ('bell' as any); // Custom variant idea

  return (
    <Button
      className={cn(
        'font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-150 ease-in-out transform hover:scale-105 focus:ring-4 focus:ring-opacity-50',
        isBellVariant ? 'bg-red-500 hover:bg-red-600 text-yellow-300 rounded-full p-3 aspect-square' : themeClasses,
        isBellVariant && !children ? 'w-12 h-12 flex items-center justify-center' : '',
        className
      )}
      variant={isBellVariant ? 'default' : variant}
      {...props}
    >
      {isBellVariant && !icon && !children && <Bell className="w-5 h-5" />}
      {icon && <span className={children ? "mr-2" : ""}>{icon}</span>}
      {children}
    </Button>
  );
};

export default GadgetStyledButton;