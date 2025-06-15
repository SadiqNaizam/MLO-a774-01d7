import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageLoadAnimator from '@/components/animators/PageLoadAnimator';
import NavigationMenu from '@/components/navigation/NavigationMenu';
import ThemedNavigationIcon from '@/components/navigation/ThemedNavigationIcon';
import AnimatedMenuItemCard from '@/components/cards/AnimatedMenuItemCard';
import GadgetStyledButton from '@/components/ui_extended/GadgetStyledButton';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Home, DoorOpen, Zap, ShoppingCart } from 'lucide-react';

const dailySpecials = [
  { id: 'sp1', name: 'Memory Bread French Toast', price: 7.50, description: "Ace your day! French toast made with 'Memory Bread' (syrup not included).", imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0j-X4q_aY_7zL7t6K9r8B_oZ_nFvXgY6pSg&s' },
  { id: 'sp2', name: "Time Kerchief Aged Steak", price: 18.00, description: "Aged to perfection in moments! Tender and juicy.", imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4mUf5v8yq3X0fG1h_Y8j_k9yL4n_wF6eL8w&s' },
  { id: 'sp3', name: "Anywhere Door Doughnuts", price: 6.00, description: "A portal to deliciousness! Assorted flavors.", imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8M7x3z8s8uQh5f_gN9pC_lP6yK7kS2wN0oA&s' },
];

const DailySpecialsPage = () => {
  console.log('DailySpecialsPage loaded');
  const navigate = useNavigate();

  const handleAddToCart = (itemName: string) => {
    console.log(`${itemName} added to cart (from DailySpecialsPage)`);
    // Toast notification is handled within AnimatedMenuItemCard
  };

  return (
    <PageLoadAnimator>
      <div className="flex flex-col min-h-screen bg-yellow-50">
        <NavigationMenu>
          <ThemedNavigationIcon icon={<Home className="w-6 h-6" />} label="Home" href="/" />
          <ThemedNavigationIcon icon={<DoorOpen className="w-6 h-6" />} label="Menu" href="/menu" />
          <ThemedNavigationIcon icon={<Zap className="w-6 h-6" />} label="Specials" href="/daily-specials" isActive={true} />
          <ThemedNavigationIcon icon={<ShoppingCart className="w-6 h-6" />} label="Cart" href="/cart" />
        </NavigationMenu>

        <main className="container mx-auto px-4 py-8 flex-grow">
          <header className="text-center my-8">
            <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaDNxazV0MGNndnRzY2Z1ZHRhMXQ1ejJ3c2RjbnM1eHBia216eWZoeSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3ohzdMvc1w2Vl6gGgE/giphy.gif" alt="Time Kerchief swirling" className="mx-auto w-32 h-32 mb-4"/>
            <h1 className="text-4xl font-bold text-red-500 mb-2">Today's Time Kerchief Specials!</h1>
            <p className="text-lg text-gray-700">Unwrapped just for you, these deals are magically delicious!</p>
          </header>
          
          <ScrollArea className="h-[calc(100vh-250px)]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
              {dailySpecials.map((item) => (
                <AnimatedMenuItemCard
                  key={item.id}
                  itemName={item.name}
                  price={item.price}
                  description={item.description}
                  imageUrl={item.imageUrl}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </ScrollArea>
          <div className="text-center mt-8">
            <GadgetStyledButton themeColor="doraemon-blue" onClick={() => navigate('/menu')}>
              Back to Full Menu
            </GadgetStyledButton>
          </div>
        </main>
        <footer className="bg-red-500 text-white text-center p-4">
          Grab these gadget-inspired goodies before time runs out!
        </footer>
      </div>
    </PageLoadAnimator>
  );
};

export default DailySpecialsPage;