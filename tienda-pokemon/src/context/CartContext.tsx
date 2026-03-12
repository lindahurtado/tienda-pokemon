import { createContext, useContext, useEffect, useState } from "react";
import type { CartItem } from "../models/cart";
import type { CardPokemon } from "../models/pokemon";

interface CartContextType {
    cart: CartItem[],
    addToCart: (pokemon: CardPokemon) => void,
    removeFromCart: (id: number) => void,
    totalItems: number,
    totalPrice: number,
    updateQuantity: (id: number, q: number) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>(() => {
        const saveCart = localStorage.getItem('pokemon_cart');
        return saveCart ? JSON.parse(saveCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('pokemon_cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product: CardPokemon) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            const currentQ = existing ? existing.quantity : 0;

            if(currentQ >= 10) {
                return prev;
            }

            if (existing) {
                return prev.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (id: number) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
    };

    const updateQuantity = (id: number, q: number) => {
        setCart((prevCart) => {
            return prevCart.map((item) => {
                if ( item.id === id) {
                    const nQuantity = item.quantity + q;

                    if ( nQuantity < 1 || nQuantity > 10 ) return item;

                    return {...item, quantity: nQuantity};
                }
                return item;
            })
        })
    }

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, totalItems, totalPrice, updateQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart debe usarse dentro de un CartProvider');
    return context;
}