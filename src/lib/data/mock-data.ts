import { Restaurant } from '@/components/home/RestaurantCard';
import { Category } from '@/components/home/CategoryChips';

export const categories: Category[] = [
  { id: 'burgers', name: 'Burgers', image: '/categories/burgers.jpg', color: '#ff6b35' },
  { id: 'pizza', name: 'Pizza', image: '/categories/pizza.jpg', color: '#d41b3c' },
  { id: 'sushi', name: 'Sushi', image: '/categories/sushi.jpg', color: '#f59e0b' },
  { id: 'dessert', name: 'Dessert', image: '/categories/dessert.jpg', color: '#ec4899' },
  { id: 'asian', name: 'Asian', image: '/categories/asian.jpg', color: '#8b5cf6' },
  { id: 'cafe', name: 'Cafe', image: '/categories/cafe.jpg', color: '#10b981' },
];

export const searchCategories = [
  // Categories removed - using main categories only
];

export const featuredRestaurants: Restaurant[] = [
  {
    id: '1',
    name: 'The Smashed Patty',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1HXervz8JH-FrvTBzvQssE17h33O3G1paUkNxWRJi1s2sRqmivkkWTkZIPUZ6czX8pZiW4S1meE6Ifz8D4vttCf7PQZHNsnMXSXf_9RBZDrvggigHGuit9yYxLjYXbKCsuaDfdthh3byp8xIA5M5jg52UfepJYQz2BQojr1ii-JFzblWlpmjtg_MzTzs3JoU2sUBrvDzYhx_fditSl0xJE7-U-f20uQh-Gzbi3pOg7zpR3SU2b7T3Cg',
    rating: 4.9,
    cuisine: 'American',
    tags: ['Burgers', 'Comfort Food'],
    deliveryTime: '20-30 min',
    deliveryFee: 2.99,
    minOrder: 15,
    isFeatured: true,
  },
  {
    id: '2',
    name: 'Okinawa Sushi Bar',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC37CdES3Ld-DStTokzKzMC88xAuNlCXpA2pboQsV6wITzHzQgz4yi5y_Vk39Die4ZfAhRJGnwO27nMkSSmE_T0nGU_cTS5bTe5CJTRvguejuX4gVp_015DFKeZV25bCpnhlM0rAFkNpr9PHA2sF9a1vB1vud5P0zVXaP-dCzNcaGhJIjnRS4IlnJtAPP7uFjC4FAJIF_ESawxfWAWJeTrLouHlBzFq9J6fFU_cgaQ4v9EPdv-eaY7AqQ',
    rating: 4.7,
    cuisine: 'Japanese',
    tags: ['Sushi', 'Asian'],
    deliveryTime: '35-45 min',
    deliveryFee: 0,
    minOrder: 20,
    isFeatured: true,
    hasFreeDelivery: true,
  },
  {
    id: '3',
    name: 'Vesuvio Pizzeria',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqkDiZ8PndcpUxwJA6ebMI6EZ1r-ZSZfoBINHE-Yh33CfJLFETe2C5Plz1oSkSVVjf7zo0cbDK97Er82yLUhKMVcZxh1KiWKr1LgT7efou-JtmLJ-q0GBAOVMdvPUnr-ZMlSlql75VcUbTpg3QNT-hIEqoeh3KNDydmxAu-oJs3mwgaXtdocTaJ5PhQmb0nFpqHLLOv6Uk9TUSRVHX8IUeBjmwRsJw8UD4RG1cH8cm2Krg76iPwMWg2g',
    rating: 4.8,
    cuisine: 'Italian',
    tags: ['Pizza', 'Authentic'],
    deliveryTime: '25-40 min',
    deliveryFee: 1.49,
    minOrder: 10,
    isFeatured: true,
  },
];

export interface CartItem {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
}

export const sampleCartItems: CartItem[] = [
  {
    id: 'item-1',
    name: 'Signature Wagyu Burger',
    description: 'Medium Rare, No Onions',
    price: 24.00,
    quantity: 1,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA136ow7Jmia34BeGN8-5MwCxwZUoQWT4ppwvzXhwTXl_Ds8uoW3vxqH3OnfQRtgzVMmblZYOu_XtqPmTPaqpdl9Je7qfDh_NdjKBW7K_9Xmmpcel0yrEE2OihLxpKIbQfJom_h4gsBu4ImXlkN-2kTWOgAXSjDS4tSX4q_TZim3tJnxwzE3j-pxTa66i9mBWwTS4cZZ3AwBVGowenKzl2sMoWyFa3-HdS6NjmQH0IEwIQHHIKxfLX9NA',
  },
  {
    id: 'item-2',
    name: 'Crimson Spritz',
    description: 'House Special Cocktail',
    price: 14.50,
    quantity: 2,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAh82cFkEFhOyyczv365CNHxG3eT6HZ0HzGRdpgktgXJpA_zF0PcH9djFXGVKuiSA49s5tgKhq6HnUsStdcMrqUdPXP7r2oESVlYMJe1HBRgvQOBcj0ORutk7FN083kkMCGoOWZT3KbMUJKg8qgJVnQLfmD_u6JPVk1A9Xx8i9DasviCDO0yI_r6gsD3vtULRDLJPj2eRD_ChF87I47zfe0VY0TZoSkVsicUjBscwp2PLC9eMN3Ngb9TQ',
  },
];
