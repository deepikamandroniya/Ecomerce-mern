// // import React from 'react';
// // import './CSS/Front.css'; 
// // // Assuming Navbar is in the same folder

// // const Front = () => {
// //     return (
// //         <div className="home">
// //             <div className="hero">
// //                 <h1>Welcome to Our Shop</h1>
// //                 <p>Discover the best products at unbeatable prices</p>
// //                 <button onClick={() => alert('Shop Now clicked!')}>Shop Now</button>
// //             </div>
// //             <div className="categories">
// //                 <h2>Shop by Category</h2>
// //                 <div className="category-list">
// //                     <div className="category-item">Electronics</div>
// //                     <div className="category-item">Fashion</div>
// //                     <div className="category-item">Home & Garden</div>
// //                     <div className="category-item">Sports</div>
// //                     <div className="category-item">Toys</div>
// //                 </div>
// //             </div>
// //             <div className="featured-products">
// //                 <h2>Featured Products</h2>
// //                 <div className="product-list">
// //                     <div className="product-item">
// //                         <img src="https://via.placeholder.com/150" alt="Product 1" />
// //                         <p>Product 1</p>
// //                         <button>Add to Cart</button>
// //                     </div>
// //                     <div className="product-item">
// //                         <img src="https://via.placeholder.com/150" alt="Product 2" />
// //                         <p>Product 2</p>
// //                         <button>Add to Cart</button>
// //                     </div>
// //                     <div className="product-item">
// //                         <img src="https://via.placeholder.com/150" alt="Product 3" />
// //                         <p>Product 3</p>
// //                         <button>Add to Cart</button>
// //                     </div>
// //                 </div>
// //             </div>
// //             <footer className="footer">
// //                 <p>&copy; 2024 Our Shop. All rights reserved.</p>
// //             </footer>
// //         </div>
// //     );
// // }

// // export default Front;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './CSS/Front.css';

// const Front = () => {
//     const navigate = useNavigate();
//     const [products, setProducts] = useState([]);

//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 const response = await fetch('http://localhost:3001/getProductlist'); // Replace with your API endpoint
//                 const data = await response.json();
//                 setProducts(data);
//             } catch (error) {
//                 console.error('Error fetching products:', error);
//             }
//         };

//         fetchProducts();
//     }, []);

//     const handleCategoryClick = (category) => {
//         navigate(`/${category.toLowerCase().replace(' & ', '-').replace(' ', '-')}`);
//     };

//     const handleShopNow = () => {
//         navigate('/shop');
//     };

//     const addToCart = (product) => {
//         const token = localStorage.getItem('token');
//         if (!token) {
//             navigate('/login');
//             return;
//         }

//         axios.post('http://localhost:3001/cart', { productId: product._id }, {
//             headers: { Authorization: `Bearer ${token}` }
//         })
//         .then(response => {
//             console.log('Product added to cart:', response.data);
//         })
//         .catch(error => {
//             console.error('Error adding product to cart:', error);
//         });
//     };

//     return (
//         <div className="home">
//             <div className="hero">
//                 <h1>Welcome to Our Shop</h1>
//                 <p>Discover the best products at unbeatable prices</p>
//                 <button onClick={handleShopNow}>Shop Now</button>
//             </div>
//             <div className="categories">
//                 <h2>Shop by Category</h2>
//                 <div className="category-list">
//                     <div className="category-item" onClick={() => handleCategoryClick('Electronics')}>Electronics</div>
//                     <div className="category-item" onClick={() => handleCategoryClick('Fashion')}>Fashion</div>
//                     <div className="category-item" onClick={() => handleCategoryClick('Home & Garden')}>Home & Garden</div>
//                     <div className="category-item" onClick={() => handleCategoryClick('Sports')}>Sports</div>
//                     <div className="category-item" onClick={() => handleCategoryClick('Toys')}>Toys</div>
//                 </div>
//             </div>
//             <div className="featured-products">
//                 <h2>Featured Products</h2>
//                 <div className="product-list">
//                     {products.map((product) => (
//                         <div className="product-card" key={product._id}>
//                             <img src={`http://localhost:3001/image/${product._id}`} alt={product.Name} className="product-image" />
//                             <div className="product-info">
//                                 <h3>{product.Name}</h3>
//                                 <p>${product.Amount}</p>
//                                 <button onClick={() => addToCart(product)}>Add to Cart</button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//             <footer className="footer">
//                 <p>&copy; 2024 Our Shop. All rights reserved.</p>
//             </footer>
//         </div>
//     );
// }

// export default Front;

import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import './CSS/Front.css';

const Front = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:3001/getProductlist'); // Replace with your API endpoint
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const handleCategoryClick = (category) => {
        navigate(`/${category.toLowerCase().replace(' & ', '-').replace(' ', '-')}`);
    };

    const handleShopNow = () => {
        navigate('/shop');
    };

    const addToCart = (product) => {
        const isProduct = cart.find((cartItem) => cartItem._id === product._id);
        if (isProduct) {
            setCart(
                cart.map((cartItem) =>
                    cartItem._id === product._id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
                )
            );
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    };

    return (
        <div className="home">
            <div className="hero">
                <h1>Welcome to Our Shop</h1>
                <p>Discover the best products at unbeatable prices</p>
                <button onClick={handleShopNow}>Shop Now</button>
            </div>
            <div className="categories">
                <h2>Shop by Category</h2>
                <div className="category-list">
                    <div className="category-item" onClick={() => handleCategoryClick('Electronics')}>Electronics</div>
                    <div className="category-item" onClick={() => handleCategoryClick('Fashion')}>Fashion</div>
                    <div className="category-item" onClick={() => handleCategoryClick('Home & Garden')}>Home & Garden</div>
                    <div className="category-item" onClick={() => handleCategoryClick('Sports')}>Sports</div>
                    <div className="category-item" onClick={() => handleCategoryClick('Toys')}>Toys</div>
                </div>
            </div>
            <div className="featured-products">
                <h2>Featured Products</h2>
                <div className="product-list">
                    {products.map((product) => (
                        <div className="product-card" key={product._id}>
                            <img src={`http://localhost:3001/image/${product._id}`} alt={product.Name} className="product-image" />
                            <div className="product-info">
                                <h3>{product.Name}</h3>
                                <p>${product.Amount}</p>
                                <button onClick={() => addToCart(product)}>Add to Cart</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <footer className="footer">
                <p>&copy; 2024 Our Shop. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Front;
