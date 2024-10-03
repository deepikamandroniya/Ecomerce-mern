
// import React, { useEffect, useState } from 'react';
// import './CSS/Loginsignup.css'
// import axios from "axios"
// import { useNavigate } from "react-router-dom";
// import { useLocation } from 'react-router-dom';

// const SuperuserAddproduct = () => {
//     const navigate = useNavigate();
//     const [userData, setUserData] = useState(null);
//     const [Name, setProductName] = useState('');
//     const [Amount, setAmount] = useState('');
//     const [length, setLength] = useState('');
//     const [breadth, setBreadth] = useState('');
//     const [height, setHeight] = useState('');
//     const [quantity, setQuantity] = useState('');
//     const [weight, setWeight] = useState('');
//     const [category, setCategory] = useState('');
//     const [shipping, setShipping] = useState('');
//     const [statusi, setStatus] = useState('');
//     const [discount, setDiscount] = useState('');
//     const [images, setImages] = useState('');
//     const location = useLocation();

//     useEffect(() => {
//         const token = localStorage.getItem('token');
//         if (!token) {
//             navigate('/login');
//         } else {
//             axios.get('http://localhost:3001/superuser-addProduct', {
//                 headers: { Authorization: `Bearer ${token}` }
//             })
//             .then(response => {
//                 setUserData(response.data);
//             })
//             .catch(error => {
//                 console.error('Error fetching user data:', error);
//                 alert('Error fetching user data');
//                 navigate('/login');
//             });
//         }
//     }, [navigate]);

//     const handleAddProduct = async (e) => {
//         e.preventDefault();
//         try {
//             await axios.post("http://localhost:3001/superuser-addProduct", {
//                 Name,
//                 Amount,
//                 length,
//                 breadth,
//                 height,
//                 quantity,
//                 weight,
//                 category,
//                 shipping,
//                 statusi,
//                 discount,
//                 images,
//             });
//             navigate('/superuser-home');
//         } catch (error) {
//             console.error('Error adding product:', error);
//             alert('Error adding product');
//         }
//     }

//     if (!userData) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div className="loginsignup">
//             <div className="loginsignup-container">
//                 <h1>Welcome, {location.state ? location.state.id : ''}</h1>
//                 <h1>Superuser</h1>
//                 <h1>Add Product</h1>
//                 <form onSubmit={handleAddProduct}>
//                     <div className="loginsignup-fields">
//                         <input type="text" value={Name} onChange={(e) => setProductName(e.target.value)} placeholder="Product Name" />
//                         <input type="number" value={Amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" />
//                         <input type="number" value={length} onChange={(e) => setLength(e.target.value)} placeholder="Length" />
//                         <input type="number" value={breadth} onChange={(e) => setBreadth(e.target.value)} placeholder="Breadth" />
//                         <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="Height" />
//                         <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="quantity" />
//                         <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="Weight" />
//                         <input type="number" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="category" />
//                         <input type="number" value={shipping} onChange={(e) => setShipping(e.target.value)} placeholder="Shipping Charges" />
//                         <input type="text" value={statusi} onChange={(e) => setStatus(e.target.value)} placeholder="Availability" />
//                         <input type="number" value={discount} onChange={(e) => setDiscount(e.target.value)} placeholder="Discount" />
//                         <input type="button" value={images} onChange={(e) => setImages(e.target.value)} placeholder="Add Image" />
//                         <button type="submit">Add</button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     )
// }

// export default SuperuserAddproduct;

import React, { useEffect, useState } from 'react';
import './CSS/Loginsignup.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';

const SuperuserAddproduct = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [Name, setProductName] = useState('');
    const [Amount, setAmount] = useState('');
    const [length, setLength] = useState('');
    const [breadth, setBreadth] = useState('');
    const [height, setHeight] = useState('');
    const [quantity, setQuantity] = useState('');
    const [weight, setWeight] = useState('');
    const [category, setCategory] = useState('');
    const [shipping, setShipping] = useState('');
    const [availability, setAvailability] = useState('');
    const [discount, setDiscount] = useState('');
    const [setPrice,setsetPrice]=useState('');
    const [images, setImages] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        } else {
            axios.get('http://localhost:3001/superuser-addProduct', {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(response => {
                setUserData(response.data);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
                alert('Error fetching user data');
                navigate('/login');
            });
        }
    }, [navigate]);

    const handleAddProduct = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('Name', Name);
        formData.append('Amount', Amount);
        formData.append('length', length);
        formData.append('breadth', breadth);
        formData.append('height', height);
        formData.append('quantity', quantity);
        formData.append('weight', weight);
        formData.append('category', category);
        formData.append('shipping', shipping);
        formData.append('availability', availability);
        formData.append('discount', discount);
        formData.append('setPrice',setPrice);
        if (images) {
            formData.append('images', images);
        }
        const token = localStorage.getItem('token');
        try {
            await axios.post("http://localhost:3001/superuser-addProduct", formData, {
                headers: { 'Content-Type': 'multipart/form-data' ,
                    Authorization: `Bearer ${token}`
                 }
            });
            navigate('/superuser-home');
        } catch (error) {
            console.error('Error adding product:', error);
            alert('Error adding product');
        }
    };

    const handleImageChange = (e) => {
        setImages(e.target.files[0]);
    };

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="loginsignup">
            <div className="loginsignup-container">
                <h1>Welcome, {location.state ? location.state.id : ''}</h1>
                <h1>Superuser</h1>
                <h1>Add Product</h1>
                <form onSubmit={handleAddProduct}>
                    <div className="loginsignup-fields">
                        <input type="text" value={Name} onChange={(e) => setProductName(e.target.value)} placeholder="Product Name" />
                        <input type="number" value={Amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" />
                        <input type="number" value={length} onChange={(e) => setLength(e.target.value)} placeholder="Length" />
                        <input type="number" value={breadth} onChange={(e) => setBreadth(e.target.value)} placeholder="Breadth" />
                        <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="Height" />
                        <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Quantity" />
                        <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="Weight" />
                        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" />
                        <input type="number" value={shipping} onChange={(e) => setShipping(e.target.value)} placeholder="Shipping Charges" />
                        <input type="text" value={availability} onChange={(e) => setAvailability(e.target.value)} placeholder="Availability" />
                        <input type="number" value={discount} onChange={(e) => setDiscount(e.target.value)} placeholder="Discount" />
                        <input type="number" value={setPrice} onChange={(e) => setsetPrice(e.target.value)} placeholder="Set Price" />
                        <input type="file" onChange={handleImageChange} />
                        <button type="submit">Add</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SuperuserAddproduct;
