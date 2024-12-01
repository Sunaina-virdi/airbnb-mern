const mongoose = require('mongoose');
const PlaceSchema = new mongoose.Schema({
    owner: {type:mongoose.Schema.Types.ObjectId, ref:'User'},
    title : String,
    address : String,
    photos : [String],
    description : String,
    facility : [String],
    extraInfo : String,
    checkIn: Number,
    checkOut: Number,
    maxGuests : Number,
    price: Number,
    // 
    category: {
        type: String,
        enum: ['hotel', 'castle', 'pool', 'shikara', 'villa'], // Add more categories as needed
        required: true,
        // default: 'hotel',
    },
    // 
});

const PlaceModel = mongoose.model('Place',PlaceSchema);

module.exports = PlaceModel;