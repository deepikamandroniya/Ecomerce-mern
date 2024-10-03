// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const AddProductStock = () => {
//   const [lot, setLot] = useState('');
//   const [bundle, setBundle] = useState('');
//   const [quantity, setQuantity] = useState('');
//   const [product_id, setProduct_id] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const token = localStorage.getItem('token');
//     const headers = { Authorization: `Bearer ${token}` };

//     try {
//       await axios.post('http://localhost:3001/addProductStock', { lot, bundle, quantity, product_id }, { headers });
//       alert('Product stock added successfully');
//       navigate('/superuser-home');
//     } catch (error) {
//       console.error('Error adding product stock:', error);
//       alert('Failed to add product stock');
//     }
//   };

//   return (
//     <div>
//       <h1>Add Product Stock</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Lot:</label>
//           <input type="text" value={lot} onChange={(e) => setLot(e.target.value)} required />
//         </div>
//         <div>
//           <label>Bundle:</label>
//           <input type="text" value={bundle} onChange={(e) => setBundle(e.target.value)} required />
//         </div>
//         <div>
//           <label>Quantity:</label>
//           <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
//         </div>
//         <div>
//           <label>Product ID:</label>
//           <input type="text" value={product_id} onChange={(e) => setProduct_id(e.target.value)} required />
//         </div>
//         <button type="submit">Add Stock</button>
//       </form>
//     </div>
//   );
// };

//     export default AddProductStock;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddProductStock = () => {
  const [lot, setLot] = useState('');
  const [bundle, setBundle] = useState('');
  const [quantity, setQuantity] = useState('');
  const [product_id, setProduct_id] = useState('');
  const [productStock, setProductStock] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };

        const response = await axios.get('http://localhost:3001/getProductStock', { headers });
        setProductStock(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product stock:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);



  const handlePlusClick = () => {
    if (productStock.length > 0) {
      const lastStock = productStock[productStock.length - 1];
      setLot(lastStock.lot);
      setBundle(lastStock.bundle);
      setQuantity(lastStock.quantity);
      setProduct_id(lastStock.product_id);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!checkQuantity()) {
      return;
    }

    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    try {
      await axios.post('http://localhost:3001/addProductStock', { lot, bundle, quantity, product_id }, { headers });
      alert('Product stock added successfully');
      navigate('/superuser-home');
    } catch (error) {
      console.error('Error adding product stock:', error);
      alert('Failed to add product stock');
    }
  };

  const getTotalQuantity =()=>{
    return productStock.reduce((total,stock)=>total+stock.quantity,0);
  }

  const checkQuantity=()=>{
    const TotalQuantity=getTotalQuantity()+Number(quantity);
    console.log(TotalQuantity)
    if(TotalQuantity<0) {
      alert('Total quantity goes negative')
      return false;
    }
    return true;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Add Product Stock</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Lot:</label>
          <input type="text" value={lot} onChange={(e) => setLot(e.target.value)} required />
        </div>
        <div>
          <label>Bundle:</label>
          <input type="text" value={bundle} onChange={(e) => setBundle(e.target.value)} required />
        </div>
        <div>
          <label>Quantity:</label>
          <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
          <p>Total quantity: {getTotalQuantity()}
          </p>
          
        </div>
        <div>
          <label>Product ID:</label>
          <input type="text" value={product_id} onChange={(e) => setProduct_id(e.target.value)} required />
        </div>
        <button type="submit">Add Stock</button>
        <button type="button" onClick={handlePlusClick}>Plus</button>
      </form>

      <h1>Product Stock</h1>
      {productStock.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Lot</th>
              <th>Bundle</th>
              <th>Quantity</th>
              <th>Product ID</th>
            </tr>
          </thead>
          <tbody>
            {productStock.map(stock => (
              <tr key={stock._id}>
                <td>{stock.lot}</td>
                <td>{stock.bundle}</td>
                <td>{stock.quantity}</td>
                <td>{stock.product_id}</td>
              </tr>
            ))}
            
          </tbody>
        </table>
      ) : (
        <p>No product stock available</p>
      )}
    </div>
  );
};

export default AddProductStock;
