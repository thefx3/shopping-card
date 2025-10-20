import '../styles/components/store-menu.css';
import { useEffect, useState } from 'react';

function StoreMenu({ onFilterChange }) {
  const [categories, setCategories] = useState([]);
  const [prices, setPrices] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [ratingCounts, setRatingCounts] = useState([]);

  const [priceRange, setPriceRange] = useState([0, 0]);
  const [ratingRange, setRatingRange] = useState([0, 5]);
  const [ratingCountRange, setRatingCountRange] = useState([0, 1000]);

  useEffect(() => {
    async function fetchAllData() {
      try {
        const [catRes, prodRes] = await Promise.all([
          fetch('https://fakestoreapi.com/products/categories'),
          fetch('https://fakestoreapi.com/products'),
        ]);

        const [catData, prodData] = await Promise.all([
          catRes.json(),
          prodRes.json(),
        ]);

        setCategories(catData);


        const priceList = prodData.map((p) => p.price);
        setPrices(priceList);
        setPriceRange([0, 1000]);


        const ratingList = prodData.map((p) => p.rating?.rate || 0);
        setRatings(ratingList);
        setRatingRange([0, 5]);


        const ratingCountList = prodData.map((p) => p.rating?.count || 0);
        setRatingCounts(ratingCountList);
        setRatingCountRange([0, 1000]);
      } catch (error) {
        console.error('Error fetching:', error);
      }
    }
    fetchAllData();
  }, []);


  // Update the displayed product in store-page.jsx
  useEffect(() => {
    onFilterChange({
      priceRange,
      ratingRange,
      ratingCountRange,
    });
  }, [priceRange, ratingRange, ratingCountRange]);



  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }


  return (
    <div className="store-menu">

      <p className='explore'>Explore</p>

      <div className="filter-categories">
      <h3>Catégories</h3>
        {categories.map((category) => (
          <div key={category} className="category">
            <p>{capitalizeFirstLetter(category)}</p>
          </div>
        ))}
      </div>

      
      <div className="slider-group filter-price">
      <h3>Price (€)</h3>
        <input
          type="range"
          min="0"
          max="1000"
          value={priceRange[0]}
          onChange={(e) => setPriceRange([+e.target.value, priceRange[0]])}
        />
        <p>
          {priceRange[0]}€ - {priceRange[1]}€
        </p>
      </div>

      
      <div className="slider-group filter-rating">
      <h3>Rating</h3>
        <input
          type="range"
          min="0"
          max="5"
          step="0.1"
          value={ratingRange[0]}
          onChange={(e) => setRatingRange([+e.target.value, ratingRange[1]])}
        />
        <p>
          {ratingRange[0].toFixed(1)}⭐ - {ratingRange[1].toFixed(1)}⭐
        </p>
      </div>

      
      <div className="slider-group filter-ratingcount">
      <h3>Rating Count</h3>
        <input
          type="range"
          min="0"
          max="1000"
          value={ratingCountRange[0]}
          onChange={(e) => setRatingCountRange([+e.target.value, ratingCountRange[1]])}
        />
        <p>
          {ratingCountRange[0]} - {ratingCountRange[1]} avis
        </p>
      </div>
    </div>
  );
}

export default StoreMenu;
