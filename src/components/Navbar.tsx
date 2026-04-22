import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  isScrolled: boolean;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isScrolled,
  isMenuOpen,
  setIsMenuOpen,
}) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const navItems = ["Home", "About Us", "Products", "Why Choose Us", "Contact"];

  const handleNavClick = (item: string) => {
    setIsMenuOpen(false);
    if (!isHomePage) {
      // If not on home page, we'll let the link handle it (which goes to /#id)
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md py-3 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link
          to="/"
          className="flex items-center"
          onClick={() => setIsMenuOpen(false)}
        >
          <img
            src="/images/logo.jpg"
            alt="AGAPURE Logo"
            className="h-12 md:h-19 w-auto object-contain"
            referrerPolicy="no-referrer"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {navItems.map((item) => {
            const id = item.toLowerCase().replace(/ /g, "-");
            const href = isHomePage ? `#${id}` : `/#${id}`;

            return (
              <a
                key={item}
                href={item === "Home" ? (isHomePage ? "#" : "/") : href}
                onClick={() => handleNavClick(item)}
                className="text-sm font-medium uppercase tracking-widest text-gray-700 hover:text-primary transition-colors"
              >
                {item}
              </a>
            );
          })}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X size={28} className="text-primary" />
          ) : (
            <Menu size={28} className="text-primary" />
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
        >
          <div className="flex flex-col p-6 space-y-4">
            {navItems.map((item) => {
              const id = item.toLowerCase().replace(/ /g, "-");
              const href = isHomePage ? `#${id}` : `/#${id}`;

              return (
                <a
                  key={item}
                  href={item === "Home" ? (isHomePage ? "#" : "/") : href}
                  onClick={() => handleNavClick(item)}
                  className="text-gray-700 font-medium hover:text-primary"
                >
                  {item}
                </a>
              );
            })}
          </div>
        </motion.div>
      )}
    </nav>
  );
};
