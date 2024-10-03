const mongoose = require('mongoose');
const slugify=require("slugify")

const productSchema=new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Amount:{
        type:Number,
        required:true
    },
    length:{
        type:Number,
        required:true
    },
    breadth:{
        type:Number,
        required:true
    },
    height:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    weight:{
        type:Number,
        required:true
    },
    category:{
        type:Number,
        required:true
    },
    shipping:{
        type:Number,
        required:true
    },
    availability:{
        type:String,
        required:true
    },
    discount:{
        type:Number,
        required:true
    },
    product_slug:{
        type:String,
        required:true
    },
    sku:{
        type:String,
        required:true

    },
    images:{
        type:String,
        required:true
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    setPrice:{
        type:Number,
        required:true
    }
    
})

function generateUniqueCode(){
    const timestamp=new Date().getTime().toString().substring(0,12);
    return timestamp;
}

productSchema.pre('save', function(next) {
    if (this.isNew || this.isModified('Name')) {
        this.product_slug = slugify(this.Name, { lower: true, strict: true });
    }
    if (this.isNew) {
        this.sku = generateUniqueCode();
    }
    next();
});


module.exports=mongoose.model("Product",productSchema)

