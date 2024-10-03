// import React from 'react';
// import './Navbar.css';
// import cart_icon from '../Assets/cart_icon.jpg';
// import { useNavigate } from "react-router-dom";

// const Navbar = () => {
//     const navigate = useNavigate();

//     const handleLoginClick = () => {
//         navigate('/login-signup');
//     }

//     const handleCartClick=()=>{
//         navigate('/user-cart')
//     }

//     const [searchTerm, setSearchTerm] = React.useState('');

//     const handleChange = e => {
//         setSearchTerm(e.target.value);
//     };

//     const handleSearchClick = () => {
//         if (searchTerm.trim()) {
//             navigate(`/search?query=${searchTerm}`);
//         }
//     };

//     return (
//         <div className='navbar'>
//             <ul className="nav-menu">
//                 <li>Shop</li>
//             </ul>
//             <div className="nav-login-cart">
//                 <input 
//                     onChange={handleChange}
//                     type="search"
//                     placeholder="Search..."
//                     value={searchTerm}
//                 />
//                 <button onClick={handleSearchClick}> Search </button>
//                 <button onClick={handleLoginClick}>Sign Up</button> 
//                 <button onClick={handleCartClick}><img src={cart_icon} alt="cart"/></button>
//             </div>
//         </div>
//     );
// }

// export default Navbar;


import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './Navbar.css';
import cartIcon from '../Assets/cart_icon.jpg';
import userIcon from '../Assets/user_icon.jpeg'; // Assuming you have a user icon

const Navbar = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);

    // const handleLoginClick = () => {
    //     navigate('/login-signup');
    // };

    const handleCartClick = () => {
        navigate('/user-cart');
    };

    const handleLoginClick = () => {
        navigate('/login');
    };

    const handleChange = e => {
        setSearchTerm(e.target.value);
    };

    const handleSearchClick = () => {
        if (searchTerm.trim()) {
            navigate(`/search?query=${searchTerm}`);
        }
    };

    const handleUserMenuToggle = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <div className='navbar'>
            <div className='nav-left'>
                <ul className="nav-menu">
                    <li onClick={() => navigate('/')}>Home</li>
                    <li onClick={() => navigate('/shop')}>Shop</li>
                    <li onClick={() => navigate('/categories')}>Categories</li>
                    <li onClick={() => navigate('/about')}>About Us</li>
                    <li onClick={() => navigate('/contact')}>Contact Us</li>
                </ul>
            </div>
            <div className="nav-center">
                <input 
                    onChange={handleChange}
                    type="search"
                    placeholder="Search products..."
                    value={searchTerm}
                />
                <button onClick={handleSearchClick}>Search</button>
            </div>
            <div className="nav-right">
                <button onClick={handleCartClick}>
                    <img src={cartIcon} alt="cart" className="icon" />
                </button>
                <button onClick={handleLoginClick}>
                   Login
                </button>
                <div className="user-menu">
                    <img src={userIcon} alt="user" className="icon" onClick={handleUserMenuToggle} />
                    {dropdownOpen && (
                        <div className="dropdown">
                            <button onClick={() => navigate('/profile')}>Profile</button>
                            <button onClick={() => navigate('/orders')}>Orders</button>
                            <button onClick={() => navigate('/login-signup')}>Logout</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Navbar;
