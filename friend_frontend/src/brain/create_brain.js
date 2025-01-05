import React from 'react';
import './create_brain.css';
// If you have a local brain image, import it like this:
// import brainImage from './brain.png'; 
// Otherwise, use an online image URL below in <img src="" />

const Brain = () => {
  const handleSave = () => {
    // Handle saving logic here (e.g., post data to server)
    console.log('Save clicked');
  };

  const handleAdd = () => {
    // Handle adding logic here (e.g., show a modal to input new #info)
    console.log('Add clicked');
  };

  return (
    <div className="brain-container">
      <div className="brain-image-wrap">
        {/* 
          Replace the src below with either:
          - your local imported image: src={brainImage}
          - or a public image URL 
        */}
        <img
          src="/brain_create.png"
          alt="Brain"
          className="brain-image"
        />
      </div>

      {/* Bottom-left "Save" button */}
      <button className="save-button" onClick={handleSave}>
        Save
      </button>

      {/* Bottom-right "Add" button (plus icon) */}
      <button className="add-button" onClick={handleAdd}>
        +
      </button>
    </div>
  );
};

export default Brain;
