import { NextRequest, NextResponse } from 'next/server';

// Mock promo codes
const promoCodes: Record<string, { type: string; value: number; maxDiscount?: number; minOrder?: number }> = {
  'SAVE10': { type: 'PERCENTAGE', value: 10, maxDiscount: 20, minOrder: 30 },
  'FREESHIP': { type: 'FREE_DELIVERY', value: 0 },
  'FIRST20': { type: 'PERCENTAGE', value: 20, maxDiscount: 50, minOrder: 50, firstOrderOnly: true },
  'EPICUREAN15': { type: 'PERCENTAGE', value: 15, maxDiscount: 30 },
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    switch (action) {
      case 'validate_promo':
        return handleValidatePromo(body);
      
      case 'calculate_total':
        return handleCalculateTotal(body);
      
      case 'place_order':
        return handlePlaceOrder(body);
      
      default:
        return NextResponse.json(
          { success: false, error: 'Invalid action' },
          { status: 400 }
        );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function handleValidatePromo(body: any) {
  const { code, subtotal, isFirstOrder = false } = body;

  if (!code) {
    return NextResponse.json({
      success: false,
      error: 'Promo code is required',
    });
  }

  const promo = promoCodes[code.toUpperCase()];

  if (!promo) {
    return NextResponse.json({
      success: false,
      error: 'Invalid promo code',
    }, { status: 404 });
  }

  // Check minimum order
  if (promo.minOrder && subtotal < promo.minOrder) {
    return NextResponse.json({
      success: false,
      error: `Minimum order of $${promo.minOrder} required`,
    });
  }

  // Check first order restriction
  if (promo.firstOrderOnly && !isFirstOrder) {
    return NextResponse.json({
      success: false,
      error: 'This promo is only valid for first orders',
    });
  }

  // Calculate discount
  let discountAmount = 0;
  
  switch (promo.type) {
    case 'PERCENTAGE':
      discountAmount = (subtotal * promo.value) / 100;
      if (promo.maxDiscount && discountAmount > promo.maxDiscount) {
        discountAmount = promo.maxDiscount;
      }
      break;
    case 'FIXED':
      discountAmount = promo.value;
      break;
    case 'FREE_DELIVERY':
      discountAmount = 2.99; // Average delivery fee
      break;
  }

  return NextResponse.json({
    success: true,
    data: {
      code: code.toUpperCase(),
      type: promo.type,
      value: promo.value,
      discountAmount: Math.round(discountAmount * 100) / 100,
      message: `Promo code applied! You save $${discountAmount.toFixed(2)}`,
    },
  });
}

function handleCalculateTotal(body: any) {
  const { items, deliveryFee, tip = 0, promoCode } = body;

  // Calculate subtotal
  const subtotal = items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
  
  // Calculate tax (11.5%)
  const tax = subtotal * 0.115;

  // Apply promo code discount
  let discount = 0;
  if (promoCode && promoCodes[promoCode.toUpperCase()]) {
    const promo = promoCodes[promoCode.toUpperCase()];
    if (promo.type === 'PERCENTAGE') {
      discount = (subtotal * promo.value) / 100;
      if (promo.maxDiscount) discount = Math.min(discount, promo.maxDiscount);
    }
    discount = Math.round(discount * 100) / 100;
  }

  // Calculate total
  const total = subtotal + deliveryFee + tax + tip - discount;

  return NextResponse.json({
    success: true,
    data: {
      subtotal: Math.round(subtotal * 100) / 100,
      deliveryFee: Math.round(deliveryFee * 100) / 100,
      tax: Math.round(tax * 100) / 100,
      tip: Math.round(tip * 100) / 100,
      discount: discount,
      total: Math.round(Math.max(0, total) * 100) / 100,
    },
  });
}

function handlePlaceOrder(body: any) {
  const { userId, restaurantId, addressId, items, paymentMethod, instructions, tip, promoCode } = body;

  // Validate
  if (!userId || !restaurantId || !addressId || !items?.length || !paymentMethod) {
    return NextResponse.json({
      success: false,
      error: 'Missing required fields',
    }, { status: 400 });
  }

  // Create order (mock)
  const order = {
    id: `ORD-${Date.now()}`,
    orderNumber: `EP-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
    userId,
    restaurantId,
    addressId,
    items,
    paymentMethod,
    instructions,
    tip: tip || 0,
    promoCode,
    status: 'PENDING',
    placedAt: new Date().toISOString(),
    estimatedDelivery: new Date(Date.now() + 30 * 60000).toISOString(), // 30 mins from now
  };

  return NextResponse.json({
    success: true,
    message: 'Order placed successfully!',
    data: order,
  }, { status: 201 });
}
