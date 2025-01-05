// import React, { useEffect, useState } from 'react';
// import '../friend/friendList.css';

// const FriendList = () => {
//   const [friends, setFriends] = useState([]);
//   const [currentUser, setCurrentUser] = useState(null);

//   useEffect(() => {
//     const fetchCurrentUser = async () => {
//       try {
//         const response = await fetch('http://localhost:8080/api/auth/user/me', {
//           method: 'GET',
//           credentials: 'include', // 쿠키 포함
//         });

//         if (!response.ok) {
//           throw new Error('로그인 정보 불러오기 실패');
//         }

//         const nickname = await response.text();
//         setCurrentUser(nickname);
//       } catch (error) {
//         console.error('현재 사용자 정보 불러오기 실패:', error);
//       }
//     };

//     fetchCurrentUser();
//   }, []);

//   // 데이터베이스에서 친구 목록 불러오기
//   useEffect(() => {
//     const fetchFriends = async () => {
//       try {
//         const response = await fetch('http://localhost:8080/api/auth/members'); 
//         const data = await response.json();

//         // 모든 친구 상태를 'Disconnected'로 초기화
//         const updatedFriends = data.map(friend => ({
//           ...friend,
//           status: 'Disconnected'
//         }));

//         setFriends(updatedFriends);
//       } catch (error) {
//         console.error('친구 데이터를 불러오는 중 오류 발생:', error);
//       }
//     };

//     fetchFriends();
//   }, []);

//   const sendFriendRequest = async (toId) => {
//     try {
//       const response = await fetch('http://localhost:8080/friend/create', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         credentials: 'include', // 세션 쿠키 포함
//         body: JSON.stringify({ toId }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to send friend request');
//       }

//       console.log(`✅ 친구 요청 성공: toId=${toId}`);

//       // 상태 변경
//       setFriends(prevFriends =>
//         prevFriends.map(friend =>
//           friend.id === toId
//             ? { ...friend, status: 'Connecting' }
//             : friend
//         )
//       );
//     } catch (error) {
//       console.error('❌ 친구 요청 중 오류 발생:', error);
//     }
//   };

//   // 버튼 클릭 시 상태 토글 함수
//   const toggleStatus = (friend) => {
//     if (friend.status === 'Disconnected') {
//       sendFriendRequest(friend.id);
//     } else {
//       console.log('이미 연결된 친구입니다.');
//     }
//   };

//   return (
//     <div className="friend-list">
//       {/* 현재 사용자 닉네임 표시 */}
//       <div className="current-user">
//         {currentUser ? (
//           <p>현재 사용자: {currentUser}</p>
//         ) : (
//           <p>사용자 정보를 불러오는 중...</p>
//         )}
//       </div>

//       {/* 검색창 */}
//       <div className="search-bar">
//         <input type="text" placeholder="친구를 닉네임으로 검색하세요" />
//       </div>

//       {/* 친구 목록 */}
//       {friends.length === 0 ? (
//         <p>친구 목록을 불러오는 중입니다...</p>
//       ) : (
//         friends.map((friend) => (
//           <div key={friend.id} className="friend-item">
//             <img
//               src="/assets/friendProfileBrain.svg"
//               alt="뇌 친구 아이콘"
//               className="friend-icon"
//             />
//             <span className="friend-nickname">{friend.nickname}</span>
//             <button 
//               className={`friend-status ${
//                 friend.status === 'Connecting' ? 'Connecting' : 'disconnected'
//               }`}
//               onClick={() => toggleStatus(friend)}
//             >
//               {friend.status}
//             </button>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };


// export default FriendList;

