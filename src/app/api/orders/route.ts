import { NextRequest, NextResponse } from 'next/server';

// Mock orders data
const mockOrders = [
  {
    id: 'ORD-001',
    orderNumber: 'EP-2024-001',
    userId: '1',
    restaurantId: '1',
    restaurantName: 'The Smashed Patty',
    status: 'DELIVERED',
    items: [
      { id: 'item-1', name: 'Signature Wagyu Burger', price: 24.00, quantity: 2 },
      { id: 'item-2', name: 'Classic Cheeseburger', price: 16.00, quantity: 1 },
    ],
    subtotal: 64.00,
    deliveryFee: 2.99,
    tax: 7.88,
    tip: 5.00,
    total: 79.87,
    paymentMethod: 'CARD',
    paymentStatus: 'COMPLETED',
    placedAt: '2024-08-26T14:30:00Z',
    deliveredAt: '2024-08-26T15:15:00Z',
    address: '124 Main Street, Downtown',
  },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  
  // In production, would get userId from auth token
  const userId = searchParams.get('userId') || '1';
  const status = searchParams.get('status') || '';
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');

  let filtered = mockOrders.filter(order => order.userId === userId);
  
  if (status) {
    filtered = filtered.filter(order => order.status === status.toUpperCase());
  }

  const total = filtered.length;
  const start = (page - 1) * limit;
  const paginated = filtered.slice(start, start + limit);

  return NextResponse.json({
    success: true,
    data: paginated,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['restaurantId', 'addressId', 'items', 'paymentMethod'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Calculate totals
    const subtotal = body.items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
    const deliveryFee = body.deliveryFee || 2.99;
    const tax = subtotal * 0.115; // 11.5% tax
    const tip = body.tip || 0;
    const total = subtotal + deliveryFee + tax + tip;

    // Create new order (mock)
    const newOrder = {
      id: `ORD-${Date.now()}`,
      orderNumber: `EP-${Date.now().toString(36).toUpperCase()}`,
      ...body,
      subtotal,
      deliveryFee,
      tax,
      tip,
      total,
      status: 'PENDING',
      placedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      message: 'Order created successfully',
      data: newOrder,
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Invalid request body' },
      { status: 400 }
    );
  }
}
