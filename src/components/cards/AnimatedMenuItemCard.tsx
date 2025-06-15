import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import GadgetStyledButton from '@/components/ui_extended/GadgetStyledButton'; // Use our themed button
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast'; // For themed toast notification

interface AnimatedMenuItemCardProps {
  itemName: string;
  price: string | number; // Can be formatted string like "$9.99" or number
  imageUrl?: string;
  description?: string;
  onAddToCart: (itemName: string) => void; // Callback when item is added
}

const AnimatedMenuItemCard: React.FC<AnimatedMenuItemCardProps> = ({
  itemName,
  price,
  imageUrl = "/placeholder.svg",
  description,
  onAddToCart,
}) => {
  const { toast } = useToast();
  console.log("Rendering AnimatedMenuItemCard for:", itemName);

  const handleAddToCart = () => {
    onAddToCart(itemName);
    // Themed Toast notification as per user journey
    toast({
      title: "Yummy!",
      description: `${itemName} added to your pocket!`,
      // You might add a custom className here for more theming if your toast supports it
      // e.g., className: 'bg-blue-500 text-white border-yellow-400'
    });
    console.log(`${itemName} added to cart.`);
  };

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    >
      <Card className="overflow-hidden shadow-lg w-full max-w-xs transition-all duration-300 bg-white border-2 border-transparent hover:border-yellow-400">
        <CardHeader className="p-0">
          <AspectRatio ratio={16 / 9}>
            <img
              src={imageUrl}
              alt={itemName}
              className="object-cover w-full h-full"
              onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
            />
          </AspectRatio>
          {/* Small Dorami icon winking (placeholder) - could be an absolutely positioned image/SVG */}
          {/* <img src="/dorami-wink.svg" alt="Dorami" className="absolute top-2 right-2 w-8 h-8" /> */}
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="text-lg font-semibold text-blue-700 mb-1">{itemName}</CardTitle>
          {description && <p className="text-sm text-gray-600 line-clamp-2 mb-2">{description}</p>}
          <p className="text-xl font-bold text-red-500">
            {typeof price === 'number' ? `$${price.toFixed(2)}` : price}
          </p>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <GadgetStyledButton
            onClick={handleAddToCart}
            className="w-full"
            themeColor="doraemon-red" // Example: Red bell button
            // icon={<Bell className="w-4 h-4" />} // Example if button has icon prop
          >
            Add to Pocket
          </GadgetStyledButton>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default AnimatedMenuItemCard;