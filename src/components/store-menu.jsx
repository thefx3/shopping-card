import "../styles/components/store-menu.css";
import { useEffect, useState } from "react";
import CustomSlider from "./slider";

function StoreMenu({ onFilterChange }) {
  const [categories, setCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [ratingRange, setRatingRange] = useState([0, 5]);
  const [ratingCountRange, setRatingCountRange] = useState([0, 1000]);

  useEffect(() => {
    async function fetchAllData() {
      try {
        const [catRes] = await Promise.all([
          fetch("https://fakestoreapi.com/products/categories"),
        ]);

        const catData = await catRes.json();
        setCategories(catData);
      } catch (error) {
        console.error("Error fetching:", error);
      }
    }
    fetchAllData();
  }, []);

  useEffect(() => {
    if (onFilterChange) {
      onFilterChange({
        priceRange,
        ratingRange,
        ratingCountRange,
      });
    }
  }, [priceRange, ratingRange, ratingCountRange]);

  const capitalizeFirstLetter = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <div className="store-menu">

      <div id="filters">
        <p className="filter-title">Filter</p>


        <div className="filter categories">
          <div className="dropdown-menu">
            <h3>Catégories</h3>
            <button className="dropdown">u</button>
          </div>

          <input type="text" placeholder="Search category..." />

          {categories.map((category) => (
            <div key={category} className="category">
              <p>{capitalizeFirstLetter(category)}</p>
            </div>
          ))}
        </div>


        <div className="slider-group filter price">
          <div className="dropdown-menu">
            <h3>Price</h3>
            <button className="dropdown">u</button>
          </div>
          <CustomSlider
            min={0}
            max={1000}
            value={priceRange[1]}
            onChange={(v) => setPriceRange([priceRange[0], v])}
          />
          <p>{priceRange[1]}€</p>
        </div>


        <div className="slider-group filter rating">
          <div className="dropdown-menu">
            <h3>Rating</h3>
            <button className="dropdown">u</button>
          </div>
          <CustomSlider
            min={0}
            max={5}
            step={0.1}
            value={ratingRange[1]}
            onChange={(v) => setRatingRange([ratingRange[0], v])}
          />
          <p>{ratingRange[1].toFixed(1)}⭐</p>
        </div>


        <div className="slider-group filter ratingcount">
          <div className="dropdown-menu">
            <h3>Rating count</h3>
            <button className="dropdown">u</button>
          </div>
          <CustomSlider
            min={0}
            max={1000}
            value={ratingCountRange[1]}
            onChange={(v) => setRatingCountRange([ratingCountRange[0], v])}
          />
          <p>{ratingCountRange[1]} ratings</p>
        </div>
      </div>
    </div>
  );
}

export default StoreMenu;
