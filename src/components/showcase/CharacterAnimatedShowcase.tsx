import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button'; // Example for a CTA
import { motion } from 'framer-motion'; // For animations

interface CharacterAnimatedShowcaseProps {
  characterImageUrl?: string;
  dishImageUrl?: string;
  characterName?: string;
  dishName?: string;
  description?: string;
  ctaText?: string;
  onCtaClick?: () => void;
}

const CharacterAnimatedShowcase: React.FC<CharacterAnimatedShowcaseProps> = ({
  characterImageUrl = "/placeholder.svg", // Default placeholder
  dishImageUrl = "/placeholder.svg",
  characterName = "Nobita",
  dishName = "Delicious Dish!",
  description = "Nobita is excitedly pointing at this amazing dish. You should try it!",
  ctaText = "See More",
  onCtaClick,
}) => {
  console.log("Rendering CharacterAnimatedShowcase for:", characterName);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <Card className="overflow-hidden shadow-xl w-full max-w-md mx-auto bg-gradient-to-br from-sky-300 to-blue-500 text-white"> {/* Thematic gradient */}
        <CardHeader className="p-0 relative">
          {/* Placeholder for character image */}
          <img
            src={characterImageUrl}
            alt={characterName}
            className="w-1/3 h-auto absolute bottom-0 left-4 z-10 transform group-hover:scale-110 transition-transform"
            onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
          />
           <div className="aspect-[16/9] bg-white/30 backdrop-blur-sm">
            <img
                src={dishImageUrl}
                alt={dishName}
                className="object-contain w-full h-full p-4"
                onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
            />
           </div>
        </CardHeader>
        <CardContent className="p-6 text-center">
          <CardTitle className="text-2xl font-bold text-yellow-300 mb-2">{dishName}</CardTitle>
          <p className="text-sm mb-4">{description}</p>
        </CardContent>
        {onCtaClick && ctaText && (
            <CardFooter className="p-4 bg-black/20">
                 <Button onClick={onCtaClick} className="w-full bg-yellow-400 hover:bg-yellow-500 text-blue-700 font-bold">
                    {ctaText}
                 </Button>
            </CardFooter>
        )}
      </Card>
    </motion.div>
  );
};

export default CharacterAnimatedShowcase;