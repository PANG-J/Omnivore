import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import React, { useState, useRef, useEffect } from "react";

const ActionModal = styled.div`
  // 모달의 스타일 정의
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100vh;
  margin: 0;
  overflow: hidden;
`;

const LanguageDropdown = styled.select`
  width: 60%;
  padding: 10px;
  margin-top: 20px;
  font-size: 16px;
`;

const MainButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto; /* 중앙 정렬을 위한 자동 마진 */
  flex-grow: 1; /* 컨테이너가 사용 가능한 공간을 채우도록 설정 */
`;

const MainButton = styled.button`
  padding: 30px 50px;
  font-size: 18px;
  border: 2px solid black;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: darkgray;
  }
  &:active {
    transform: scale(0.98);
  }
  margin-top: -100px;
`;

const LoginLink = styled.a`
  cursor: pointer;
  color: blue;
  text-decoration: underline;
  margin-top: 10px; /* 간격 조정 */
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  padding: 20px;
  position: absolute;
  bottom: 0;
`;

const ButtonContainer = styled.div`
  text-align: center;
`;

const RoundButton = styled.button`
  border-radius: 50%;
  width: 80px;
  height: 80px;
  &:hover {
    background-color: darkgray;
  &:active {
    transform: scale(0.90);
  }
`;

const ButtonDescription = styled.div`
  margin-top: 5px;
`;

function Main() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en'); // 기본 언어 설정



  const [showActionModal, setShowActionModal] = useState(false);
   useEffect(() => {
    // 모달 바깥 클릭 감지 함수
    const handleClickOutside = (event) => {
      if (showActionModal && !event.target.closest(".action-modal")) {
        setShowActionModal(false);
      }
    };

    // 문서에 이벤트 리스너 추가
    document.addEventListener("mousedown", handleClickOutside);

    // 로컬 스토리지에서 토큰 확인
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(token); // 토큰이 있으면 로그인 상태로 설정

    // 클린업 함수: 모달이 닫힐 때 이벤트 리스너 제거 및 로그인 상태 체크 종료
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
   }, [showActionModal]); // showActionModal이 변경될 때마다 효과 실행
  
  const handleActionChoice = (action) => {
    setShowActionModal(false);
    if (action === "camera") {
      openCamera();
    } else if (action === "gallery") {
      openGallery();
    }
  };

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // 카메라 접근 함수
  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.style.display = "block";
      }
    } catch (error) {
      console.error("카메라 접근 오류:", error);
    }
  };

    const takePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (video && canvas) {
      const context = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
      // 여기에서 canvas의 이미지를 사용할 수 있습니다 (예: 저장 또는 업로드)
    }
  };

  // 파일 선택 이벤트 핸들러
  const handleFileSelect = (event) => {
    const files = event.target.files;
    // 선택된 파일을 다루는 로직 추가...
  };

  const navigateToLogin = () => {
    navigate("/login");
  };

  const navigateToBookmark = () => {
    navigate("/bookmark");
  };

  const navigateToRecord = () => {
    navigate("/record"); // "/record" 경로로 이동
  };

  const navigateToRecommend = () => {
    navigate("/recommend"); // "/recommend" 경로로 이동
  };
  const handleClickOutside = (event) => {
    if (showActionModal && !event.target.closest(".action-modal")) {
      setShowActionModal(false);
    }
  };

    const handleLogout = () => {
    localStorage.removeItem("authToken"); // 로컬 스토리지의 토큰 삭제
    setIsLoggedIn(false); // 로그인 상태 업데이트
    alert("Logout Successful"); // 로그아웃 성공 메시지 표시
    navigate("/"); // 홈페이지로 리디렉션
  };


  useEffect(() => {
    // 로컬 스토리지에서 'selectedLanguage' 값 로드
    const savedLanguage = localStorage.getItem("selectedLanguage") || 'en';
    setSelectedLanguage(savedLanguage);
  }, []);

  const handleLanguageChange = (event) => {
    const newLanguage = event.target.value;
    setSelectedLanguage(newLanguage); // 상태 업데이트
    localStorage.setItem("selectedLanguage", newLanguage); // 로컬 스토리지에 저장
    console.log("Selected language saved:", newLanguage); // 콘솔에 저장된 언어 확인
  };


  return (
    <Container>
      <LanguageDropdown onChange={handleLanguageChange}>
        <option value="en">English</option>
        <option value="ko">한국어</option>
        <option value="ja">日本語</option>
      </LanguageDropdown>

      <MainButtonContainer>
        <MainButton onClick={navigateToRecommend}>
Nearby restaurants</MainButton>
        <LoginLink onClick={handleLogout}>Logout</LoginLink>
      </MainButtonContainer>

      <ButtonGroup>
        <ButtonContainer>
          <RoundButton onClick={() => setShowActionModal(true)}>1</RoundButton>
          <ButtonDescription>shot, upload</ButtonDescription>
      {showActionModal && (
        <ActionModal className="action-modal">
          <button onClick={() => handleActionChoice("camera")}>Shot</button>
          <button onClick={() => handleActionChoice("gallery")}>Upload</button>
          <video ref={videoRef} autoPlay className="modal-video" style={{ display: "none" }}></video>
          <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
          <button onClick={takePhoto}>Take Photo</button>
        </ActionModal>
          )}
          <input
            type="file"
            style={{ display: "none" }}
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept="image/*"
          />
        </ButtonContainer>
        <ButtonContainer>
          <RoundButton onClick={navigateToBookmark}>2</RoundButton>{" "}
          {/* 버튼 2에 이벤트 핸들러 추가 */}
          <ButtonDescription>Bookmark</ButtonDescription>
        </ButtonContainer>
        <ButtonContainer>
          <RoundButton onClick={navigateToRecord}>3</RoundButton>{" "}
          {/* 버튼 3을 클릭하면 Record 페이지로 이동 */}
          <ButtonDescription>Records</ButtonDescription>
        </ButtonContainer>
      </ButtonGroup>
    </Container>
  );
}

export default Main;
