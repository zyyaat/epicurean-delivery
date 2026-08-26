import { NextRequest, NextResponse } from 'next/server';

// Mock data for demo (in production, this would query the database)
const mockRestaurants = [
  {
    id: '1',
    name: 'The Smashed Patty',
    slug: 'the-smashed-patty',
    cuisine: 'American',
    priceRange: 2,
    rating: 4.9,
    reviewCount: 342,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1HXervz8JH-FrvTBzvQssE17h33O3G1paUkNxWRJi1s2sRqmivkkWTkZIPUZ6czX8pZiW4S1meE6Ifz8D4vttCf7PQZHNsnMXSXf_9RBZDrvggigHGuit9yYxLjYXbKCsuaDfdthh3byp8xIA5M5jg52UfepJYQz2BQojr1ii-JFzblWlpmjtg_MzTzs3JoU2sUBrvDzYhx_fditSl0xJE7-U-f20uQh-Gzbi3pOg7zpR3SU2b7T3Cg',
    deliveryFee: 2.99,
    minOrder: 15,
    estimatedTime: 25,
    isOpen: true,
    categories: ['burgers', 'american', 'fast-food'],
  },
  {
    id: '2',
    name: 'Okinawa Sushi Bar',
    slug: 'okinawa-sushi-bar',
    cuisine: 'Japanese',
    priceRange: 3,
    rating: 4.7,
    reviewCount: 289,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC37CdES3Ld-DStTokzKzMC88xAuNlCXpA2pboQsV6wITzHzQgz4yi5y_Vk39Die4ZfAhRJGnwO27nMkSSmE_T0nGU_cTS5bTe5CJTRvguejuX4gVp_015DFKeZV25bCpnhlM0rAFkNpr9PHA2sF9a1vB1vud5P0zVXaP-dCzNcaGhJIjnRS4IlnJtAPP7uFjC4FAJIF_ESawxfWAWJeTrLouHlBzFq9J6fFU_cgaQ4v9EPdv-eaY7AqQ',
    deliveryFee: 0,
    minOrder: 20,
    estimatedTime: 35,
    isOpen: true,
    categories: ['sushi', 'japanese', 'asian', 'seafood'],
  },
  {
    id: '3',
    name: 'Vesuvio Pizzeria',
    slug: 'vesuvio-pizzeria',
    cuisine: 'Italian',
    priceRange: 2,
    rating: 4.8,
    reviewCount: 456,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqkDiZ8PndcpUxwJA6ebMI6EZ1r-ZSZfoBINHE-Yh33CfJLFETe2C5Plz1oSkSVVjf7zo0cbDK97Er82yLUhKMVcZxh1KiWKr1LgT7efou-JtmLJ-q0GBAOVMdvPUnr-ZMlSlql75VcUbTpg3QNT-hIEqoeh3KNDydmxAu-oJs3mwgaXtdocTaJ5PhQmb0nFpqHLLOv6Uk9TUSRVHX8IUeBjmwRsJw8UD4RG1cH8cm2Krg76iPwMWg2g',
    deliveryFee: 1.49,
    minOrder: 10,
    estimatedTime: 30,
    isOpen: true,
    categories: ['pizza', 'italian', 'pasta'],
  },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  
  // Query parameters
  const search = searchParams.get('search') || '';
  const cuisine = searchParams.get('cuisine') || '';
  const priceMin = parseInt(searchParams.get('priceMin') || '0');
  const priceMax = parseInt(searchParams.get('priceMax') || '4');
  const rating = parseFloat(searchParams.get('rating') || '0');
  const freeDelivery = searchParams.get('freeDelivery') === 'true';
  const sort = searchParams.get('sort') || 'rating'; // rating, distance, delivery_time, newest
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '12');

  // Filter restaurants
  let filtered = mockRestaurants.filter(restaurant => {
    // Search filter
    if (search && !restaurant.name.toLowerCase().includes(search.toLowerCase()) && 
        !restaurant.cuisine.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    
    // Cuisine filter
    if (cuisine && !restaurant.categories.includes(cuisine.toLowerCase())) {
      return false;
    }
    
    // Price range filter
    if (restaurant.priceRange < priceMin || restaurant.priceRange > priceMax) {
      return false;
    }
    
    // Rating filter
    if (restaurant.rating < rating) {
      return false;
    }
    
    // Free delivery filter
    if (freeDelivery && restaurant.deliveryFee > 0) {
      return false;
    }
    
    // Open now filter (mock - all are open)
    if (!restaurant.isOpen) {
      return false;
    }
    
    return true;
  });

  // Sort results
  switch (sort) {
    case 'rating':
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    case 'delivery_time':
      filtered.sort((a, b) => a.estimatedTime - b.estimatedTime);
      break;
    case 'price_low':
      filtered.sort((a, b) => a.priceRange - b.priceRange);
      break;
    case 'price_high':
      filtered.sort((a, b) => b.priceRange - a.priceRange);
      break;
    case 'newest':
      // In production, would sort by createdAt
      break;
    default:
      filtered.sort((a, b) => b.rating - a.rating);
  }

  // Pagination
  const total = filtered.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const paginated = filtered.slice(start, start + limit);

  return NextResponse.json({
    success: true,
    data: paginated,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
    filters: {
      search,
      cuisine,
      priceMin,
      priceMax,
      rating,
      freeDelivery,
      sort,
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // In production, would create a new restaurant in database
    return NextResponse.json({
      success: true,
      message: 'Restaurant created successfully (demo)',
      data: body,
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Invalid request body' },
      { status: 400 }
    );
  }
}
