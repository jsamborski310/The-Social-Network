// Define Mongoose
const { Schema, model} = require('mongoose');
const Schema = mongoose.Schema;

// or
// const { Schema, model} = require('mongoose)


// Create a new instance of the Mongoose schema to define shape of each document
const userSchema = new mongoose.Schema({

    username: {
        type: String,
        unique: true,
        trim: true,
        required: true,
    },

    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        match: [
            /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
            'Please provide a valid email address.'
        ],
        required: [true, "Email required"]        
    },
 
    thoughts: [
        {
            type: Schema.types.ObjectId, //See class example. Might not need "mongoose"
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: Schema.types.ObjectId,
            ref: 'User'
        }
    ],
},

);



const User = model('User', userSchema);

// Error handler function to be called when an error occurs when trying to save a document
const handleError = (err) => console.error(err);

// We use the model to create individual documents that have the properties as defined in our schema
// Item.create(
//   {
//     item: 'banana',
//     stockCount: 10,
//     price: 1,
//     inStock: true,
//   },
//   (err) => (err ? handleError(err) : console.log('Created new document'))
// );

module.exports = User;
