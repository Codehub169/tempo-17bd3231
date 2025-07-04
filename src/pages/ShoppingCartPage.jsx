import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/helpers';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CartItem from '../components/CartItem';

function ShoppingCartPage() {
  const { cartItems, cartTotal, updateQuantity, removeFromCart, clearCart } = useCart();

  return (
    <div className="flex flex-col min-h-screen bg-bg-light">
      <Header />
      <main className="container mx-auto py-8 px-4 flex-grow">
        <h1 className="text-4xl font-heading text-primary text-center mb-8">Your Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center p-8 bg-white rounded-lg shadow-light">
            <p className="text-xl text-text-dark mb-4">Your cart is currently empty.</p>
            <Link to="/products" className="btn btn-primary">Start Shopping</Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Cart Items List */}
            <section className="lg:w-2/3 flex flex-col gap-4">
              {cartItems.map(item => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemoveItem={removeFromCart}
                />
              ))}
            </section>

            {/* Cart Summary */}
            <section className="lg:w-1/3 bg-white rounded-lg shadow-light p-6 h-fit">
              <h2 className="font-heading text-secondary text-xl mb-4">Order Summary</h2>
              <div className="flex justify-between mb-2 pb-2 border-b border-dashed border-border-color">
                <span className="text-dark">Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items):</span>
                <span className="text-dark font-semibold">{formatCurrency(cartTotal)}</span>
              </div>
              <div className="flex justify-between mb-2 pb-2 border-b border-dashed border-border-color">
                <span className="text-dark">Shipping:</span>
                <span className="text-dark font-semibold">{formatCurrency(5.00)}</span>
              </div>
              <div className="flex justify-between text-2xl font-bold text-primary border-t border-border-color pt-2 mt-2">
                <span>Total:</span>
                <span>{formatCurrency(cartTotal + 5.00)}</span>
              </div>
              <div className="mt-6 flex flex-col gap-3">
                <Link to="/checkout" className="btn btn-primary w-full text-center">Proceed to Checkout</Link>
                <button onClick={clearCart} className="btn btn-outline w-full">Clear Cart</button>
                <Link to="/products" className="btn btn-secondary w-full text-center">Continue Shopping</Link>
              </div>
            </section>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default ShoppingCartPage;