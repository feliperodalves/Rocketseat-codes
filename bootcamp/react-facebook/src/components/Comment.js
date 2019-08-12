import React, { Component } from "react";

export default class Comment extends Component {
  render() {
    const { author, date, content } = this.props.comment;
    console.log(this.props);
    return (
      <div className="comment">
        <img src={author.avatar} alt="" className="commentProfile" />
        <div className="commentData">
          <p>
            <strong>{author.name}</strong> - {date}
            <br />
            {content}
          </p>
        </div>
      </div>
    );
  }
}
