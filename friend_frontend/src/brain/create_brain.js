import React, { useState, useEffect } from 'react';
import './create_brain.css';

const Brain = () => {
  const [labels, setLabels] = useState([]); // Store labels
  const [newLabel, setNewLabel] = useState(''); // Store new label input
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const brainId = 1; // Assuming you have a specific BrainCreate ID to work with

  // 🔄 Fetch labels from the backend when the component loads
  useEffect(() => {
    const fetchLabels = async () => {
      try {
        const response = await fetch(`/api/brains/{nickname}/labels`);
        if (response.ok) {
          const data = await response.json();
          setLabels(data.labels);
        } else {
          console.error('Failed to fetch labels');
        }
      } catch (error) {
        console.error('Error fetching labels:', error);
      }
    };

    fetchLabels();
  });

  // ➕ Open the modal when the "+" button is clicked
  const handleAddLabelClick = () => {
    setIsModalOpen(true);
  };

  // ❌ Close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewLabel('');
  };

  // 💾 Save the new label to the backend
  const handleSaveLabel = async () => {
    if (!newLabel.trim()) {
      alert('Label cannot be empty');
      return;
    }

    try {
      const response = await fetch(`/api/brains/${brainId}/labels_add}`, {
        method: 'POST',
        
      });
      if (response.ok) {
        const updatedBrain = await response.json();
        setLabels(updatedBrain.labels); // Update the labels in state
        handleCloseModal(); // Close the modal after saving
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

            {/* Save and Cancel Buttons */}
            <div className="modal-buttons">
              <button onClick={handleSaveLabel}>Save</button>
              <button onClick={handleCloseModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Brain;
