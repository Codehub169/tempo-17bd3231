import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext'; // Import useWishlist

function Header() {
  const { totalItems } = useCart();
  const { wishlistItems } = useWishlist(); // Get wishlist items

  return (
    <header className="bg-white shadow-sm py-4 sticky top-0 z-50"> {/* Changed z-1000 to z-50 for standard Tailwind CSS utility */}
      <div className="container mx-auto px-4 flex justify-between items-center flex-wrap">
        <Link to="/" className="font-heading text-2xl font-bold text-primary flex items-center gap-1">
          <img src="https://via.placeholder.com/40x40/FF6B6B/FFFFFF?text=P" alt="Plushie Haven Logo" className="h-8" />
          Plushie Haven
        </Link>
        <nav>
          <ul className="flex gap-4 list-none">
            <li><Link to="/" className="text-dark font-medium py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-secondary after:transition-all after:duration-300 hover:after:w-full">Home</Link></li>
            <li><Link to="/products" className="text-dark font-medium py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-secondary after:transition-all after:duration-300 hover:after:w-full">Shop</Link></li>
            {/* Account and Login are placeholders as per the plan, linking to static HTML for now */}
            <li><Link to="/account" className="text-dark font-medium py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-secondary after:transition-all after:duration-300 hover:after:w-full">Account</Link></li>
            <li><Link to="/login" className="text-dark font-medium py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-secondary after:transition-all after:duration-300 hover:after:w-full">Login</Link></li>
          </ul>
        </nav>
        <div className="flex gap-4 items-center"> {/* Group cart and wishlist icons */}
          <Link to="/wishlist" className="relative text-dark text-2xl">
            <i className="fas fa-heart"></i> {/* Font Awesome heart icon */}
            {wishlistItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent text-dark text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                {wishlistItems.length}
              </span>
            )}
          </Link>
          <Link to="/cart" className="relative text-dark text-2xl">
            <i className="fas fa-shopping-cart"></i>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent text-dark text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;