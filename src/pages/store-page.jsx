import '../styles/pages/store-page.css';

import { useState, useEffect } from "react";
import Space from '../components/space'
import StoreMenu from "../components/store-menu";
import sun from '../images/automn.jpg'

function Store() {
  const [filters, setFilters] = useState({
    priceRange: [0, 0],
    ratingRange: [0, 5],
    ratingCountRange: [0, 0],
  });
  const [products, setProducts] = useState([]);

  // Récupère tous les produits
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // Fonction appelée quand les sliders changent
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Filtrage des produits
  const filteredProducts = products.filter((p) => {
    const { priceRange, ratingRange, ratingCountRange } = filters;
    return (
      (!priceRange ||
        (p.price >= priceRange[0] && p.price <= priceRange[1])) &&
      (!ratingRange ||
        (p.rating?.rate >= ratingRange[0] && p.rating?.rate <= ratingRange[1])) &&
      (!ratingCountRange ||
        (p.rating?.count >= ratingCountRange[0] &&
          p.rating?.count <= ratingCountRange[1]))
    );
  });

  return (
    <div className='container'>
      <img className='banner' src={sun} alt="automn" />

      <div className="store-page">
          <StoreMenu onFilterChange={handleFilterChange} />

          <div className="store-products">
            {filteredProducts.map((p) => (
              <div className="product" key={p.id}>
                <img src={p.image} alt={p.title} width="100" />
                <p>{p.title}</p>
                <p>{p.price} €</p>
                <p>⭐ {p.rating.rate}</p>
                <p>{p.rating.count} avis</p>
              </div>
            ))}
          </div>
      </div>

    </div>
  );
}

export default Store;
