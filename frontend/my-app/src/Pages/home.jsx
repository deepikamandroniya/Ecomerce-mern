
// export default Home;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './CSS/home.css';

const Home = () => {
  const [userData, setUserData] = useState(null);
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
    } else {
      axios.get('http://localhost:3001/home', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        setUserData(response.data);
        console.log(response.data)
        return axios.get(`http://localhost:3001/cart/${response.data.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
      })
      // .then(response => {
      //   setCart(response.data.products);
      // })
      .catch(error => {
        console.error('Error fetching data:', error);
        alert('Error fetching data');
        navigate('/login');
      });

      fetch('http://localhost:3001/getProductlist')
        .then(response => response.json())
        .then(data => setProducts(data))
        .catch(err => console.error("Error fetching data: ", err));
    }
  }, [navigate]);

  const addToCart = (product) => {
    const token = localStorage.getItem('token');
    const userId = userData.id;

    axios.post('http://localhost:3001/cart/addToCart', {
      userId: userId,
      productId: product._id
    }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      setCart([...cart, response.data.products]);
    })
    .catch(error => {
      console.error('Error adding to cart:', error);
      alert('Error adding to cart');
    });
  };

  const handleImageClick = (productId) => {
    navigate(`/image/${productId}`, { state: { productId: productId } });
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1>Welcome, {location.state ? location.state.id : ''}</h1>
      <div className="product-list">
        {products.map(product => (
          <div key={product._id} className="product-card">
            <img
              src={`http://localhost:3001/image/${product._id}`}
              alt={product.Name}
              className="product-image"
              onClick={() => handleImageClick(product._id)}
            />
            <div className="product-details">
              <h2 className="product-name">{product.Name}</h2>
              <p className="product-amount">${product.Amount}</p>
              <button onClick={() => addToCart(product)} className="add-to-cart-btn">Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
      {/* <h2>Your Cart</h2>
      <ul className="cart-list">
        {Array.isArray(cart) && cart.length > 0 ? (
          cart.map((item, index) => (
            <li key={index} className="cart-item">
              <span>{item.Name}</span>: <span>${item.Amount}</span>
            </li>
          ))
        ) : (
          <li>Your cart is empty</li>
        )}
      </ul> */}
    </div>
  );
};

export default Home;
