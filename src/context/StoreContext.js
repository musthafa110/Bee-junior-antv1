'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialProducts } from '../data/products';

const StoreContext = createContext();

export function StoreProvider({ children }) {
  // Products (can be modified by Admin or fetched from Supabase)
  const [products, setProducts] = useState(initialProducts);

  // Cart State
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Wishlist State
  const [wishlist, setWishlist] = useState([]);

  // Search Modal State
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Quick View Product Modal
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Active Promo / Coupon
  const [appliedPromo, setAppliedPromo] = useState({
    code: 'SUMMER10',
    discountPercent: 10,
    title: '10% Summer Savings'
  });

  // Toast Notification State
  const [toast, setToast] = useState(null);

  // Website Settings (CMS for Admin)
  const [siteSettings, setSiteSettings] = useState({
    heroTagline: "KIDS CLOTHING",
    heroHeading: "Little Styles\nfor Big Dreams",
    heroSubtitle: "Comfortable. Playful. Everyday Wear.",
    heroButtonText: "Shop Now →",
    heroImage: "/images/hero-kids.jpg",
    promoBannerTitle: "Summer Collection",
    promoBannerDiscount: "10% Off",
    promoBannerSubtitle: "On Selected Styles",
    promoBannerButton: "Shop Now →",
    freeShippingThreshold: 999,
    standardShippingFee: 99
  });

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedCart = localStorage.getItem('bee_cart');
        if (savedCart) setCart(JSON.parse(savedCart));

        const savedWishlist = localStorage.getItem('bee_wishlist');
        if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

        const savedProducts = localStorage.getItem('bee_products');
        if (savedProducts) setProducts(JSON.parse(savedProducts));

        const savedSettings = localStorage.getItem('bee_settings');
        if (savedSettings) setSiteSettings(JSON.parse(savedSettings));
      } catch (err) {
        console.error('Failed to load from storage:', err);
      }
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('bee_cart', JSON.stringify(cart));
      } catch (err) {
        console.error('Failed to save cart:', err);
      }
    }
  }, [cart]);

  // Save wishlist to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('bee_wishlist', JSON.stringify(wishlist));
      } catch (err) {
        console.error('Failed to save wishlist:', err);
      }
    }
  }, [wishlist]);

  // Show Toast
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  // Cart Functions
  const addToCart = (product, selectedSize = null, selectedColor = null, quantity = 1) => {
    const size = selectedSize || product.sizes?.[0] || '2-3Y';
    const color = selectedColor || product.colors?.[0]?.name || 'Natural';
    const cartItemId = `${product.id}-${size}-${color}`;

    setCart(prevCart => {
      const existing = prevCart.find(item => item.cartItemId === cartItemId);
      if (existing) {
        return prevCart.map(item =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prevCart,
        {
          ...product,
          cartItemId,
          selectedSize: size,
          selectedColor: color,
          quantity
        }
      ];
    });

    showToast(`Added "${product.name}" to bag!`);
    setIsCartOpen(true);
  };

  const updateQuantity = (cartItemId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const removeFromCart = (cartItemId) => {
    setCart(prev => prev.filter(item => item.cartItemId !== cartItemId));
    showToast('Item removed from bag', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  // Calculations
  const cartSubtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = appliedPromo ? Math.round((cartSubtotal * appliedPromo.discountPercent) / 100) : 0;
  const shippingFee = cartSubtotal === 0 || cartSubtotal >= siteSettings.freeShippingThreshold ? 0 : siteSettings.standardShippingFee;
  const cartTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Wishlist Functions
  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) {
        showToast(`Removed "${product.name}" from wishlist`, 'info');
        return prev.filter(item => item.id !== product.id);
      } else {
        showToast(`Saved "${product.name}" to wishlist ♡`, 'success');
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  // Search
  const filteredProducts = searchQuery.trim() === ''
    ? []
    : products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );

  return (
    <StoreContext.Provider
      value={{
        products,
        setProducts,
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartSubtotal,
        discountAmount,
        shippingFee,
        cartTotal,
        cartItemCount,
        isCartOpen,
        setIsCartOpen,
        wishlist,
        toggleWishlist,
        isInWishlist,
        isSearchOpen,
        setIsSearchOpen,
        searchQuery,
        setSearchQuery,
        filteredProducts,
        quickViewProduct,
        setQuickViewProduct,
        appliedPromo,
        setAppliedPromo,
        toast,
        showToast,
        siteSettings,
        setSiteSettings
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
