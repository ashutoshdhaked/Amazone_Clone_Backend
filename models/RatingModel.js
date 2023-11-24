const mongoose = require('mongoose');

const RatingSchema = mongoose.Schema({
      ratedid:String,
      ratingid:String,
      star:Number
},
{
    timestamps :true
});
module.exports = mongoose.model("Ratings",RatingSchema);
