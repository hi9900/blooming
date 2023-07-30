import { NavLink, useLocation, useNavigate } from "react-router-dom";

import classes from "./TopAppBar.module.css";

import noticeBase from "../../assets/Nav/notice_base.svg";
import noticeActive from "../../assets/Nav/notice_active.svg";
import { useEffect, useState } from "react";

const TopAppBar = () => {
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState("");

  useEffect(() => {
    if (location.state && location.state.pageTitle) {
      setPageTitle(location.state.pageTitle);
    } else {
      setPageTitle("");
    }
  }, [location]);

  // 뒤로가기 필요하면 여기 넣기
  const backIcon = ["/AllNotice"];
  const navigate = useNavigate();
  const handleHistory = () => {
    navigate(-1);
  };

  return (
    <header className={classes.header}>
      <div className={`${classes.navIcon} ${classes.navLeft}`}>
        <div onClick={handleHistory}>
          {backIcon.includes(location.pathname) && <img src='' alt='뒤' />}
        </div>
      </div>

      {/* 가운데 로고 또는 페이지타이틀 */}
      <div className={classes.pageTitleContainer}>
        {!pageTitle && <img src='src/assets/Nav/word.png' alt='Logo' />}
        <p>{pageTitle}</p>
      </div>

      {/* 알림창으로 이동 */}
      <NavLink to='/AllNotice' state={{ pageTitle: "알림" }}>
        {/* 알림 아이콘 24x24에 맞춰 넣기 */}
        <img
          className={`${classes.navIcon} ${classes.navRight}`}
          src={
            window.location.pathname === "/AllNotice"
              ? noticeActive
              : noticeBase
          }
          alt='알림'
        />
      </NavLink>
    </header>
  );
};

export default TopAppBar;
