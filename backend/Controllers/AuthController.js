const User=require("../Models/UserModel");
const Product=require("../Models/ProductModel");
const Order=require("../Models/OrderModel");
const ProductStock=require("../Models/ProductStockModel");
const {createSecretToken}=require("../util/SecretToken");
const bcrypt=require("bcryptjs");
const slugify=require("slugify")

module.exports.Signup=async(req,res,next)=>{
    try{
        const {email,password}=req.body;
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.json({message:"User already exists"});
        }
        const user=await User.create({email,password});
        const token=createSecretToken(user._id,user.superuser);
        // res.cookie("token",token,{
        //     withCredentials:true,
        //     httpOnly:false,
        // });
        // res
        // .status(201)
        // .json({ message: "User signed in successfully", success: true, user });
        res.status(201).json({ message: "User signed up successfully", success: true, token, user });
      next();
    } 
    catch (error) {
      console.error(error);
    }
};


module.exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if(!email || !password ){
      return res.json({message:'All fields are required'})
    }
    const user = await User.findOne({ email });
    if(!user){
      return res.json({message:'Incorrect password or email' }) 
    }
    const auth = await bcrypt.compare(password,user.password)
    if (!auth) {
      return res.json({message:'Incorrect password or email' }) 
    }
     const token = createSecretToken(user._id,user.superuser);
    //  res.cookie("token", token, {
    //    withCredentials: true,
    //    httpOnly: false,
    //  });
    //  res.status(201).json({ message: "User logged in successfully", success: true ,superuser:user.superuser,user});
    res.status(201).json({ message: "User logged in successfully", success: true, token, superuser: user.superuser, user });
     next()
  } catch (error) {
    console.error(error);
  }
}



// module.exports.Addproduct = async (req, res, next) => {
//   try {
//     const { Name, Amount, length, breadth, height, quantity, weight, category, shipping, availability, discount, images} = req.body;
    
//     // Check if the product already exists
//     const existingProduct = await Product.findOne({ product_slug });
//     if (existingProduct) {
//       return res.status(400).json({ message: "Product already exists" });
//     }

//     // Create a new product
//     const product = new Product({
//       Name,
//       Amount,
//       length,
//       breadth,
//       height,
//       quantity,
//       weight,
//       category,
//       shipping,
//       availability,
//       discount,
//       product_slug,
//       sku,
//       images,
//       isDeleted
//     });
    
//     if(req.file){
//       product.images=req.file.path
//     }
//     // Save the product to the database
//     await product.save();

//     // Respond with success message and the created product
//     res.status(201).json({ message: "Product added successfully", success: true, product });
    
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   } finally {
//     next();
//   }
// };

function generateUniqueCode() {
  const timestamp = new Date().getTime().toString().substring(0, 12);
  return timestamp;
}

module.exports.Addproduct = async (req, res, next) => {
  try {
      const {
          Name,
          Amount,
          length,
          breadth,
          height,
          quantity,
          weight,
          category,
          shipping,
          availability,
          discount,
          setPrice
      } = req.body;

      // Generate the product_slug from the product Name
      const product_slug = slugify(Name, { lower: true, strict: true });
      const sku = generateUniqueCode();
      const isDeleted = false;

      // Check if the product already exists
      const existingProduct = await Product.findOne({ product_slug });
      if (existingProduct) {
          return res.status(400).json({ message: "Product already exists" });
      }

      // Create a new product object
      const product = new Product({
          Name,
          Amount,
          length,
          breadth,
          height,
          quantity,
          weight,
          category,
          shipping,
          availability,
          discount,
          product_slug, // Assigning the generated product_slug
          sku,
          images: req.file ? req.file.path : null,
          isDeleted,
          setPrice
      });

      // Save the product to the database
      await product.save();

      // Respond with success message and the created product
      res.status(201).json({ message: "Product added successfully", success: true, product });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
  } finally {
      next();
  }
};

module.exports.AddOrder=async(req,res,next)=>{
  try {
    const { userId, productId ,quantity , price,discount,shipping} = req.body;

    // Validate input
    if (!userId || !productId) {
        return res.status(400).json({ message: 'User ID and Product ID are required.' });
    }

    // Check if user exists
    const userExists = await Collections.findById(userId);
    if (!userExists) {
        return res.status(404).json({ message: 'User not found.' });
    }

    // Check if product exists
    const productExists = await Product.findById(productId);
    if (!productExists) {
        return res.status(404).json({ message: 'Product not found.' });
    }

    // Create a new order
    const order = new Order({
        user_id: userId, // Assuming user_id is an array of ObjectIds
        product_id: productId,
        quantity: quantity,
        price:price,
        discount:discount,
        shipping:shipping
    });

    // Save the order to the database
    await order.save();

    res.status(201).json({ message: 'Order created successfully', order });
} catch (error) {
    next(error); // Pass errors to the error handler middleware
}
}

module.exports.addProductStock = async (req, res) => {
  try {
    const { lot, bundle, quantity, product_id } = req.body;

    const newProductStock = new ProductStock({
      lot,
      bundle,
      quantity,
      product_id,
    });
    
    await newProductStock.save();
    res.status(201).json({ message: 'Product stock added successfully', productStock: newProductStock });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add product stock', error });
  }
};