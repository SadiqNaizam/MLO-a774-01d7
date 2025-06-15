import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLoadAnimator from '@/components/animators/PageLoadAnimator';
import NavigationMenu from '@/components/navigation/NavigationMenu';
import ThemedNavigationIcon from '@/components/navigation/ThemedNavigationIcon';
import CategoryIntroAnimation from '@/components/animators/CategoryIntroAnimation';
import AnimatedMenuItemCard from '@/components/cards/AnimatedMenuItemCard';
import GadgetStyledButton from '@/components/ui_extended/GadgetStyledButton';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Home, DoorOpen, Zap, ShoppingCart } from 'lucide-react'; // Assuming icons for navigation

// Sample data for menu items
const menuCategories = [
  {
    name: 'Dorayaki Delights',
    id: 'dorayaki',
    imageUrl: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYjNndDR5M2YyY21oaDk4MDBnbWw3b3B0c2E2NmgzeG40bHZzZ3FhaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/UtGD224Atq4qQ/giphy.gif', // Doraemon eating Dorayaki
    description: "Doraemon's favorite! Fluffy pancakes with delicious fillings.",
    items: [
      { id: 'd1', name: 'Classic Red Bean Dorayaki', price: 3.50, description: 'The original and best!', imageUrl: 'https://cdn.shopify.com/s/files/1/0013/8931/1603/products/dorayaki_1024x1024.jpg?v=1579748670' },
      { id: 'd2', name: 'Matcha Cream Dorayaki', price: 4.00, description: 'Earthy matcha cream filling.', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL-qWnQ207Qn99XwLpWvV0n-J689F6N_4mJg&s' },
      { id: 'd3', name: 'Chocolate Custard Dorayaki', price: 4.25, description: 'For the chocolate lovers.', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0X6m4i2_1V7jVw8Fw3pZ4x6vY2m_3n5w9Ww&s' },
    ],
  },
  {
    name: "Gian's Power Meals",
    id: 'power-meals',
    imageUrl: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNGJkM3IzaHh0cnBuYmpqOXk1dmdjY202enF0Z3JzMGRjdTU1ejM4ayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xT1XGzAbV26hR2V5q8/giphy.gif', // Gian singing or flexing
    description: "Big meals for big appetites, just like Gian!",
    items: [
      { id: 'g1', name: 'Giant Katsu Curry', price: 12.00, description: 'A huge portion of crispy katsu and rich curry.', imageUrl: 'https://www.justonecookbook.com/wp-content/uploads/2023/04/Katsu-Curry-1946-I.jpg' },
      { id: 'g2', name: 'Super Stamina Ramen', price: 11.50, description: 'Packed with toppings to keep you going.', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5k-B2Z2X7pL6H-1E3e7K9T8Q9L5vG7i4Y8A&s' },
    ],
  },
  {
    name: "Shizuka's Sweet Treats",
    id: 'sweet-treats',
    imageUrl: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExczFtdXZzZGxhY213NzJ1bm14ZW95bDN2bDRyaHRpZTZiM3Jtb3EydSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7TKVfu41jp পাগlaamir/giphy.gif', // Shizuka playing violin or baking
    description: "Elegant and delightful desserts.",
    items: [
      { id: 's1', name: 'Sweet Potato Cake', price: 5.00, description: 'A light and fluffy cake made with sweet potatoes.', imageUrl: 'https://www.chopstickchronicles.com/wp-content/uploads/2021/02/Sweet-Potato-Cake-12.jpg' },
      { id: 's2', name: 'Strawberry Parfait', price: 6.50, description: 'Layers of cream, sponge, and fresh strawberries.', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQo3w9vX7uO5z5w5o4J3Y7X_3YhQ2zY-0i1g&s' },
    ],
  },
];

const MenuPage = () => {
  console.log('MenuPage loaded');
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddToCart = (itemName: string) => {
    // In a real app, this would update cart state
    console.log(`${itemName} added to cart (from MenuPage)`);
    // Toast notification is handled within AnimatedMenuItemCard
  };

  const filteredCategories = menuCategories.map(category => ({
    ...category,
    items: category.items.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  })).filter(category => category.items.length > 0);

  return (
    <PageLoadAnimator>
      <div className="flex flex-col min-h-screen bg-sky-50">
        <NavigationMenu>
          <ThemedNavigationIcon icon={<Home className="w-6 h-6" />} label="Home" href="/" />
          <ThemedNavigationIcon icon={<DoorOpen className="w-6 h-6" />} label="Menu" href="/menu" isActive={true} />
          <ThemedNavigationIcon icon={<Zap className="w-6 h-6" />} label="Specials" href="/daily-specials" />
          <ThemedNavigationIcon icon={<ShoppingCart className="w-6 h-6" />} label="Cart" href="/cart" />
        </NavigationMenu>

        <main className="container mx-auto px-4 py-8">
          <div className="mb-8 sticky top-0 bg-sky-50 py-4 z-10">
            <h1 className="text-4xl font-bold text-blue-600 mb-4 text-center">Our Magical Menu</h1>
            <Input 
              type="text" 
              placeholder="Search for your favorite gadget-dish... (e.g., Dorayaki)" 
              className="w-full max-w-lg mx-auto p-3 border-2 border-blue-300 rounded-lg focus:border-yellow-400 focus:ring-yellow-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <ScrollArea className="h-[calc(100vh-200px)]"> {/* Adjust height as needed */}
            {filteredCategories.length > 0 ? filteredCategories.map((category) => (
              <section key={category.id} id={category.id} className="mb-12">
                <CategoryIntroAnimation 
                    categoryName={category.name} 
                    imageUrl={category.imageUrl}
                >
                  <p className="text-lg text-gray-600">{category.description}</p>
                </CategoryIntroAnimation>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {category.items.map((item) => (
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
              </section>
            )) : (
              <p className="text-center text-gray-600 text-xl py-10">
                Oh no! Nobita seems to have misplaced that dish with the Time Machine. Try another search?
              </p>
            )}
          </ScrollArea>
        </main>
        <footer className="bg-blue-600 text-white text-center p-4 mt-auto">
          Pick your favorites and fill your pocket!
        </footer>
      </div>
    </PageLoadAnimator>
  );
};

export default MenuPage;