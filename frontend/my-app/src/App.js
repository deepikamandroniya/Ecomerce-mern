
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SuperuserAddProduct from "./Pages/superuser-addProduct.jsx";
import SuperuserHome from "./Pages/superuser-home.jsx";
import LoginSignup from "./Pages/LoginSignup.jsx"; 
import Login from "./Pages/Login.jsx";
import Home from "./Pages/home.jsx"; 
import ImageComponent from "./Pages/imageComponent.jsx"
import Usercart from './Pages/usercart.jsx';
import Navbar from './Components/Navbar/Navbar.jsx';
import Electronics from './Pages/Electronics.jsx';
import HomeGarden from './Pages/HomeGarden.jsx';
import InvoiceBill from './Pages/InvoiceBill.jsx';
import Front from './Pages/Front.jsx'
import SuperuserAddProductStock from './Pages/superuser-addProductStock.jsx'

function App() {
  
  return (
    <div className='homepage'>
     <Router>
            <Navbar /> 
              <Routes>
                <Route path="/" element={<Front />} />
                <Route path="/login-signup" element={<LoginSignup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home/>}/>
                <Route path="/superuser-home" element={<SuperuserHome/>}/>
                <Route path="/superuser-addProduct" element={<SuperuserAddProduct/>}/>
                <Route path="/image/:productId" element={<ImageComponent/>}/>
                <Route path="/user-cart" element={<Usercart/>}/>
                <Route path="/electronics" element={<Electronics />} />
                <Route path="/home-garden" element={<HomeGarden />} />
                <Route path="/invoice" element={<InvoiceBill/>}/>
                <Route path="/superuser-addProductStock" element={<SuperuserAddProductStock/>}/>
            </Routes>

            
        </Router> 
        <br>
        </br>
        
        </div>
  );
}


export default App;
