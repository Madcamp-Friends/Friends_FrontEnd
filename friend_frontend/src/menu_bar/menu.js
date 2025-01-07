import React, { useState } from 'react';
import './menu.css';
import { useNavigate } from "react-router-dom";

function Menu({children}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate=useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClick = (path) => {
    // 메뉴를 닫고 애니메이션이 끝난 후 페이지 이동
    setIsMenuOpen(false);
    setTimeout(() => {
      navigate(path);
    }, 300); // CSS 애니메이션 시간 (0.3s 기준)
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
          <img src="/assets/뇌진구.png" alt="사용자 프로필" className="profile-img" />
        </div>
      </header>

      {/* 메뉴 */}
      <nav className={`menu ${isMenuOpen ? 'open' : ''}`}>
        <ul>
          <li> <button onClick={() => handleMenuClick('/Home')}>홈 화면</button></li>
          <li> <button onClick={() => handleMenuClick('/friends')}>친구 맺기</button> </li>
          <li> <button onClick={() => handleMenuClick('/share-brain')}>뇌 공유</button> </li>
          <li> <button onClick={() => handleMenuClick('/MyPage')}>My Page</button> </li>
        </ul>
        <button className="logout" onClick={logout}>로그아웃</button>
      </nav>

      {/* 메인 콘텐츠 */}
      <div className={`content ${isMenuOpen ? 'menu-open' : ''}`}>
       {children} 
      </div>
    </div>
  );
}

export default Menu;