import React, { useEffect, useState } from 'react';
import '../friend/friendList.css';
const FriendList = () => {
  const [friends, setFriends] = useState([]); // 전체 친구 목록
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
        const response = await fetch('http://localhost:8080/friend/getPendingFriend', {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('PENDING 친구 목록 불러오기 실패');
        }

        const data = await response.json();
        setPendingFriends(data.map(friend => friend.id)); // PENDING 친구 ID만 저장
      } catch (error) {
        console.error('PENDING 친구 목록 불러오기 실패:', error);
      }
    };

    fetchPendingFriends();
  }, []);

  // ✅ 3. 전체 친구 목록 불러오기
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/auth/members');
        const data = await response.json();

        const updatedFriends = data.map(friend => ({
          ...friend,
          status: pendingFriends.includes(friend.id) ? 'Connecting' : 'Disconnected' // PENDING 친구는 Connecting
        }));

        setFriends(updatedFriends);
      } catch (error) {
        console.error('친구 데이터를 불러오는 중 오류 발생:', error);
      }
    };

    if (pendingFriends.length > 0) {
      fetchFriends();
    }
  }, [pendingFriends]); // pendingFriends가 업데이트될 때마다 전체 목록 재요청

  
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
                ? { ...friend, status: 'Connecting' }
                : friend
            )
          );
        } catch (error) {
          console.error('❌ 친구 요청 중 오류 발생:', error);
        }
      };

  // ✅ 5. 상태 토글 함수
  const toggleStatus = (friend) => {
    if (friend.status === 'Disconnected') {
      sendFriendRequest(friend.id);
    } else {
      console.log('이미 연결된 친구입니다.');
    }
  };

  return (
    <div className="friend-list">
      {/* ✅ 현재 사용자 닉네임 표시 */}
      <div className="current-user">
        {currentUser ? (
          <p>현재 사용자: {currentUser}</p>
        ) : (
          <p>사용자 정보를 불러오는 중...</p>
        )}
      </div>

      {/* ✅ 친구 목록 */}
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
                friend.status === 'Connected' ? 'connected' :
                friend.status === 'Connecting' ? 'connecting' : 'disconnected'
              }`}
              onClick={() => toggleStatus(friend)}
            >
              {friend.status === 'Connecting' ? 'Connecting...' : friend.status}
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default FriendList; 

// import React, { useEffect, useState } from 'react';
// import '../friend/friendList.css';

// const FriendList = () => {
//   const [friends, setFriends] = useState([]); // 전체 친구 목록
//   const [pendingFriends, setPendingFriends] = useState([]); // PENDING 친구 목록
//   const [currentUser, setCurrentUser] = useState(null); // 현재 사용자 정보

//   // ✅ 1. 현재 사용자 정보 가져오기
//   useEffect(() => {
//     const fetchCurrentUser = async () => {
//       try {
//         const response = await fetch('http://localhost:8080/api/auth/user/me', {
//           method: 'GET',
//           credentials: 'include',
//         });

//         if (!response.ok) {
//           throw new Error('로그인 정보 불러오기 실패');
//         }

//         const nickname = await response.text();
//         setCurrentUser(nickname);
//       } catch (error) {
//         console.error('현재 사용자 정보 불러오기 실패:', error);
//       }
//     };

//     fetchCurrentUser();
//   }, []);

//   // ✅ 2. 전체 친구 목록 불러오기
//   useEffect(() => {
//     const fetchFriends = async () => {
//       try {
//         const response = await fetch('http://localhost:8080/api/auth/members');
//         const data = await response.json();

//         setFriends(data.map(friend => ({
//           ...friend,
//           status: 'Disconnected' // 모든 친구의 초기 상태를 'Disconnected'로 설정
//         })));
//       } catch (error) {
//         console.error('친구 데이터를 불러오는 중 오류 발생:', error);
//       }
//     };

//     fetchFriends();
//   }, []);

//   // ✅ 3. PENDING 친구 목록 불러오기
//   useEffect(() => {
//     const fetchPendingFriends = async () => {
//       try {
//         const response = await fetch('http://localhost:8080/friend/getPendingFriend', {
//           method: 'GET',
//           credentials: 'include',
//         });

//         if (!response.ok) {
//           throw new Error('PENDING 친구 목록 불러오기 실패');
//         }

//         const data = await response.json();
//         setPendingFriends(data.map(friend => friend.id)); // PENDING 친구 ID만 저장
//       } catch (error) {
//         console.error('PENDING 친구 목록 불러오기 실패:', error);
//       }
//     };

//     fetchPendingFriends();
//   }, []);

//   // ✅ 4. PENDING 상태 반영
//   useEffect(() => {
//     if (pendingFriends.length > 0) {
//       setFriends(prevFriends =>
//         prevFriends.map(friend =>
//           pendingFriends.includes(friend.id)
//             ? { ...friend, status: 'Connecting' }
//             : friend
//         )
//       );
//     }
//   }, [pendingFriends]); // pendingFriends가 업데이트될 때만 실행

//   // ✅ 5. 친구 요청 보내기
//   const sendFriendRequest = async (toId) => {
//     try {
//       const response = await fetch('http://localhost:8080/friend/create', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         credentials: 'include',
//         body: JSON.stringify({ toId }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to send friend request');
//       }

//       console.log(`✅ 친구 요청 성공: toId=${toId}`);

//       // 상태 변경
//       setFriends(prevFriends =>
//         prevFriends.map(friend =>
//           friend.id === toId
//             ? { ...friend, status: 'Connecting' }
//             : friend
//         )
//       );
//     } catch (error) {
//       console.error('❌ 친구 요청 중 오류 발생:', error);
//     }
//   };

//   // ✅ 6. 상태 토글 함수
//   const toggleStatus = (friend) => {
//     if (friend.status === 'Disconnected') {
//       sendFriendRequest(friend.id);
//     } else {
//       console.log('이미 연결된 친구입니다.');
//     }
//   };

//   return (
//     <div className="friend-list">
//       {/* ✅ 현재 사용자 닉네임 표시 */}
//       <div className="current-user">
//         {currentUser ? (
//           <p>현재 사용자: {currentUser}</p>
//         ) : (
//           <p>사용자 정보를 불러오는 중...</p>
//         )}
//       </div>

//       {/* ✅ 친구 목록 */}
//       {friends.length === 0 ? (
//         <p>친구 목록을 불러오는 중입니다...</p>
//       ) : (
//         friends.map((friend) => (
//           <div key={friend.id} className="friend-item">
//             <img
//               src="/assets/friendProfileBrain.svg"
//               alt="뇌 친구 아이콘"
//               className="friend-icon"
//             />
//             <span className="friend-nickname">{friend.nickname}</span>
//             <button 
//               className={`friend-status ${
//                 friend.status === 'Connected' ? 'connected' :
//                 friend.status === 'Connecting' ? 'connecting' : 'disconnected'
//               }`}
//               onClick={() => toggleStatus(friend)}
//               disabled={friend.status === 'Connecting'} // Connecting 상태는 비활성화
//             >
//               {friend.status === 'Connecting' ? 'Connecting...' : friend.status}
//             </button>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default FriendList;
