import React, { useState, useRef } from "react";
import Post from "./Post.component";
import "../styles/storyCircle.css"

const StoryBar = ({ stories }) => {
  const [showPopup, setShowPopup] = useState(false); // State to toggle the popup
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(0); // Track the current story index

  const openPopup = (index) => {
    setSelectedStoryIndex(index); // Set the index of the clicked story
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleNextStory = () => {
    if (selectedStoryIndex < filteredStories.length - 1) {
      setSelectedStoryIndex(selectedStoryIndex + 1);
    }
  };

  const handlePreviousStory = () => {
    if (selectedStoryIndex > 0) {
      setSelectedStoryIndex(selectedStoryIndex - 1);
    }
  };

  const filteredStories = stories.filter((story) => story.story === true); // Only stories with `story` true

  return (
    <div>
      {/* Story Bar */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          padding: "10px",
          backgroundColor: "#000",
        }}
      >
        {filteredStories.map((story, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              margin: "0 10px",
              cursor: "pointer",
            }}
            onClick={() => openPopup(index)} // Open popup on story click
          >
            <img className="storyAddedTrue"
              src={story.author.personal_info.profile_img}
              alt={story.author.personal_info.username}
              style={{
                height: "60px",
                width: "60px",
                borderRadius: "50%",
                objectFit: "cover",
                padding:'3px'
              }}
            />
            <p
              style={{
                fontSize: "12px",
                color: "white",
                marginTop: "5px",
                textAlign: "center",
              }}
            >
              {story.author.personal_info.username.length > 10
                ? story.author.personal_info.username.substring(0, 8) + "..."
                : story.author.personal_info.username}
            </p>
          </div>
        ))}
      </div>

      {/* Popup for Stories */}
      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            zIndex: 1000,
          }}
        >
          <button
            onClick={handlePreviousStory}
            disabled={selectedStoryIndex === 0}
            style={{
              position: "absolute",
              left: "20px",
              top: "50%",
              backgroundColor: "transparent",
              color: "white",
              border: "none",
              fontSize: "24px",
              cursor: selectedStoryIndex > 0 ? "pointer" : "default",
            }}
          >
            &lt;
          </button>
          <div
            style={{
              width: "80%",
              height: "80%",
              position: "absolute",
              left: "35%",
            }}
          >
            <Post {...filteredStories[selectedStoryIndex]} />
          </div>
          <button
            onClick={handleNextStory}
            disabled={selectedStoryIndex === filteredStories.length - 1}
            style={{
              position: "absolute",
              right: "20px",
              top: "50%",
              backgroundColor: "transparent",
              color: "white",
              border: "none",
              fontSize: "24px",
              cursor:
                selectedStoryIndex < filteredStories.length - 1
                  ? "pointer"
                  : "default",
            }}
          >
            &gt;
          </button>
          <button
            onClick={closePopup}
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              backgroundColor: "transparent",
              color: "white",
              border: "none",
              fontSize: "24px",
              cursor: "pointer",
            }}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};

export default StoryBar;
