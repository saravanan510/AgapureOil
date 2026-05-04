import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { ChevronLeft } from "lucide-react";
import { SEO } from "../components/SEO";

export const ProductPage: React.FC = () => {
  const { productName } = useParams<{ productName: string }>();
  const decodedName = productName ? decodeURIComponent(productName) : "";

  const getProductImage = (name: string) => {
    switch (name) {
      case "Refined Palm Oil":
        return "/images/palm-oil.png";
      case "Groundnut Oil":
        return "/images/groundnut-oil.png";
      case "Sunflower Oil":
        return "/images/sunflower-oil.png";
      case "Coconut Oil":
        return "/images/coconut-oil.png";
      case "Sesame Oil":
        return "/images/sesame-oil.png";
      default:
        return "/images/palm-oil.png";
    }
  };

  const getProductVariations = (name: string) => {
    const defaultImg = getProductImage(name);
    switch (name) {
      case "Refined Palm Oil":
        return [
          { id: 1, size: "850 gm Pouch", img: "/images/palmoil-pouch.png" },
          { id: 2, size: "15 kg Tin", img: "/images/palmoil-tin.png" },
        ];
      case "Groundnut Oil":
        return [
          {
            id: 1,
            size: "1 Litre Bottle",
            img: "/images/groungnut-bottle.png",
          },
        ];
      case "Sunflower Oil":
        return [
          { id: 1, size: "910 gm Pouch", img: "/images/sunflower-pouch.png" },
          {
            id: 2,
            size: "910 gm Bottle",
            img: "/images/sunflower-bottle.png",
          },
          { id: 3, size: "15 kg Tin", img: "/images/sunflower-tin.png" },
        ];
      case "Coconut Oil":
        return [
          { id: 1, size: "1 Litre Bottle", img: "/images/coconut-bottle.png" },
        ];
      case "Sesame Oil":
        return [
          { id: 1, size: "1 Litre Bottle", img: "/images/sesame-bottle.png" },
        ];
      default:
        return [{ id: 1, size: "1 Litre Bottle", img: defaultImg }];
    }
  };

  const productVariations = getProductVariations(decodedName);

  return (
    <motion.div
      key="product-detail-view"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
      className="pt-20 pb-24 bg-white min-h-screen"
    >
      <SEO
        title={`${decodedName} | Agapure Enterprises`}
        description={`High-quality Agapure ${decodedName} available in multiple packaging sizes. Pure and hygienic edible oil from Coimbatore.`}
        keywords={`${decodedName}, Agapure ${decodedName}, edible oil variations, bulk ${decodedName} Coimbatore`}
        url={`https://agapurelife.com/products/${productName}`}
      />

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-primary font-bold uppercase tracking-widest text-sm mb-2">
              Product Variations
            </h2>
            <h3 className="text-4xl font-bold font-display">{decodedName}</h3>
          </div>
          <Link
            to="/"
            className="flex items-center space-x-2 text-gray-500 hover:text-primary transition-colors font-bold btn-shiny px-4 py-2 rounded-lg"
          >
            <ChevronLeft />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* THE 8 VARIATIONS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {productVariations.map((v) => (
            <motion.div
              key={v.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: v.id * 0.05 }}
              className="text-center group"
            >
              <div className="bg-[#f0f0f0] rounded-lg p-8 mb-6 aspect-[4/5] flex items-center justify-center overflow-hidden">
                <img
                  src={v.img}
                  alt={v.size}
                  className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h4 className="text-primary font-bold text-xl mb-1">{v.size}</h4>
              <p className="text-gray-500 text-sm font-medium">
                Agapure {decodedName}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
