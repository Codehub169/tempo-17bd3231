import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { formatCurrency } from '../utils/helpers';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WishlistItem from '../components/WishlistItem'; // Import the new component

function WishlistPage() {
  const { wishlistItems, removeFromWishlist } = useWishlist();

  return (
    <div className="flex flex-col min-h-screen bg-bg-light">
      <Header />
      <main className="container mx-auto py-8 px-4 flex-grow">
        <h1 className="text-4xl font-heading text-primary text-center mb-8">Your Wishlist</h1>

        {wishlistItems.length === 0 ? (
          <div className="text-center p-8 bg-white rounded-lg shadow-light">
            <p className="text-xl text-text-dark mb-4">Your wishlist is currently empty.</p>
            <Link to="/products" className="btn btn-primary">Start Shopping</Link>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <section className="flex flex-col gap-4">
              {wishlistItems.map(item => (
                <WishlistItem
                  key={item.id}
                  item={item}
                  onRemoveItem={removeFromWishlist}
                />
              ))}
            </section>
            <div className="text-center mt-4">
              <Link to="/products" className="btn btn-secondary">Continue Shopping</Link>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default WishlistPage;