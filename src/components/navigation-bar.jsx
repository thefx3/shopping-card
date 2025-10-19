import '../styles/components/navigation-bar.css';
import logo from '../images/logo.png';
import heart from '../images/heart.png';
import cart from '../images/cart.png';
import user from '../images/user.png';
function NavigationBar() {

    return (
        <nav className="navigation-bar">

            <div className="nav-left">
                <div className="logo">
                    <img src={logo} alt="Logo" />
                    <h2>GREEN.</h2>
                </div>
                <ul className="nav-links">
                    <li><a href="#home">Home</a></li>
                    <li><a href="#store">Store</a></li>
                </ul>
            </div>

            <div className="nav-right">
                <div className="search-bar">
                    <input type="text" placeholder="Search..." />
                    <button>🔍</button>
                </div>
                <div className='icons'>
                    <img src={heart} alt='Wishlist' />
                    <img src={cart} alt='Cart' />
                    <img src={user} alt='User Account' />
                </div>
            </div>
        </nav>
    );
}

export default NavigationBar;