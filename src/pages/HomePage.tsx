import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Factory,
  Award,
  CheckCircle2,
  Package,
  Users,
  Truck,
  MapPin,
  Phone,
  Mail,
  Send,
  Loader2,
} from "lucide-react";

interface HomeProps {
  currentSlide: number;
  slides: any[];
  prevSlide: () => void;
  nextSlide: () => void;
  formData: any;
  setFormData: (data: any) => void;
  handleFormSubmit: (e: React.FormEvent) => void;
  isCaptchaLoading: boolean;
  isSubmitting: boolean;
  isSuccess: boolean;
  errors: Record<string, string>;
  setErrors: (errors: Record<string, string>) => void;
}

export const HomePage: React.FC<HomeProps> = ({
  currentSlide,
  slides,
  prevSlide,
  nextSlide,
  formData,
  setFormData,
  handleFormSubmit,
  isCaptchaLoading,
  isSubmitting,
  isSuccess,
  errors,
  setErrors,
}) => {
  const parallaxRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ["start end", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <motion.div
      key="home-view"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* HERO SECTION */}
      <section
        id="home"
        className="relative h-[100vh] min-h-[700px] w-full overflow-hidden bg-black pt-12 md:pt-16"
      >
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-black/20 z-10" />
            <img
              src={slides[currentSlide].image}
              alt="Banner"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </AnimatePresence>

        {/* <div className="relative z-20 h-full flex items-center justify-center text-center px-6">
          <div className="max-w-4xl">
            <motion.h1
              key={`t-${currentSlide}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6 font-display"
            >
              {slides[currentSlide].title}
            </motion.h1>
            <motion.p
              key={`s-${currentSlide}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-white/90 mb-10 font-light"
            >
              {slides[currentSlide].subtitle}
            </motion.p>
            <a
              href={slides[currentSlide].link}
              className="inline-block bg-primary hover:bg-primary-dark text-white px-10 py-4 rounded-full font-bold text-lg transition-all shadow-xl btn-shiny"
            >
              {slides[currentSlide].cta}
            </a>
          </div>
        </div> */}

        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 btn-shiny"
        >
          <ChevronLeft size={32} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 btn-shiny"
        >
          <ChevronRight size={32} />
        </button>
      </section>

      {/* ABOUT US SECTION */}
      <section id="about-us" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-primary font-bold uppercase tracking-widest text-sm mb-4">
              Who We Are
            </h2>
            <h3 className="text-4xl font-bold mb-8 font-display">
              A Growing Name in the Edible Oil Industry
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Agapure is a growing name in the edible oil industry, proudly
              based in Coimbatore, Tamil Nadu. As both a manufacturer and
              distributor, we have built a reputation for supplying
              premium-quality cooking oils.
            </p>
            <div className="grid grid-cols-2 gap-8 mt-10">
              <div>
                <h4 className="font-bold text-xl mb-2">Our Vision</h4>
                <p className="text-sm text-gray-500">
                  To become a leading and trusted brand in the edible oil
                  sector.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-xl mb-2">Our Mission</h4>
                <p className="text-sm text-gray-500">
                  To provide safe, healthy, and affordable cooking oils.
                </p>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <img
              src="/images/about-us.jpg"
              alt="About"
              className="w-full aspect-[3/2] object-cover rounded-2xl shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </section>

      {/* PARALLAX SECTION */}
      <section
        ref={parallaxRef}
        className="relative h-[400px] flex items-center justify-center overflow-hidden"
      >
        <motion.div style={{ y: backgroundY }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/20 z-10" />
          <img
            src="/images/parallax-bg.jpg"
            alt="Parallax Background"
            className="w-full h-[120%] object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        <div className="relative z-20 max-w-4xl mx-auto px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white text-xl md:text-2xl leading-relaxed font-medium"
          >
            We believe in contributing our commitment to excellence in every
            aspect of production and distribution of healthy products. We aspire
            to discover newer, bigger and brighter horizons for ourselves, our
            partners and above all for our consumers.
          </motion.p>
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section id="products" className="py-24 bg-accent">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-primary font-bold uppercase tracking-widest text-sm mb-4">
              Our Products
            </h2>
            <h3 className="text-4xl font-bold font-display">
              Pure, High-Quality Edible Oils
            </h3>
          </div>
          <div className="flex flex-col gap-8">
            {/* Top Row: 3 Products */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Refined Palm Oil",
                  img: "/images/palm-oil.png",
                  desc: "High stability at high temperatures, perfect for deep frying.",
                },
                {
                  name: "Groundnut Oil",
                  img: "/images/groundnut-oil.png",
                  desc: "Extracted from high-quality peanuts with rich aroma.",
                },
                {
                  name: "Sunflower Oil",
                  img: "/images/sunflower-oil.png",
                  desc: "Low cholesterol and rich in Vitamin E for healthy cooking.",
                },
              ].map((p, i) => (
                <motion.div
                  key={p.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg group"
                >
                  <Link
                    to={`/products/${encodeURIComponent(p.name)}`}
                    className="block"
                  >
                    <div className="h-64 overflow-hidden bg-gray-50 flex items-center justify-center p-4">
                      <img
                        src={p.img}
                        alt={p.name}
                        className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="p-6">
                      <h4 className="text-xl font-bold mb-3">{p.name}</h4>
                      <p className="text-gray-500 text-sm mb-6">{p.desc}</p>
                      <div className="w-full py-3 rounded-xl font-bold text-sm uppercase tracking-widest btn-fill text-center">
                        View
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Bottom Row: 2 Products Centered */}
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 lg:max-w-[calc(66.66%+2rem)] lg:mx-auto">
              {[
                {
                  name: "Coconut Oil",
                  img: "/images/coconut-oil.png",
                  desc: "Natural properties retained for traditional recipes.",
                },
                {
                  name: "Sesame Oil",
                  img: "/images/sesame-bottle.png",
                  desc: "Cold-pressed quality with authentic flavor and health benefits.",
                },
              ].map((p, i) => (
                <motion.div
                  key={p.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: (i + 3) * 0.1 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg group"
                >
                  <Link
                    to={`/products/${encodeURIComponent(p.name)}`}
                    className="block"
                  >
                    <div className="h-64 overflow-hidden bg-gray-50 flex items-center justify-center p-4">
                      <img
                        src={p.img}
                        alt={p.name}
                        className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="p-6">
                      <h4 className="text-xl font-bold mb-3">{p.name}</h4>
                      <p className="text-gray-500 text-sm mb-6">{p.desc}</p>
                      <div className="w-full py-3 rounded-xl font-bold text-sm uppercase tracking-widest btn-fill text-center">
                        View
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US SECTION */}
      <section id="why-choose-us" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-primary font-bold uppercase tracking-widest text-sm mb-4">
              Why Choose Us
            </h2>
            <h3 className="text-4xl font-bold font-display">
              What Makes Us Different
            </h3>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { t: "In-house manufacturing", i: <Factory /> },
              { t: "Sourced raw materials", i: <Award /> },
              { t: "Hygienic processing", i: <CheckCircle2 /> },
              { t: "Bulk supply capability", i: <Package /> },
              { t: "Competitive pricing", i: <Users /> },
              { t: "Timely delivery", i: <Truck /> },
            ].map((item, i) => (
              <motion.div
                key={item.t}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-8 border border-gray-100 rounded-2xl hover:bg-primary/5 transition-colors"
              >
                <div className="text-primary mb-4">{item.i}</div>
                <h4 className="text-lg font-bold">{item.t}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-24 bg-accent">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-primary font-bold uppercase tracking-widest text-sm mb-4">
              Contact Us
            </h2>
            <h3 className="text-4xl font-bold mb-8 font-display">
              Get in Touch for Bulk Orders
            </h3>
            <div className="space-y-6 mt-10">
              <div className="flex items-center space-x-4">
                <MapPin className="text-primary" />{" "}
                <span>
                  No.280/2E1, Pachapalli Thottam, Sundakkamuthur Village,
                  Kovaipudur, Coimbatore, Tamil Nadu - 641042
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <Phone className="text-primary" /> <span>+91 8136840790</span>
              </div>
              <div className="flex items-center space-x-4">
                <Mail className="text-primary" />{" "}
                <span>info@agapurelife.com</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-10 rounded-3xl shadow-xl relative overflow-hidden">
            {isSuccess && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-white z-50 flex flex-col items-center justify-center text-center p-10"
              >
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                  <Send size={32} />
                </div>
                <h4 className="text-2xl font-bold mb-2">Message Sent!</h4>
                <p className="text-gray-500">
                  We will get back to you shortly.
                </p>
              </motion.div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Name *"
                    className={`w-full p-4 bg-gray-50 border ${errors.name ? "border-red-500 bg-red-50" : "border-gray-200"} rounded-xl text-black/80 placeholder:text-black/40 transition-all focus:ring-2 focus:ring-primary/20 outline-none`}
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (errors.name) setErrors({ ...errors, name: "" });
                    }}
                  />
                  <AnimatePresence>
                    {errors.name && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="absolute -bottom-5 left-2 text-[10px] text-red-500 font-bold uppercase tracking-tighter"
                      >
                        {errors.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Email *"
                    className={`w-full p-4 bg-gray-50 border ${errors.email ? "border-red-500 bg-red-50" : "border-gray-200"} rounded-xl text-black/80 placeholder:text-black/40 transition-all focus:ring-2 focus:ring-primary/20 outline-none`}
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: "" });
                    }}
                  />
                  <AnimatePresence>
                    {errors.email && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="absolute -bottom-5 left-2 text-[10px] text-red-500 font-bold uppercase tracking-tighter"
                      >
                        {errors.email}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="relative">
                  <input
                    type="tel"
                    placeholder="Phone Number *"
                    className={`w-full p-4 bg-gray-50 border ${errors.phone ? "border-red-500 bg-red-50" : "border-gray-200"} rounded-xl text-black/80 placeholder:text-black/40 transition-all focus:ring-2 focus:ring-primary/20 outline-none`}
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData({ ...formData, phone: e.target.value });
                      if (errors.phone) setErrors({ ...errors, phone: "" });
                    }}
                  />
                  <AnimatePresence>
                    {errors.phone && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="absolute -bottom-5 left-2 text-[10px] text-red-500 font-bold uppercase tracking-tighter"
                      >
                        {errors.phone}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Address"
                    className={`w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-black/80 placeholder:text-black/40 transition-all focus:ring-2 focus:ring-primary/20 outline-none`}
                    value={formData.address || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="relative">
                  <input
                    type="number"
                    placeholder="Enter Oil Quantity"
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-black/80 placeholder:text-black/40 transition-all focus:ring-2 focus:ring-primary/20 outline-none"
                    value={formData.oilQuantity}
                    onChange={(e) =>
                      setFormData({ ...formData, oilQuantity: e.target.value })
                    }
                  />
                </div>
                <div className="relative">
                  <select
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl appearance-none cursor-pointer text-black/80 transition-all focus:ring-2 focus:ring-primary/20 outline-none"
                    value={formData.oilUnit}
                    onChange={(e) =>
                      setFormData({ ...formData, oilUnit: e.target.value })
                    }
                  >
                    <option value="Gram">Gram</option>
                    <option value="Kg">Kg</option>
                    <option value="Litre">Litre</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-black/40">
                    <ChevronDown size={20} />
                  </div>
                </div>
              </div>

              <div className="relative">
                <textarea
                  placeholder="Message"
                  rows={4}
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl resize-none text-black/80 placeholder:text-black/40 transition-all focus:ring-2 focus:ring-primary/20 outline-none"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                />
              </div>

              <button
                type="submit"
                disabled={isCaptchaLoading || isSubmitting}
                className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl flex items-center justify-center space-x-3 transition-all btn-shiny"
              >
                {isCaptchaLoading ? (
                  <>
                    <Loader2 className="animate-spin" />{" "}
                    <span>Verifying Captcha...</span>
                  </>
                ) : isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" /> <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </motion.div>
  );
};
