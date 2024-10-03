
require("dotenv").config();
const User = require("../Models/UserModel");
// const jwt = require("jsonwebtoken");
const path=require("path")


const { Signup, Login, Addproduct , addProductStock} = require("../Controllers/AuthController");
const router = require("express").Router();
const { userVerification } = require("../Middlewares/AuthMiddleware");
const ProductModel = require("../Models/ProductModel");
const CartModel=require("../Models/CartModel")
const OrderModel=require("../Models/OrderModel")
//const { addProductStock } = require('../controllers/productStockController');
const upload=require("../Middlewares/upload")
const ProductStockModel = require("../Models/ProductStockModel");
router.post("/login-signup", Signup);
router.post("/login", Login);




router.post("/superuser-addProduct",userVerification,upload.single('images'), Addproduct);
router.get("/superuser-addProduct", userVerification, (req, res) => {
    const userData = { email: req.user.email };
    res.json(userData);
});

router.get("/home", userVerification, (req, res) => {
    // const userData = { email: req.user.email };
    const userData = {  email: req.user.email , id:req.user._id };
    console.log(req.user.email)
    console.log(req.user._id)
    res.json(userData);
});

router.get("/getProductlist", async (req, res) => {
    try {
        const products = await ProductModel.find({isDeleted:false});
        res.json(products);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "An error occurred" });
    }
});


router.get('/image/:productId', async (req, res) => {
    try {
      const productId = req.params.productId;
  
      // Fetch the product from the database based on productId
      const product = await ProductModel.findById(productId);
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      // Serve the product image
      res.set('Content-Type', 'image/png'); // Set the appropriate content type (adjust based on your image type)

      const imagePath = path.join(__dirname, '..',  product.images);

      res.sendFile(imagePath); // Assuming product.images is the path to your image file
    } catch (error) {
      console.error('Error fetching product image:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

// Apply JWT verification middleware to the specific route
router.use('/superuser-home', userVerification)

// Route handler for 'superuser-home' route
router.get('/superuser-home',  (req, res) => {
    
    console.log("superuser")
    const userData = { email: req.user.email, superuser: req.user.superuser };

    // Send response with user data
    res.json({ status: true, data: userData });
});

// router.put("/product/:id",async(req,res)=>{
//     let result=await ProductModel.updateOne(
//         {_id:req.params.id},
//         {
//             $set:req.body
//         }
//     )
//     res.send(result)
// })

router.put("/product/:id",async(req,res,next)=>{
    try{
        const productId=req.params.id;
        const {
            Name,Amount,length,breadth,height,quantity,weight,category,shipping,availability,discount,product_slug,sku,isDeleted,setPrice}=req.body;
        
    
    const product=await ProductModel.findById(productId);
    if(!product){
        return res.status(404).json({message:"product not found"});

    }
    if(Name) product.Name=Name;
    if(Amount) product.Amount=Amount;
    if(length)  product.length=length;
    if(breadth) product.breadth=breadth;
    if(height)  product.height=height;
    if(quantity==0) {
        product.quantity=quantity;
        product.status="Nostock";
    }
    if(weight) product.weight=weight;
    if(category) product.category=category;
    if(shipping) product.shipping=shipping;
    if(availability=="Nostock"){
        product.availability=availability;
        product.quantity="0";
    }
    if(discount) product.discount=discount;
    if(product_slug) product.product_slug=product_slug;
    if(sku) product.sku=sku;
    if(isDeleted=="false") product.isDeleted=isDeleted;
    if(req.files){
        product.images=req.files.path;
    }
    if(setPrice) product.setPrice=setPrice;

    await product.save();
    res.status(200).json({ message: "Product updated successfully", success: true, product });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    next();
  }
})

router.delete("/product/:id",async(req,res)=>{
    let result=await ProductModel.updateOne(
        {_id:req.params.id},
        {
            "isDeleted":"true"
        }
    )
    res.send(result)
})

router.post('/orders', userVerification, async (req, res) => {
    try {
      const { product_id, quantity,price,discount,shipping } = req.body;
      const user_id = req.user.user._id; // Get user ID from the token
  
      const order = new OrderModel({
        user_id,
        product_id,
        quantity,
        price,
        discount,
        shipping
      });
  
      await order.save();
      res.status(201).json({ message: 'Order created successfully', order });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });



  router.get('/orders', userVerification, async (req, res) => {
    try {
      const orders = await OrderModel.find({ user_id: req.user.user._id });
      res.json(orders);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  });


  router.post('/cart/addToCart', userVerification, async (req, res) => {
    const { userId, productId } = req.body;
  
    try {
      let cart = await CartModel.findOne({ userId });
  
      if (cart) {
        // Check if product already exists in the cart
        const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);
        
        if (productIndex > -1) {
          // Update quantity if product exists
          cart.products[productIndex].quantity += 1;
        } else {
          // Add new product to cart
          cart.products.push({ productId, quantity: 1 });
        }
      } else {
        // Create a new cart if it doesn't exist
        cart = new CartModel({ userId, products: [{ productId, quantity: 1 }] });
      }
  
      await cart.save();
      res.status(200).json(cart);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  });

  router.get('/cart/:userId', userVerification, async (req, res) => {
    const { userId } = req.params;
  
    try {
      const cart = await CartModel.findOne({ userId }).populate('products.productId').exec();
      res.status(200).json(cart);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  });


  router.put('/cart/:userId/:productId', userVerification, async (req, res) => {
    const { userId, productId } = req.params; // user ID and product ID
    const { quantity } = req.body; // new quantity from request body
  
    try {
      // Ensure productId is cast to ObjectId
      
  
      // Find the cart by userId and update the quantity of the specific product in the products array
      const updatedCart = await CartModel.findOneAndUpdate(
        { userId: userId, 'products.productId': productId }, // filter by user ID and product ID within the products array
        { $set: { 'products.$.quantity': quantity } }, // update the quantity of the specific product
        
      );
  
      if (!updatedCart) {
        return res.status(404).json({ error: 'Cart or product not found' });
      }
  
      res.json(updatedCart); // Send back the updated cart
    } catch (error) {
      console.error('Error updating product quantity:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  router.get('invoice', userVerification , (req,res)=>{
    const userData={email:req.user.email}
    res.json(userData)
  })


  router.post('/addProductStock', addProductStock);


  router.get('/getProductStock', async (req, res) => {
    try {
      const productStock = await ProductStockModel.find();
      res.status(200).json(productStock);
    } catch (error) {
      console.error('Failed to fetch product stock:', error);
      res.status(500).json({ message: 'Failed to fetch product stock', error });
    }
  });



module.exports = router;
