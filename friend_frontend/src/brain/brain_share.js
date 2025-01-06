import React, { useEffect, useState } from 'react';
import './brain_share.css'
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
      setError('친구 뇌 정보를 불러오는 데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // ✅ 3. UI 렌더링
  return (
    <div className="brain-share">
      <h2>🧠 친구 목록</h2>
      {error && <p className="error">{error}</p>}
      {friendList.length === 0 ? (
        <p>친구 목록이 없습니다.</p>
      ) : (
        <ul className="friend-list">
          {friendList.map((friend) => (
            <li key={friend.id} className="friend-item">
              <span>{friend.nickname}</span>
              <button onClick={() => fetchFriendBrain(friend.id)}>뇌 정보 보기</button>
            </li>
          ))}
        </ul>
      )}

      {/* 친구 뇌 정보 표시 */}
      {selectedFriendId && (
        <div className="friend-brain-info">
          <h3>🧠 {friendList.find(f => f.id === selectedFriendId)?.nickname}의 뇌 정보</h3>
          {loading ? (
            <p>뇌 정보를 불러오는 중...</p>
          ) : friendBrainData.length === 0 ? (
            <p>뇌 데이터가 없습니다.</p>
          ) : (
            <ul>
              {friendBrainData.map((label) => (
                <li key={label.labelId}>
                  <strong>ID:</strong> {label.labelId} <br />
                  <strong>Topic:</strong> {label.labelTopic}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Brain_Share;
