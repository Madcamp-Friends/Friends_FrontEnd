import React, { useEffect, useState } from 'react';
import '../friend/friendList.css';

const FriendList = () => {
  const [friends, setFriends] = useState([]);

  // 데이터베이스에서 친구 목록 불러오기
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await fetch('http://localhost:8080/members'); // 실제 API 경로로 변경
        const data = await response.json();

        // 모든 친구 상태를 'Disconnected'로 초기화
        const updatedFriends = data.map(friend => ({
          ...friend,
          status: 'Disconnected'
        }));

        setFriends(updatedFriends);
      } catch (error) {
        console.error('친구 데이터를 불러오는 중 오류 발생:', error);
      }
    };

    fetchFriends();
  }, []);

  // 버튼 클릭 시 상태 토글 함수
  const toggleStatus = (id) => {
    setFriends(prevFriends =>
      prevFriends.map(friend =>
        friend.id === id
          ? { ...friend, status: friend.status === 'Disconnected' ? 'Connected' : 'Disconnected' }
          : friend
      )
    );
  };

  return (
    <div className="friend-list">
      {/* 검색창 */}
      <div className="search-bar">
        <input type="text" placeholder="친구를 닉네임으로 검색하세요" />
      </div>

      {/* 로딩 상태 */}
    {friends.length === 0 ? (
      <p>친구 목록을 불러오는 중입니다...</p>
    ) : (
      friends.map((friend) => (
        <div key={friend.id} className="friend-item">
          <img
            src="/assets/friendProfileBrain.svg"
            alt="뇌 친구 아이콘"
            className="friend-icon"
          />
          <span className="friend-nickname">{friend.nickname}</span>
          <button
            className={`friend-status ${
              friend.status === 'Connected' ? 'connected' : 'disconnected'
            }`}
            onClick={() => toggleStatus(friend.id)}
          >
            {friend.status}
          </button>
        </div>
      ))
    )}
  </div>
  );
};

export default FriendList;