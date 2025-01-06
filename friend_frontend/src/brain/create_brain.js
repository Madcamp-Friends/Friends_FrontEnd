import React, { useState } from 'react';
import './create_brain.css';

const Brain = () => {
  const [labels, setLabels] = useState([]); // Store labels
  const [newLabel, setNewLabel] = useState(''); // Store new label input
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state

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
    if(!newLabel.trim()){
      alert('Label cannot be emtpy');
      return;
    }
    setLabels([...labels, newLabel]);
    setNewLabel('');
  };

  // 💾 Save the new label to the backend
  const handleSaveBrain = async () => {
    try {
      const response = await fetch('http://localhost:8080/brain/create', {
        method: 'POST',
        credentials: 'include',
        headers:{
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({labelContent: labels}),
      });

      if (response.ok) {
        const data = await response.json();
        alert(data);
        setLabels(data.labelContent);
        handleCloseModal();
        if(data){
          console.log('Brain created:',data);
          setLabels(data.topic.map((item)=>item.labelTopic));
        }
      } else {
        console.error('Failed to save label');
      }
    } catch (error) {
      console.error('Error saving label:', error);
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
