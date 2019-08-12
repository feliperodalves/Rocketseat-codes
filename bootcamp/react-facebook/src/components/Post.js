import React, { Component } from "react";

import Comment from "./Comment";

class Post extends Component {
  render() {
    const { author, date, content, comments } = this.props;
    return (
      <div className="post">
        <div className="postProfile">
          <img src={author.avatar} alt="" className="picture" />
          <div className="info">
            <div className="name">{author.name}</div>
            <div className="date">{date}</div>
          </div>
        </div>
        <div className="postData">{content}</div>
        <div className="postComments">
          {comments.map(c => (
            <Comment key={c.id} comment={c} />
          ))}
        </div>
      </div>
    );
  }
}

export default Post;
