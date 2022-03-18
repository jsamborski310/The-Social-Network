// Define Mongoose
const { Schema, Types, model } = require("mongoose");


// Create a new instance of the Mongoose schema to define shape of each document
const userSchema = new Schema(
  {
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
        "Please provide a valid email address.",
      ],
      required: [true, "Email required"],
    },

    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
/////////////////
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
/////////////////

  },
  {
    toJSON: {
      virtual: true,
    },
    id: false,
  }
);


// Virtual property that gets the 'friendCount'
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model("User", userSchema);

// Error handler function to be called when an error occurs when trying to save a document
const handleError = (err) => console.error(err);

module.exports = User;
