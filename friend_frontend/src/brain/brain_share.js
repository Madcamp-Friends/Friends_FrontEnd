import React, { useEffect, useState } from 'react';
import './brain_share.css';

const Brain_Share = () => {
  // ✅ 상태 변수
  const [friendList, setFriendList] = useState([]); // 친구 목록
  const [selectedFriendId, setSelectedFriendId] = useState(null); // 선택된 친구 ID
  const [friendBrainData, setFriendBrainData] = useState([]); // 선택된 친구의 뇌 정보
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태
  const [labelPositions, setLabelPositions] = useState([]);


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


  useEffect(() => {
    if (selectedFriendId && friendBrainData.length > 0) {
      const initialPositions = {};
      const totalLabels = friendBrainData.length; // 선택된 친구의 라벨 개수
      const radius = 80; // 라벨이 뇌 영역 내에서 퍼질 반경(px)
  
      friendBrainData.forEach((label, index) => {
        const angle = (index / totalLabels) * 2 * Math.PI; // 각 라벨의 고유 각도 계산
        initialPositions[label.labelId] = {
          left: `calc(50% + ${radius * Math.cos(angle)}px)`, // X 좌표
          top: `calc(50% + ${radius * Math.sin(angle)}px)`, // Y 좌표
        };
      });
  
      setLabelPositions(initialPositions);
    }
  }, [selectedFriendId, friendBrainData]);
  

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
      <div className="brain-info-container-share_brain">
        <div className="brain-image-rap">
          <img
            src="/assets/Brain_NI.svg"
            alt="Brain"
            className="brain-image"
          />
          
        {friendBrainData.map((label) => (
          <div
            key={label.labelId}
            className="label-brain_share"
            style={{
              left: labelPositions[label.labelId]?.left || '50%',
              top: labelPositions[label.labelId]?.top || '50%',
              transform: 'translate(-50%, -50%)',
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
