import '../styles/pages/home.css';
import Space from '../components/space';
import { useEffect, useState } from 'react';
import DirectButton from '../components/buttons';

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();

        // data est un tableau ici
        const randomProducts = data.sort(() => 0.5 - Math.random()).slice(0, 3);

        console.log(randomProducts);
        setProducts(randomProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
    fetchProducts();
  }, []);

  return (
    <div className="home-page">
      <div className="home-title">
        <Space height="1vh" />
        <h1>WELCOME TO THE GREEN STORE</h1>
        <p>Discover something fresh & new.</p>
      </div>

      <Space height="1vh" />
      <div className="home-products">
        {products.map((product) => (
          <div key={product.id} className="home-product">
            <img
              src={product.image}
              alt={product.title}
              style={{height: '150px', objectFit: 'cover' }}
            />
          </div>
        ))}
      </div>
      <Space height="1vh" />
      <DirectButton text="SHOP NOW" to="/shop" />
    </div>
  );
}

export default Home;
