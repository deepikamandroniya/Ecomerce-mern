// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import React from 'react';
// import { useLocation } from 'react-router-dom';

// const ImageComponent=()=>{
//     const {state} = useLocation();
//     const { productId} = state; 
//     return(
//         <div>
//             <img
//               src={`http://localhost:3001/image/${productId}`}
//               alt="image_product"
//               className="product-image"
//             />
//         </div>
//     )
// };

// export default ImageComponent;

import React from 'react';
import { useLocation } from 'react-router-dom';
import ReactImageZoom from 'react-image-zoom';
import './CSS/ImageComponent.css'; // Import CSS for styling

const ImageComponent = () => {
  const { state } = useLocation();
  const productId = state?.productId; // Ensure productId is accessed safely

  if (!productId) {
    return <div>No product ID found.</div>; // Error handling if productId is not available
  }

  return (
    <div className="image-container">
      <div className="image-wrapper">
        <ReactImageZoom
          zoomImage={`http://localhost:3001/image/${productId}`}
          img={`http://localhost:3001/image/${productId}`}
          alt="image_product"
          className="product-image"
          zoomPosition="original"
          zoomType="hover"
          width="100%"
          height="auto"
        />
      </div>
      <div className="additional-info">
        {/* Add your additional information here */}
        <h3>Product Details</h3>
        <p>Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <p>Price: $99.99</p>
        <button className="btn">Add to Cart</button>
      </div>
    </div>
  );
};

export default ImageComponent;

