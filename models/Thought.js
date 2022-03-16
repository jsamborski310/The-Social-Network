// Define Mongoose
const mongoose = require('mongoose');

// Creating a reaction schema to join in thoughts after.
const reactionSchema = new mongoose.Schema({
    // 
});

// Create a new instance of the Mongoose schema to define shape of each document
const thoughtSchema = new mongoose.Schema({
 
  thoughtText: { type: String, required: true },
  // Use built in date method to get current date
  createdAt: { type: Date, default: Date.now },

  reactions: [ reactionSchema ],
});

// Using mongoose.model() to compile a model based on the schema
// 'Item' is the name of the model
// grocerySchema is the name of the schema we are using to create a new instance of the model
const Thought = mongoose.model('Thought', thoughtSchema);

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

module.exports = Thought;
