
// import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import { useNavigate } from 'react-router-dom';
// // import { useLocation } from 'react-router-dom';
// import './CSS/home.css';

// const Usercart =()=>{
//     // const [cart, setCart] = useState(() => {
//     //     const savedCart = localStorage.getItem('cart');
//     //     return savedCart ? JSON.parse(savedCart) : [];
//     //   });
//     const [cart,setCart]=useState([]);
//     useEffect(()=>{
//         const Savedcart=JSON.parse(localStorage.getItem('cart'));
//         if(Savedcart){
//             setCart(Savedcart);
//         }
//     },[]);


//     return(
//         <div>
//             <div className="cart-container">
//             <h2>Your Cart</h2>
//             {cart.length === 0 ? (
//                 <p>Your cart is empty.</p>
//             ) : (
//                 <div className="product-list">
//         {cart.map(item => (
//           <div key={item._id} className="product-card">
            
//             <img
//               src={`http://localhost:3001/image/${item._id}`}
//               alt={item.Name}
//               className="product-image"
//             />
//             <div className="product-details">
//               <h2 className="product-name">{item.Name}</h2>
//               <p className="product-amount">Amount:${item.Amount}</p>
// 	          <p className="product-amount" >Quantity:{item.quantity}</p>
//               <button  className="add-to-cart-btn" >Order</button>
//             </div>
//           </div>
//         ))}
//       </div>
//             )}
//         </div>
//         </div>
//     );
// };

// export default Usercart;

// import React, { useEffect, useState, useCallback } from 'react';
// import axios from 'axios';
// // import  jwtDecode  from 'jwt-decode';
// import './CSS/home.css';
// const { jwtDecode } = require('jwt-decode');
// const Usercart = () => {
//   const [cart, setCart] = useState([]);
//   const [userId, setUserId] = useState('');
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [totalDiscount, setTotalDiscount] = useState(0);
//   const [totalShippingCharges, setTotalShippingCharges] = useState(0);

//   const calculateTotal = useCallback((cartItems, productList) => {
//     let amount = 0;
//     let discount = 0;
//     let shippingCharges = 0;

//     cartItems.forEach(item => {
//       const product = productList.find(p => p._id === item._id);
//       if (product) {
//         amount += product.amount * item.quantity;
//         discount += product.discount * item.quantity;
//         shippingCharges += product.shippingCharges * item.quantity;
//       }
//     });

//     setTotalDiscount(discount);
//     setTotalShippingCharges(shippingCharges);
//     setTotalAmount(amount - discount + shippingCharges);
//   }, []);

//   useEffect(() => {
//     const Savedcart = JSON.parse(localStorage.getItem('cart'));
//     if (Savedcart) {
//       setCart(Savedcart);
//     }

//     const token = localStorage.getItem('token'); // Assuming token is stored in local storage
//     if (token) {
//       const decodedToken = jwtDecode(token);
//       setUserId(decodedToken.userId); // Assuming the user ID is stored in the token under 'userId'
//     }
//   }, []);

//   useEffect(() => {
//     const fetchProductsAndCalculateTotal = async () => {
//       if (cart.length > 0) {
//         try {
//           const productsResponse = await axios.get('http://localhost:3001/cart'); // Adjust the URL as needed
//           const productList = productsResponse.data;
//           calculateTotal(cart, productList);
//         } catch (error) {
//           console.error('Error fetching products:', error);
//         }
//       }
//     };

//     fetchProductsAndCalculateTotal();
//   }, [cart, calculateTotal]);

//   const handleOrder = async (item) => {
//     try {
//       // Fetch the product list
//       const productsResponse = await axios.get('http://localhost:3001/getProductlist'); // Adjust the URL as needed
//       const productList = productsResponse.data;

//       // Find the specific product by ID
//       const product = productList.find(p => p._id === item._id);
//       if (!product) {
//         alert(`Product ${item.Name} not found.`);
//         return;
//       }

//       // Check if the selected quantity exceeds available stock
//       if (item.quantity > product.quantity) {
//         alert(`Quantity for ${item.Name} exceeds available stock.`);
//         return;
//       }

//       // Add order to the database
//       const orderData = {
//         user_id: userId,
//         product_id: item._id,
//       };
//       await axios.post('http://localhost:3001/orders', orderData, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}` // Pass the token in the request header
//         }
//       });
//       alert(`Order for ${item.Name} placed successfully!`);
//     } catch (error) {
//       console.error('Error placing order:', error);
//       alert('Failed to place order. Please try again.');
//     }
//   };

