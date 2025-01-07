import React, { useState } from 'react';
import './settings.css';

const Settings = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    useremail: '',
    currentPassword: '',
    newPassword: '',
  });
  const [errorMessage, setErrorMessage] = useState(null);

  // Open modal for specific type (username, email, password)
  const openModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({
      username: '',
      useremail: '',
      currentPassword: '',
      newPassword: '',
    });
    setErrorMessage(null);
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Update user info on backend
  const handleUpdate = async () => {
    let url = '';
    let body = {};

    if (modalType === 'username') {
      url = 'http://localhost:8080/api/auth/change/nickname';
      body = { username: formData.username };
    } else if (modalType === 'useremail') {
      url = 'http://localhost:8080/api/auth/change/email';
      body = { useremail: formData.useremail };
    } else if (modalType === 'password') {
      url = 'http://localhost:8080/api/auth/chagne/password';
      body = {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
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
                value={formData.username}
                onChange={handleInputChange}
              />
            )}

            {modalType === 'useremail' && (
              <input
                type="email"
                name="useremail"
                placeholder="Enter new email"
                value={formData.useremail}
                onChange={handleInputChange}
              />
            )}

            {modalType === 'password' && (
              <>
                <input
                  type="password"
                  name="currentPassword"
                  placeholder="Enter current password"
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                />
                <input
                  type="password"
                  name="newPassword"
                  placeholder="Enter new password"
                  value={formData.newPassword}
                  onChange={handleInputChange}
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
