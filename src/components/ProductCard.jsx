import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, 1); // Add one quantity by default
    // Optional: Add a visual feedback animation (e.g., button changes color briefly)
    // This would typically be handled with useState and a setTimeout in a real app
    alert(`${product.name} added to cart!`); // Simple feedback for now
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:translate-y-[-5px] hover:shadow-md p-4 text-center">
      <Link to={`/product/${product.id}`}>
        <img src={product.image} alt={product.name} className="w-full h-64 object-contain rounded-md mb-2" />
        <h3 className="text-lg font-poppins font-semibold text-dark mb-1 whitespace-nowrap overflow-hidden text-ellipsis">{product.name}</h3>
      </Link>
      <p className="text-xl font-bold text-primary mb-4">${product.price.toFixed(2)}</p>
      <button
        onClick={handleAddToCart}
        className="btn btn-primary btn-small w-full"
      >
        <i className="fas fa-cart-plus mr-2"></i> Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
