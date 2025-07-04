import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext'; // Import useWishlist

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist(); // Get wishlist functions

  const handleAddToCart = () => {
    addToCart(product, 1); // Add one quantity by default
    // Optional: Add a visual feedback animation (e.g., button changes color briefly)
    // This would typically be handled with useState and a setTimeout in a real app
    alert(`${product.name} added to cart!`); // Simple feedback for now
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault(); // Prevent navigating to product detail page
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:translate-y-[-5px] hover:shadow-md p-4 text-center relative"> {/* Added relative for absolute positioning of wishlist icon */}
      <Link to={`/product-detail/${product.id}`}>
        <img src={product.image} alt={product.name} className="w-full h-64 object-contain rounded-md mb-2" />
        <h3 className="text-lg font-heading font-semibold text-dark mb-1 whitespace-nowrap overflow-hidden text-ellipsis">{product.name}</h3>
        <p className="text-xl font-bold text-primary mb-4">${product.price.toFixed(2)}</p>
      </Link>
      <button
        onClick={handleAddToCart}
        className="btn btn-primary btn-small w-full"
      >
        <i className="fas fa-cart-plus mr-2"></i> Add to Cart
      </button>
      <button
        onClick={handleToggleWishlist}
        className={`absolute top-4 right-4 bg-white rounded-full p-2 shadow-md transition-colors duration-300 ${
          isInWishlist(product.id) ? 'text-primary' : 'text-gray-400 hover:text-primary'
        }`}
        aria-label={isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
      >
        <i className={`fas ${isInWishlist(product.id) ? 'fa-heart' : 'fa-heart'}`}></i> {/* Using solid heart for both states, color changes */}
      </button>
    </div>
  );
}

export default ProductCard;