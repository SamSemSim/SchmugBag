'use client';

import { createContext, useContext, useReducer, ReactNode } from 'react';

type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  color: string;
};

type CartState = {
  items: CartItem[];
  total: number;
};

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: { id: number; color: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; color: string; quantity: number } }
  | { type: 'CLEAR_CART' };

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | undefined>(undefined);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(
        item => item.id === action.payload.id && item.color === action.payload.color
      );

      if (existingItemIndex > -1) {
        const newItems = [...state.items];
        newItems[existingItemIndex].quantity += action.payload.quantity;
        return {
          ...state,
          items: newItems,
          total: calculateTotal(newItems),
        };
      }

      const newItems = [...state.items, action.payload];
      return {
        ...state,
        items: newItems,
        total: calculateTotal(newItems),
      };
    }

    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(
        item => !(item.id === action.payload.id && item.color === action.payload.color)
      );
      return {
        ...state,
        items: newItems,
        total: calculateTotal(newItems),
      };
    }

    case 'UPDATE_QUANTITY': {
      const newItems = state.items.map(item =>
        item.id === action.payload.id && item.color === action.payload.color
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      return {
        ...state,
        items: newItems,
        total: calculateTotal(newItems),
      };
    }

    case 'CLEAR_CART':
      return {
        items: [],
        total: 0,
      };

    default:
      return state;
  }
}

function calculateTotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 });

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
} 