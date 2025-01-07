import React, { useState } from 'react';
import './EditInfo.css';

const Settings = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername]=useState('');
  const [email, setEmail]=useState('');
  const [newpassword, setPassword]=useState('');
  const [currentpass, setCurrentpass]=useState('');

  // Open modal for specific type (username, email, password)
  const openModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setUsername('');
    setPassword('');
    setEmail('');
    setCurrentpass('');
    setErrorMessage(null);
  };


  // Update user info on backend
  const handleUpdate = async () => {
    let url = '';
    let body = {};

    if (modalType === 'username') {
      url = 'http://localhost:8080/api/auth/change/nickname';
      body = { nickname: username };
    } else if (modalType === 'useremail') {
      url = 'http://localhost:8080/api/auth/change/email';
      body = { email: email };
    } else if (modalType === 'password') {
      url = 'http://localhost:8080/api/auth/change/password';
      body = {
        password: currentpass,
        newpassword: newpassword,
      };
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(body),
      });

      if (response.ok) {
        alert(`${modalType} updated successfully!`);
        closeModal();
      } else {
        const data = await response.json();
        setErrorMessage(data.message || 'Error updating information.');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="settings-container">
      <h1>Settings</h1>

      <div className="settings-option">
        <span>Username</span>
        <button onClick={() => openModal('username')}>Change</button>
      </div>

      <div className="settings-option">
        <span>Email</span>
        <button onClick={() => openModal('useremail')}>Change</button>
      </div>

      <div className="settings-option">
        <span>Password</span>
        <button onClick={() => openModal('password')}>Change</button>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>
              Change {modalType === 'username' ? 'Username' : modalType === 'useremail' ? 'Email' : 'Password'}
            </h3>

            {modalType === 'username' && (
              <input
                type="text"
                name="username"
                placeholder="Enter new username"
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
              />
            )}

            {modalType === 'useremail' && (
              <input
                type="email"
                name="useremail"
                placeholder="Enter new email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />
            )}

            {modalType === 'password' && (
              <>
                <input
                  type="password"
                  name="currentPassword"
                  placeholder="Enter current password"
                  value={currentpass}
                  onChange={(e)=>setCurrentpass(e.target.value)}
                />
                <input
                  type="password"
                  name="newPassword"
                  placeholder="Enter new password"
                  value={newpassword}
                  onChange={(e)=>setPassword(e.target.value)}
                />
              </>
            )}

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <div className="modal-buttons">
              <button onClick={handleUpdate}>Update</button>
              <button onClick={closeModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
