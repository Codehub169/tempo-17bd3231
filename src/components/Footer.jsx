import React from 'react';

function Footer() {
  return (
    <footer className="bg-dark text-light py-12 text-center mt-auto">
      <div className="container mx-auto px-4 flex flex-col gap-6">
        <p>&copy; {new Date().getFullYear()} Plushie Haven. All rights reserved.</p>
        <div className="flex justify-center gap-4 flex-wrap">
          <a href="#" className="text-light hover:text-secondary transition-colors duration-300">Privacy Policy</a>
          <a href="#" className="text-light hover:text-secondary transition-colors duration-300">Terms of Service</a>
          <a href="#" className="text-light hover:text-secondary transition-colors duration-300">Contact Us</a>
        </div>
        <div className="flex justify-center gap-4 text-xl">
          <a href="#" aria-label="Facebook" className="text-light hover:text-secondary transition-colors duration-300"><i className="fab fa-facebook-f"></i></a>
          <a href="#" aria-label="Twitter" className="text-light hover:text-secondary transition-colors duration-300"><i className="fab fa-twitter"></i></a>
          <a href="#" aria-label="Instagram" className="text-light hover:text-secondary transition-colors duration-300"><i className="fab fa-instagram"></i></a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
