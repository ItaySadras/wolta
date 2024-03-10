import React from 'react';
import Lottie from 'lottie-react'; // Import Lottie component
import animationData from './LoaderAmination1.json'; // Import your Lottie animation JSON file
import "./LoaderComponent.css";

const LoaderComponent = () => {
  return (
    <div className="loader-container">
      <div className="loader-wrapper">
        <div className="loading-text">BaliFood</div>
        <div className="loader-animation">
          <Lottie
            animationData={animationData} // Pass the imported animation data
            loop={true} // Optional: Set loop to true if you want the animation to loop
            autoplay={true} // Optional: Set autoplay to true if you want the animation to start automatically
            style={{ width: '500px', height: '500px', scale: "100%" }} // Optional: Set width and height of the animation
          />
        </div>
      </div>
    </div>
  );
};
export default LoaderComponent;
