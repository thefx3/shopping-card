import "../styles/components/store-menu.css";
import { useEffect, useState } from "react";
import CustomSlider from "./slider";
import { ChevronDown, ChevronUp } from "lucide-react";

function StoreMenu({ onFilterChange }) {
  const [categories, setCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [ratingRange, setRatingRange] = useState([0, 5]);
  const [ratingCountRange, setRatingCountRange] = useState([0, 1000]);
  const [openSection, setOpenSection] = useState(null); // 🔥 garde la section ouverte

  useEffect(() => {
    async function fetchAllData() {
      try {
        const res = await fetch("https://fakestoreapi.com/products/categories");
        const catData = await res.json();
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

  const toggleSection = (section) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  return (
    <div className="store-menu">
      <div id="filters">
        <p className="filter-title">Filter</p>

        {/* ---------- CATEGORIES ---------- */}
        <div className="filter categories">
          <div className="dropdown-menu" onClick={() => toggleSection("categories")}>
            <h3>Categories</h3>
            {openSection === "categories" ? <ChevronUp /> : <ChevronDown />}
          </div>

          {openSection === "categories" && (
            <div className="filter-content">
              <input type="text" placeholder="Search category..." />
              {categories.map((category) => (
                <div key={category} className="category">
                  <p>{capitalizeFirstLetter(category)}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ---------- PRICE ---------- */}
        <div className="filter price">
          <div className="dropdown-menu" onClick={() => toggleSection("price")}>
            <h3>Price</h3>
            {openSection === "price" ? <ChevronUp /> : <ChevronDown />}
          </div>

          {openSection === "price" && (
            <div className="filter-content">
              <CustomSlider
                min={0}
                max={1000}
                value={priceRange[1]}
                onChange={(v) => setPriceRange([priceRange[0], v])}
              />
              <p>{priceRange[1]}€</p>
            </div>
          )}
        </div>

        {/* ---------- RATING ---------- */}
        <div className="filter rating">
          <div className="dropdown-menu" onClick={() => toggleSection("rating")}>
            <h3>Rating</h3>
            {openSection === "rating" ? <ChevronUp /> : <ChevronDown />}
          </div>

          {openSection === "rating" && (
            <div className="filter-content">
              <CustomSlider
                min={0}
                max={5}
                step={0.1}
                value={ratingRange[1]}
                onChange={(v) => setRatingRange([ratingRange[0], v])}
              />
              <p>{ratingRange[1].toFixed(1)}⭐</p>
            </div>
          )}
        </div>

        {/* ---------- RATING COUNT ---------- */}
        <div className="filter ratingcount">
          <div className="dropdown-menu" onClick={() => toggleSection("ratingcount")}>
            <h3>Rating count</h3>
            {openSection === "ratingcount" ? <ChevronUp /> : <ChevronDown />}
          </div>

          {openSection === "ratingcount" && (
            <div className="filter-content">
              <CustomSlider
                min={0}
                max={1000}
                value={ratingCountRange[1]}
                onChange={(v) => setRatingCountRange([ratingCountRange[0], v])}
              />
              <p>{ratingCountRange[1]} ratings</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StoreMenu;
