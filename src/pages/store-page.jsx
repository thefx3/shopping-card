import '../styles/pages/store-page.css';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import StoreMenu from "../components/store-menu";
import sun from '../images/automn.jpg'
import heart from '../images/heart.png'

function Store() {
  const [filters, setFilters] = useState({
    priceRange: [0, 0],
    ratingRange: [0, 5],
    ratingCountRange: [0, 0],
  });
  const [products, setProducts] = useState([]);


  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

 
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  
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

      <p className="explore">Explore</p>

      <div className="store-page">

          <StoreMenu onFilterChange={handleFilterChange} />

          <div className="store-products-container">
              <div className='products-filters'>
                <p className='sort-by'>Sort by :  </p>
                <button className='dropdown'>Filter</button>
              </div>

            <div className="store-products" >
                {filteredProducts.map((p) => (
                    <Link
                      key={p.id}
                      to={`/store/${p.id}`} // ✅ redirige vers /store/ID
                      className="product"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >

                    <div className="img-container">
                      <img className="product-img" src={p.image} alt={p.title} width="100" />
                    </div>

                    <div className="lines">
                      <p className='product-title'>{p.title}</p>

                      <div className="line-1">
                        <p>{p.price} €</p>
                        <img src={heart} alt="favorites" />
                      </div>
                      <div className="line-2">
                        <p>⭐ {p.rating.rate}</p>
                        <p>{p.rating.count} ratings</p>
                      </div>
                    </div>

                  </Link>

                ))}
              </div>
          </div>

      </div>

    </div>
  );
}

export default Store;
