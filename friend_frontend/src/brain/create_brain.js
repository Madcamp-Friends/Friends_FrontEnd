import React, { useEffect, useState } from 'react';
import './create_brain.css';
import {useNavigate} from 'react-router-dom';

const Brain = () => {
  const [labels, setLabels] = useState([]); // Store labels
  const [newLabel, setNewLabel] = useState(''); // Store new label input
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const [errorMessage, setErrorMessage]=useState(null);
  const [isnewModalOpen, setIsNewModalOpen]=useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [labePositions, setLabelPositions]=useState({});

  const navigate=useNavigate();

  // ➕ Open the modal when the "+" button is clicked
  const handleAddLabelClick = () => {
    setIsModalOpen(true);
  };

  // useEffect(()=>{
  //   if(newLabel.length>0){
  //     const initialPostion={};
  //     const totalLabels=newLabel.length;
  //     const radius=80;
  //     newLabel.forEach((label,index)=>{
  //       const angle=(index/totalLabels)*2*Math.PI;
  //       initialPostion[label.labelId]={
  //         left: `calc(50% +${radius*Math.cos(angle)}px)`,
  //         top: `calc(50%+${radius+Math.sin(angle)}px)`,
  //       };
  //     });
  //     setLabelPositions(initialPostion);
  //   }
  // },[labels]);

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
    if(labels.length>0){
      const initialPostion={};
      const totalLabels=labels.length;
      const radius=150;
      labels.forEach((label,index)=>{
        const angle=(index/totalLabels)*2*Math.PI;
        initialPostion[label.labelId]={
          left: `calc(50% +${radius*Math.cos(angle)}px)`,
          top: `calc(50%+${radius+Math.sin(angle)}px)`,
        };
      });
      setLabelPositions(initialPostion);
    }
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

  const handleFristTimeYes=()=>{
    setFadeOut(true);
    setTimeout(()=>{
      setIsNewModalOpen(false);
    },1000);
  }

  const handleNavigate=()=>{
    navigate('/Home');
  }

  return (
    <div className="brain-container">
    {isnewModalOpen&&(
      <div className="first-time-overlay ${fadeOut? 'fade-out': ''}">
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
    {!isnewModalOpen&&(
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
              left:labePositions[label]?.left||'50%',
              right:labePositions[label]?.top||'50%',
              transform:'translate(-50%,-50%)',
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
