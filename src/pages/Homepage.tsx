import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageLoadAnimator from '@/components/animators/PageLoadAnimator';
import NavigationMenu from '@/components/navigation/NavigationMenu';
import ThemedNavigationIcon from '@/components/navigation/ThemedNavigationIcon';
import CharacterAnimatedShowcase from '@/components/showcase/CharacterAnimatedShowcase';
import GadgetStyledButton from '@/components/ui_extended/GadgetStyledButton';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Home, Utensils, Sparkles, ShoppingCart, DoorOpen, Zap } from 'lucide-react'; // DoorOpen for Menu, Zap for Specials

const Homepage = () => {
  console.log('Homepage loaded');
  const navigate = useNavigate();

  const handleExploreMenu = () => {
    navigate('/menu');
  };

  return (
    <PageLoadAnimator duration={1500} loadingIndicator={
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-sky-400 z-[100]">
        <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbTNucjZ0c3hzbXY2azNnbGZsb3M4ajV0cGlrdXJuY2J0eDB0aHVqZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/M7E5AkF2b30BnK7HDP/giphy.gif" alt="Doraemon Flying" className="w-32 h-32" />
        <p className="mt-4 text-white text-lg font-semibold">Loading your adventure...</p>
      </div>
    }>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-sky-100 via-rose-50 to-yellow-50">
        <NavigationMenu>
          <ThemedNavigationIcon icon={<Home className="w-6 h-6" />} label="Home" href="/" isActive={true} />
          <ThemedNavigationIcon icon={<DoorOpen className="w-6 h-6" />} label="Menu (Anywhere Door)" href="/menu" />
          <ThemedNavigationIcon icon={<Zap className="w-6 h-6" />} label="Specials (Time Kerchief)" href="/daily-specials" />
          <ThemedNavigationIcon icon={<ShoppingCart className="w-6 h-6" />} label="Cart" href="/cart" />
        </NavigationMenu>

        <ScrollArea className="flex-grow">
          <main className="container mx-auto px-4 py-8">
            <section className="text-center my-12">
              <motion.h1 
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-5xl font-bold text-blue-600 mb-4"
              >
                Welcome to Doraemon's Pocket Diner!
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="text-xl text-gray-700 mb-8"
              >
                Your magical food adventure starts here!
              </motion.p>
              <img src="https://upload.wikimedia.org/wikipedia/en/thumb/c/c8/Doraemon_volume_1_cover.jpg/220px-Doraemon_volume_1_cover.jpg" alt="Doraemon and Friends Welcome" className="mx-auto mb-8 rounded-lg shadow-xl w-full max-w-lg object-contain" />
            </section>

            <section className="my-16">
              <CharacterAnimatedShowcase
                characterImageUrl="https://upload.wikimedia.org/wikipedia/en/5/57/Nobita_Nobi.png"
                dishImageUrl="https://cdn.shopify.com/s/files/1/0013/8931/1603/products/dorayaki_1024x1024.jpg?v=1579748670"
                characterName="Nobita"
                dishName="Jumbo Dorayaki Special"
                description="Nobita can't believe his eyes! Our signature Jumbo Dorayaki is a mountain of fluffy pancake goodness, filled with sweet red bean paste. A must-try!"
                ctaText="Explore All Dorayaki"
                onCtaClick={() => navigate('/menu#dorayaki')}
              />
            </section>
            
            <section className="text-center my-12">
                <GadgetStyledButton 
                    themeColor="doraemon-blue" 
                    size="lg" 
                    onClick={handleExploreMenu}
                    className="px-12 py-4 text-xl"
                >
                    Explore Full Menu
                </GadgetStyledButton>
            </section>
          </main>
        </ScrollArea>
        <footer className="bg-blue-600 text-white text-center p-4">
          © {new Date().getFullYear()} Doraemon's Pocket Diner. All rights reserved.
        </footer>
      </div>
    </PageLoadAnimator>
  );
};

export default Homepage;