import '../styles/components/navigation-bar.css';
import logo from '../images/logo.png';
import heart from '../images/heart.png';
import cart from '../images/cart.png';
import user from '../images/user.png';
import search from '../images/search.png';
import { NavButton }  from './buttons';
import { Link } from 'react-router-dom';
import { useCart } from '../CartContext';
import { ShoppingCart, Heart } from 'lucide-react';
import { User } from 'lucide-react';

function NavigationBar() {
    const { cartCount } = useCart();

    return (
        <nav className="navigation-bar">

            <div className="nav-left">
                <div className="logo">
                    <img src={logo} alt="Logo" />
                    <h2>AUTOMN.</h2>
                </div>
                <ul className="nav-links">
                    <li><NavButton text="Home" to="home" /></li>
                    <li><NavButton text="Store" to="/store" /></li>
                </ul>
            </div>

            <div className="nav-right">
                <div className="search-bar">
                    <input type="text" placeholder="Search..." />
                    <img src= {search} alt="Search" />
                </div>
                <div className='icons'>
                    <Heart size={28} />
                    <Link to="/cart" className='cart-icon-wrapper'>
                        <ShoppingCart size={28} />
                        {cartCount > 0 && (
                        <span className="cart-badge">{cartCount}</span>
                        )}
                    </Link>
                    <User size={28} />
                </div>
            </div>
        </nav>
    );
}

export default NavigationBar;