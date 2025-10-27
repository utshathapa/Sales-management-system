import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import Card from "../components/card";
import "../css/Product.css";
 

import axios from "axios";

// Imported images
import ocean from '../assets/Ocean.png'; 
import floral from '../assets/Floral.png';
import metallic from '../assets/Metallic.png';
import geode from '../assets/Geode.png';
import mother from '../assets/mother.png';
import mirror from '../assets/mirror.png';
import lotus from '../assets/lotus.png';
import frame from '../assets/frame.png';
import resin from '../assets/resin.png';
import purple from '../assets/purple.png';

// Dummy products
const DUMMY_PRODUCTS = [
  { id: 101, name: "Ocean Wave Resin Puja Thali", price: 1250.00, image: ocean }, 
  { id: 102, name: "Geode Crystal Resin Thali Set", price: 2100.00, image: geode },
  { id: 103, name: "Floral Gold Flake Resin Thali", price: 1599.00, image: floral },
  { id: 104, name: "Metallic Gold Leaf Thali", price: 1390.00, image: metallic },
  { id: 105, name: "Resin Kumkum/Haldi Katori (Set of 2)", price: 450.00, image: resin },
  { id: 106, name: "Mother of Pearl Resin Diya Base", price: 680.00, image: mother },
  { id: 107, name: "Customized Photo Resin Frame", price: 950.00, image: frame },
  { id: 108, name: "Resin Incense Stick Holder (Lotus)", price: 399.00, image: lotus },
  { id: 109, name: "Aura Purple Resin Thali", price: 1450.00, image: purple },
  { id: 110, name: "Mirror-Finish Resin Thali", price: 1899.00, image: mirror },
];

export default function Products() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAndCombineProducts = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get("http://127.0.0.1:8080/api/products");
        const apiProducts = Array.isArray(res.data) ? res.data.filter(p => p.name && p.price !== undefined) : [];
        setProducts([...apiProducts, ...DUMMY_PRODUCTS]);
      } catch (err) {
        console.error("API fetch failed, using dummy products:", err.message);
        setProducts(DUMMY_PRODUCTS);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAndCombineProducts();
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getImageUrl = (product) => {
    if ([ocean, geode, floral, metallic, mother, mirror, lotus, frame, resin, purple].includes(product.image)) 
      return product.image; 
    if (typeof product.image === 'string' && product.image.startsWith('dummy-')) 
      return `/${product.image}`;
    if (typeof product.image === 'string') 
      return `http://127.0.0.1:8080/storage/${product.image}`;
    return '';
  };

  if (isLoading) return <p className="loading-text">Loading products...</p>;

  return (
    <div className="products-page-wrapper">
      <h2 className="products-heading">Our Exquisite Collection✨</h2>

      <div className="search-bar-container">
        <div className="search-bar">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="card-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, idx) => (
            <Card
              key={product.id}
              id={product.id}
              title={product.name}
              price={product.price}
              image={getImageUrl(product)}
              className="animate-card"
              style={{ animationDelay: `${idx * 0.08}s` }} // staggered animation
            />
          ))
        ) : (
          <p className="no-results">No products found for "{searchTerm}" 😢</p>
        )}
       
      </div>
       
    </div>
  );
}