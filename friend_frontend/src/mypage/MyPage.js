import React from "react";
import '../mypage/MyPage.css'
import { Link } from 'react-router-dom';


const MyPage = () => {

    return (
        <div className="app">
          {/* 상단 헤더 영역 */}
          <header className="header">
            <div className="header-left">
              {/* 햄버거 버튼 */}
              <button className="hamburger">
                ☰
              </button>
              {/* 앱 이름 */}
              
            </div>
    
            <div className="header-right">
              {/* 알림 설정 */}
              <button className="header-btn">🔔 알림 설정</button>
              {/* 사용자 프로필 */}
              <img src="/profile.png" alt="사용자 프로필" className="profile-img" />
            </div>
          </header>
    
          {/* 메뉴 */}
          <nav>
            <ul>
              <li> <Link to="/MyInfo">나의 정보수정</Link>  </li>
              <li> <Link to="/MyBrain">나의 뇌</Link>  </li>
              <li> <Link to="/MyfriendList">친구 신청 관리</Link> </li>
            </ul>
          </nav>
    
          
          
        </div>
      );
};
export default MyPage;