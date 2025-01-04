import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './menu.css';

function Menu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
          <span className="app-name">My App</span>
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
          <li>일정 관리</li>
          <li>뇌 공유</li>
        </ul>
        <button className="logout">로그아웃</button>
      </nav>

      {/* 메인 콘텐츠 */}
      <div className={`content ${isMenuOpen ? 'menu-open' : ''}`}>
        <h1>메인 콘텐츠 영역</h1>
      </div>
    </div>
  );
}

export default Menu;
