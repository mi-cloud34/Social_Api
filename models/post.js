const mongoose = require("mongoose");
const postSchema = mongoose.Schema({
 
  description: {
    type: String,
    required: true,
    trim: true,
  },
  postVideo:{
    type:String
  },
  likes: {
    type: Array,
    default: [],
  },
  userId: { type:mongoose.Types.ObjectId,ref:"User",required:true },
  commentId:[ { type:mongoose.Types.ObjectId,required:true,ref:"Comment" }],
  images: [
    {
      type: String,
     
    },
  ],

});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;