import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageLoadAnimator from '@/components/animators/PageLoadAnimator';
import NavigationMenu from '@/components/navigation/NavigationMenu';
import ThemedNavigationIcon from '@/components/navigation/ThemedNavigationIcon';
import GadgetStyledButton from '@/components/ui_extended/GadgetStyledButton';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Home, DoorOpen, Zap, ShoppingCart, User, MapPin, CreditCard } from 'lucide-react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Define Zod schema for form validation
const checkoutSchema = z.object({
  orderType: z.enum(['delivery', 'pickup'], { required_error: "Please select an order type." }),
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  phone: z.string().min(10, "Phone number must be at least 10 digits.").max(15,"Phone number too long."),
  address: z.string().optional(),
  city: z.string().optional(),
  postalCode: z.string().optional(),
  paymentMethod: z.enum(['credit_card', 'dorapay'], { required_error: "Please select a payment method." }),
  cardNumber: z.string().optional(), // Add more specific validation if needed
  expiryDate: z.string().optional(),
  cvv: z.string().optional(),
  savePayment: z.boolean().optional(),
}).superRefine((data, ctx) => {
    if (data.orderType === 'delivery') {
        if (!data.address || data.address.length < 5) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Address is required for delivery.", path: ["address"] });
        }
        if (!data.city || data.city.length < 2) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: "City is required for delivery.", path: ["city"] });
        }
        if (!data.postalCode || data.postalCode.length < 3) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Postal code is required for delivery.", path: ["postalCode"] });
        }
    }
    if (data.paymentMethod === 'credit_card') {
        if (!data.cardNumber || !/^\d{13,19}$/.test(data.cardNumber)) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Valid card number is required.", path: ["cardNumber"] });
        }
        if (!data.expiryDate || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(data.expiryDate)) { // MM/YY
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Valid expiry date (MM/YY) is required.", path: ["expiryDate"] });
        }
        if (!data.cvv || !/^\d{3,4}$/.test(data.cvv)) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Valid CVV is required.", path: ["cvv"] });
        }
    }
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

