import React from "react";
import Comments from "./MyComments";
import "./../App.css";

const Video = ({ video: { id, name, description } }) => {
  return (
    <div className="video-card">

      <div className="video-content">
        <h3 className="video-title">{name}</h3>
        <p className="video-description">{description}</p>
        
        <div className="comments">
          <Comments videoId={id} />
        </div>
      </div>
    </div>
  );
};

export default Video;
