const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const UserSchema = new Schema({
    username: {
      type: String,
      required: "you are required to insert a username",
      trim: true,
      unique: true
    },
    email: {
      type: String,
      required: "you are required to insert your email",
      trim: true
    },
    friends: {
      
    },
    thoughts:[
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

// get total count of thoughts and replies on retrieval
UserSchema.virtual('thoughtCount').get(function() {
  return this.thoughts.reduce((total, thought) => total + thought.replies.length + 1, 0);
});

// create the User model using the PizzaSchema
const User = model('User', UserSchema);

// export the User model
module.exports = User;