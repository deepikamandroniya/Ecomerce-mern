const mongoose = require('mongoose');
const bcrypt=require("bcryptjs")

const newSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    superuser:{
        type:Boolean,
        default:false
    }
})

newSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 12);
  });

module.exports=mongoose.model("Collections",newSchema)

