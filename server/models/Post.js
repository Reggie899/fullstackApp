import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    title: String,
    message: String, 
    name: String, 
    creator: String, 
    tags: Array, 
    postNo: Number,
    createdAt: {
        type: Date,
        default: new Date()
    },
});

postSchema.statics.findByPostNo = function(postNo) {
    return this.findOne({postNo: postNo})
}

const Post = mongoose.model('Post', postSchema);

 
export  {Post};