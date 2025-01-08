import React, { useEffect, useState } from 'react';
import '../friend/friendList.css';

const FriendList = () => {
  const [friends, setFriends] = useState([]); // 전체 친구 목록
  const [filteredFriends, setFilteredFriends] = useState([]); // 필터링된 친구 목록
  const [currentUser, setCurrentUser] = useState(null); // 현재 사용자 정보
  const [searchTerm, setSearchTerm] = useState(''); // 검색어

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

        const data = await response.json(); // JSON 형태로 변경
        setCurrentUser(data); // data 객체 저장


      } catch (error) {
        console.error('현재 사용자 정보 불러오기 실패:', error);
      }
    };

    fetchCurrentUser();
  }, []);

  // ✅ 2. 친구 목록 불러오기
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/auth/members', {
          method: 'GET',
          credentials: 'include', 
        }
          
        );
        const data = await response.json();

        const updatedFriends = data.map(friend => ({
          ...friend,
          status: 'Disconnected'
        }));

        setFriends(updatedFriends);
        setFilteredFriends(updatedFriends); // 초기 필터링 목록 설정
      } catch (error) {
        console.error('친구 데이터를 불러오는 중 오류 발생:', error);
      }
    };

    fetchFriends();
  }, []);

  // ✅ 3. 친구 요청 보내기
  const sendFriendRequest = async (toId) => {
    try {
      const response = await fetch('http://localhost:8080/friend/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ toId }),
      });

      if (!response.ok) {
        throw new Error('Failed to send friend request');
      }

      console.log(`✅ 친구 요청 성공: toId=${toId}`);

      setFriends(prevFriends =>
        prevFriends.map(friend =>
          friend.id === toId
            ? { ...friend, status: 'Connecting' }
            : friend
        )
      );
    } catch (error) {
      console.error('❌ 친구 요청 중 오류 발생:', error);
    }
  };

  // ✅ 4. 상태 토글 함수
  const toggleStatus = (friend) => {
    if (friend.status === 'Disconnected') {
      sendFriendRequest(friend.id);
    } else {
      console.log('이미 연결된 친구입니다.');
    }
  };

  // ✅ 5. 검색어에 따라 친구 목록 필터링
  useEffect(() => {
    const filtered = friends.filter(friend =>
      friend?.nickname?.toLowerCase().includes((searchTerm || '').toLowerCase())
    );
    setFilteredFriends(filtered);
  }, [searchTerm, friends]);

  // ✅ 검색어 입력 처리
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="friend-list">
      {/* ✅ 현재 사용자 닉네임 표시 */}
      <div className="current-user">
        {currentUser ? (
          <p>👤 현재 사용자: {currentUser.nickname+"님"}</p>
        ) : (
          <p>🕒 사용자 정보를 불러오는 중...</p>
        )}
      </div>

      {/* ✅ 검색창 */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="🔍 친구를 닉네임으로 검색하세요"
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-text"
        />
      </div>

      {/* ✅ 친구 목록 */}
      {filteredFriends.length === 0 ? (
        <p>📭 해당하는 친구가 없습니다.</p>
      ) : (
        filteredFriends.map((friend) => (
          <div key={friend.id} className="friend-item">
            <img
              src="/assets/friendProfileBrain.svg"
              alt="뇌 친구 아이콘"
              className="friend-icon"
            />
            <span className="friend-nickname">{friend.nickname}</span>
            <button 
              className={`friend-status ${
                friend.status === 'Connecting' ? 'Connecting' : 'Disconnected'
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


