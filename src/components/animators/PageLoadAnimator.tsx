import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Assuming framer-motion for animations

interface PageLoadAnimatorProps {
  children: React.ReactNode;
  duration?: number; // Duration of the loading animation in ms
  loadingIndicator?: React.ReactNode; // Custom loading indicator
}

const PageLoadAnimator: React.FC<PageLoadAnimatorProps> = ({
  children,
  duration = 1500, // Default duration 1.5s
  loadingIndicator,
}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("PageLoadAnimator: Mounting, starting load timer.");
    const timer = setTimeout(() => {
      console.log("PageLoadAnimator: Load timer finished, setting loading to false.");
      setLoading(false);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration]);

  const defaultLoadingIndicator = (
    <motion.div
      key="loader"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: -50, transition: { duration: 0.5 } }}
      className="fixed inset-0 flex flex-col items-center justify-center bg-sky-400 z-[100]" // Doraemon blue
    >
      <div className="w-16 h-16 border-4 border-t-yellow-300 border-white rounded-full animate-spin"></div>
      <p className="mt-4 text-white text-lg font-semibold">Loading adventure...</p>
      {/* Placeholder for Doraemon flying with Take-copter animation */}
    </motion.div>
  );

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        loadingIndicator || defaultLoadingIndicator
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.5 } }}
          className="w-full h-full"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoadAnimator;