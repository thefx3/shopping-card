import '../styles/pages/product-page.css'
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
function ProductPage() {
  const { productId } = useParams(); // 🔥 récupère l'ID de l'URL
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Erreur de récupération du produit :", error);
      }
    }
    fetchProduct();
  }, [productId]);

  const capitalizeFirstLetter = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-page">

      <img src={product.image} alt={product.title} className="product-image" />
      <div className="product-info">
        <h1>{product.title}</h1>
        <p className="category">{capitalizeFirstLetter(product.category)}</p>
        <p>⭐ {product.rating?.rate} ({product.rating?.count} ratings)</p>
        <div className="container-infos">
          <div className="infos">
            <p className="description">{product.description}</p>
          </div>

          <div className="container-to-buy">
           
            <div className='quantity'>
              <p className="price">{product.price.toFixed(1)*quantity}€</p>

              <div className="quantity-button">
                <button className='left' onClick={() => setQuantity((q) => Math.max(1, q - 1))}>-</button>
                  <p className='qty'>{quantity}</p>
                <button className='right' onClick={() => setQuantity((q) => q + 1)}>+</button> 
              </div>
            </div>


            <div className='container-buttons'>
              <button className='add-to-cart'> ADD TO CART </button>
              <button className='shop-now'> SHOP NOW </button>
            </div>
          </div>

        </div>
       
      </div>
    </div>
  );
}

export default ProductPage;
