// import React, { useEffect, useState } from 'react';
// import './brain_share.css'
// const Brain_Share = () => {
//   // ✅ 상태 변수
//   const [friendList, setFriendList] = useState([]); // 친구 목록
//   const [selectedFriendId, setSelectedFriendId] = useState(null); // 선택된 친구 ID
//   const [friendBrainData, setFriendBrainData] = useState([]); // 선택된 친구의 뇌 정보
//   const [loading, setLoading] = useState(false); // 로딩 상태
//   const [error, setError] = useState(null); // 에러 상태

//   // ✅ 1. 친구 목록 불러오기
//   useEffect(() => {
//     const fetchFriendList = async () => {
//       try {
//         const response = await fetch('http://localhost:8080/friend/getFriendList', {
//           method: 'GET',
//           credentials: 'include',
//         });

//         if (!response.ok) {
//           throw new Error('친구 목록 불러오기 실패');
//         }

//         const data = await response.json();
//         setFriendList(data); // 친구 목록 저장
//       } catch (err) {
//         console.error('❌ 친구 목록 불러오기 오류:', err);
//         setError('친구 목록을 불러오는 데 실패했습니다.');
//       }
//     };

//     fetchFriendList();
//   }, []);

//   // ✅ 2. 선택된 친구의 뇌 정보 불러오기
//   const fetchFriendBrain = async (friendId) => {
//     setSelectedFriendId(friendId); // 선택된 친구 ID 저장
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch(`http://localhost:8080/brain/getFriendBrain/${friendId}`, {
//         method: 'GET',
//         credentials: 'include',
//       });

//       if (!response.ok) {
//         throw new Error('친구 뇌 정보 불러오기 실패');
//       }

//       const data = await response.json();
//       setFriendBrainData(data); // 뇌 정보 저장
//     } catch (err) {
//       console.error('❌ 친구 뇌 정보 불러오기 오류:', err);
//       setError('친구 뇌 정보를 불러오는 데 실패했습니다.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ 3. UI 렌더링
//   return (
//     <div className="brain-share">
//       <h2>🧠 친구 목록</h2>
//       {error && <p className="error">{error}</p>}
//       {friendList.length === 0 ? (
//         <p>친구 목록이 없습니다.</p>
//       ) : (
//         <ul className="friend-list-share">
//           {friendList.map((friend) => (
//             <li key={friend.id} className="friend-item">
//               <span>{friend.nickname}</span>
//               <button onClick={() => fetchFriendBrain(friend.id)}>뇌 정보 보기</button>
//             </li>
//           ))}
//         </ul>
//       )}

//       {/* 친구 뇌 정보 표시 */}
//       {friendBrainData.length > 0 && !error && (
//         <div className="brain-image-wrap">
//           <img
//             src="/assets/Brain_NI.svg"
//             alt="Brain"
//             className="brain-image"
//           />
//           {friendBrainData.map((label, index) => (
//             <div
//               key={index}
//               className="label"
//               style={{
//                 left: `${Math.random() * 80 + 10}%`,
//                 top: `${Math.random() * 70 + 10}%`,
//               }}
//             >
//               {label.labelTopic}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Brain_Share;


// import React, { useEffect, useState } from 'react';
// import './brain_share.css';

// const Brain_Share = () => {
//   // ✅ 상태 변수
//   const [friendList, setFriendList] = useState([]); // 친구 목록
//   const [selectedFriendId, setSelectedFriendId] = useState(null); // 선택된 친구 ID
//   const [friendBrainData, setFriendBrainData] = useState([]); // 선택된 친구의 뇌 정보
//   const [loading, setLoading] = useState(false); // 로딩 상태
//   const [error, setError] = useState(null); // 에러 상태

//   // ✅ 1. 친구 목록 불러오기
//   useEffect(() => {
//     const fetchFriendList = async () => {
//       try {
//         const response = await fetch('http://localhost:8080/friend/getFriendList', {
//           method: 'GET',
//           credentials: 'include',
//         });

//         if (!response.ok) {
//           throw new Error('친구 목록 불러오기 실패');
//         }

//         const data = await response.json();
//         setFriendList(data); // 친구 목록 저장
//       } catch (err) {
//         console.error('❌ 친구 목록 불러오기 오류:', err);
//         setError('친구 목록을 불러오는 데 실패했습니다.');
//       }
//     };

//     fetchFriendList();
//   }, []);

//   // ✅ 2. 선택된 친구의 뇌 정보 불러오기
//   const fetchFriendBrain = async (friendId) => {
//     setSelectedFriendId(friendId); // 선택된 친구 ID 저장
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch(`http://localhost:8080/brain/getFriendBrain/${friendId}`, {
//         method: 'GET',
//         credentials: 'include',
//       });

//       if (!response.ok) {
//         throw new Error('친구 뇌 정보 불러오기 실패');
//       }

//       const data = await response.json();
//       setFriendBrainData(data); // 뇌 정보 저장
//     } catch (err) {
//       console.error('❌ 친구 뇌 정보 불러오기 오류:', err);
//       setError('친구 뇌 정보를 불러오는 데 실패했습니다.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ 3. UI 렌더링
//   return (
//     <div className="brain-share-container">
//       {/* 친구 목록 영역 */}
//       <div className="friend-list-share">
//         <h2>🧠 친구 목록</h2>
//         {error && <p className="error">{error}</p>}
//         {friendList.length === 0 ? (
//           <p>친구 목록이 없습니다.</p>
//         ) : (
//           <ul>
//             {friendList.map((friend) => (
//               <li key={friend.id} className="friend-item">
//                 <span>{friend.nickname}</span>
//                 <button onClick={() => fetchFriendBrain(friend.id)}>뇌 정보 보기</button>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//       {/* 친구 뇌 정보 표시 */}
//       <div className="brain-info-container">
//         {friendBrainData.length > 0 && !error && (
//           <div className="brain-image-wrap">
//             <img
//               src="/assets/Brain_NI.svg"
//               alt="Brain"
//               className="brain-image"
//             />
//             {friendBrainData.map((label, index) => (
//               <div
//                 key={index}
//                 className="label"
//                 style={{
//                   left: `${Math.random() * 80 + 10}%`,
//                   top: `${Math.random() * 70 + 10}%`,
//                 }}
//               >
//                 {label.labelTopic}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Brain_Share;

import React, { useEffect, useState } from 'react';
import './brain_share.css';

const Brain_Share = () => {
  // ✅ 상태 변수
  const [friendList, setFriendList] = useState([]); // 친구 목록
  const [selectedFriendId, setSelectedFriendId] = useState(null); // 선택된 친구 ID
  const [friendBrainData, setFriendBrainData] = useState([]); // 선택된 친구의 뇌 정보
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  // ✅ 1. 친구 목록 불러오기
  useEffect(() => {
    const fetchFriendList = async () => {
      try {
        const response = await fetch('http://localhost:8080/friend/getFriendList', {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('친구 목록 불러오기 실패');
        }

        const data = await response.json();
        setFriendList(data); // 친구 목록 저장
      } catch (err) {
        console.error('❌ 친구 목록 불러오기 오류:', err);
        setError('친구 목록을 불러오는 데 실패했습니다.');
      }
    };

    fetchFriendList();
  }, []);

  // ✅ 2. 선택된 친구의 뇌 정보 불러오기
  const fetchFriendBrain = async (friendId) => {
    setSelectedFriendId(friendId); // 선택된 친구 ID 저장
    setLoading(true);
    setError(null);
    setFriendBrainData([]);

    try {
      const response = await fetch(`http://localhost:8080/brain/getFriendBrain/${friendId}`, {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('친구 뇌 정보 불러오기 실패');
      }

      const data = await response.json();
      setFriendBrainData(data); // 뇌 정보 저장
    } catch (err) {
      console.error('❌ 친구 뇌 정보 불러오기 오류:', err);
      setError('친구가 뇌를 아직 만들지 않았어요:)');
    } finally {
      setLoading(false);
    }
  };

  // ✅ 3. UI 렌더링
  return (
    <div className="brain-share-container">
      {/* 친구 목록 영역 */}
      <div className="friend-list-share">
        <h2>🧠 친구 목록</h2>
        {error && <p className="error">{error}</p>}
        {friendList.length === 0 ? (
          <p>친구 관계가 맺어진 친구가 없어요! <br/> 친구를 만들어주세요:D</p>
        ) : (
          <ul classname="brain-share-friend-list">
            {friendList.map((friend) => (
              <li key={friend.id} className="friend-item">
                <span>{friend.nickname}</span>
                <button onClick={() => fetchFriendBrain(friend.id)}>뇌 정보 보기</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 뇌 이미지 및 라벨 영역 */}
      <div className="brain-info-container">
        <div className="brain-image-wrap">
          <img
            src="/assets/Brain_NI.svg"
            alt="Brain"
            className="brain-image"
          />
          {/* ✅ 라벨은 friendBrainData가 있을 때만 표시 */}
          {friendBrainData.length > 0 &&
            friendBrainData.map((label, index) => (
              <div
                key={index}
                className="label"
                style={{
                  left: `${Math.random() * 80 + 10}%`,
                  top: `${Math.random() * 70 + 10}%`,
                }}
              >
                {label.labelTopic}
              </div>
            ))}


        </div>
      </div>
    </div>
  );
};

export default Brain_Share;
