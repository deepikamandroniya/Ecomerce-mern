import React ,{useEffect} from 'react';
import './CSS/InvoiceBill.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const InvoiceBill=()=>{
    const navigate = useNavigate();
    useEffect (()=>{
        const token=localStorage.getItem('token');
        if(!token){
            navigate('/login')
        }else{
            axios.get('http://localhost:3001/invoice',{
                headers:{Authorization: `Bearer ${token}`}
            })
        }

    },[navigate]);

    return(
        <div>
            <h1>INVOICE BILL</h1>
        </div>
    );
};

export default InvoiceBill;