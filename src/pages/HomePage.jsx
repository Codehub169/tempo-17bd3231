import React from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

function HomePage() {
  const featuredProducts = products.filter(product => product.featured).slice(0, 4);
  const newArrivals = products.filter(product => product.newArrival).slice(0, 4);

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="hero-section bg-secondary text-text-light rounded-lg p-8 mb-12 shadow-medium text-center flex flex-col items-center justify-center">
        <h1 className="text-5xl font-heading mb-4 leading-tight">Welcome to Plushie Paradise!</h1>
        <p className="text-xl font-body mb-6 max-w-2xl">Discover the softest, most lovable plush toys that bring joy and comfort to every child. Find their new best friend today!</p>
        <Link to="/products" className="btn btn-primary btn-large">
          Explore Our Plushies
        </Link>
      </section>

      <section className="featured-products mb-12">
        <h2 className="text-4xl font-heading text-primary-color text-center mb-8">Featured Plushies</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/products" className="btn btn-outline">View All Products</Link>
        </div>
      </section>

      <section className="new-arrivals mb-12">
        <h2 className="text-4xl font-heading text-primary-color text-center mb-8">New Arrivals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/products" className="btn btn-outline">Discover More New Arrivals</Link>
        </div>
      </section>

      <section className="about-us bg-bg-dark text-text-light rounded-lg p-8 text-center shadow-medium">
        <h2 className="text-4xl font-heading mb-4">Our Mission</h2>
        <p className="text-lg font-body max-w-3xl mx-auto mb-6">At Plushie Paradise, we believe in the magic of childhood. We hand-pick every plushie to ensure it's not just a toy, but a cherished companion that inspires imagination, provides comfort, and brings endless smiles.</p>
        <Link to="/contact" className="btn btn-secondary">Contact Us</Link>
      </section>
    </div>
  );
}

export default HomePage;