//   return (
//     <div>
//       <div className="cart-container">
//         <h2>Your Cart</h2>
//         {cart.length === 0 ? (
//           <p>Your cart is empty.</p>
//         ) : (
//           <div className="product-list">
//             {cart.map(item => (
//               <div key={item._id} className="product-card">
//                 <img
//                   src={`http://localhost:3001/image/${item._id}`}
//                   alt={item.Name}
//                   className="product-image"
//                 />
//                 <div className="product-details">
//                   <h2 className="product-name">{item.Name}</h2>
//                   <p className="product-amount">Amount: ${item.Amount}</p>
//                   <p className="product-amount">Quantity: {item.quantity}</p>
//                   <button className="add-to-cart-btn" onClick={() => handleOrder(item)}>Order</button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//         <div className="order-summary">
//           <h3>Order Summary</h3>
//           <p>Subtotal: ${cart.reduce((sum, item) => sum + item.Amount * item.quantity, 0)}</p>
//           <p>Discount: ${totalDiscount}</p>
//           <p>Shipping Charges: ${totalShippingCharges}</p>
//           <p>Total Amount: ${totalAmount}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Usercart;


// import React, { useEffect, useState, useCallback } from 'react';
// import axios from 'axios';

// import './CSS/usercart.css';
// const { jwtDecode } = require('jwt-decode');
// const Usercart = () => {
 
//   const [cart, setCart] = useState([]);
//   const [userId, setUserId] = useState('');
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [totalDiscount, setTotalDiscount] = useState(0);
//   const [totalShippingCharges, setTotalShippingCharges] = useState(0);
//   const [orderItems, setOrderItems] = useState([]);
//   const [productList, setProductList] = useState([]);

//   const calculateTotal = useCallback((orderItems, productList) => {
//     let amount = 0;
//     let discount = 0;
//     let shippingCharges = 0;

//     // orderItems.forEach(orderItem => {
//     //   const product = productList.find(p => p._id === orderItem.product_id);
//     //   if (product) {
//     //     amount += product.Amount * orderItem.quantity;
//     //     discount += product.discount * orderItem.quantity;
//     //     shippingCharges += product.shipping * orderItem.quantity;
//     //     console.log(shippingCharges)
//     //   }
//     // });


//     orderItems.forEach(orderItem => {
//       const product = productList.find(p => p._id === orderItem.product_id);
//       if (product) {
//         const productAmount = parseFloat(product.Amount); // Parse to float if necessary
//         const productDiscount = parseFloat(product.discount); // Parse to float if necessary
//         const productShipping = parseFloat(product.shipping); // Parse to float if necessary
//         const itemQuantity = parseInt(orderItem.quantity, 10); // Parse to integer if necessary
//         const itemPrice = parseInt(orderItem.setPrice, 10);
        
//         if (!isNaN(productAmount) && !isNaN(productDiscount) && !isNaN(productShipping) && !isNaN(itemQuantity) ) {
//           if(!isNaN(itemPrice)){
//             amount += itemPrice * itemQuantity;
//             discount += productDiscount * itemQuantity;
//             shippingCharges += productShipping * itemQuantity;
//             console.log('Shipping Charges:', shippingCharges);
//           }
//           else{
//           amount += productAmount * itemQuantity;
//           discount += productDiscount * itemQuantity;
//           shippingCharges += productShipping * itemQuantity;
//           console.log('Shipping Charges:', shippingCharges);
//           }
//         } else {
//           console.warn('One of the values is not a number:', productAmount, productDiscount, productShipping, itemQuantity);
//         }
//       }
//     });
    

//     setTotalDiscount(discount);
//     setTotalShippingCharges(shippingCharges);
//     setTotalAmount(amount - discount + shippingCharges);
//   }, []);

//   useEffect(() => {
//     // const Savedcart = JSON.parse(localStorage.getItem('cart'));
//     // if (Savedcart) {
//     //   setCart(Savedcart);
//     // }

//     const token = localStorage.getItem('token'); // Assuming token is stored in local storage
//     if (token) {
//       const decodedToken = jwtDecode(token);
//       setUserId(decodedToken._id); 
      
//     }
//   }, []);

//   useEffect(() => {


//     const fetchCart=async()=>{
//       if(userId){
//     try{
//     const SavedCart = await axios.get(`http://localhost:3001/cart/${userId}`);
//       const cart=SavedCart.data;
//       setCart(cart)
//     }catch (error) {
//       console.error('Error fetching cart products:', error);
//     }
//   }
//   else{
//     console.error("error in user id")
//   }
//     };
    

