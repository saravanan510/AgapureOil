import React from "react";
import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

export const SEO: React.FC<SEOProps> = ({
  title = "Agapure Enterprises | Pure Edible Oils Manufacturer Coimbatore",
  description = "Agapure Enterprises is a leading manufacturer and wholesale supplier of pure edible oils in Coimbatore. Premium Refined Palm, Groundnut, Sunflower, and Coconut oils.",
  keywords = "edible oil manufacturer Coimbatore, wholesale cooking oil Tamil Nadu, pure groundnut oil, refined palm oil supplier, sunflower oil distributor, coconut oil manufacturer",
  image = "/images/logo.jpg",
  url = "https://agapurelife.com",
}) => {
  const siteTitle = title.includes("Agapure")
    ? title
    : `${title} | Agapure Enterprises`;

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Canonical Link */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
};
