import React from 'react';
import './Slideimagebar.css';
// import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import image_slide_1 from '../Assets/image_slide_1.jpg';
import image_slide_2 from '../Assets/image_slide_2.jpeg';
// Put any other imports below so that CSS from your
// components takes precedence over default styles.
const Slideimagebar = ()=>{
    return(
            <div id="carouselExampleInterval" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active" data-bs-interval="10000">
                    <img src={image_slide_1} class="d-block w-100" alt="..."></img>
                    </div>
                    <div class="carousel-item" data-bs-interval="2000">
                    <img src={image_slide_2} class="d-block w-100" alt="..."></img>
                    </div>
                    <div class="carousel-item">
                    <img src={image_slide_1} class="d-block w-100" alt="..."></img>
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
    )
}

export default Slideimagebar;