//     const fetchOrdersAndProducts = async () => {
//       try {
//         const ordersResponse = await axios.get('http://localhost:3001/orders', {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`
//           }
//         });
//         const orders = ordersResponse.data;
//         setOrderItems(orders);
//         console.log('Orders:', orders);

//         const productsResponse = await axios.get('http://localhost:3001/getProductlist');
//         const products = productsResponse.data;
//         setProductList(products);
//         console.log('Products:', products);

//         if (orders.length > 0) {
//           calculateTotal(orders, products);
//         }
//       } catch (error) {
//         console.error('Error fetching orders or products:', error);
//       }
//     };

//     fetchOrdersAndProducts();
//     fetchCart();
//   }, [userId,calculateTotal]);

//   const handleOrder = async (item) => {
//     try {
//       // Fetch the product list
//       const productsResponse = await axios.get('http://localhost:3001/getProductlist'); // Adjust the URL as needed
//       const productList = productsResponse.data;

//       // Find the specific product by ID
//       const product = productList.find(p => p._id === item._id);
//       if (!product) {
//         alert(`Product ${item.Name} not found.`);
//         return;
//       }

//       // Check if the selected quantity exceeds available stock
//       if (item.quantity > product.quantity) {
//         alert(`Quantity for ${item.Name} exceeds available stock.`);
//         return;
//       }

//       // Add order to the database
//       const orderData = {
//         user_id: userId,
//         product_id: item._id,
//         quantity:item.quantity // Ensure quantity is included
//       };
//       await axios.post('http://localhost:3001/orders', orderData, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}` // Pass the token in the request header
//         }
//       });
//       alert(`Order for ${item.Name} placed successfully!`);

//       // Update the order items and recalculate total
//       const updatedOrdersResponse = await axios.get('http://localhost:3001/orders', {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`
//         }
//       });
//       const updatedOrders = updatedOrdersResponse.data;
//       setOrderItems(updatedOrders);
       
//       calculateTotal(updatedOrders, productList);
//     } catch (error) {
//       console.error('Error placing order:', error);
//       alert('Failed to place order. Please try again.');
//     }
//   };

//   const updateQuantity = (itemId, increment) => {
//     setCart(prevCart => {
//       return prevCart.map(item => {
//         if (item._id === itemId) {
//           const newQuantity = item.quantity + increment;
//           return { ...item, quantity: Math.max(newQuantity, 1) }; // Ensure quantity doesn't go below 1
//         }
//         return item;
//       });
//     });
//   };

//   return (
//     <div>
//       <div className="cart-container">
//         <h2>Your Cart</h2>
//         {cart.length === 0 ? (
//           <p>Your cart is empty.</p>
//         ) : (
//           <div className="product-list">
//             {cart.map(item => (
//               <div key={item._id} className="product-card">
//                 <img
//                   src={`http://localhost:3001/image/${item._id}`}
//                   alt={item.Name}
//                   className="product-image"
//                 />
//                 <div className="product-details">
//                   <h2 className="product-name">{item.Name}</h2>
//                   <p className="product-amount">Amount: ${item.Amount}</p>
//                   <p className="product-amount">Price: ${item.setPrice}</p>
//                   <div className="product-quantity">
//                   <p className="product-quantity">Quantity: {item.quantity}</p>
//                   <div className="quantity-controls">
//                     <button onClick={() => updateQuantity(item._id, 1)}>+</button>
//                     <button onClick={() => updateQuantity(item._id, -1)}>-</button>
//                   </div>
//                 </div>
//                   <button className="add-to-cart-btn" onClick={() => handleOrder(item)}>Order</button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//         <div className="order-summary">
//           <h3>Order Summary</h3>
//           {/* <p>Subtotal: ${orderItems.reduce((sum, item) => {
//             const product = productList.find(p => p._id === item.product_id);
//             const productAmount = parseFloat(product.Amount);
//             const productDiscount = parseFloat(product.discount);
//             const productShipping = parseFloat(product.shipping);
//             const itemQuantity = parseFloat(item.quantity);

//             if (!isNaN(productAmount) && !isNaN(productDiscount) && !isNaN(productShipping) && !isNaN(itemQuantity)) {
//               return sum + productAmount * itemQuantity;
//             } else {
//               return sum; // Handle cases where values are NaN or undefined
//             }
//           }, 0)}</p> */}
          
