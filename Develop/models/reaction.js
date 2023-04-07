const { Schema, Types, SchemaType } = require('mongoose');
const assignmentSchema = require('./thoughts');

// Schema to create Student model
const reactionSchema = new Schema(
  {
    reactionId: {
     type: Schema.Types.ObjectId,
     default: ()=> new Types.ObjectId
    },
    reactionBody: {
      type: String,
      required: true,
      max_length: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
    type: Date,
    default: Date.now()
    //[assignmentSchema],
  },
  },
  {
    toJSON: {
      getters: true,
    },
    _id: false
  }
);


module.exports = reactionSchema;
