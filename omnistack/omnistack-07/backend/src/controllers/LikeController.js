const Post = require("../models/Post");

module.exports = {
  /** ACTION to increase number of likes on specific post */
  async store(req, res) {
    const post = await Post.findById(req.params.id);
    post.likes += 1;
    /* saving modified post */
    await post.save();
    /* using websocket for realtime notification */
    req.io.emit('like', post);
    return res.json(post);
  }
};
