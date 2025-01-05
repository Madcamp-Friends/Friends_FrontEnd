import React, { useEffect, useState } from 'react';
import '../friend/friendList.css';

const FriendList = () => {
  const [friends, setFriends] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/auth/user/me', {
          method: 'GET',
          credentials: 'include', // 쿠키 포함
        });

        if (!response.ok) {
          throw new Error('로그인 정보 불러오기 실패');
        }

        const nickname = await response.text();
        setCurrentUser(nickname);
      } catch (error) {
        console.error('현재 사용자 정보 불러오기 실패:', error);
      }
    };

    fetchCurrentUser();
  }, []);

  // 데이터베이스에서 친구 목록 불러오기
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/auth/members'); 
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

  const sendFriendRequest = async (toId) => {
    try {
      const response = await fetch('http://localhost:8080/friend/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // 세션 쿠키 포함
        body: JSON.stringify({ toId }),
      });

      if (!response.ok) {
        throw new Error('Failed to send friend request');
      }

      console.log(`✅ 친구 요청 성공: toId=${toId}`);

      // 상태 변경
      setFriends(prevFriends =>
        prevFriends.map(friend =>
          friend.id === toId
            ? { ...friend, status: 'Connected' }
            : friend
        )
      );
    } catch (error) {
      console.error('❌ 친구 요청 중 오류 발생:', error);
    }
  };

  // 버튼 클릭 시 상태 토글 함수
  const toggleStatus = (friend) => {
    if (friend.status === 'Disconnected') {
      sendFriendRequest(friend.id);
    } else {
      console.log('이미 연결된 친구입니다.');
    }
  };

  return (
    <div className="friend-list">
      {/* 현재 사용자 닉네임 표시 */}
      <div className="current-user">
        {currentUser ? (
          <p>현재 사용자: {currentUser}</p>
        ) : (
          <p>사용자 정보를 불러오는 중...</p>
        )}
      </div>

      {/* 검색창 */}
      <div className="search-bar">
        <input type="text" placeholder="친구를 닉네임으로 검색하세요" />
      </div>

      {/* 친구 목록 */}
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
              onClick={() => toggleStatus(friend)}
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