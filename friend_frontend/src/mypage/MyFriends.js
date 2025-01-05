import React, { useEffect, useState } from 'react';

const MyFriendList = () => {
  const [pendingFriends, setPendingFriends] = useState([]); // PENDING 친구 목록
  const [currentUser, setCurrentUser] = useState(null); // 현재 사용자 정보

  // ✅ 1. 현재 사용자 정보 가져오기
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/auth/user/me', {
          method: 'GET',
          credentials: 'include',
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

  // ✅ 2. PENDING 친구 목록 불러오기
  useEffect(() => {
    const fetchPendingFriends = async () => {
      try {
        const response = await fetch('http://localhost:8080/friend/getMyPendingFriend', {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('PENDING 친구 목록 불러오기 실패');
        }

        const data = await response.json();
        setPendingFriends(data.map(friend => ({
          ...friend,
          status: 'Connecting' // 초기 상태를 Connecting으로 설정
        })));
      } catch (error) {
        console.error('PENDING 친구 목록 불러오기 실패:', error);
      }
    };

    fetchPendingFriends();
  }, []);

  // ✅ 3. FRIEND 상태로 변경하기
  const confirmFriendRequest = async (toId) => {
    try {
      const response = await fetch('http://localhost:8080/friend/toFriend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ toId }),
      });

      if (!response.ok) {
        throw new Error('Failed to confirm friend request');
      }

      console.log(`✅ 친구 요청 성공: toId=${toId}`);

      // 상태 변경
      setPendingFriends(prevFriends =>
        prevFriends.map(friend =>
          friend.id === toId
            ? { ...friend, status: 'Friend' }
            : friend
        )
      );
    } catch (error) {
      console.error('❌ 친구 요청 중 오류 발생:', error);
    }
  };

  // ✅ 4. 상태 토글 함수
  const toggleStatus = (friend) => {
    if (friend.status === 'Connecting') {
      confirmFriendRequest(friend.id);
    } else {
      console.log('이미 친구로 연결된 상태입니다.');
    }
  };

  return (
    <div className="friend-list">
      {/* ✅ 현재 사용자 닉네임 표시 */}
      <p> 나에게 친구 요청한 사용자 </p>
      <div className="current-user">
        {currentUser ? (
          <p>현재 사용자: {currentUser} </p>
        ) : (
          <p>사용자 정보를 불러오는 중...</p>
        )}
      </div>

      {/* ✅ PENDING 친구 목록 */}
      {pendingFriends.length === 0 ? (
        <p>PENDING 친구 목록이 없습니다.</p>
      ) : (
        pendingFriends.map((friend) => (
          <div key={friend.id} className="friend-item">
            <img
              src="/assets/friendProfileBrain.svg"
              alt="뇌 친구 아이콘"
              className="friend-icon"
            />
            <span className="friend-nickname">{friend.nickname}</span>
            <button 
              className={`friend-status ${
                friend.status === 'Friend' ? 'connected' : 'connecting'
              }`}
              onClick={() => toggleStatus(friend)}
              disabled={friend.status === 'Friend'} // 이미 Friend 상태면 비활성화
            >
              {friend.status === 'Friend' ? 'Friend' : 'Connecting...'}
            </button>
          </div>
        ))
      )}

    <p> 나와 친구관계인 친구 </p>

    
    </div>
  );
};

export default MyFriendList;