//           <p>Subtotal: ${orderItems.reduce((sum, item) => {
//             const product = productList.find(p => p._id === item.product_id);
//             if (product) {
//               const productAmount = parseFloat(product.Amount);
//               const itemQuantity = parseFloat(item.quantity);
              
//               if (!isNaN(productAmount) && !isNaN(itemQuantity)) {
//                 return sum + productAmount * itemQuantity;
//               } else {
//                 return sum;
//               }
//             } else {
//               return sum;
//             }
//           }, 0)}</p>

//           <p>Discount: ${totalDiscount}</p>
//           <p>Shipping Charges: ${totalShippingCharges}</p>
//           <p>Total Amount: ${totalAmount}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Usercart;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CSS/usercart.css';
const {jwtDecode} = require('jwt-decode');

const Usercart = () => {
  const [cart, setCart] = useState([]);
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.id);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem('token');
      if (userId && token) {
        try {
          const response = await axios.get(`http://localhost:3001/cart/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log('Cart response:', response.data);
          if (response.data && response.data.products && Array.isArray(response.data.products)) {
            setCart(response.data.products);
          } else {
            console.warn('Cart data is not in the expected format:', response.data);
            setCart([]);
          }
        } catch (error) {
          console.error('Error fetching cart products:', error);
        }
      }
    };

    fetchCart();
  }, [userId]);

  const handleOrder = async (item) => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        await axios.post('http://localhost:3001/orders', {
          user_id: userId,
          product_id: item.productId._id,
          quantity: item.productId.quantity,
          price:item.productId.setPrice,
          discount:item.productId.discount,
          shipping:item.productId.shipping
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        alert(`Order for ${item.productId.Name} placed successfully!`);
      } catch (error) {
        console.error('Error placing order:', error);
        alert('Failed to place order. Please try again.');
      }
    } else {
      alert('User not authenticated. Please log in.');
    }
  };

  const navigateToInvoice = () => {
    navigate('/invoice');
  };

  const incrementQuantity = async (index) => {
    const newCart = [...cart];
    if (newCart[index].quantity < newCart[index].productId.availability) {
      newCart[index].quantity += 1;
      console.log(newCart[index]._id)
      setCart(newCart); // Update UI immediately
      try {
        const token = localStorage.getItem('token');
        const response = await axios.put(`http://localhost:3001/cart/${userId}/${newCart[index].productId._id}`, {
          quantity: newCart[index].quantity,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Quantity updated in database:', response.data);
      } catch (error) {
        console.error('Error updating quantity:', error);
        // Handle error (e.g., show error message)
      }
    } else {
      alert('Quantity cannot exceed the available stock.');
    }
  };
  

  const decrementQuantity = async (index) => {
    const newCart = [...cart];
    if (newCart[index].quantity > 1) {
      newCart[index].quantity -= 1;
      setCart(newCart); // Update UI immediately
      try {
        const token = localStorage.getItem('token');
        const response = await axios.put(`http://localhost:3001/cart/${userId}/${newCart[index].productId._id}`, {
          quantity: newCart[index].quantity,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Quantity updated in database:', response.data);
      } catch (error) {
        console.error('Error updating quantity:', error);
        // Handle error (e.g., show error message)
      }
    } else {
      alert('Quantity cannot be less than 1.');
    }
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="product-list">
          {cart.map((item, index) => (
            item.productId ? (
              <div key={item.productId._id || index} className="product-card">
                <img
                  src={`http://localhost:3001/image/${item.productId._id}`}
                  alt={item.productId.Name}
                  className="product-image"
                />
                <div className="product-details">
                  <h2 className="product-name">{item.productId.Name}</h2>
                  <p className="product-amount">Amount: ${item.productId.Amount}</p>
                  <p className="product-price">Price: ${item.productId.setPrice}</p>
                  <div className="product-quantity">
                    <span className="quantity-value">Quantity : {item.quantity}</span>
                    <div className="quantity-controls">
                      <button onClick={() => incrementQuantity(index)}>+</button>
                      <button onClick={() => decrementQuantity(index)}>-</button>
                    </div>
                  </div>
                  <button className="order-btn" onClick={() => handleOrder(item)}>Order</button>
                </div>
              </div>
            ) : (
              <div key={index} className="product-card">
                <p>Product information is not available.</p>
              </div>
            )
          ))}
        </div>
      )}
      <button className="invoice-btn" onClick={navigateToInvoice}>Generate Invoice</button>
    </div>
  );
};

export default Usercart;
