// Define Mongoose
const { Schema, Types, model } = require("mongoose");

// Creating a reaction schema to join in thoughts after.
const reactionSchema = new Schema({
  reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
  },
  reactionBody: {
      type: String,
      required: true,
      maxLength: 280,
  },
  username: {
      type: String,
      required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create a new instance of the Mongoose schema to define shape of each document
const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 280,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  // Should this reference the User?
  username: {
    type: String,
    required: true,
  },

  reactions: [reactionSchema],
});


// Virtual property that gets the 'friendCount'
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

// 'Thought' is the name of the model
// thoughtSchema is the name of the schema we are using to create a new instance of the model
const Thought = model('Thought', thoughtSchema);

// Error handler function to be called when an error occurs when trying to save a document
const handleError = (err) => console.error(err);

module.exports = Thought;


//////////////////////////////
  // Use built in date method to get current date
//   timestamps: {
//     createdAt: "created_at", // Use `created_at` to store the created date
//     updatedAt: "updated_at", // and `updated_at` to store the last updated date
//   },

