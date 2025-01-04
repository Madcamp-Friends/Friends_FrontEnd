import React, { useEffect, useState } from 'react';
import './friendList.css'

const FriendList = () => {
  const [friends, setFriends] = useState([]);

  // 데이터베이스에서 친구 목록 불러오기
  useEffect(() => {
    // API나 데이터베이스에서 데이터를 불러온다고 가정
    const fetchFriends = async () => {
      try {
        const response = await fetch('/api/friends'); // 실제 API 경로로 변경
        const data = await response.json();
        setFriends(data);
      } catch (error) {
        console.error('친구 데이터를 불러오는 중 오류 발생:', error);
      }
    };

    fetchFriends();
  }, []);

  return (
    <div className="friend-list">
      {/* 검색창 */}
      <div className="search-bar">

        <input type="text" placeholder="친구를 닉네임으로 검색하세요" />
      </div>

      {/* 친구 목록 */}
      {friends.map((friend) => (
        <div key={friend.id} className="friend-item">
          <img
            src="../../public/assets/friendProfileBrain.svg"
            alt="뇌 친구 아이콘"
            className="friend-icon"
          />
          <span className="friend-nickname">{friend.nickname}</span>
          <span className="friend-status">{friend.status}</span>
        </div>
      ))}
    </div>
  );
};

export default FriendList;
