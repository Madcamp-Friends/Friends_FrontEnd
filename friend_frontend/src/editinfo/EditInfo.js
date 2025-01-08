import React, { useState, useEffect } from 'react';
import './EditInfo.css';

const Settings = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername]=useState('');
  const [email, setEmail]=useState('');
  const [newpassword, setPassword]=useState('');
  const [currentpass, setCurrentpass]=useState('');

  const [userInfo, setUserInfo]=useState({
    nickname: '',
    email: '',
  });

  useEffect(()=>{
    const featchUserInfo=async()=>{
      try{
        const response=await fetch('http://localhost:8080/api/auth/get/info',{
          method: 'GET',
          credentials: 'include',
        });

        if(response.ok){
          const data=await response.json();
          setUserInfo({
            nickname: data.nickname,
            email: data.email,
          });
        }else{
          setErrorMessage('Failed to load user information');
        }
      }catch(error){
        setErrorMessage('An error occured');
      }
    }
    featchUserInfo();
  },[])

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
        if(modalType==='username'){
          setUserInfo((prev)=>({...prev, nickname: username}));
        }else if(modalType==='useremail'){
          setUserInfo((prev)=> ({...prev, email: email}));
        }
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
      <h1>환경설정</h1>

      <div className="settings-option">
        <span>사용자 이름: {userInfo.nickname}</span>
        <button onClick={() => openModal('username')}>Change</button>
      </div>

      <div className="settings-option">
        <span>이메일: {userInfo.email}</span>
        <button onClick={() => openModal('useremail')}>Change</button>
      </div>

      <div className="settings-option">
        <span>비밀번호</span>
        <button onClick={() => openModal('password')}>Change</button>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>
              {modalType === 'username' ? '이름 설정' : modalType === 'useremail' ? '이메일 설정' : '비밀번호 설정'}
            </h3>

            {modalType === 'username' && (
              <input
                type="text"
                name="username"
                placeholder="새로운 이름 입력해주세요 ><"
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
              />
            )}

            {modalType === 'useremail' && (
              <input
                type="email"
                name="useremail"
                placeholder="새로운 이메일"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />
            )}

            {modalType === 'password' && (
              <>
                <input
                  type="password"
                  name="currentPassword"
                  placeholder="현재 비밀번호"
                  value={currentpass}
                  onChange={(e)=>setCurrentpass(e.target.value)}
                />
                <input
                  type="password"
                  name="newPassword"
                  placeholder="새로운 비밀번호"
                  value={newpassword}
                  onChange={(e)=>setPassword(e.target.value)}
                />
              </>
            )}

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <div className="modal-buttons">
              <button onClick={handleUpdate}>수정하기기</button>
              <button onClick={closeModal}>취소하기</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
