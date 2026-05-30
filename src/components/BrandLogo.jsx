import { useState } from "react";
import { G } from "../styles/theme";

const brandSlug = (brand) => brand.toLowerCase().replace(/[^a-z0-9]+/g, "-");

const BRAND_DOMAINS = {
  "rolls-royce": "rolls-roycemotorcars.com",
  "mercedes-benz": "mercedes-benz.com",
  toyota: "toyota.com",
  lexus: "lexus.com",
  bentley: "bentleymotors.com",
  "land-rover": "landrover.com",
  porsche: "porsche.com",
  bmw: "bmw.com",
  audi: "audi.com",
  ford: "ford.com",
  jeep: "jeep.com",
  cadillac: "cadillac.com",
  mclaren: "mclaren.com",
  ferrari: "ferrari.com",
  lamborghini: "lamborghini.com",
  volkswagen: "volkswagen.com",
  nissan: "nissan-global.com",
  honda: "honda.com",
  hyundai: "hyundai.com",
  kia: "kia.com",
};

export const BrandLogo = ({ brand, size = 30 }) => {
  const slug = brandSlug(brand);
  const domain = BRAND_DOMAINS[slug] || `${slug.replace(/-/g, "")}.com`;
  const sources = [
    `/brands/${slug}.png`,
    `https://www.google.com/s2/favicons?domain=${domain}&sz=128`,
  ];
  const [sourceIndex, setSourceIndex] = useState(0);
  const monogram = brand
    .split(/[\s-]+/)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (sourceIndex >= sources.length) {
    return (
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          background: G.bg2,
          border: `1px solid ${G.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: size * 0.36,
          fontWeight: 700,
          color: G.text,
          flexShrink: 0,
        }}
      >
        {monogram}
      </div>
    );
  }

  return (
    <img
      src={sources[sourceIndex]}
      alt={brand}
      onError={() => setSourceIndex((current) => current + 1)}
      style={{
        width: size,
        height: size,
        objectFit: "contain",
        flexShrink: 0,
        borderRadius: 6,
      }}
    />
  );
};

export default BrandLogo;
