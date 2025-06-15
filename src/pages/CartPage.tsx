import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLoadAnimator from '@/components/animators/PageLoadAnimator';
import NavigationMenu from '@/components/navigation/NavigationMenu';
import ThemedNavigationIcon from '@/components/navigation/ThemedNavigationIcon';
import GadgetStyledButton from '@/components/ui_extended/GadgetStyledButton';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Home, DoorOpen, Zap, ShoppingCart, Trash2 } from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

const initialCartItems: CartItem[] = [
  { id: 'd1', name: 'Classic Red Bean Dorayaki', price: 3.50, quantity: 2, imageUrl: 'https://cdn.shopify.com/s/files/1/0013/8931/1603/products/dorayaki_1024x1024.jpg?v=1579748670' },
  { id: 'g1', name: 'Giant Katsu Curry', price: 12.00, quantity: 1, imageUrl: 'https://www.justonecookbook.com/wp-content/uploads/2023/04/Katsu-Curry-1946-I.jpg' },
];

const CartPage = () => {
  console.log('CartPage loaded');
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [specialInstructions, setSpecialInstructions] = useState('');

  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity < 1) quantity = 1; // Minimum quantity is 1
    setCartItems(items => items.map(item => item.id === id ? { ...item, quantity } : item));
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const taxRate = 0.08; // Example tax rate
  const taxes = subtotal * taxRate;
  const total = subtotal + taxes;

  return (
    <PageLoadAnimator>
      <div className="flex flex-col min-h-screen bg-blue-50">
        <NavigationMenu>
          <ThemedNavigationIcon icon={<Home className="w-6 h-6" />} label="Home" href="/" />
          <ThemedNavigationIcon icon={<DoorOpen className="w-6 h-6" />} label="Menu" href="/menu" />
          <ThemedNavigationIcon icon={<Zap className="w-6 h-6" />} label="Specials" href="/daily-specials" />
          <ThemedNavigationIcon icon={<ShoppingCart className="w-6 h-6" />} label="Cart" href="/cart" isActive={true} />
        </NavigationMenu>

        <main className="container mx-auto px-4 py-8 flex-grow">
          <header className="text-center my-8">
            <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExd3VzMGdhdmg4cHNqaTR0c25qNWxlYjNqbjRwMmF3M3ZqemN5dHEzZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l378BzHA5FwWdZ2OQ/giphy.gif" alt="Doraemon's Pocket" className="mx-auto w-32 h-32 mb-4"/>
            <h1 className="text-4xl font-bold text-blue-700 mb-2">Your Pocket of Goodies!</h1>
            <p className="text-lg text-gray-600">Let's make sure everything is magically right.</p>
          </header>

          {cartItems.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-2xl text-gray-500 mb-4">Your 4D pocket is empty!</p>
              <GadgetStyledButton themeColor="doraemon-yellow" onClick={() => navigate('/menu')}>
                Find Some Gadget-Dishes!
              </GadgetStyledButton>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl text-blue-600">Items in Your Pocket</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">Item</TableHead>
                          <TableHead>Details</TableHead>
                          <TableHead className="text-center">Quantity</TableHead>
                          <TableHead className="text-right">Price</TableHead>
                          <TableHead className="text-right">Total</TableHead>
                          <TableHead className="text-center">Remove</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {cartItems.map(item => (
                          <TableRow key={item.id}>
                            <TableCell>
                              <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                            </TableCell>
                            <TableCell className="font-medium">{item.name}</TableCell>
                            <TableCell className="text-center">
                              <Input 
                                type="number" 
                                value={item.quantity} 
                                onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                                className="w-20 text-center"
                                min="1"
                              />
                            </TableCell>
                            <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                            <TableCell className="text-right">${(item.price * item.quantity).toFixed(2)}</TableCell>
                            <TableCell className="text-center">
                              <GadgetStyledButton variant="ghost" size="icon" themeColor="doraemon-red" onClick={() => handleRemoveItem(item.id)}>
                                <Trash2 className="h-5 w-5 text-red-500" />
                              </GadgetStyledButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card className="shadow-lg sticky top-24"> {/* Sticky summary card */}
                  <CardHeader>
                    <CardTitle className="text-2xl text-blue-600">Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Taxes ({(taxRate * 100).toFixed(0)}%):</span>
                      <span>${taxes.toFixed(2)}</span>
                    </div>
                    <hr/>
                    <div className="flex justify-between font-bold text-xl">
                      <span>Total:</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    <div>
                      <label htmlFor="specialInstructions" className="block text-sm font-medium text-gray-700 mb-1">Special Instructions (e.g., "Extra wasabi for Nobita!")</label>
                      <Textarea 
                        id="specialInstructions"
                        placeholder="Any special requests for Doraemon's kitchen?" 
                        value={specialInstructions}
                        onChange={(e) => setSpecialInstructions(e.target.value)}
                        className="border-blue-300 focus:border-yellow-400"
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-2">
                    <GadgetStyledButton 
                        themeColor="doraemon-red" 
                        className="w-full" 
                        onClick={() => navigate('/checkout')}
                        disabled={cartItems.length === 0}
                    >
                      Time to Eat! (Proceed to Checkout)
                    </GadgetStyledButton>
                    <GadgetStyledButton variant="outline" className="w-full" onClick={() => navigate('/menu')}>
                      Find More Gadgets (Continue Shopping)
                    </GadgetStyledButton>
                  </CardFooter>
                </Card>
              </div>
            </div>
          )}
        </main>
        <footer className="bg-blue-700 text-white text-center p-4 mt-auto">
          Almost ready for a delicious adventure!
        </footer>
      </div>
    </PageLoadAnimator>
  );
};

export default CartPage;