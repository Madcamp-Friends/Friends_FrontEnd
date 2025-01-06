import React, { useEffect, useState } from 'react';
import '../mypage/MyBrain.css'

const MyBrain = () => {
  // ✅ 상태 변수
  const [brainData, setBrainData] = useState([]); // LabelDTO 리스트
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  // ✅ 데이터 불러오기
  useEffect(() => {
    const fetchBrainData = async () => {
      try {
        const response = await fetch('http://localhost:8080/brain/getMyBrain', {
          method: 'GET',
          credentials: 'include', // 세션 쿠키 포함
        });

        if (!response.ok) {
          throw new Error('뇌 데이터 가져오기 실패');
        }

        const data = await response.json();
        setBrainData(data); // 상태에 저장
      } catch (err) {
        console.error('❌ 데이터 불러오기 오류:', err);
        setError('데이터를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false); // 로딩 종료
      }
    };

    fetchBrainData();
  }, []);

  // ✅ 데이터 로딩 중 화면
  if (loading) {
    return <p>🧠 뇌 데이터를 불러오는 중...</p>;
  }

  // ✅ 에러 화면
  if (error) {
    return <p>❌ 오류 발생: {error}</p>;
  }

  // ✅ 데이터 화면 렌더링
  return (
    <div className="my-brain">
      <h2>🧠 내 뇌 정보</h2>
      {brainData.length === 0 ? (
        <p>저장된 뇌 데이터가 없습니다.</p>
      ) : (
        <ul>
          {brainData.map((label) => (
            <li key={label.labelId}>
              <strong>ID:</strong> {label.labelId} <br />
              <strong>Topic:</strong> {label.labelTopic}
            </li>
          ))}
        </ul>
      )}
  
      <div className="brain-image-wrap">
        <img
          src="/assets/Brain_NI.svg"
          alt="Brain"
          className="brain-image"
        />
  
        {/* Render Labels */}
        {brainData.map((label, index) => (
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
  );
} 
export default MyBrain;
