var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
    body: String,
    author: String,
    upvotes: {type: Number, default: 0},
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
    },
});

CommentSchema.methods.downvote = function(obj) {
    this.upvotes -= 1;
    this.save(cb);
};

CommentSchema.methods.upvote = function(obj) {
    this.upvotes += 1;
    this.save(cb);
};

mongoose.model('Comment', CommentSchema);