const CheckoutPage = () => {
  console.log('CheckoutPage loaded');
  const navigate = useNavigate();
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      orderType: 'delivery',
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      postalCode: '',
      paymentMethod: 'credit_card',
      savePayment: false,
    },
  });

  const onSubmit: SubmitHandler<CheckoutFormValues> = (data) => {
    console.log('Checkout form submitted:', data);
    // Simulate order placement
    alert(`Order placed successfully with ${data.paymentMethod}! Doraemon is preparing your meal!`);
    navigate('/'); // Redirect to homepage after order
  };
  
  const orderType = form.watch("orderType");
  const paymentMethod = form.watch("paymentMethod");

  return (
    <PageLoadAnimator>
      <div className="flex flex-col min-h-screen bg-green-50">
        <NavigationMenu>
          <ThemedNavigationIcon icon={<Home className="w-6 h-6" />} label="Home" href="/" />
          <ThemedNavigationIcon icon={<DoorOpen className="w-6 h-6" />} label="Menu" href="/menu" />
          <ThemedNavigationIcon icon={<Zap className="w-6 h-6" />} label="Specials" href="/daily-specials" />
          <ThemedNavigationIcon icon={<ShoppingCart className="w-6 h-6" />} label="Cart" href="/cart" />
        </NavigationMenu>

        <main className="container mx-auto px-4 py-8 flex-grow">
          <header className="text-center my-8">
            <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbHNqMHBxa2ZzNmdubnNyZXVoYWxoemN0bWJzcmE0NzhpM3E5aGNscCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oKIPjzUm60hL75M5O/giphy.gif" alt="Doraemon with Gadget" className="mx-auto w-32 h-32 mb-4"/>
            <h1 className="text-4xl font-bold text-green-600 mb-2">Almost Time to Eat!</h1>
            <p className="text-lg text-gray-700">Just a few more details and your magical meal will be on its way!</p>
          </header>

          <Card className="max-w-2xl mx-auto shadow-xl">
            <CardHeader>
              <CardTitle className="text-3xl text-green-700">Checkout Details</CardTitle>
              <CardDescription>Please provide your information to complete the order.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="text-xl font-semibold text-green-700 hover:no-underline">
                        <MapPin className="inline-block mr-2 h-6 w-6" /> Order Type & Delivery
                      </AccordionTrigger>
                      <AccordionContent className="pt-4 space-y-4">
                        <FormField
                          control={form.control}
                          name="orderType"
                          render={({ field }) => (
                            <FormItem className="space-y-3">
                              <FormLabel>Delivery or Pickup?</FormLabel>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  className="flex space-x-4"
                                >
                                  <FormItem className="flex items-center space-x-2">
                                    <FormControl><RadioGroupItem value="delivery" /></FormControl>
                                    <FormLabel>Delivery (via Take-copter!)</FormLabel>
                                  </FormItem>
                                  <FormItem className="flex items-center space-x-2">
                                    <FormControl><RadioGroupItem value="pickup" /></FormControl>
                                    <FormLabel>Pickup (at Doraemon's Door)</FormLabel>
                                  </FormItem>
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        {orderType === 'delivery' && (
                          <>
                            <FormField control={form.control} name="address" render={({ field }) => (
                              <FormItem><FormLabel>Street Address</FormLabel><FormControl><Input placeholder="e.g., 123 Anywhere Street" {...field} /></FormControl><FormMessage /></FormItem>
                            )}/>
                            <FormField control={form.control} name="city" render={({ field }) => (
                              <FormItem><FormLabel>City</FormLabel><FormControl><Input placeholder="e.g., Tokyo" {...field} /></FormControl><FormMessage /></FormItem>
                            )}/>
                            <FormField control={form.control} name="postalCode" render={({ field }) => (
                              <FormItem><FormLabel>Postal Code</FormLabel><FormControl><Input placeholder="e.g., 123-4567" {...field} /></FormControl><FormMessage /></FormItem>
                            )}/>
                          </>
                        )}
                        {orderType === 'pickup' && (
                           <p className="text-sm text-gray-600 p-3 bg-blue-100 rounded-md">Great! Your order will be ready for pickup at Doraemon's Pocket Diner. We'll notify you when it's ready!</p>
                        )}
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2">
                      <AccordionTrigger className="text-xl font-semibold text-green-700 hover:no-underline">
                        <User className="inline-block mr-2 h-6 w-6" /> Contact Information
                      </AccordionTrigger>
                      <AccordionContent className="pt-4 space-y-4">
                        <FormField control={form.control} name="name" render={({ field }) => (
                          <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="e.g., Nobita Nobi" {...field} /></FormControl><FormMessage /></FormItem>
                        )}/>
                        <FormField control={form.control} name="email" render={({ field }) => (
                          <FormItem><FormLabel>Email Address</FormLabel><FormControl><Input type="email" placeholder="e.g., nobita@doraemon.com" {...field} /></FormControl><FormMessage /></FormItem>
                        )}/>
                        <FormField control={form.control} name="phone" render={({ field }) => (
                          <FormItem><FormLabel>Phone Number</FormLabel><FormControl><Input type="tel" placeholder="e.g., 090-1234-5678" {...field} /></FormControl><FormMessage /></FormItem>
                        )}/>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-3">
                      <AccordionTrigger className="text-xl font-semibold text-green-700 hover:no-underline">
                        <CreditCard className="inline-block mr-2 h-6 w-6" /> Payment Details
                      </AccordionTrigger>
                      <AccordionContent className="pt-4 space-y-4">
                         <FormField
                            control={form.control}
                            name="paymentMethod"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Payment Method</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                    <SelectTrigger><SelectValue placeholder="Select a payment method" /></SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                    <SelectItem value="credit_card">Credit Card (Secure Gadget)</SelectItem>
                                    <SelectItem value="dorapay">DoraPay (Future Wallet - Coming Soon!)</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                                </FormItem>
                            )}
                         />
                        {paymentMethod === 'credit_card' && (
                            <>
                                <FormField control={form.control} name="cardNumber" render={({ field }) => (
                                <FormItem><FormLabel>Card Number</FormLabel><FormControl><Input placeholder="•••• •••• •••• ••••" {...field} /></FormControl><FormMessage /></FormItem>
                                )}/>
                                <div className="grid grid-cols-2 gap-4">
                                <FormField control={form.control} name="expiryDate" render={({ field }) => (
                                    <FormItem><FormLabel>Expiry Date (MM/YY)</FormLabel><FormControl><Input placeholder="MM/YY" {...field} /></FormControl><FormMessage /></FormItem>
                                )}/>
                                <FormField control={form.control} name="cvv" render={({ field }) => (
                                    <FormItem><FormLabel>CVV</FormLabel><FormControl><Input placeholder="•••" {...field} /></FormControl><FormMessage /></FormItem>
                                )}/>
                                </div>
                                <FormField control={form.control} name="savePayment" render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                                    <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                                    <div className="space-y-1 leading-none">
                                    <FormLabel>Save payment details for future adventures?</FormLabel>
                                    <FormDescription>We'll use Doraemon's secure pocket.</FormDescription>
                                    </div>
                                </FormItem>
                                )}/>
                            </>
                        )}
                         {paymentMethod === 'dorapay' && (
                           <p className="text-sm text-gray-600 p-3 bg-yellow-100 rounded-md">DoraPay is coming soon! Please select Credit Card for now.</p>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  {/* Placeholder for Order Summary, could be a Card component */}
                  <Card className="mt-6 bg-blue-50">
                    <CardHeader>
                        <CardTitle className="text-blue-700">Quick Order Review</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-600">Total items: <span className="font-semibold">3 (example)</span></p>
                        <p className="text-gray-600">Estimated total: <span className="font-semibold">$25.50 (example)</span></p>
                        <p className="mt-2 text-xs text-gray-500">Actual total will be confirmed from cart.</p>
                    </CardContent>
                  </Card>

                  <GadgetStyledButton type="submit" themeColor="doraemon-green" className="w-full text-lg py-3" disabled={form.formState.isSubmitting || paymentMethod === 'dorapay'}>
                    {form.formState.isSubmitting ? "Placing Order with Gadget..." : "Place Magical Order!"}
                  </GadgetStyledButton>
                </form>
              </Form>
            </CardContent>
          </Card>
        </main>
        <footer className="bg-green-600 text-white text-center p-4 mt-auto">
          Thank you for choosing Doraemon's Pocket Diner!
        </footer>
      </div>
    </PageLoadAnimator>
  );
};

export default CheckoutPage;