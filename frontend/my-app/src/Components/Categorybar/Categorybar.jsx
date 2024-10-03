import React from 'react';
import './Categorybar.css';
import side_nav from '../Assets/side_nav.png';


const Categorybar = () => {

    return (

        <div className='categorybar'>
            <div className="categorybar-category">
                <button ><img src={side_nav} alt="sidebar"></img></button>
                <button><text>Best Sellers</text></button>
                <button><text>Fashion</text></button>
                <button><text>Electronics</text></button>
                <button><text>Books</text></button>
            </div>
        </div> 

    )
}

export default Categorybar;