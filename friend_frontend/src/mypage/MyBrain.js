import React, { useEffect, useState } from 'react';
import '../mypage/MyBrain.css';

const MyBrain = () => {
  // ✅ 상태 변수
  const [brainData, setBrainData] = useState([]); // LabelDTO 리스트
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태
  const [editingLabelId, setEditingLabelId] = useState(null); // 현재 편집 중인 Label ID
  const [editingText, setEditingText] = useState(''); // 편집 중인 Label 텍스트
  const [labelPositions, setLabelPositions] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false); // useState() 괄호안은 초기화 
  const [inputValue, setInputValue] = useState(''); // string이니까 빈값으로 변경
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // delete api 전용 상태변수 


  // ✅ 데이터 불러오기
  useEffect(() => {
    const fetchBrainData = async () => {
      try {
        const response = await fetch('http://localhost:8080/brain/getMyBrain', {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('뇌 데이터 가져오기 실패');
        }

        const data = await response.json();
        setBrainData(data); // 상태에 저장
      } catch (err) {
        console.error('❌ 데이터 불러오기 오류:', err);
        setError('저장된 뇌 데이터가 없습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchBrainData();
  }, []);


  useEffect(() => {
    if (brainData.length > 0) {
      const initialPositions = {};
      const totalLabels = brainData.length; // 라벨의 총 개수
      const radius = 110; // 뇌 영역 내 라벨이 퍼지는 반경 (px)
  
      brainData.forEach((label, index) => {
        const angle = (index / totalLabels) * 2 * Math.PI; // 각 라벨에 고유한 각도 할당
        initialPositions[label.labelId] = {
          left: `calc(50% + ${radius * Math.cos(angle)}px)`, // X 좌표
          top: `calc(50% + ${radius * Math.sin(angle)}px)`, // Y 좌표
        };
      });
  
      setLabelPositions(initialPositions);
    }
  }, [brainData]);

  // ✅ Label 클릭 시 편집 상태 활성화
  const handleLabelClick = (id, currentText) => {
    setEditingLabelId(id); // 클릭한 Label의 ID 저장
    setEditingText(currentText); // 클릭한 Label의 텍스트 저장
  };

  // ✅ 입력 변경 핸들러
  const handleInputChange = (e) => {
    setEditingText(e.target.value); // 입력된 텍스트로 업데이트
  };

  // ✅ Label 수정 API 호출
  const saveEditedLabel = async () => {
    try {
      const response = await fetch(`http://localhost:8080/brain/edit/${editingLabelId}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ label: editingText }),
      });

      if (!response.ok) {
        throw new Error('Label 수정 실패');
      }

      const updatedLabel = await response.json();

      // 상태 업데이트
      setBrainData((prevData) =>
        prevData.map((label) =>
          label.labelId === editingLabelId
            ? { ...label, labelTopic: updatedLabel.labelTopic }
            : label
        )
      );

      // 편집 상태 초기화
      setEditingLabelId(null);
      setEditingText('');
    } catch (err) {
      console.error('❌ Label 수정 오류:', err);
      setError('Label 수정에 실패했습니다.');
    }
  };

  // 엔터 키 입력 시 저장
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      saveEditedLabel();
    }
  };

  // 데이터 로딩 중 화면
  if (loading) {
    return <p>🧠 뇌 데이터를 불러오는 중...</p>;
  }

  // 에러 화면
  if (error) {
    return <p>❌ 오류 발생: {error}</p>;
  }


  /* 뇌에 Label 추가하기 */
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setInputValue('')
  };

  const setLableNameChange = (e) => {
    setInputValue(e.target.value);
  }


  // 관심사 추가 API 연결 
  const addLabel = async () => {
    try{
      const response = await fetch(`http://localhost:8080/brain/add/label?labelName=${inputValue}`,
      {
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials:'include'
      });

      if (!response.ok){
        throw new Error('Failed to add label : ' + "error");
      }

      const data = await response.json();
      setBrainData([...brainData,data])
      console.log('서버 응답 : data - ', brainData)
      closeModal();
    } catch (error) {
      console.log()
    }
  };

  // 삭제 API 연동 
  const deleteLabel = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8080/brain/label?id=${id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        }
      );
  
      if (!response.ok) {
        throw new Error('Failed to delete label');
      }
  
      // 성공적으로 삭제된 경우 상태에서 해당 라벨 제거
      setBrainData((prevData) =>
        prevData.filter((label) => label.labelId !== id)
      );
  
      console.log(`라벨 (ID: ${id}) 삭제 완료`);
    } catch (error) {
      console.error('❌ 라벨 삭제 오류:', error);
    }
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };
  
  // 삭제 모달 닫기
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };
  

  // ✅ 데이터 화면 렌더링
  return (
    <div className="my-brain">
      <h1 id="title_myBrain"> 🧠 내 뇌 정보</h1>
      {brainData.length === 0 ? (
        <p>저장된 뇌 데이터가 없습니다.</p>
      ) : (
        <div className="brain-image-wrap-my-brain">
          <img
            src="/assets/Brain_NI.svg"
            alt="Brain"
            className="brain-image_svg"
          />
          

          {/* Render Labels */}
          {brainData.map((label) => (
            <div
            key={label.labelId}
            className="label-my-brain"
            style={{
              left: labelPositions[label.labelId]?.left || '50%',
              top: labelPositions[label.labelId]?.top || '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
              {/* 편집 상태일 때 입력 필드 표시 */}
              {editingLabelId === label.labelId ? (
                <input
                  type="text"
                  value={editingText}
                  onChange={handleInputChange}
                  onBlur={saveEditedLabel}
                  onKeyDown={handleKeyDown}
                  autoFocus
                  className="label-edit-input"
                />
              ) : (
                <span
                  id={`label-${label.labelId}`}
                  onClick={() => handleLabelClick(label.labelId, label.labelTopic)}
                  style={{ cursor: 'pointer' }}
                  className="label-my-brain-labels"
                >
                  {label.labelTopic}
                </span>
              )}
            </div>
          ))}
          <div className="brain-buttons-container">
            <button onClick={openModal} className="open-modal"> 관심사 추가하기 </button>
            <button onClick={openDeleteModal} className="delete-modal-open-button"> 관심사 삭제하기 </button> 
          </div>
        </div>
      )}
      
      
      {isModalOpen && (
        <div className="modal-entire"> 
          <div className="modal">
            <h3>자신의 뇌에 추가하고 싶은 <br/> 관심사를 추가해주세요!</h3> 
            <input 
              type="text"   
              value={inputValue}
              onChange={setLableNameChange}
              placeholder='추가할 관심사를 입력해주세요'
              className='modal-input'/>
            <div className="modal-buttons">
              <button onClick={addLabel} className="confirm-btn">저장</button>
              <button onClick={closeModal} className="cancel-btn-add">취소</button>
            </div>

          </div>
          
        </div>
      )}
      

      {/* 관심사 삭제 모달 */}
      {isDeleteModalOpen && (
        <div className="modal-entire">
          <div className="modal delete-modal">
            <h3>🗑️ 관심사 삭제</h3>
            <p>삭제할 관심사를 선택하세요:</p>
            <ul className="delete-label-list">
              {brainData.map((label) => (
                <li key={label.labelId} className="delete-label-item">
                  <span>{label.labelTopic}</span>
                  <button
                    onClick={() => deleteLabel(label.labelId)}
                    className="delete-button"
                  >
                    삭제
                  </button>
                </li>
              ))}
            </ul>
            <button onClick={closeDeleteModal} className="cancel-btn">
              닫기
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default MyBrain;
