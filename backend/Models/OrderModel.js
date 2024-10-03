const mongoose = require('mongoose');

const OrderSchema=new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Collections',
        required:true
    
    },
    product_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    discount:{
        type:Number,
        required:true
    },
    shipping:{
        type:Number,
        required:true
    }
},
{
    timestamps:true
  }
)



module.exports=mongoose.model("Order",OrderSchema)

