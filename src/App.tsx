/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, useScroll, useSpring, motion } from "motion/react";

// Import our new components
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { MobileBottomNav } from "./components/MobileBottomNav";
import { HomePage } from "./pages/HomePage";
import { ProductPage } from "./pages/ProductPage";
import { SEO } from "./components/SEO";

// Scroll to top component
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export default function App() {
  // --- STATE MANAGEMENT ---
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    message: "",
    oilQuantity: "",
    oilUnit: "Litre",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const CONTACT_EMAIL = "rv.vgnesh@gmail.com";
  const [isCaptchaLoading, setIsCaptchaLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Scroll Progress Bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Handle Scroll for Navbar
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- DATA ---
  const slides = [
    {
      id: 1,
      title: "Pure & High-Quality Edible Oils",
      subtitle: "Your trusted partner in delivering quality you can trust.",
      image: "/images/hero-banner.jpg",
      cta: "Explore Products",
      link: "#products",
    },
    {
      id: 2,
      title: "Coimbatore-Based Manufacturer",
      subtitle:
        "Specializing in Refined Palm, Groundnut, Sunflower, and Coconut oils.",
      image: "/images/hero-banner.jpg",
      cta: "About Us",
      link: "#about-us",
    },
    {
      id: 3,
      title: "Bulk Supply & Wholesale Pricing",
      subtitle:
        "Serving wholesalers, retailers, and bulk buyers across various markets.",
      image: "/images/hero-banner.jpg",
      cta: "Contact Us",
      link: "#contact",
    },
    {
      id: 4,
      title: "Hygienic Processing & Packaging",
      subtitle:
        "Ensuring the highest standards of safety and purity in every drop.",
      image: "/images/hero-banner.jpg",
      cta: "Our Quality",
      link: "#why-choose-us",
    },
    {
      id: 5,
      title: "Trusted by Thousands of Families",
      subtitle: "Bringing health and taste to your kitchen with Agapure oils.",
      image: "/images/hero-banner.jpg",
      cta: "View Products",
      link: "#products",
    },
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, [slides.length]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
      newErrors.phone = "Invalid phone number";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsCaptchaLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsCaptchaLoading(false);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, to: CONTACT_EMAIL }),
      });

      if (response.ok) {
        setIsSuccess(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          address: "",
          message: "",
          oilQuantity: "",
          oilUnit: "Litre",
        });
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        alert("Failed to send message. Please try again later.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="relative font-sans text-gray-900 bg-white overflow-x-hidden">
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-primary z-[70] origin-left"
          style={{ scaleX }}
        />

        <Navbar
          isScrolled={isScrolled}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />

        <AnimatePresence mode="wait">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <SEO />
                  <script type="application/ld+json">
                    {JSON.stringify({
                      "@context": "https://schema.org",
                      "@type": "LocalBusiness",
                      name: "Agapure Enterprises",
                      image: "https://agapurelife.com/images/logo.jpg",
                      address: {
                        "@type": "PostalAddress",
                        streetAddress:
                          "No.280/2E1, Pachapalli Thottam, Sundakkamuthur Village, Kovaipudur",
                        addressLocality: "Coimbatore",
                        addressRegion: "TN",
                        postalCode: "641042",
                        addressCountry: "IN",
                      },
                      geo: {
                        "@type": "GeoCoordinates",
                        latitude: "10.9500",
                        longitude: "76.9300",
                      },
                      url: "https://agapurelife.com",
                      telephone: "+918136840790",
                      openingHoursSpecification: [
                        {
                          "@type": "OpeningHoursSpecification",
                          dayOfWeek: [
                            "Monday",
                            "Tuesday",
                            "Wednesday",
                            "Thursday",
                            "Friday",
                            "Saturday",
                          ],
                          opens: "09:00",
                          closes: "18:00",
                        },
                      ],
                    })}
                  </script>
                  <HomePage
                    currentSlide={currentSlide}
                    slides={slides}
                    prevSlide={prevSlide}
                    nextSlide={nextSlide}
                    formData={formData}
                    setFormData={setFormData}
                    handleFormSubmit={handleFormSubmit}
                    isCaptchaLoading={isCaptchaLoading}
                    isSubmitting={isSubmitting}
                    isSuccess={isSuccess}
                    errors={errors}
                    setErrors={setErrors}
                  />
                </>
              }
            />
            <Route path="/products/:productName" element={<ProductPage />} />
          </Routes>
        </AnimatePresence>

        <div className="w-full bg-primary h-[60px] flex items-center justify-center text-center px-6">
          <p className="text-white font-heading font-bold text-lg md:text-2xl tracking-wide">
            For Enquiry Please call :{" "}
            <a href="tel:+918136840790" className="hover:underline">
              +91 8136840790
            </a>
          </p>
        </div>

        <Footer />
        <MobileBottomNav />
      </div>
    </Router>
  );
}
