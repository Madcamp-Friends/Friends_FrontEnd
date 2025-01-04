import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Menu from './menu_bar/menu';
import FriendList from './friend/friendList';

function App() {
  return (
    <Routes>
      {/* 기본 경로 */}
      <Route path="/" element={<Menu />} />
      
      {/* 친구 목록 */}
      <Route path="/friends" element={<FriendList />} />
    </Routes>
  );
}

export default App;
