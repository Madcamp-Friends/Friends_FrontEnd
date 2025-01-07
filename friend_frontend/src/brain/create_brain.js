import React, { useEffect, useState } from 'react';
import './create_brain.css';
import { useNavigate } from 'react-router-dom';

const Brain = () => {
  const [labels, setLabels] = useState([]); // Store labels
  const [newLabel, setNewLabel] = useState(''); // Store new label input
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const [errorMessage, setErrorMessage] = useState(null);
  const [isnewModalOpen, setIsNewModalOpen] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [labelPositions, setLabelPositions] = useState({});

  const navigate = useNavigate();

  // ➕ Open the modal when the "+" button is clicked
  const handleAddLabelClick = () => {
    setIsModalOpen(true);
  };

  // ❌ Close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewLabel('');
  };

  // 🆕 Add new label
  const handleAddNewLabel = () => {
    const trimmedLabel = newLabel.trim();
    if (!trimmedLabel) {
      setErrorMessage('Label cannot be empty');
      return;
    }
    if (labels.includes(trimmedLabel)) {
      setErrorMessage('Label already exists');
      return;
    }

    setLabels([...labels, trimmedLabel]);
    setNewLabel('');
    setErrorMessage(null);
  };

  // 💾 Save the new label to the backend
  const handleSaveBrain = async () => {
    try {
      const response = await fetch('http://localhost:8080/brain/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          labelContent: labels,
        }),
      });

      console.log('Response status:', response.status);

      if (response.ok) {
        handleCloseModal();
      } else {
        const data = await response.json();
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error('Error saving label:', error);
    }
  };

  // 🧠 Calculate label positions (using index for unique angles)
  useEffect(() => {
    if (labels.length > 0) {
      const initialPositions = {};
      const totalLabels = labels.length; // 라벨 총 개수
      const radius = 140; // 뇌 영역 내 라벨이 퍼지는 반경 (px)

      labels.forEach((label, index) => {
        const angle = (index / totalLabels) * 2 * Math.PI; // 각 라벨에 고유한 각도 할당
        const offsetX = (Math.random() - 0.5) * 20; // X축 랜덤 오프셋 (±10px)
        const offsetY = (Math.random() - 0.5) * 20; // Y축 랜덤 오프셋 (±10px)

        initialPositions[index] = {
          left: `calc(50% + ${radius * Math.cos(angle) + offsetX}px)`, // X 좌표
          top: `calc(50% + ${radius * Math.sin(angle) + offsetY}px)`, // Y 좌표
        };
      });

      setLabelPositions(initialPositions);
    }
  }, [labels]);

  const handleFristTimeYes = () => {
    setFadeOut(true);
    setTimeout(() => {
      setIsNewModalOpen(false);
    }, 1000);
  };

  const handleNavigate = () => {
    navigate('/Home');
  };

  return (
    <div className="brain-container">
      {isnewModalOpen && (
        <div className={`first-time-overlay ${fadeOut ? 'fade-out' : ''}`}>
          <div className="first-time-image-wrap">
            <img src="/뇌진구.png" alt="Welcome" className="first-time-image" />
          </div>
          <div className="first-time-content">
            <h2>뇌진구 만난적 있나요?</h2>
            <button onClick={handleNavigate}>네!</button>
            <button onClick={handleFristTimeYes}>아니요...</button>
          </div>
        </div>
      )}
      {!isnewModalOpen && (
        <>
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
                  left: labelPositions[index]?.left || '50%',
                  top: labelPositions[index]?.top || '50%',
                  transform: 'translate(-50%, -50%)',
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
          <button className="navigate-button" onClick={handleNavigate}>
            홈
          </button>
        </>
      )}
    </div>
  );
};

export default Brain;

