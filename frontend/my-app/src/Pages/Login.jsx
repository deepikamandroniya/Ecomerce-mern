// import React from "react";
// import axios from "axios"
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// // import { useHistory } from 'react-router-dom';

// import './CSS/Loginsignup.css'

// const Login=()=>{

//     // const history=useHistory()


//     const navigate=useNavigate()

//     const [email,setEmail]=useState('')
//     const [password,setPassword]=useState('')

//     async function submit(e){
//         e.preventDefault();

//         try{
//             await axios.post("http://localhost:3001/login",{
//                 email,password
//             })
//             .then(res=>{

            
            
//                 if(res.data==="exists"){
//                         navigate("/Home",{state:{id:email}})
//                     }
                    
                
//             })
        
//         }
//         catch(e){
//             console.log(e)
//         }
//     }

//     return (
//         <div className="loginsignup">
//             <div className="loginsignup-container">
//                 <h1>Login</h1>
//                 <form action="POST" onSubmit={submit}>
//                     <div className="loginsignup-fields">
//                         <input type="text" onChange={(e)=>{setEmail(e.target.value)}} placeholder="Email"></input>
//                         <input type="password" onChange={(e)=>{setPassword(e.target.value)}} placeholder="Password"></input>
//                         <button type="submit">Continue</button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     )
// }

// export default Login;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './CSS/Loginsignup.css';
// import Cookies from 'js-cookie';


const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    
    async function submit(e) {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:3001/login", {
                email,
                password

            });

            if (response.data.success) {
                
                localStorage.setItem('token', response.data.token);
                
                localStorage.setItem('superuser', response.data.superuser);
                
                // Cookies.set('token', response.data.token);
                // Cookies.set('superuser', response.data.superuser);
                

                console.log('Superuser:', response.data.superuser);

                if(response.data.superuser){
                    
                    navigate("/superuser-home",{state:{id:email}})
                }
                else{
                    
                    navigate("/home", { state: { id: email } });
                }
            } else {
                alert(response.data.message); 
            }
        } catch (error) {
            console.error('Error logging in:', error);
            alert('Error logging in');
        }
    }

    return (
        <div className="loginsignup">
            <div className="loginsignup-container">
                <h1>Login</h1>
                <form onSubmit={submit}>
                    <div className="loginsignup-fields">
                        <input
                            type="text"
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            required
                        />
                        <input
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                        />
                        <button type="submit">Continue</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
