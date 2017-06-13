const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;

const reviewSchema = new Schema({
    rating: {
        type     : Number,
    },
    date: {
        type     : Date,
        default  : Date.now
    },
    reviewer: {
        type     : String,
    },
    post: {
        type     : String,
    },
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;