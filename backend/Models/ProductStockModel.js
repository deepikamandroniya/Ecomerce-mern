const mongoose = require('mongoose');

const productStockSchema = new mongoose.Schema({
  lot: { type: String, required: true },
  bundle: { type: Number, required: true },
  quantity: { type: Number, required: true },
  product_id: { type: String, required: true },
},
{
    timestamps:true
  });

  module.exports = mongoose.model('ProductStock', productStockSchema);


