import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './menu.css';
import { useNavigate } from "react-router-dom";

function Menu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate=useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const logout=async (e)=>{
    e.preventDefault();
        // Add logic to handle account creation here
        try{
            const response= await fetch('http://localhost:8080/api/auth/logout', {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if(response.ok){
                const data= await response.text();
                alert(data);
                navigate('/');
            }else{
                const errorText=await response.text();
                alert(errorText);
            }
        }catch(error){
            alert('Please try again');
        }
  };


  return (
    <div className="app">
      {/* 상단 헤더 영역 */}
      <header className="header">
        <div className="header-left">
          {/* 햄버거 버튼 */}
          <button className="hamburger" onClick={toggleMenu} aria-label="메뉴 열기">
            ☰
          </button>
          {/* 앱 이름 */}
          <span className="app-name">Connect Your Synapse</span>
        </div>

        <div className="header-right">
          {/* 알림 설정 */}
          <button className="header-btn">🔔 알림 설정</button>
          {/* 사용자 프로필 */}
          <img src="/profile.png" alt="사용자 프로필" className="profile-img" />
        </div>
      </header>

      {/* 메뉴 */}
      <nav className={`menu ${isMenuOpen ? 'open' : ''}`}>
        <ul>
          <li>홈 화면</li>
          <li>
            <Link to="/friends">친구 맺기</Link>
          </li>
          <li> <Link to ="/share-brain">뇌 공유</Link> </li>
          <li>
            <Link to="/MyPage">My Page</Link>
          </li>
        </ul>
        <button className="logout" onClick={logout}>로그아웃</button>
      </nav>

      {/* 메인 콘텐츠 */}
      <div className={`content ${isMenuOpen ? 'menu-open' : ''}`}>
        <h1>메인 콘텐츠 영역</h1>
      </div>
    </div>
  );
}

export default Menu;
