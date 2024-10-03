// // require("dotenv").config();
// // const User=require("../Models/UserModel");

// // const jwt=require("jsonwebtoken");

// // module.exports.userVerification = (req, res , next) => {
// //     // const token = req.cookies.token
// //     const token = req.headers.authorization && req.headers.authorization.split(" ")[1]; 
    
// //     if (!token) {
// //       return res.json({ status: false , "type":"fail"})
// //     }

// //     jwt.verify(token, process.env.TOKEN_KEY, async (err, decoded) => {
// //       if (err) {
// //        return res.json({ status: false })
// //       }
// //       else {
// //         const user = await User.findById(decoded.id)
// //         if (user){
// //            req.user=({  email: user.email ,superuser: user.superuser,user})
// //             next()
// //         }
// //         else return res.json({ status: false })
// //       }
// //    }
// //   )
   
// //   }



// require("dotenv").config();
// const User = require("../Models/UserModel");
// const jwt = require("jsonwebtoken");

// module.exports.userVerification = async (req, res, next) => {
//     const authorizationHeader = req.headers.authorization;
//     const token = authorizationHeader && authorizationHeader.split(" ")[1];
//     console.log(token);
//     if (!token) {
//         return res.json({ status: false, type: "fail" });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        
//         const user = await User.findById(decoded.id);
//         console.log(user);
//         if (user) {
//             req.user = { email: user.email, superuser: user.superuser, user };
//             next();
//         } else {
//             return res.json({ status: false });
//         }
//     } catch (err) {
//         console.error('JWT verification error:', err);
//         return res.json({ status: false });
//     }
// };


require("dotenv").config();
const User = require("../Models/UserModel");
const jwt = require("jsonwebtoken");

module.exports.userVerification = async (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader && authorizationHeader.split(" ")[1];
    console.log('Token:', token);

    if (!token) {
        return res.status(401).json({ status: false, type: "fail", message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        
        try {
            const user = await User.findById(decoded.id);
            console.log('User:', user);

            if (user) {
                req.user = { email: user.email, superuser: user.superuser, _id:user._id ,user};
                next();
            } else {
                return res.status(404).json({ status: false, message: 'User not found' });
            }
        } catch (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ status: false, message: 'Internal Server Error' });
        }
    } catch (err) {
        console.error('JWT verification error:', err);
        return res.status(401).json({ status: false, message: 'Unauthorized' });
    }
};
