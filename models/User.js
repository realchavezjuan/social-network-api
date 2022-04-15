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
    friends: [{
      type: Schema.Types.ObjectId,
      ref: 'Users'
    }],
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

// get total count of thoughts and reactions on retrieval
UserSchema.virtual('thoughtCount').get(function() {
  return this.thoughts.reduce((total, thought) => total + thought.reactions.length + 1, 0);
});

// get total count of friends
UserSchema.virtual('friendCount').get(function() {
  return this.friends.length;
})

// create the User model using the UserSchema
const User = model('User', UserSchema);

// export the User model
module.exports = User;