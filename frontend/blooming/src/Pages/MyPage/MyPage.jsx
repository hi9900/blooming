import Profile from "../../components/MyPage/Profile";
import IconBox from "../../components/MyPage/IconBox";
import classes from "./MyPage.module.css";
import { useEffect } from "react";
import { userState } from "../../recoil/ProfileAtom";

import { NavLink } from "react-router-dom";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";

import ErrorModal from "../../components/Error/Modal";
import { errorState } from "../../recoil/ErrorAtom";

import { customAxios } from "../../lib/axios";

// 헤더 알림 아이콘 자리에 설정으로 바꾸기
function MyPage() {
  // 유저 정보 넣기
  const setUserState = useSetRecoilState(userState);
  // 더미 데이터 넣기
  const setDummy = () =>
    setUserState({
      email: "더미@kakao.com",
      gender: "FEMALE",
      name: "더미",
      nickname: "더미",
      phoneNumber: "11",
    });

  const resetUserState = useResetRecoilState(userState);

  const [errorModal, setErrorModal] = useRecoilState(errorState);

  const fetchData = async () => {
    try {
      const response = await customAxios.get("profile");

      console.log(response.data.result[0]);
      // 유저 정보 저장
      setUserState(response.data.result[0]);
    } catch (error) {
      console.error(error);
      setErrorModal(true);
    }
  };

  useEffect(() => {
    resetUserState();
    // 마이페이지에 들어왔을 때 정보가 없으면 API 조회
    if (!userState || !userState.id) {
      fetchData();
    }
  }, []);

  return (
    <>
      <div
        className='mainContainer'
        style={{ marginLeft: "0px", marginRight: "0px" }}
      >
        {/* 에러 모달 표시 */}
        <ErrorModal
          buttonText={"다시시도"}
          show={errorModal}
          onClose={() => {
            setErrorModal(false);
            fetchData();
          }}
        >
          <h2>Error</h2>
          <p>에러등장</p>
          <button
            onClick={() => {
              setErrorModal(false);
              setDummy();
            }}
          >
            더미데이터넣기
          </button>
        </ErrorModal>
        {/* 프로필 */}
        <Profile />
        {/* 아이콘 컴포넌트 */}
        <div className={classes.IconContainer}>
          <IconBox icon={"back"} name={"찜목록"} />
          <IconBox icon={"back"} name={"예약현황"} />
          <IconBox icon={"back"} name={"내후기"} />
        </div>
        내 데이터: 찜한업체, 예약한업체, 후기쓴거, 남의후기도움되는거, 정보수정,
        알림설정( 이 되나? ), 커플 등록
        <div className={classes.SettingContainer}>
          <NavLink to='/setting'>
            <div>
              <p>설정</p>
              {/* 아이콘으로 바꾸기 */}
              <div>화살표로바꿈</div>
            </div>
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default MyPage;
