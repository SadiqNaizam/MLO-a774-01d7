import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CategoryIntroAnimationProps {
  categoryName: string;
  imageUrl?: string; // e.g., Doraemon pulling a giant Dorayaki
  children?: React.ReactNode; // For additional content or description
  className?: string;
}

const CategoryIntroAnimation: React.FC<CategoryIntroAnimationProps> = ({
  categoryName,
  imageUrl = "/placeholder.svg",
  children,
  className,
}) => {
  console.log("Rendering CategoryIntroAnimation for:", categoryName);

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, type: "spring", stiffness: 50 }}
      className={cn("my-8", className)}
    >
      <Card className="overflow-hidden shadow-lg bg-gradient-to-r from-yellow-200 via-red-200 to-pink-200"> {/* Thematic colors */}
        <CardHeader className="p-0">
          {imageUrl && (
            <div className="aspect-video w-full flex items-center justify-center overflow-hidden">
              <img
                src={imageUrl}
                alt={`${categoryName} illustration`}
                className="w-full h-auto object-contain max-h-64"
                onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
              />
            </div>
          )}
        </CardHeader>
        <CardContent className="p-6">
          <CardTitle className="text-2xl md:text-3xl font-bold text-center text-blue-700 mb-4">
            {categoryName}
          </CardTitle>
          {children && <div className="text-center text-gray-700">{children}</div>}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CategoryIntroAnimation;