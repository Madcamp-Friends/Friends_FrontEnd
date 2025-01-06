import React, { useState } from 'react';
import './create_brain.css';

const Brain = () => {
  const [labels, setLabels] = useState([]); // Store labels
  const [newLabel, setNewLabel] = useState(''); // Store new label input
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const [errorMessage, setErrorMessage]=useState(null);

  // ➕ Open the modal when the "+" button is clicked
  const handleAddLabelClick = () => {
    setIsModalOpen(true);
  };

  // ❌ Close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewLabel('');
  };

  const handleAddNewLabel=()=>{
    const trimmedLabel=newLabel.trim();
    if(!trimmedLabel){
      setErrorMessage('Label cannot be emtpy');
      return;
    }
    if(labels.includes(trimmedLabel)){
      setErrorMessage('Label already exists');
      return;
    }
    setLabels([...labels, newLabel]);
    setNewLabel('');
    setErrorMessage(null);
  };

  // 💾 Save the new label to the backend
  const handleSaveBrain = async () => {
    try {
      const response = await fetch("http://localhost:8080/brain/create", {
        method: "POST",
        headers:{
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body:JSON.stringify({
          labelContent: labels
        }),
      });

      console.log("Response status:",response.status);

      if (response.ok) {
        handleCloseModal();
      } 
      else {
        const data=await response.json();
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error('Error saving label:',error);
    }
  };

  return (
    <div className="brain-container">
      <div className="brain-image-wrap">
        <img
          src="/assets/Brain_NI.svg"
          alt="Brain"
          className="brain-image"
        />

        {/* Render Labels */}
        {labels.map((label, index) => (
          <div
            key={index}
            className="label"
            style={{
              left: `${Math.random() * 80 + 10}%`,
              top: `${Math.random() * 70 + 10}%`,
            }}
          >
            {label}
          </div>
        ))}
      </div>

      {/* Add Label Button */}
      <button className="add-button" onClick={handleAddLabelClick}>
        +
      </button>

      {/* Modal Dialog */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Add New Label</h3>

            {/* List of Existing Labels */}
            <ul>
              {labels.map((label, index) => (
                <li key={index}>{label}</li>
              ))}
            </ul>

            {/* Input Field for New Label */}
            <input
              type="text"
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              placeholder="Enter new label"
            />
            <button onClick={handleAddNewLabel}>Add Label</button>

            {/* Save and Cancel Buttons */}
            <div className="modal-buttons">
              <button onClick={handleSaveBrain}>Save</button>
              <button onClick={handleCloseModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Brain;
